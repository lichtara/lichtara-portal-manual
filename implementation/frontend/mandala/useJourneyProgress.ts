import * as React from "react";

import {
  getSafeMandalaJourney,
  getSafeMandalaJourneyStep,
  getMandalaJourneyTrail,
  isMandalaJourneyComplete,
  normalizeMandalaJourneyProgress,
  type MandalaJourney,
  type MandalaJourneyId,
  type MandalaJourneyProgress,
  type MandalaJourneyProgressChange,
  type MandalaJourneyProgressSource,
} from "./mandalaJourneys";

export type UseJourneyProgressOptions = {
  journeys: MandalaJourney[];
  initialJourneyId?: MandalaJourneyId;
  initialStepIndex?: number;
  progress?: MandalaJourneyProgress;
  defaultProgress?: MandalaJourneyProgress;
  storageKey?: string;
  loadPersistedProgress?: () => MandalaJourneyProgress | null | undefined;
  onPersistProgress?: (progress: MandalaJourneyProgress) => void;
  onProgressChange?: (change: MandalaJourneyProgressChange) => void;
  onProgressCommit?: (change: MandalaJourneyProgressChange) => void;
};

export type UseJourneyProgressResult = {
  activeProgress: MandalaJourneyProgress;
  activeJourney: MandalaJourney;
  activeStep: MandalaJourney["steps"][number];
  trailNodeIds: MandalaJourney["path"];
  isLastStep: boolean;
  commitProgress: (
    nextProgress: MandalaJourneyProgress,
    source: MandalaJourneyProgressSource,
  ) => void;
  selectJourney: (
    journeyId: MandalaJourneyId,
    source?: MandalaJourneyProgressSource,
  ) => void;
  selectStep: (
    stepIndex: number,
    source?: MandalaJourneyProgressSource,
  ) => void;
  goToPreviousStep: (source?: MandalaJourneyProgressSource) => void;
  goToNextStep: (
    source?: MandalaJourneyProgressSource,
    restartSource?: MandalaJourneyProgressSource,
  ) => void;
  restartJourney: (source?: MandalaJourneyProgressSource) => void;
};

function readStoredJourneyProgress(
  storageKey: string,
): MandalaJourneyProgress | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as MandalaJourneyProgress;
  } catch {
    return null;
  }
}

function resolvePersistedJourneyProgress(
  storageKey: string | undefined,
  loadPersistedProgress:
    | (() => MandalaJourneyProgress | null | undefined)
    | undefined,
): MandalaJourneyProgress | null | undefined {
  if (loadPersistedProgress) {
    try {
      return loadPersistedProgress();
    } catch {
      return null;
    }
  }

  if (storageKey) {
    return readStoredJourneyProgress(storageKey);
  }

  return null;
}

function readInitialJourneyProgress(
  journeys: MandalaJourney[],
  initialJourneyId: MandalaJourneyId,
  initialStepIndex: number,
  defaultProgress: MandalaJourneyProgress | undefined,
  storageKey: string | undefined,
  loadPersistedProgress:
    | (() => MandalaJourneyProgress | null | undefined)
    | undefined,
): MandalaJourneyProgress {
  const persistedProgress = resolvePersistedJourneyProgress(
    storageKey,
    loadPersistedProgress,
  );

  return normalizeMandalaJourneyProgress(
    journeys,
    defaultProgress ??
      persistedProgress ?? {
        journeyId: initialJourneyId,
        stepIndex: initialStepIndex,
      },
    initialJourneyId,
  );
}

export function useJourneyProgress({
  journeys,
  initialJourneyId = "perception",
  initialStepIndex = 0,
  progress,
  defaultProgress,
  storageKey,
  loadPersistedProgress,
  onPersistProgress,
  onProgressChange,
  onProgressCommit,
}: UseJourneyProgressOptions): UseJourneyProgressResult {
  if (journeys.length === 0) {
    throw new Error("useJourneyProgress requires at least one journey.");
  }

  const isControlled = progress !== undefined;
  const [internalProgress, setInternalProgress] =
    React.useState<MandalaJourneyProgress>(() => {
      return readInitialJourneyProgress(
        journeys,
        initialJourneyId,
        initialStepIndex,
        defaultProgress,
        storageKey,
        loadPersistedProgress,
      );
    });
  const hasHydratedPersistedProgressRef = React.useRef(false);

  React.useEffect(() => {
    if (
      hasHydratedPersistedProgressRef.current ||
      (!loadPersistedProgress && !storageKey)
    ) {
      return;
    }

    hasHydratedPersistedProgressRef.current = true;

    try {
      const persistedProgress = resolvePersistedJourneyProgress(
        storageKey,
        loadPersistedProgress,
      );

      if (!persistedProgress) {
        return;
      }

      const nextProgress = normalizeMandalaJourneyProgress(
        journeys,
        persistedProgress,
        initialJourneyId,
      );

      if (!isControlled) {
        setInternalProgress(nextProgress);
      }
    } catch {
      // Ignore persistence hydration failures so the journey can still mount.
    }
  }, [initialJourneyId, isControlled, journeys, loadPersistedProgress, storageKey]);

  const activeProgress = normalizeMandalaJourneyProgress(
    journeys,
    isControlled ? progress : internalProgress,
    initialJourneyId,
  );
  const activeJourney = getSafeMandalaJourney(
    journeys,
    activeProgress.journeyId,
    initialJourneyId,
  );
  const activeStep = getSafeMandalaJourneyStep(
    activeJourney,
    activeProgress.stepIndex,
  );
  const trailNodeIds = getMandalaJourneyTrail(
    activeJourney,
    activeProgress.stepIndex,
  );
  const isLastStep = isMandalaJourneyComplete(
    activeJourney,
    activeProgress.stepIndex,
  );

  React.useEffect(() => {
    if (onPersistProgress) {
      try {
        onPersistProgress(activeProgress);
      } catch {
        // Ignore persistence callback failures so the journey keeps working.
      }
    }

    if (!storageKey || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(activeProgress));
    } catch {
      // Ignore storage failures so the journey keeps working.
    }
  }, [activeProgress, onPersistProgress, storageKey]);

  function commitProgress(
    nextProgressInput: MandalaJourneyProgress,
    source: MandalaJourneyProgressSource,
  ) {
    const previousProgress = activeProgress;
    const nextProgress = normalizeMandalaJourneyProgress(
      journeys,
      {
        ...nextProgressInput,
        updatedAt: new Date().toISOString(),
      },
      initialJourneyId,
    );
    const hasJourneyChanged =
      previousProgress.journeyId !== nextProgress.journeyId;
    const hasStepChanged =
      previousProgress.stepIndex !== nextProgress.stepIndex;

    if (!hasJourneyChanged && !hasStepChanged) {
      return;
    }

    const previousJourney = getSafeMandalaJourney(
      journeys,
      previousProgress.journeyId,
      initialJourneyId,
    );
    const previousStep = getSafeMandalaJourneyStep(
      previousJourney,
      previousProgress.stepIndex,
    );
    const wasComplete = isMandalaJourneyComplete(
      previousJourney,
      previousProgress.stepIndex,
    );
    const nextJourney = getSafeMandalaJourney(
      journeys,
      nextProgress.journeyId,
      initialJourneyId,
    );
    const nextStep = getSafeMandalaJourneyStep(
      nextJourney,
      nextProgress.stepIndex,
    );
    const isComplete = isMandalaJourneyComplete(
      nextJourney,
      nextProgress.stepIndex,
    );
    const change: MandalaJourneyProgressChange = {
      source,
      previousJourney,
      previousStep,
      wasJourneyComplete: wasComplete,
      journey: nextJourney,
      step: nextStep,
      isJourneyComplete: isComplete,
      previousProgress,
      nextProgress,
    };

    if (!isControlled) {
      setInternalProgress(nextProgress);
    }

    onProgressChange?.(change);
    onProgressCommit?.(change);
  }

  function selectJourney(
    journeyId: MandalaJourneyId,
    source: MandalaJourneyProgressSource = "selector",
  ) {
    commitProgress(
      {
        journeyId,
        stepIndex: 0,
      },
      source,
    );
  }

  function selectStep(
    stepIndex: number,
    source: MandalaJourneyProgressSource = "stepper",
  ) {
    commitProgress(
      {
        journeyId: activeJourney.id,
        stepIndex,
      },
      source,
    );
  }

  function goToPreviousStep(
    source: MandalaJourneyProgressSource = "previous",
  ) {
    commitProgress(
      {
        journeyId: activeJourney.id,
        stepIndex: Math.max(0, activeProgress.stepIndex - 1),
      },
      source,
    );
  }

  function restartJourney(
    source: MandalaJourneyProgressSource = "restart",
  ) {
    commitProgress(
      {
        journeyId: activeJourney.id,
        stepIndex: 0,
      },
      source,
    );
  }

  function goToNextStep(
    source: MandalaJourneyProgressSource = "next",
    restartSource: MandalaJourneyProgressSource = "restart",
  ) {
    if (isLastStep) {
      restartJourney(restartSource);
      return;
    }

    commitProgress(
      {
        journeyId: activeJourney.id,
        stepIndex: Math.min(
          activeJourney.steps.length - 1,
          activeProgress.stepIndex + 1,
        ),
      },
      source,
    );
  }

  return {
    activeProgress,
    activeJourney,
    activeStep,
    trailNodeIds,
    isLastStep,
    commitProgress,
    selectJourney,
    selectStep,
    goToPreviousStep,
    goToNextStep,
    restartJourney,
  };
}

export default useJourneyProgress;

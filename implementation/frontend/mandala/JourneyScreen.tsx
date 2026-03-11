import * as React from "react";

import {
  MandalaCanvas,
  mandalaNodes,
  mandalaRoutes,
  type MandalaNodeId,
} from "./MandalaCanvas";
import { JourneySelector } from "./JourneySelector";
import { JourneyStepper } from "./JourneyStepper";
import {
  getSafeMandalaJourney,
  getMandalaJourneyTrail,
  isMandalaJourneyComplete,
  mandalaJourneys,
  normalizeMandalaJourneyProgress,
  type MandalaJourneyAnalyticsEvent,
  type MandalaJourney,
  type MandalaJourneyId,
  type MandalaJourneyProgress,
  type MandalaJourneyProgressChange,
  type MandalaJourneyProgressSource,
} from "./mandalaJourneys";
import {
  getClosestJourneyStepIndex,
  journeyCx,
  MANDALA_JOURNEY_UI_CSS,
} from "./journeyUI";

export type JourneyScreenProps = {
  journeys?: MandalaJourney[];
  initialJourneyId?: MandalaJourneyId;
  initialStepIndex?: number;
  progress?: MandalaJourneyProgress;
  defaultProgress?: MandalaJourneyProgress;
  storageKey?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
  intro?: string;
  showSelector?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onProgressChange?: (change: MandalaJourneyProgressChange) => void;
  onAnalyticsEvent?: (event: MandalaJourneyAnalyticsEvent) => void;
  onJourneyComplete?: (change: MandalaJourneyProgressChange) => void;
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

export function JourneyScreen({
  journeys = mandalaJourneys,
  initialJourneyId = "perception",
  initialStepIndex = 0,
  progress,
  defaultProgress,
  storageKey,
  width = "100%",
  height,
  title = "Por onde voce quer comecar?",
  intro = "Cada caminho ativa uma jornada de 7 etapas. O portal deixa de ser menu e passa a funcionar como travessia orientada pela mandala.",
  showSelector = true,
  className,
  style,
  onProgressChange,
  onAnalyticsEvent,
  onJourneyComplete,
}: JourneyScreenProps) {
  if (journeys.length === 0) {
    return null;
  }

  const isControlled = progress !== undefined;
  const [internalProgress, setInternalProgress] =
    React.useState<MandalaJourneyProgress>(() => {
      const storedProgress = storageKey
        ? readStoredJourneyProgress(storageKey)
        : null;

      return normalizeMandalaJourneyProgress(
        journeys,
        defaultProgress ??
          storedProgress ?? {
            journeyId: initialJourneyId,
            stepIndex: initialStepIndex,
          },
        initialJourneyId,
      );
    });
  const [hoverNodeId, setHoverNodeId] = React.useState<MandalaNodeId | null>(
    null,
  );

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
  const activeStep = activeJourney.steps[activeProgress.stepIndex];
  const trailNodeIds = getMandalaJourneyTrail(
    activeJourney,
    activeProgress.stepIndex,
  );
  const isLastStep = isMandalaJourneyComplete(
    activeJourney,
    activeProgress.stepIndex,
  );

  React.useEffect(() => {
    if (!storageKey || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(activeProgress));
    } catch {
      // Ignore storage failures so the journey keeps working.
    }
  }, [activeProgress, storageKey]);

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

    const nextJourney = getSafeMandalaJourney(
      journeys,
      nextProgress.journeyId,
      initialJourneyId,
    );
    const nextStep = nextJourney.steps[nextProgress.stepIndex];
    const previousJourney = getSafeMandalaJourney(
      journeys,
      previousProgress.journeyId,
      initialJourneyId,
    );
    const wasComplete = isMandalaJourneyComplete(
      previousJourney,
      previousProgress.stepIndex,
    );
    const isComplete = isMandalaJourneyComplete(
      nextJourney,
      nextProgress.stepIndex,
    );
    const change: MandalaJourneyProgressChange = {
      source,
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

    if (hasJourneyChanged) {
      onAnalyticsEvent?.({
        type: "journey_selected",
        source,
        journeyId: nextJourney.id,
        stepIndex: nextProgress.stepIndex,
      });
    }

    onAnalyticsEvent?.({
      type: "journey_step_changed",
      source,
      journeyId: nextJourney.id,
      stepIndex: nextProgress.stepIndex,
      stepId: nextStep.id,
      nodeId: nextStep.nodeId,
    });

    if (!wasComplete && isComplete) {
      onAnalyticsEvent?.({
        type: "journey_completed",
        source,
        journeyId: nextJourney.id,
        completionMode: nextJourney.completionMode,
        finalNodeId: nextStep.nodeId,
        stepIndex: nextProgress.stepIndex,
      });
      onJourneyComplete?.(change);
    }
  }

  return (
    <section className={journeyCx("journey-screen", className)} style={style}>
      <style>{MANDALA_JOURNEY_UI_CSS}</style>

      <header className="journey-screen__header">
        <p className="journey-screen__eyebrow">Jornadas</p>
        <h2 className="journey-screen__title">{title}</h2>
        <p className="journey-screen__intro">{intro}</p>
      </header>

      {showSelector ? (
        <JourneySelector
          journeys={journeys}
          activeJourneyId={activeJourney.id}
          onJourneySelect={(journeyId) => {
            commitProgress(
              {
                journeyId,
                stepIndex: 0,
              },
              "selector",
            );
            setHoverNodeId(null);
          }}
        />
      ) : null}

      <div className="journey-screen__grid">
        <MandalaCanvas
          width={width}
          height={height}
          nodes={mandalaNodes}
          routes={mandalaRoutes}
          activeNodeId={activeStep.nodeId}
          hoverNodeId={hoverNodeId}
          activeRouteId={activeJourney.routeOverlayId}
          trailNodeIds={trailNodeIds}
          title={activeJourney.title}
          subtitle={activeJourney.centralQuestion}
          onNodeEnter={setHoverNodeId}
          onNodeLeave={() => setHoverNodeId(null)}
          onNodeSelect={(nodeId) => {
            const stepIndex = getClosestJourneyStepIndex(
              nodeId,
              activeProgress.stepIndex,
              activeJourney.steps,
            );

            if (stepIndex >= 0) {
              commitProgress(
                {
                  journeyId: activeJourney.id,
                  stepIndex,
                },
                "canvas",
              );
            }
          }}
        />

        <JourneyStepper
          journey={activeJourney}
          activeStepIndex={activeProgress.stepIndex}
          onStepSelect={(stepIndex) =>
            commitProgress(
              {
                journeyId: activeJourney.id,
                stepIndex,
              },
              "stepper",
            )
          }
          onPreviousStep={() =>
            commitProgress(
              {
                journeyId: activeJourney.id,
                stepIndex: Math.max(0, activeProgress.stepIndex - 1),
              },
              "previous",
            )
          }
          onNextStep={() => {
            if (isLastStep) {
              commitProgress(
                {
                  journeyId: activeJourney.id,
                  stepIndex: 0,
                },
                "restart",
              );
              setHoverNodeId(null);
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
              "next",
            );
          }}
        />
      </div>
    </section>
  );
}

export default JourneyScreen;

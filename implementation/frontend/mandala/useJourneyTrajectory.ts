import * as React from "react";

import type { MandalaJourney, MandalaJourneyProgress } from "./mandalaJourneys";
import {
  buildTrajectorySnapshot,
  createTrajectoryRecord,
  recordJourneyProgress,
  type MandalaTrajectoryRecord,
  type MandalaTrajectorySnapshot,
  type MandalaTrajectoryStorageMode,
} from "./mandalaTrajectories";

export type UseJourneyTrajectoryOptions = {
  journeys: MandalaJourney[];
  activeProgress: MandalaJourneyProgress;
  storageKey?: string;
  storageMode?: MandalaTrajectoryStorageMode;
  loadPersistedTrajectory?: () => MandalaTrajectoryRecord | null | undefined;
  onPersistTrajectory?: (record: MandalaTrajectoryRecord) => void;
  onTrajectoryChange?: (
    record: MandalaTrajectoryRecord,
    snapshot: MandalaTrajectorySnapshot | null,
  ) => void;
};

export type UseJourneyTrajectoryResult = {
  trajectoryRecord: MandalaTrajectoryRecord;
  trajectorySnapshot: MandalaTrajectorySnapshot | null;
  resetTrajectory: () => void;
};

function readStoredTrajectoryRecord(
  storageKey: string,
): MandalaTrajectoryRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as MandalaTrajectoryRecord;
  } catch {
    return null;
  }
}

function resolvePersistedTrajectoryRecord(
  storageKey: string | undefined,
  loadPersistedTrajectory:
    | (() => MandalaTrajectoryRecord | null | undefined)
    | undefined,
): MandalaTrajectoryRecord | null | undefined {
  if (loadPersistedTrajectory) {
    try {
      return loadPersistedTrajectory();
    } catch {
      return null;
    }
  }

  if (storageKey) {
    return readStoredTrajectoryRecord(storageKey);
  }

  return null;
}

function readInitialTrajectoryRecord(
  journeys: MandalaJourney[],
  activeProgress: MandalaJourneyProgress,
  storageMode: MandalaTrajectoryStorageMode,
  storageKey: string | undefined,
  loadPersistedTrajectory:
    | (() => MandalaTrajectoryRecord | null | undefined)
    | undefined,
): MandalaTrajectoryRecord {
  const persistedRecord = resolvePersistedTrajectoryRecord(
    storageKey,
    loadPersistedTrajectory,
  );

  return recordJourneyProgress(
    persistedRecord ?? createTrajectoryRecord(storageMode),
    journeys,
    activeProgress,
  );
}

export function useJourneyTrajectory({
  journeys,
  activeProgress,
  storageKey,
  storageMode = "local_only",
  loadPersistedTrajectory,
  onPersistTrajectory,
  onTrajectoryChange,
}: UseJourneyTrajectoryOptions): UseJourneyTrajectoryResult {
  const [trajectoryRecord, setTrajectoryRecord] =
    React.useState<MandalaTrajectoryRecord>(() => {
      return readInitialTrajectoryRecord(
        journeys,
        activeProgress,
        storageMode,
        storageKey,
        loadPersistedTrajectory,
      );
    });
  const hasHydratedPersistedTrajectoryRef = React.useRef(false);

  React.useEffect(() => {
    if (
      hasHydratedPersistedTrajectoryRef.current ||
      (!loadPersistedTrajectory && !storageKey)
    ) {
      return;
    }

    hasHydratedPersistedTrajectoryRef.current = true;

    try {
      const persistedRecord = resolvePersistedTrajectoryRecord(
        storageKey,
        loadPersistedTrajectory,
      );

      if (!persistedRecord) {
        return;
      }

      setTrajectoryRecord(
        recordJourneyProgress(persistedRecord, journeys, activeProgress),
      );
    } catch {
      // Ignore hydration failures so the journey can still mount.
    }
  }, [
    activeProgress.journeyId,
    activeProgress.stepIndex,
    journeys,
    loadPersistedTrajectory,
    storageKey,
  ]);

  React.useEffect(() => {
    setTrajectoryRecord((currentRecord) => {
      return recordJourneyProgress(currentRecord, journeys, activeProgress);
    });
  }, [activeProgress.journeyId, activeProgress.stepIndex, journeys]);

  const trajectorySnapshot = React.useMemo(() => {
    return buildTrajectorySnapshot(trajectoryRecord);
  }, [trajectoryRecord]);

  React.useEffect(() => {
    onTrajectoryChange?.(trajectoryRecord, trajectorySnapshot);
  }, [onTrajectoryChange, trajectoryRecord, trajectorySnapshot]);

  React.useEffect(() => {
    onPersistTrajectory?.(trajectoryRecord);

    if (!storageKey || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(trajectoryRecord));
    } catch {
      // Ignore persistence failures so the journey keeps working.
    }
  }, [onPersistTrajectory, storageKey, trajectoryRecord]);

  function resetTrajectory() {
    setTrajectoryRecord(
      createTrajectoryRecord(storageMode, new Date().toISOString()),
    );
  }

  return {
    trajectoryRecord,
    trajectorySnapshot,
    resetTrajectory,
  };
}

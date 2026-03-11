import type {
  MandalaJourneyAnalyticsEvent,
  MandalaJourneyProgressChange,
} from "./mandalaJourneys";

export type UseJourneyAnalyticsOptions = {
  onAnalyticsEvent?: (event: MandalaJourneyAnalyticsEvent) => void;
  onJourneyComplete?: (change: MandalaJourneyProgressChange) => void;
};

export type UseJourneyAnalyticsResult = {
  trackProgressChange: (change: MandalaJourneyProgressChange) => void;
};

export function emitJourneyAnalyticsForChange(
  change: MandalaJourneyProgressChange,
  { onAnalyticsEvent, onJourneyComplete }: UseJourneyAnalyticsOptions,
) {
  const hasJourneyChanged = change.previousJourney.id !== change.journey.id;

  if (hasJourneyChanged) {
    onAnalyticsEvent?.({
      type: "journey_selected",
      source: change.source,
      journeyId: change.journey.id,
      stepIndex: change.nextProgress.stepIndex,
    });
  }

  onAnalyticsEvent?.({
    type: "journey_step_changed",
    source: change.source,
    journeyId: change.journey.id,
    stepIndex: change.nextProgress.stepIndex,
    stepId: change.step.id,
    nodeId: change.step.nodeId,
  });

  if (!change.wasJourneyComplete && change.isJourneyComplete) {
    onAnalyticsEvent?.({
      type: "journey_completed",
      source: change.source,
      journeyId: change.journey.id,
      completionMode: change.journey.completionMode,
      finalNodeId: change.step.nodeId,
      stepIndex: change.nextProgress.stepIndex,
    });
    onJourneyComplete?.(change);
  }
}

export function useJourneyAnalytics(
  options: UseJourneyAnalyticsOptions,
): UseJourneyAnalyticsResult {
  return {
    trackProgressChange(change) {
      emitJourneyAnalyticsForChange(change, options);
    },
  };
}

export default useJourneyAnalytics;

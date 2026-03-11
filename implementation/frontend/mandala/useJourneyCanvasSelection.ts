import type { MandalaNodeId } from "./MandalaCanvas";
import type { MandalaJourney, MandalaJourneyProgress } from "./mandalaJourneys";
import { getClosestJourneyStepIndex } from "./journeyUI";

export type UseJourneyCanvasSelectionOptions = {
  activeJourney: MandalaJourney;
  activeProgress: MandalaJourneyProgress;
  onSelectStep: (stepIndex: number) => void;
};

export type UseJourneyCanvasSelectionResult = {
  handleNodeSelect: (nodeId: MandalaNodeId) => void;
  resolveNodeStepIndex: (nodeId: MandalaNodeId) => number;
};

export function resolveJourneyCanvasStepIndex(
  nodeId: MandalaNodeId,
  activeProgress: MandalaJourneyProgress,
  activeJourney: MandalaJourney,
): number {
  return getClosestJourneyStepIndex(
    nodeId,
    activeProgress.stepIndex,
    activeJourney.steps,
  );
}

export function useJourneyCanvasSelection({
  activeJourney,
  activeProgress,
  onSelectStep,
}: UseJourneyCanvasSelectionOptions): UseJourneyCanvasSelectionResult {
  function resolveNodeStepIndex(nodeId: MandalaNodeId): number {
    return resolveJourneyCanvasStepIndex(
      nodeId,
      activeProgress,
      activeJourney,
    );
  }

  function handleNodeSelect(nodeId: MandalaNodeId) {
    const stepIndex = resolveNodeStepIndex(nodeId);

    if (stepIndex >= 0) {
      onSelectStep(stepIndex);
    }
  }

  return {
    handleNodeSelect,
    resolveNodeStepIndex,
  };
}

export default useJourneyCanvasSelection;

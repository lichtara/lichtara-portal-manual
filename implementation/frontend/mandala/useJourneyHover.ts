import * as React from "react";

import type { MandalaNodeId } from "./MandalaCanvas";

export type UseJourneyHoverResult = {
  hoverNodeId: MandalaNodeId | null;
  handleNodeEnter: (nodeId: MandalaNodeId) => void;
  handleNodeLeave: () => void;
  clearHover: () => void;
};

export function useJourneyHover(
  initialHoverNodeId: MandalaNodeId | null = null,
): UseJourneyHoverResult {
  const [hoverNodeId, setHoverNodeId] = React.useState<MandalaNodeId | null>(
    initialHoverNodeId,
  );

  function clearHover() {
    setHoverNodeId(null);
  }

  return {
    hoverNodeId,
    handleNodeEnter: setHoverNodeId,
    handleNodeLeave: clearHover,
    clearHover,
  };
}

export default useJourneyHover;

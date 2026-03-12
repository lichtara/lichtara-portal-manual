import * as React from "react";

import {
  getMandalaFieldFlows,
  getMandalaFieldPeriodById,
  mandalaFieldPeriods,
  type MandalaFieldPeriod,
  type MandalaFieldPeriodId,
} from "./fieldFlowSource";
import type { MandalaCollectiveFlow } from "./mandalaTrajectories";

export type UseFieldFlowsOptions = {
  initialPeriodId?: MandalaFieldPeriodId;
  periodId?: MandalaFieldPeriodId;
  onPeriodChange?: (periodId: MandalaFieldPeriodId) => void;
};

export type UseFieldFlowsResult = {
  activePeriod: MandalaFieldPeriod;
  activePeriodId: MandalaFieldPeriodId;
  collectiveFlows: MandalaCollectiveFlow[];
  isTransitioning: boolean;
  periods: MandalaFieldPeriod[];
  selectPeriod: (periodId: MandalaFieldPeriodId) => void;
};

export function useFieldFlows({
  initialPeriodId = "recent",
  periodId,
  onPeriodChange,
}: UseFieldFlowsOptions = {}): UseFieldFlowsResult {
  const [internalPeriodId, setInternalPeriodId] =
    React.useState<MandalaFieldPeriodId>(initialPeriodId);
  const [isTransitioning, startTransition] = React.useTransition();
  const activePeriodId = periodId ?? internalPeriodId;
  const activePeriod = React.useMemo(() => {
    return getMandalaFieldPeriodById(activePeriodId);
  }, [activePeriodId]);
  const collectiveFlows = React.useMemo(() => {
    return getMandalaFieldFlows(activePeriodId);
  }, [activePeriodId]);

  function selectPeriod(nextPeriodId: MandalaFieldPeriodId) {
    if (periodId === undefined) {
      startTransition(() => {
        setInternalPeriodId(nextPeriodId);
      });
    }

    onPeriodChange?.(nextPeriodId);
  }

  return {
    activePeriod,
    activePeriodId,
    collectiveFlows,
    isTransitioning,
    periods: mandalaFieldPeriods,
    selectPeriod,
  };
}

export default useFieldFlows;

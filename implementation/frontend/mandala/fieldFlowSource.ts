import type { MandalaNodeId } from "./MandalaCanvas";
import {
  buildCollectiveFlows,
  type MandalaCollectiveFlow,
  type MandalaTrajectoryRecord,
} from "./mandalaTrajectories";

export type MandalaFieldPeriodId = "moment" | "recent" | "expanded";

export type MandalaFieldPeriod = {
  id: MandalaFieldPeriodId;
  label: string;
  description: string;
  climateCopy: string;
};

export const mandalaFieldPeriods: MandalaFieldPeriod[] = [
  {
    id: "moment",
    label: "24h",
    description: "Leitura do campo mais proxima do momento atual.",
    climateCopy:
      "Muitas jornadas comecam em percepcao nas ultimas 24 horas.",
  },
  {
    id: "recent",
    label: "7 dias",
    description: "Movimentos recorrentes do campo recente.",
    climateCopy:
      "Nos ultimos 7 dias, o campo tem se movido entre percepcao e reorganizacao antes da acao.",
  },
  {
    id: "expanded",
    label: "30 dias",
    description: "Leitura mais ampla das correntes da mandala.",
    climateCopy:
      "Nos ultimos 30 dias, retornos a NAVROS e ciclos mais lentos de integracao ficam mais visiveis.",
  },
];

const fieldPeriodPaths: Record<MandalaFieldPeriodId, MandalaNodeId[][]> = {
  moment: [
    ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS"],
    ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS", "FLUX"],
    ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX"],
  ],
  recent: [
    ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS"],
    ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS", "FLUX"],
    ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX"],
    ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX", "SOLARA"],
    ["FLUX", "SOLARA", "VELTARA", "SYNTRIA", "ASTRAEL"],
  ],
  expanded: [
    ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS"],
    ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS", "FLUX"],
    ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS", "FLUX", "NAVROS"],
    ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX"],
    ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX", "SOLARA"],
    ["FLUX", "SOLARA", "VELTARA", "SYNTRIA", "ASTRAEL"],
    ["FLUX", "SOLARA", "VELTARA", "SYNTRIA", "ASTRAEL", "OKTAVE"],
  ],
};

function createFieldRecord(
  path: MandalaNodeId[],
  periodId: MandalaFieldPeriodId,
  index: number,
): MandalaTrajectoryRecord {
  const timestamp = `2026-03-12T${String((index % 9) + 1).padStart(2, "0")}:00:00Z`;

  return {
    sessionId: `field-${periodId}-${index + 1}`,
    mode: "aggregated_atlas",
    createdAt: timestamp,
    updatedAt: timestamp,
    points: [],
    path: [...path],
  };
}

export const mandalaFieldFlowSource: Record<
  MandalaFieldPeriodId,
  MandalaTrajectoryRecord[]
> = {
  moment: fieldPeriodPaths.moment.map((path, index) => {
    return createFieldRecord(path, "moment", index);
  }),
  recent: fieldPeriodPaths.recent.map((path, index) => {
    return createFieldRecord(path, "recent", index);
  }),
  expanded: fieldPeriodPaths.expanded.map((path, index) => {
    return createFieldRecord(path, "expanded", index);
  }),
};

export function getMandalaFieldPeriodById(
  periodId: MandalaFieldPeriodId,
): MandalaFieldPeriod {
  const matchedPeriod = mandalaFieldPeriods.find((period) => period.id === periodId);
  const fallbackPeriod = mandalaFieldPeriods[0];

  if (matchedPeriod) {
    return matchedPeriod;
  }

  if (fallbackPeriod) {
    return fallbackPeriod;
  }

  return {
    id: "recent",
    label: "7 dias",
    description: "Movimentos recorrentes do campo recente.",
    climateCopy:
      "Nos ultimos 7 dias, o campo tem se movido entre percepcao e reorganizacao antes da acao.",
  };
}

export function getMandalaFieldRecords(
  periodId: MandalaFieldPeriodId,
): MandalaTrajectoryRecord[] {
  return mandalaFieldFlowSource[periodId] ?? [];
}

export function getMandalaFieldFlows(
  periodId: MandalaFieldPeriodId,
): MandalaCollectiveFlow[] {
  return buildCollectiveFlows(getMandalaFieldRecords(periodId));
}

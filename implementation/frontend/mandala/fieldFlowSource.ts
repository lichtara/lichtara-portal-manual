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
    label: "Campo do momento",
    description: "Correntes mais proximas do instante atual.",
    climateCopy:
      "O campo se aproxima do reconhecimento imediato e de pequenos ajustes de presenca.",
  },
  {
    id: "recent",
    label: "Campo recente",
    description: "Movimentos recorrentes dos ultimos ciclos.",
    climateCopy:
      "O campo recente inclina a mandala para reorganizacao, passagem e coerencia antes do impulso.",
  },
  {
    id: "expanded",
    label: "Campo ampliado",
    description: "Leitura mais longa das correntes da mandala.",
    climateCopy:
      "O campo ampliado revela ciclos mais lentos de integracao, retorno e amadurecimento do movimento.",
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
    label: "Campo recente",
    description: "Movimentos recorrentes dos ultimos ciclos.",
    climateCopy:
      "O campo recente inclina a mandala para reorganizacao, passagem e coerencia antes do impulso.",
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

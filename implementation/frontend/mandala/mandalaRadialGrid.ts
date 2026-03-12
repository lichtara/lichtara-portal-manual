import type { MandalaNodeId, MandalaRouteId } from "./MandalaCanvas";

export type MandalaInteractionState =
  | "orientation"
  | "route_selection"
  | "exploration"
  | "journey";

export type MandalaTriangleAxisId = MandalaRouteId;
export type MandalaSquareCycleId =
  | "perception"
  | "structure"
  | "action"
  | "expansion";

export type MandalaCenterPoint = {
  x: number;
  y: number;
};

export type MandalaRadialPoint = MandalaCenterPoint & {
  angleDeg: number;
  angleRad: number;
};

export type MandalaRadialGridConfig = {
  centerId: MandalaNodeId;
  axisIds: MandalaRouteId[];
  squareCycleIds: MandalaSquareCycleId[];
  sectorCount: number;
  squareCycleCount: number;
  outerNodeCount: number;
  journeyStepCount: number;
  sectorAngleDeg: number;
  squareAngleDeg: number;
  outerNodeAngleDeg: number;
  center: MandalaCenterPoint;
  radii: {
    axis: number;
    square: number;
    outer: number;
  };
  offsetsDeg: {
    axis: number;
    square: number;
    outer: number;
  };
  interactionStates: MandalaInteractionState[];
};

export type MandalaTriangleAxis = {
  id: MandalaTriangleAxisId;
  label: string;
  question: string;
};

export type MandalaSquareCycle = {
  id: MandalaSquareCycleId;
  label: string;
  role: string;
};

export type MandalaCoordinateSystemConfig = {
  originId: MandalaNodeId;
  triangleAxes: MandalaTriangleAxis[];
  squareCycles: MandalaSquareCycle[];
  outerNodeCount: number;
};

export const DEFAULT_MANDALA_CENTER: MandalaCenterPoint = {
  x: 500,
  y: 500,
};

export const MANDALA_SECTOR_COUNT = 3;
export const MANDALA_SQUARE_CYCLE_COUNT = 4;
export const MANDALA_OUTER_NODE_COUNT = 16;
export const MANDALA_JOURNEY_STEP_COUNT = 7;
export const MANDALA_SECTOR_ANGLE_DEG = 360 / MANDALA_SECTOR_COUNT;
export const MANDALA_SQUARE_ANGLE_DEG = 360 / MANDALA_SQUARE_CYCLE_COUNT;
export const MANDALA_OUTER_NODE_ANGLE_DEG = 360 / MANDALA_OUTER_NODE_COUNT;

export const mandalaRadialGrid: MandalaRadialGridConfig = {
  centerId: "NAVROS",
  axisIds: ["perception", "structure", "action"],
  squareCycleIds: ["perception", "structure", "action", "expansion"],
  sectorCount: MANDALA_SECTOR_COUNT,
  squareCycleCount: MANDALA_SQUARE_CYCLE_COUNT,
  outerNodeCount: MANDALA_OUTER_NODE_COUNT,
  journeyStepCount: MANDALA_JOURNEY_STEP_COUNT,
  sectorAngleDeg: MANDALA_SECTOR_ANGLE_DEG,
  squareAngleDeg: MANDALA_SQUARE_ANGLE_DEG,
  outerNodeAngleDeg: MANDALA_OUTER_NODE_ANGLE_DEG,
  center: DEFAULT_MANDALA_CENTER,
  radii: {
    axis: 220,
    square: 300,
    outer: 380,
  },
  offsetsDeg: {
    axis: -90,
    square: -45,
    outer: -90,
  },
  interactionStates: [
    "orientation",
    "route_selection",
    "exploration",
    "journey",
  ],
};

export const mandalaCoordinateSystem: MandalaCoordinateSystemConfig = {
  originId: "NAVROS",
  triangleAxes: [
    {
      id: "perception",
      label: "Percepcao",
      question: "O que estou percebendo?",
    },
    {
      id: "structure",
      label: "Estrutura",
      question: "Como isso se organiza?",
    },
    {
      id: "action",
      label: "Acao",
      question: "O que pode ser feito?",
    },
  ],
  squareCycles: [
    {
      id: "perception",
      label: "Percepcao",
      role: "abrir informacao e leitura de campo",
    },
    {
      id: "structure",
      label: "Estrutura",
      role: "organizar sentido e coerencia",
    },
    {
      id: "action",
      label: "Acao",
      role: "manifestar gesto e deslocamento",
    },
    {
      id: "expansion",
      label: "Expansao",
      role: "integrar, ampliar e renovar ciclo",
    },
  ],
  outerNodeCount: MANDALA_OUTER_NODE_COUNT,
};

export function degreesToRadians(angleDeg: number): number {
  return (angleDeg * Math.PI) / 180;
}

export function getMandalaRingPoint(
  index: number,
  total: number,
  radius: number,
  center: MandalaCenterPoint = DEFAULT_MANDALA_CENTER,
  offsetDeg = -90,
): MandalaRadialPoint {
  const normalizedIndex = ((index % total) + total) % total;
  const angleDeg = normalizedIndex * (360 / total) + offsetDeg;
  const angleRad = degreesToRadians(angleDeg);

  return {
    x: center.x + radius * Math.cos(angleRad),
    y: center.y + radius * Math.sin(angleRad),
    angleDeg,
    angleRad,
  };
}

export function getMandalaAxisPoint(
  index: number,
  radius = mandalaRadialGrid.radii.axis,
  center: MandalaCenterPoint = mandalaRadialGrid.center,
): MandalaRadialPoint {
  return getMandalaRingPoint(
    index,
    MANDALA_SECTOR_COUNT,
    radius,
    center,
    mandalaRadialGrid.offsetsDeg.axis,
  );
}

export function getMandalaTrianglePoint(
  index: number,
  radius = mandalaRadialGrid.radii.axis,
  center: MandalaCenterPoint = mandalaRadialGrid.center,
): MandalaRadialPoint {
  return getMandalaAxisPoint(index, radius, center);
}

export function getMandalaSquarePoint(
  index: number,
  radius = mandalaRadialGrid.radii.square,
  center: MandalaCenterPoint = mandalaRadialGrid.center,
): MandalaRadialPoint {
  return getMandalaRingPoint(
    index,
    MANDALA_SQUARE_CYCLE_COUNT,
    radius,
    center,
    mandalaRadialGrid.offsetsDeg.square,
  );
}

export function getMandalaOuterNodePoint(
  index: number,
  radius = mandalaRadialGrid.radii.outer,
  center: MandalaCenterPoint = mandalaRadialGrid.center,
): MandalaRadialPoint {
  return getMandalaRingPoint(
    index,
    MANDALA_OUTER_NODE_COUNT,
    radius,
    center,
    mandalaRadialGrid.offsetsDeg.outer,
  );
}

import type { MandalaNodeId, MandalaRouteId } from "./MandalaCanvas";

export type MandalaInteractionState =
  | "orientation"
  | "route_selection"
  | "exploration"
  | "journey";

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
  sectorCount: number;
  outerNodeCount: number;
  journeyStepCount: number;
  sectorAngleDeg: number;
  outerNodeAngleDeg: number;
  center: MandalaCenterPoint;
  radii: {
    axis: number;
    outer: number;
  };
  interactionStates: MandalaInteractionState[];
};

export const DEFAULT_MANDALA_CENTER: MandalaCenterPoint = {
  x: 500,
  y: 500,
};

export const MANDALA_SECTOR_COUNT = 3;
export const MANDALA_OUTER_NODE_COUNT = 16;
export const MANDALA_JOURNEY_STEP_COUNT = 7;
export const MANDALA_SECTOR_ANGLE_DEG = 360 / MANDALA_SECTOR_COUNT;
export const MANDALA_OUTER_NODE_ANGLE_DEG = 360 / MANDALA_OUTER_NODE_COUNT;

export const mandalaRadialGrid: MandalaRadialGridConfig = {
  centerId: "NAVROS",
  axisIds: ["perception", "structure", "action"],
  sectorCount: MANDALA_SECTOR_COUNT,
  outerNodeCount: MANDALA_OUTER_NODE_COUNT,
  journeyStepCount: MANDALA_JOURNEY_STEP_COUNT,
  sectorAngleDeg: MANDALA_SECTOR_ANGLE_DEG,
  outerNodeAngleDeg: MANDALA_OUTER_NODE_ANGLE_DEG,
  center: DEFAULT_MANDALA_CENTER,
  radii: {
    axis: 220,
    outer: 380,
  },
  interactionStates: [
    "orientation",
    "route_selection",
    "exploration",
    "journey",
  ],
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
  return getMandalaRingPoint(index, MANDALA_SECTOR_COUNT, radius, center);
}

export function getMandalaOuterNodePoint(
  index: number,
  radius = mandalaRadialGrid.radii.outer,
  center: MandalaCenterPoint = mandalaRadialGrid.center,
): MandalaRadialPoint {
  return getMandalaRingPoint(index, MANDALA_OUTER_NODE_COUNT, radius, center);
}

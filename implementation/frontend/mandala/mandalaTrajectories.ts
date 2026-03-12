import type { MandalaNodeId } from "./MandalaCanvas";
import {
  getSafeMandalaJourney,
  getSafeMandalaJourneyStep,
  normalizeMandalaJourneyProgress,
  type MandalaJourney,
  type MandalaJourneyId,
  type MandalaJourneyProgress,
  type MandalaJourneyStep,
} from "./mandalaJourneys";

export type MandalaTrajectoryStorageMode =
  | "local_only"
  | "ephemeral_session"
  | "aggregated_atlas";

export type MandalaTrajectoryPoint = {
  journeyId: MandalaJourneyId;
  stepIndex: number;
  stepId: string;
  nodeId: MandalaNodeId;
  stage: MandalaJourneyStep["stage"];
  recordedAt: string;
};

export type MandalaTrajectoryRecord = {
  sessionId: string;
  mode: MandalaTrajectoryStorageMode;
  createdAt: string;
  updatedAt: string;
  points: MandalaTrajectoryPoint[];
  path: MandalaNodeId[];
};

export type MandalaCollectiveFlow = {
  flowId: string;
  fromNodeId: MandalaNodeId;
  toNodeId: MandalaNodeId;
  count: number;
};

export type MandalaTrajectorySnapshot = {
  journeyId: MandalaJourneyId;
  startNodeId: MandalaNodeId;
  endNodeId: MandalaNodeId;
  path: MandalaNodeId[];
  points: MandalaTrajectoryPoint[];
};

export const MANDALA_TRAJECTORY_STORAGE_KEY = "lichtara-mandala-trajectory";

export function createEphemeralTrajectorySessionId(): string {
  const uuid = globalThis.crypto?.randomUUID?.();

  if (uuid) {
    return `traj-${uuid}`;
  }

  return `traj-${Math.random().toString(36).slice(2, 12)}`;
}

export function createTrajectoryRecord(
  mode: MandalaTrajectoryStorageMode = "local_only",
  now = new Date().toISOString(),
): MandalaTrajectoryRecord {
  return {
    sessionId: createEphemeralTrajectorySessionId(),
    mode,
    createdAt: now,
    updatedAt: now,
    points: [],
    path: [],
  };
}

export function createTrajectoryPoint(
  journey: MandalaJourney,
  stepIndex: number,
  recordedAt = new Date().toISOString(),
): MandalaTrajectoryPoint {
  const step = getSafeMandalaJourneyStep(journey, stepIndex);

  return {
    journeyId: journey.id,
    stepIndex,
    stepId: step.id,
    nodeId: step.nodeId,
    stage: step.stage,
    recordedAt,
  };
}

export function appendTrajectoryPoint(
  record: MandalaTrajectoryRecord,
  point: MandalaTrajectoryPoint,
): MandalaTrajectoryRecord {
  const lastPoint = record.points[record.points.length - 1];
  const isDuplicate =
    lastPoint?.journeyId === point.journeyId &&
    lastPoint?.stepId === point.stepId &&
    lastPoint?.nodeId === point.nodeId;

  if (isDuplicate) {
    return record;
  }

  return {
    ...record,
    updatedAt: point.recordedAt,
    points: [...record.points, point],
    path: [...record.path, point.nodeId],
  };
}

export function recordJourneyProgress(
  record: MandalaTrajectoryRecord,
  journeys: MandalaJourney[],
  progress: MandalaJourneyProgress,
  recordedAt = new Date().toISOString(),
): MandalaTrajectoryRecord {
  const safeProgress = normalizeMandalaJourneyProgress(journeys, progress);
  const journey = getSafeMandalaJourney(journeys, safeProgress.journeyId);
  const point = createTrajectoryPoint(journey, safeProgress.stepIndex, recordedAt);

  return appendTrajectoryPoint(record, point);
}

export function buildTrajectorySnapshot(
  record: MandalaTrajectoryRecord,
): MandalaTrajectorySnapshot | null {
  const firstPoint = record.points[0];
  const lastPoint = record.points[record.points.length - 1];

  if (!firstPoint || !lastPoint) {
    return null;
  }

  return {
    journeyId: firstPoint.journeyId,
    startNodeId: firstPoint.nodeId,
    endNodeId: lastPoint.nodeId,
    path: [...record.path],
    points: [...record.points],
  };
}

export function buildCollectiveFlows(
  records: MandalaTrajectoryRecord[],
): MandalaCollectiveFlow[] {
  const counts = new Map<string, MandalaCollectiveFlow>();

  for (const record of records) {
    for (let index = 0; index < record.path.length - 1; index += 1) {
      const fromNodeId = record.path[index];
      const toNodeId = record.path[index + 1];

      if (!fromNodeId || !toNodeId) {
        continue;
      }

      const flowId = `${fromNodeId}->${toNodeId}`;
      const existing = counts.get(flowId);

      if (existing) {
        existing.count += 1;
        continue;
      }

      counts.set(flowId, {
        flowId,
        fromNodeId,
        toNodeId,
        count: 1,
      });
    }
  }

  return Array.from(counts.values()).sort((left, right) => {
    return right.count - left.count;
  });
}

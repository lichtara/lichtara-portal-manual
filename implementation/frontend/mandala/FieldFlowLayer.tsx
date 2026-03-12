import * as React from "react";

import type { MandalaNode } from "./MandalaCanvas";
import type { MandalaCollectiveFlow } from "./mandalaTrajectories";

export type FieldFlowLayerProps = {
  flows?: MandalaCollectiveFlow[];
  nodeMap: Record<string, MandalaNode>;
  maxFlows?: number;
  center?: { x: number; y: number };
  transitionDurationMs?: number;
};

function getCollectiveFlowPath(
  fromNode: MandalaNode,
  toNode: MandalaNode,
  center: { x: number; y: number },
): string {
  const midX = (fromNode.x + toNode.x) / 2;
  const midY = (fromNode.y + toNode.y) / 2;
  const deltaX = toNode.x - fromNode.x;
  const deltaY = toNode.y - fromNode.y;
  const segmentLength = Math.hypot(deltaX, deltaY) || 1;
  const radialX = midX - center.x;
  const radialY = midY - center.y;
  const radialLength = Math.hypot(radialX, radialY);
  const fallbackX = -deltaY / segmentLength;
  const fallbackY = deltaX / segmentLength;
  const directionX = radialLength > 0 ? radialX / radialLength : fallbackX;
  const directionY = radialLength > 0 ? radialY / radialLength : fallbackY;
  const curvature = Math.max(36, Math.min(96, segmentLength * 0.22));
  const controlX = midX + directionX * curvature;
  const controlY = midY + directionY * curvature;

  return `M ${fromNode.x} ${fromNode.y} Q ${controlX} ${controlY} ${toNode.x} ${toNode.y}`;
}

function getNormalizedStrength(count: number, maxCount: number): number {
  if (maxCount <= 0) {
    return 0;
  }

  return count / maxCount;
}

function getFlowSignature(flows: MandalaCollectiveFlow[]): string {
  return flows
    .map((flow) => `${flow.flowId}:${flow.count}`)
    .join("|");
}

function renderFlowGroup(
  flows: MandalaCollectiveFlow[],
  nodeMap: Record<string, MandalaNode>,
  center: { x: number; y: number },
  opacity: number,
  transitionDurationMs: number,
  keyPrefix: string,
) {
  const maxCollectiveFlowCount = flows[0]?.count ?? 0;

  return (
    <g
      aria-hidden="true"
      className="mandala__collective-flows"
      style={{
        opacity,
        transition: `opacity ${transitionDurationMs}ms ease`,
      }}
    >
      {flows.map((flow) => {
        const fromNode = nodeMap[flow.fromNodeId];
        const toNode = nodeMap[flow.toNodeId];

        if (!fromNode || !toNode) {
          return null;
        }

        const normalizedStrength = getNormalizedStrength(
          flow.count,
          maxCollectiveFlowCount,
        );
        const collectivePath = getCollectiveFlowPath(fromNode, toNode, center);
        const glowOpacity = 0.08 + normalizedStrength * 0.2;
        const lineOpacity = 0.14 + normalizedStrength * 0.34;
        const glowWidth = 10 + normalizedStrength * 10;
        const lineWidth = 2 + normalizedStrength * 4;
        const nodeRadius = 2.5 + normalizedStrength * 2.5;

        return (
          <g key={`${keyPrefix}-${flow.flowId}`}>
            <path
              className="mandala__collective-flow-glow"
              d={collectivePath}
              style={{
                opacity: glowOpacity,
                strokeWidth: glowWidth,
              }}
            />
            <path
              className="mandala__collective-flow-line"
              d={collectivePath}
              style={{
                opacity: lineOpacity,
                strokeWidth: lineWidth,
              }}
            />
            <circle
              className="mandala__collective-flow-node"
              cx={fromNode.x}
              cy={fromNode.y}
              r={nodeRadius}
              style={{ opacity: lineOpacity }}
            />
            <circle
              className="mandala__collective-flow-node"
              cx={toNode.x}
              cy={toNode.y}
              r={nodeRadius}
              style={{ opacity: lineOpacity }}
            />
          </g>
        );
      })}
    </g>
  );
}

export function FieldFlowLayer({
  flows = [],
  nodeMap,
  maxFlows = 5,
  center = { x: 500, y: 500 },
  transitionDurationMs = 360,
}: FieldFlowLayerProps) {
  const visibleCollectiveFlows = [...flows]
    .sort((left, right) => right.count - left.count)
    .slice(0, maxFlows);
  const flowSignature = React.useMemo(() => {
    return getFlowSignature(visibleCollectiveFlows);
  }, [visibleCollectiveFlows]);
  const [primaryFlows, setPrimaryFlows] =
    React.useState<MandalaCollectiveFlow[]>(visibleCollectiveFlows);
  const [overlayFlows, setOverlayFlows] =
    React.useState<MandalaCollectiveFlow[] | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);
  const previousSignatureRef = React.useRef(flowSignature);

  React.useEffect(() => {
    if (previousSignatureRef.current === flowSignature) {
      return;
    }

    setOverlayFlows(visibleCollectiveFlows);
    setIsOverlayVisible(false);

    const frameId = window.requestAnimationFrame(() => {
      setIsOverlayVisible(true);
    });
    const timeoutId = window.setTimeout(() => {
      setPrimaryFlows(visibleCollectiveFlows);
      previousSignatureRef.current = flowSignature;
      setOverlayFlows(null);
      setIsOverlayVisible(false);
    }, transitionDurationMs);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [flowSignature, transitionDurationMs, visibleCollectiveFlows]);

  if (primaryFlows.length === 0 && visibleCollectiveFlows.length === 0) {
    return null;
  }

  return (
    <>
      {renderFlowGroup(
        primaryFlows,
        nodeMap,
        center,
        overlayFlows ? 0.18 : 1,
        transitionDurationMs,
        "primary",
      )}

      {overlayFlows
        ? renderFlowGroup(
            overlayFlows,
            nodeMap,
            center,
            isOverlayVisible ? 1 : 0.18,
            transitionDurationMs,
            "overlay",
          )
        : null}
    </>
  );
}

export default FieldFlowLayer;

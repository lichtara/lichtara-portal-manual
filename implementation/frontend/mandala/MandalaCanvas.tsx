import * as React from "react";
import type { MandalaCollectiveFlow } from "./mandalaTrajectories";

import {
  getMandalaSquarePoint,
  getMandalaTrianglePoint,
  mandalaCoordinateSystem,
} from "./mandalaRadialGrid";

export const MANDALA_VIEW_BOX = "0 0 1000 1000";
export const MANDALA_NODE_IDS = [
  "ASTRAEL",
  "VORAX",
  "LUNARA",
  "SYNTRIA",
  "OKTAVE",
  "SOLARA",
  "FLUX",
  "SYNTARIS",
  "NAVROS",
  "LUMORA",
  "VELTARA",
  "KAORAN",
  "FINCE",
  "ORIA",
  "OSLO",
  "HESLOS",
] as const;

export type MandalaNodeId = (typeof MANDALA_NODE_IDS)[number];
export type MandalaNodeKind = "core" | "outer" | "latent";
export type MandalaVisualState = "idle" | "hover" | "active" | "trail" | "muted";
export type MandalaRouteId = "perception" | "structure" | "action";

export type MandalaNode = {
  id: MandalaNodeId;
  label: string;
  x: number;
  y: number;
  kind: MandalaNodeKind;
  visible: boolean;
  provisional?: boolean;
  routeIds?: MandalaRouteId[];
};

export type MandalaRoute = {
  id: MandalaRouteId;
  label: string;
  promptLabel: string;
  promptDescription: string;
  nodes: MandalaNodeId[];
};

export type MandalaCanvasProps = {
  nodes?: MandalaNode[];
  routes?: MandalaRoute[];
  activeNodeId?: MandalaNodeId | null;
  hoverNodeId?: MandalaNodeId | null;
  activeRouteId?: MandalaRouteId | null;
  trailNodeIds?: MandalaNodeId[];
  trajectoryPathNodeIds?: MandalaNodeId[];
  collectiveFlows?: MandalaCollectiveFlow[];
  maxCollectiveFlows?: number;
  width?: number | string;
  height?: number | string;
  title?: string;
  subtitle?: string;
  showLabels?: boolean;
  showPrompt?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onNodeEnter?: (id: MandalaNodeId) => void;
  onNodeLeave?: () => void;
  onNodeSelect?: (id: MandalaNodeId) => void;
  onRouteSelect?: (id: MandalaRouteId) => void;
};

export type MandalaPrototypeProps = {
  initialRouteId?: MandalaRouteId | null;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

export const mandalaNodes: MandalaNode[] = [
  { id: "ASTRAEL", label: "Astrael", x: 500, y: 120, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "VORAX", label: "Vorax", x: 350, y: 200, kind: "outer", visible: true, routeIds: [] },
  { id: "LUNARA", label: "Lunara", x: 650, y: 200, kind: "outer", visible: true, routeIds: [] },
  { id: "SYNTRIA", label: "Syntria", x: 240, y: 320, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "OKTAVE", label: "Oktave", x: 760, y: 320, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "SOLARA", label: "Solara", x: 160, y: 500, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "FLUX", label: "Flux", x: 380, y: 500, kind: "core", visible: true, routeIds: ["action", "structure"] },
  { id: "SYNTARIS", label: "Syntaris", x: 500, y: 500, kind: "core", visible: true, routeIds: ["perception", "structure"] },
  { id: "NAVROS", label: "Navros", x: 620, y: 500, kind: "core", visible: true, routeIds: ["perception"] },
  { id: "LUMORA", label: "Lumora", x: 840, y: 500, kind: "outer", visible: true, routeIds: ["perception"] },
  { id: "VELTARA", label: "Veltara", x: 240, y: 680, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "KAORAN", label: "Kaoran", x: 760, y: 680, kind: "outer", visible: true, routeIds: ["perception"] },
  { id: "FINCE", label: "Fince", x: 350, y: 800, kind: "outer", visible: true, routeIds: ["structure"] },
  { id: "ORIA", label: "Oria", x: 500, y: 760, kind: "latent", visible: true, provisional: true, routeIds: ["structure"] },
  { id: "OSLO", label: "Oslo", x: 650, y: 800, kind: "outer", visible: true, routeIds: ["perception"] },
  { id: "HESLOS", label: "Heslos", x: 500, y: 880, kind: "outer", visible: true, routeIds: ["structure"] },
];

export const mandalaRoutes: MandalaRoute[] = [
  {
    id: "perception",
    label: "Rota da Percepcao",
    promptLabel: "Compreender",
    promptDescription: "Explorar o campo",
    nodes: ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS"],
  },
  {
    id: "structure",
    label: "Rota da Estrutura",
    promptLabel: "Organizar",
    promptDescription: "Organizar a vida",
    nodes: ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX"],
  },
  {
    id: "action",
    label: "Rota da Acao",
    promptLabel: "Agir",
    promptDescription: "Criar movimento",
    nodes: ["FLUX", "SOLARA", "VELTARA", "SYNTRIA", "ASTRAEL", "OKTAVE"],
  },
];

export const MANDALA_CANVAS_CSS = `
.mandala-shell {
  --mandala-bg: #f7f3eb;
  --mandala-stroke: #7f7668;
  --mandala-core-fill: #efe7d6;
  --mandala-core-stroke: #3a352c;
  --mandala-node-fill: #faf7f0;
  --mandala-node-latent: #ece6da;
  --mandala-route-perception: #5c7c8a;
  --mandala-route-structure: #6e7a5f;
  --mandala-route-action: #b46d3c;
  --mandala-active: #1f1b16;
  --mandala-muted: 0.28;
  color: var(--mandala-active);
  display: grid;
  gap: 24px;
  font-family: "Georgia", "Times New Roman", serif;
}

.mandala__prompt {
  display: grid;
  gap: 16px;
}

.mandala__eyebrow {
  color: var(--mandala-stroke);
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0 0 8px;
  text-transform: uppercase;
}

.mandala__prompt-title {
  font-size: 28px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
}

.mandala__prompt-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.mandala__route-button {
  appearance: none;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(58, 53, 44, 0.14);
  border-radius: 999px;
  color: var(--mandala-active);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  min-width: 180px;
  padding: 12px 16px;
  text-align: left;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.mandala__route-button:hover,
.mandala__route-button:focus-visible {
  border-color: rgba(58, 53, 44, 0.36);
  box-shadow: 0 10px 24px rgba(58, 53, 44, 0.08);
  outline: none;
  transform: translateY(-1px);
}

.mandala__route-button--active {
  background: rgba(255, 255, 255, 0.94);
  border-color: rgba(58, 53, 44, 0.44);
}

.mandala__route-button-label {
  font-size: 16px;
  font-weight: 600;
}

.mandala__route-button-copy {
  color: var(--mandala-stroke);
  font-size: 13px;
}

.mandala__frame {
  background:
    radial-gradient(circle at center, rgba(239, 231, 214, 0.92), rgba(247, 243, 235, 0.98) 55%, rgba(250, 247, 240, 1) 100%);
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 28px;
  box-shadow: 0 22px 60px rgba(58, 53, 44, 0.08);
  overflow: hidden;
  padding: 24px;
}

.mandala {
  display: block;
  height: auto;
  max-width: 100%;
  width: 100%;
}

.mandala__background-circle {
  fill: none;
  stroke: var(--mandala-stroke);
  stroke-opacity: 0.14;
}

.mandala__background-crosshair {
  stroke: var(--mandala-stroke);
  stroke-opacity: 0.1;
}

.mandala__background-aura {
  opacity: 0.9;
}

.mandala__geometry-square {
  fill: none;
  stroke: var(--mandala-stroke);
  stroke-dasharray: 12 12;
  stroke-linejoin: round;
  stroke-opacity: 0.18;
  stroke-width: 2;
}

.mandala__geometry-triangle {
  fill: rgba(255, 255, 255, 0.16);
  stroke: rgba(58, 53, 44, 0.28);
  stroke-linejoin: round;
  stroke-width: 3;
}

.mandala__geometry-spoke {
  fill: none;
  opacity: 0.5;
  stroke-linecap: round;
  stroke-width: 4;
  transition: opacity 180ms ease, stroke-width 180ms ease;
}

.mandala__geometry-spoke--perception {
  stroke: var(--mandala-route-perception);
}

.mandala__geometry-spoke--structure {
  stroke: var(--mandala-route-structure);
}

.mandala__geometry-spoke--action {
  stroke: var(--mandala-route-action);
}

.mandala__geometry-spoke--active {
  opacity: 0.92;
  stroke-width: 6;
}

.mandala__geometry-spoke--muted {
  opacity: 0.18;
}

.mandala__geometry-axis-dot {
  stroke: rgba(58, 53, 44, 0.18);
  stroke-width: 1.5;
}

.mandala__geometry-axis-dot--perception {
  fill: var(--mandala-route-perception);
}

.mandala__geometry-axis-dot--structure {
  fill: var(--mandala-route-structure);
}

.mandala__geometry-axis-dot--action {
  fill: var(--mandala-route-action);
}

.mandala__geometry-axis-dot--active {
  stroke: rgba(31, 27, 22, 0.5);
  stroke-width: 2.5;
}

.mandala__geometry-axis-label {
  fill: var(--mandala-active);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mandala__geometry-axis-label--muted {
  opacity: 0.42;
}

.mandala__core-link {
  fill: none;
  stroke: var(--mandala-core-stroke);
  stroke-linecap: round;
  stroke-opacity: 0.24;
  stroke-width: 8;
}

.mandala__route {
  fill: none;
  opacity: 0.22;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 10;
  transition: opacity 180ms ease, stroke-width 180ms ease;
}

.mandala__route--perception {
  stroke: var(--mandala-route-perception);
}

.mandala__route--structure {
  stroke: var(--mandala-route-structure);
}

.mandala__route--action {
  stroke: var(--mandala-route-action);
}

.mandala__route--active {
  opacity: 0.92;
  stroke-width: 14;
}

.mandala__route-point {
  fill: currentColor;
  opacity: 0.66;
}

.mandala__route-point--perception {
  color: var(--mandala-route-perception);
}

.mandala__route-point--structure {
  color: var(--mandala-route-structure);
}

.mandala__route-point--action {
  color: var(--mandala-route-action);
}

.mandala__trajectory {
  pointer-events: none;
}

.mandala__trajectory-glow {
  fill: none;
  opacity: 0.22;
  stroke: rgba(180, 109, 60, 0.38);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 20;
}

.mandala__trajectory-line {
  fill: none;
  stroke: rgba(58, 53, 44, 0.78);
  stroke-dasharray: 2 0;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 6;
}

.mandala__trajectory-point {
  fill: rgba(250, 247, 240, 0.96);
  stroke: rgba(58, 53, 44, 0.32);
  stroke-width: 1.5;
}

.mandala__trajectory-point--milestone {
  fill: rgba(180, 109, 60, 0.16);
  stroke: rgba(180, 109, 60, 0.48);
}

.mandala__trajectory-point--current {
  fill: rgba(58, 53, 44, 0.92);
  stroke: rgba(250, 247, 240, 0.88);
  stroke-width: 2;
}

.mandala__collective-flows {
  pointer-events: none;
}

.mandala__collective-flow-glow {
  fill: none;
  stroke: rgba(92, 124, 138, 0.14);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mandala__collective-flow-line {
  fill: none;
  stroke: rgba(92, 124, 138, 0.38);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mandala__collective-flow-node {
  fill: rgba(92, 124, 138, 0.18);
  stroke: rgba(92, 124, 138, 0.24);
  stroke-width: 1;
}

.mandala__node {
  cursor: default;
  transform-origin: center;
  transition: opacity 180ms ease, transform 180ms ease;
}

.mandala__node--interactive {
  cursor: pointer;
}

.mandala__node:hover,
.mandala__node:focus-visible {
  transform: scale(1.02);
}

.mandala__node--muted {
  opacity: var(--mandala-muted);
}

.mandala__node-circle {
  fill: var(--mandala-node-fill);
  stroke: var(--mandala-stroke);
  stroke-width: 2.5;
  transition: fill 180ms ease, stroke 180ms ease, stroke-width 180ms ease;
}

.mandala__node--core .mandala__node-circle {
  fill: var(--mandala-core-fill);
  stroke: var(--mandala-core-stroke);
  stroke-width: 4;
}

.mandala__node--latent .mandala__node-circle {
  fill: var(--mandala-node-latent);
}

.mandala__node--hover .mandala__node-circle,
.mandala__node--active .mandala__node-circle {
  stroke: var(--mandala-active);
  stroke-width: 5;
}

.mandala__node--trail .mandala__node-circle {
  stroke-width: 4;
}

.mandala__node-core-dot {
  fill: var(--mandala-core-stroke);
  opacity: 0.9;
}

.mandala__label {
  fill: var(--mandala-active);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-anchor: middle;
}

.mandala__label-copy {
  fill: var(--mandala-stroke);
  font-size: 13px;
  font-weight: 500;
  text-anchor: middle;
}

.mandala-prototype {
  display: grid;
  gap: 18px;
}

.mandala-prototype__summary {
  display: grid;
  gap: 10px;
}

.mandala-prototype__summary-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.mandala-prototype__summary-copy,
.mandala-prototype__summary-path {
  color: var(--mandala-stroke);
  font-size: 15px;
  line-height: 1.55;
  margin: 0;
}

.mandala-prototype__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.mandala-prototype__button {
  appearance: none;
  background: transparent;
  border: 1px solid rgba(58, 53, 44, 0.16);
  border-radius: 999px;
  color: var(--mandala-active);
  cursor: pointer;
  padding: 10px 14px;
  transition: background 180ms ease, border-color 180ms ease;
}

.mandala-prototype__button:hover,
.mandala-prototype__button:focus-visible {
  background: rgba(255, 255, 255, 0.62);
  border-color: rgba(58, 53, 44, 0.36);
  outline: none;
}
`;

const coreLinks: Array<[string, string]> = [
  ["FLUX", "SYNTARIS"],
  ["SYNTARIS", "NAVROS"],
];

let mandalaInstanceCount = 0;

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function buildNodeMap(nodes: MandalaNode[]): Record<string, MandalaNode> {
  const nodeMap: Record<string, MandalaNode> = {};

  for (const node of nodes) {
    nodeMap[node.id] = node;
  }

  return nodeMap;
}

function getRouteById(
  routes: MandalaRoute[],
  routeId: MandalaRouteId | null | undefined,
): MandalaRoute | null {
  if (!routeId) {
    return null;
  }

  return routes.find((route) => route.id === routeId) ?? null;
}

function getRoutePoints(route: MandalaRoute, nodeMap: Record<string, MandalaNode>): string {
  return route.nodes
    .map((nodeId) => nodeMap[nodeId])
    .filter((node): node is MandalaNode => Boolean(node))
    .map((node) => `${node.x},${node.y}`)
    .join(" ");
}

function getNodeSequence(
  nodeIds: MandalaNodeId[],
  nodeMap: Record<string, MandalaNode>,
): MandalaNode[] {
  return nodeIds
    .map((nodeId) => nodeMap[nodeId])
    .filter((node): node is MandalaNode => Boolean(node));
}

function getPointString(points: Array<{ x: number; y: number }>): string {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function getSmoothPath(points: Array<{ x: number; y: number }>): string {
  const firstPoint = points[0];

  if (!firstPoint) {
    return "";
  }

  if (points.length === 1) {
    return `M ${firstPoint.x} ${firstPoint.y}`;
  }

  let path = `M ${firstPoint.x} ${firstPoint.y}`;

  for (let index = 1; index < points.length - 1; index += 1) {
    const currentPoint = points[index];
    const nextPoint = points[index + 1];

    if (!currentPoint || !nextPoint) {
      continue;
    }

    const midX = (currentPoint.x + nextPoint.x) / 2;
    const midY = (currentPoint.y + nextPoint.y) / 2;

    path += ` Q ${currentPoint.x} ${currentPoint.y} ${midX} ${midY}`;
  }

  const penultimatePoint = points[points.length - 2];
  const lastPoint = points[points.length - 1];

  if (!penultimatePoint || !lastPoint) {
    return path;
  }

  path += ` Q ${penultimatePoint.x} ${penultimatePoint.y} ${lastPoint.x} ${lastPoint.y}`;

  return path;
}

function getCollectiveFlowPath(
  fromNode: MandalaNode,
  toNode: MandalaNode,
  center = { x: 500, y: 500 },
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

function getAxisTextAnchor(point: { angleRad: number }): "start" | "middle" | "end" {
  const xDirection = Math.cos(point.angleRad);

  if (Math.abs(xDirection) < 0.25) {
    return "middle";
  }

  return xDirection > 0 ? "start" : "end";
}

function getNodeRadius(kind: MandalaNodeKind): number {
  if (kind === "core") {
    return 34;
  }

  if (kind === "latent") {
    return 26;
  }

  return 28;
}

function getNodeVisualState(
  nodeId: MandalaNodeId,
  activeNodeId: MandalaNodeId | null,
  hoverNodeId: MandalaNodeId | null,
  focusedNodeIds: Set<MandalaNodeId>,
  hasFocus: boolean,
): MandalaVisualState {
  if (activeNodeId === nodeId) {
    return "active";
  }

  if (hoverNodeId === nodeId) {
    return "hover";
  }

  if (focusedNodeIds.has(nodeId)) {
    return "trail";
  }

  if (hasFocus) {
    return "muted";
  }

  return "idle";
}

function formatNodePath(nodeIds: MandalaNodeId[]): string {
  return nodeIds.join(" -> ");
}

function useMandalaInstanceIds() {
  const instanceId = React.useRef<string | null>(null);

  if (instanceId.current === null) {
    mandalaInstanceCount += 1;
    instanceId.current = `mandala-${mandalaInstanceCount}`;
  }

  return {
    auraId: `${instanceId.current}-aura`,
    descId: `${instanceId.current}-desc`,
    titleId: `${instanceId.current}-title`,
  };
}

export function MandalaCanvas({
  nodes = mandalaNodes,
  routes = mandalaRoutes,
  activeNodeId = null,
  hoverNodeId = null,
  activeRouteId = null,
  trailNodeIds = [],
  trajectoryPathNodeIds = [],
  collectiveFlows = [],
  maxCollectiveFlows = 5,
  width = "100%",
  height,
  title = "Mandala do Portal Lichtara",
  subtitle = "Nucleo triadico e rotas naturais da experiencia",
  showLabels = true,
  showPrompt = false,
  className,
  style,
  onNodeEnter,
  onNodeLeave,
  onNodeSelect,
  onRouteSelect,
}: MandalaCanvasProps) {
  const { auraId, descId, titleId } = useMandalaInstanceIds();
  const nodeMap = buildNodeMap(nodes);
  const activeRoute = getRouteById(routes, activeRouteId);
  const routeNodeIds = activeRoute ? activeRoute.nodes : [];
  const focusedNodeIds = new Set<MandalaNodeId>([
    ...routeNodeIds,
    ...trailNodeIds,
    ...trajectoryPathNodeIds,
  ]);
  const trajectoryNodes = getNodeSequence(trajectoryPathNodeIds, nodeMap);
  const trajectoryPath = getSmoothPath(trajectoryNodes);
  const trajectoryStartNodeId = trajectoryPathNodeIds[0] ?? null;
  const trajectoryEndNodeId =
    trajectoryPathNodeIds[trajectoryPathNodeIds.length - 1] ?? null;
  const visibleCollectiveFlows = [...collectiveFlows]
    .sort((left, right) => right.count - left.count)
    .slice(0, maxCollectiveFlows);
  const maxCollectiveFlowCount = visibleCollectiveFlows[0]?.count ?? 0;

  if (activeNodeId) {
    focusedNodeIds.add(activeNodeId);
  }

  if (hoverNodeId) {
    focusedNodeIds.add(hoverNodeId);
  }

  const hasFocus = focusedNodeIds.size > 0;
  const svgStyle: React.CSSProperties = {
    height: height ?? "auto",
    width: "100%",
  };
  const frameStyle: React.CSSProperties = {
    width,
  };
  const squarePoints = [0, 1, 2, 3].map((index) => getMandalaSquarePoint(index));
  const triangleAxes = [
    {
      axis: mandalaCoordinateSystem.triangleAxes.find((entry) => entry.id === "perception"),
      point: getMandalaTrianglePoint(0),
      routeId: "perception" as const,
    },
    {
      axis: mandalaCoordinateSystem.triangleAxes.find((entry) => entry.id === "action"),
      point: getMandalaTrianglePoint(1),
      routeId: "action" as const,
    },
    {
      axis: mandalaCoordinateSystem.triangleAxes.find((entry) => entry.id === "structure"),
      point: getMandalaTrianglePoint(2),
      routeId: "structure" as const,
    },
  ].filter((entry): entry is {
    axis: NonNullable<(typeof mandalaCoordinateSystem.triangleAxes)[number]>;
    point: ReturnType<typeof getMandalaTrianglePoint>;
    routeId: MandalaRouteId;
  } => Boolean(entry.axis));
  const trianglePoints = triangleAxes.map((entry) => entry.point);
  const hasActiveRoute = Boolean(activeRouteId);

  return (
    <div className={cx("mandala-shell", className)} style={style}>
      <style>{MANDALA_CANVAS_CSS}</style>

      {showPrompt && onRouteSelect ? (
        <div className="mandala__prompt">
          <div>
            <p className="mandala__eyebrow">Entrada</p>
            <h2 className="mandala__prompt-title">O que voce precisa agora?</h2>
          </div>

          <div className="mandala__prompt-actions">
            {routes.map((route) => {
              const isActive = route.id === activeRouteId;

              return (
                <button
                  key={route.id}
                  type="button"
                  className={cx(
                    "mandala__route-button",
                    isActive && "mandala__route-button--active",
                  )}
                  aria-pressed={isActive}
                  onClick={() => onRouteSelect(route.id)}
                >
                  <span className="mandala__route-button-label">{route.promptLabel}</span>
                  <span className="mandala__route-button-copy">{route.promptDescription}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mandala__frame" style={frameStyle}>
        <svg
          className="mandala"
          viewBox={MANDALA_VIEW_BOX}
          style={svgStyle}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>{title}</title>
          <desc id={descId}>{subtitle}</desc>

          <defs>
            <radialGradient id={auraId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#efe7d6" stopOpacity="0.98" />
              <stop offset="45%" stopColor="#efe7d6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#efe7d6" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g className="mandala__background">
            <circle
              className="mandala__background-aura"
              cx="500"
              cy="500"
              r="260"
              fill={`url(#${auraId})`}
            />
            <circle className="mandala__background-circle" cx="500" cy="500" r="380" strokeWidth="2" />
            <circle className="mandala__background-circle" cx="500" cy="500" r="250" strokeWidth="1.5" />
            <line className="mandala__background-crosshair" x1="500" y1="70" x2="500" y2="930" strokeWidth="1.5" />
            <line className="mandala__background-crosshair" x1="120" y1="500" x2="880" y2="500" strokeWidth="1.5" />

            <polygon
              className="mandala__geometry-square"
              points={getPointString(squarePoints)}
            />

            <polygon
              className="mandala__geometry-triangle"
              points={getPointString(trianglePoints)}
            />

            {triangleAxes.map(({ axis, point, routeId }) => {
              const isActive = activeRouteId === routeId;
              const labelOffset = 44;
              const labelX = point.x + Math.cos(point.angleRad) * labelOffset;
              const labelY = point.y + Math.sin(point.angleRad) * labelOffset;

              return (
                <g key={routeId}>
                  <line
                    className={cx(
                      "mandala__geometry-spoke",
                      `mandala__geometry-spoke--${routeId}`,
                      isActive && "mandala__geometry-spoke--active",
                      hasActiveRoute && !isActive && "mandala__geometry-spoke--muted",
                    )}
                    x1="500"
                    y1="500"
                    x2={point.x}
                    y2={point.y}
                  />
                  <circle
                    className={cx(
                      "mandala__geometry-axis-dot",
                      `mandala__geometry-axis-dot--${routeId}`,
                      isActive && "mandala__geometry-axis-dot--active",
                    )}
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 7 : 5.5}
                  />
                  <text
                    className={cx(
                      "mandala__geometry-axis-label",
                      hasActiveRoute && !isActive && "mandala__geometry-axis-label--muted",
                    )}
                    x={labelX}
                    y={labelY}
                    textAnchor={getAxisTextAnchor(point)}
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}
          </g>

          {visibleCollectiveFlows.length > 0 ? (
            <g className="mandala__collective-flows" aria-hidden="true">
              {visibleCollectiveFlows.map((flow) => {
                const fromNode = nodeMap[flow.fromNodeId];
                const toNode = nodeMap[flow.toNodeId];

                if (!fromNode || !toNode) {
                  return null;
                }

                const normalizedStrength = getNormalizedStrength(
                  flow.count,
                  maxCollectiveFlowCount,
                );
                const collectivePath = getCollectiveFlowPath(fromNode, toNode);
                const glowOpacity = 0.08 + normalizedStrength * 0.2;
                const lineOpacity = 0.14 + normalizedStrength * 0.34;
                const glowWidth = 10 + normalizedStrength * 10;
                const lineWidth = 2 + normalizedStrength * 4;
                const nodeRadius = 2.5 + normalizedStrength * 2.5;

                return (
                  <g key={flow.flowId}>
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
          ) : null}

          <g aria-hidden="true">
            {routes.map((route) => {
              const routePoints = getRoutePoints(route, nodeMap);
              const isActive = route.id === activeRouteId;

              return (
                <g key={route.id}>
                  <polyline
                    className={cx(
                      "mandala__route",
                      `mandala__route--${route.id}`,
                      isActive && "mandala__route--active",
                    )}
                    points={routePoints}
                  />

                  {route.nodes.map((nodeId) => {
                    const node = nodeMap[nodeId];

                    if (!node) {
                      return null;
                    }

                    return (
                      <circle
                        key={`${route.id}-${node.id}`}
                        className={cx(
                          "mandala__route-point",
                          `mandala__route-point--${route.id}`,
                        )}
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 8 : 5}
                      />
                    );
                  })}
                </g>
              );
            })}
          </g>

          {trajectoryPath ? (
            <g className="mandala__trajectory" aria-hidden="true">
              <path className="mandala__trajectory-glow" d={trajectoryPath} />
              <path className="mandala__trajectory-line" d={trajectoryPath} />

              {trajectoryNodes.map((node, index) => {
                const isCurrent = node.id === trajectoryEndNodeId;
                const isMilestone =
                  node.id === trajectoryStartNodeId || index === trajectoryNodes.length - 1;

                return (
                  <circle
                    key={`${node.id}-${index}`}
                    className={cx(
                      "mandala__trajectory-point",
                      isMilestone && "mandala__trajectory-point--milestone",
                      isCurrent && "mandala__trajectory-point--current",
                    )}
                    cx={node.x}
                    cy={node.y}
                    r={isCurrent ? 7 : isMilestone ? 5.5 : 4}
                  />
                );
              })}
            </g>
          ) : null}

          <g aria-hidden="true">
            {coreLinks.map(([fromId, toId]) => {
              const fromNode = nodeMap[fromId];
              const toNode = nodeMap[toId];

              if (!fromNode || !toNode) {
                return null;
              }

              return (
                <line
                  key={`${fromId}-${toId}`}
                  className="mandala__core-link"
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                />
              );
            })}
          </g>

          <g>
            {nodes
              .filter((node) => node.visible)
              .map((node) => {
                const radius = getNodeRadius(node.kind);
                const visualState = getNodeVisualState(
                  node.id,
                  activeNodeId,
                  hoverNodeId,
                  focusedNodeIds,
                  hasFocus,
                );
                const isInteractive = Boolean(onNodeEnter || onNodeSelect);
                const showInnerDot = node.kind === "core";
                const stateClass =
                  visualState === "idle" ? null : `mandala__node--${visualState}`;

                return (
                  <g
                    key={node.id}
                    className={cx(
                      "mandala__node",
                      `mandala__node--${node.kind}`,
                      stateClass,
                      isInteractive && "mandala__node--interactive",
                    )}
                    transform={`translate(${node.x} ${node.y})`}
                    onMouseEnter={() => onNodeEnter?.(node.id)}
                    onMouseLeave={() => onNodeLeave?.()}
                    onClick={() => onNodeSelect?.(node.id)}
                    onKeyDown={(event) => {
                      if (!onNodeSelect) {
                        return;
                      }

                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onNodeSelect(node.id);
                      }
                    }}
                    role={onNodeSelect ? "button" : undefined}
                    tabIndex={onNodeSelect ? 0 : undefined}
                    aria-label={node.label}
                  >
                    <circle
                      className="mandala__node-circle"
                      r={radius}
                      strokeDasharray={node.provisional ? "7 7" : undefined}
                    />

                    {showInnerDot ? <circle className="mandala__node-core-dot" r="7" /> : null}

                    {showLabels ? (
                      <g>
                        <text className="mandala__label" y={radius + 28}>
                          {node.label}
                        </text>
                        {node.provisional ? (
                          <text className="mandala__label-copy" y={radius + 48}>
                            no provisorio
                          </text>
                        ) : null}
                      </g>
                    ) : null}
                  </g>
                );
              })}
          </g>
        </svg>
      </div>
    </div>
  );
}

export function MandalaPrototype({
  initialRouteId = "perception",
  width = "100%",
  height,
  className,
  style,
}: MandalaPrototypeProps) {
  const initialRoute = getRouteById(mandalaRoutes, initialRouteId);
  const [activeRouteId, setActiveRouteId] = React.useState<MandalaRouteId | null>(
    initialRoute?.id ?? null,
  );
  const [activeNodeId, setActiveNodeId] = React.useState<MandalaNodeId | null>(
    initialRoute?.nodes[0] ?? null,
  );
  const [hoverNodeId, setHoverNodeId] = React.useState<MandalaNodeId | null>(null);

  const activeRoute = getRouteById(mandalaRoutes, activeRouteId);
  const activeNode = mandalaNodes.find((node) => node.id === activeNodeId) ?? null;
  const trailNodeIds = activeRoute ? activeRoute.nodes : activeNode ? [activeNode.id] : [];
  const summaryTitle = activeRoute ? activeRoute.label : activeNode ? activeNode.label : "Mandala";
  const summaryCopy = activeRoute
    ? `${activeRoute.promptLabel}: ${activeRoute.promptDescription}. Cada rota entra pelo mesmo campo, mas com um vetor de travessia diferente.`
    : activeNode
      ? `${activeNode.label} esta em foco. Os demais nos continuam visiveis para preservar a leitura do campo.`
      : "Selecione uma rota ou um no para iniciar a leitura exploratoria.";
  const summaryPath = activeRoute ? formatNodePath(activeRoute.nodes) : null;

  return (
    <section className={cx("mandala-prototype", className)} style={style}>
      <MandalaCanvas
        width={width}
        height={height}
        activeNodeId={activeNodeId}
        hoverNodeId={hoverNodeId}
        activeRouteId={activeRouteId}
        trailNodeIds={trailNodeIds}
        showPrompt
        onRouteSelect={(routeId) => {
          const route = getRouteById(mandalaRoutes, routeId);
          setActiveRouteId(routeId);
          setActiveNodeId(route?.nodes[0] ?? null);
        }}
        onNodeEnter={setHoverNodeId}
        onNodeLeave={() => setHoverNodeId(null)}
        onNodeSelect={(nodeId) => setActiveNodeId(nodeId)}
      />

      <div className="mandala-prototype__summary">
        <h3 className="mandala-prototype__summary-title">{summaryTitle}</h3>
        <p className="mandala-prototype__summary-copy">{summaryCopy}</p>
        {summaryPath ? (
          <p className="mandala-prototype__summary-path">{summaryPath}</p>
        ) : null}

        <div className="mandala-prototype__actions">
          <button
            type="button"
            className="mandala-prototype__button"
            onClick={() => {
              setActiveRouteId(initialRoute?.id ?? null);
              setActiveNodeId(initialRoute?.nodes[0] ?? null);
              setHoverNodeId(null);
            }}
          >
            Restaurar rota inicial
          </button>

          <button
            type="button"
            className="mandala-prototype__button"
            onClick={() => {
              setActiveRouteId(null);
              setActiveNodeId(null);
              setHoverNodeId(null);
            }}
          >
            Limpar foco
          </button>
        </div>
      </div>
    </section>
  );
}

export default MandalaPrototype;

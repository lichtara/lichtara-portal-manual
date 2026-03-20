import * as React from "react";

import type { NavrosAgentId } from "./navrosOperationalJourney";
import { journeyCx } from "./journeyUI";

export type MandalaMiniProps = {
  activeAgent: NavrosAgentId;
  trajectory?: NavrosAgentId[];
  agents?: NavrosAgentId[];
  className?: string;
};

const DEFAULT_AGENTS: NavrosAgentId[] = [
  "NAVROS",
  "LUMORA",
  "SYNTARIS",
  "FLUX",
  "VORAX",
];

export function MandalaMini({
  activeAgent,
  trajectory = [],
  agents = DEFAULT_AGENTS,
  className,
}: MandalaMiniProps) {
  return (
    <div className={journeyCx("mandala-mini", className)} aria-hidden="true">
      <div className="mandala-mini__ring" />
      <div className="mandala-mini__core" />

      {agents.map((agent, index) => {
        const angle = (index / agents.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 38;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        const isActive = agent === activeAgent;
        const isPast = trajectory.includes(agent) && !isActive;

        return (
          <div
            key={agent}
            className={journeyCx(
              "mandala-mini__agent",
              isPast && "mandala-mini__agent--past",
              isActive && "mandala-mini__agent--active",
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            <span className="mandala-mini__dot" />
            <span className="mandala-mini__label">{agent}</span>
          </div>
        );
      })}
    </div>
  );
}

export default MandalaMini;

import * as React from "react";

import { journeyCx } from "./journeyUI";
import type {
  MandalaFieldPeriod,
  MandalaFieldPeriodId,
} from "./fieldFlowSource";

export type FieldPeriodSelectorProps = {
  periods?: MandalaFieldPeriod[];
  activePeriodId: MandalaFieldPeriodId;
  climateCopy?: string;
  isTransitioning?: boolean;
  label?: string;
  className?: string;
  onPeriodSelect?: (periodId: MandalaFieldPeriodId) => void;
};

export function FieldPeriodSelector({
  periods = [],
  activePeriodId,
  climateCopy,
  isTransitioning = false,
  label = "Observatorio",
  className,
  onPeriodSelect,
}: FieldPeriodSelectorProps) {
  if (periods.length === 0) {
    return null;
  }

  return (
    <div className={journeyCx("journey-field", className)}>
      <p className="journey-field__label">{label}</p>

      <div className="journey-field__options">
        {periods.map((period) => {
          const isActive = period.id === activePeriodId;

          return (
            <button
              key={period.id}
              type="button"
              className={journeyCx(
                "journey-field__button",
                isActive && "journey-field__button--active",
              )}
              aria-pressed={isActive}
              onClick={() => onPeriodSelect?.(period.id)}
            >
              <span className="journey-field__button-title">{period.label}</span>
              <span className="journey-field__button-copy">
                {period.description}
              </span>
            </button>
          );
        })}
      </div>

      {climateCopy ? (
        <p
          className={journeyCx(
            "journey-field__climate",
            isTransitioning && "journey-field__climate--transitioning",
          )}
        >
          {climateCopy}
        </p>
      ) : null}
    </div>
  );
}

export default FieldPeriodSelector;

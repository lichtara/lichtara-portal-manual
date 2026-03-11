import * as React from "react";

import type { MandalaJourney, MandalaJourneyId } from "./mandalaJourneys";
import { journeyCx } from "./journeyUI";

export type JourneySelectorProps = {
  journeys: MandalaJourney[];
  activeJourneyId: MandalaJourneyId;
  onJourneySelect: (journeyId: MandalaJourneyId) => void;
  className?: string;
};

export function JourneySelector({
  journeys,
  activeJourneyId,
  onJourneySelect,
  className,
}: JourneySelectorProps) {
  return (
    <div className={journeyCx("journey-selector", className)}>
      {journeys.map((journey) => {
        const isActive = journey.id === activeJourneyId;

        return (
          <button
            key={journey.id}
            type="button"
            className={journeyCx(
              "journey-selector__button",
              isActive && "journey-selector__button--active",
            )}
            aria-pressed={isActive}
            onClick={() => onJourneySelect(journey.id)}
          >
            <span className="journey-selector__label">{journey.promptLabel}</span>
            <span className="journey-selector__copy">
              {journey.promptDescription}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default JourneySelector;

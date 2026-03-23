import * as React from "react";

import {
  getSafeMandalaJourneyStep,
  type MandalaJourney,
} from "./mandalaJourneys";
import { journeyCx } from "./journeyUI";

export type JourneyStepperProps = {
  journey: MandalaJourney;
  activeStepIndex: number;
  onStepSelect: (stepIndex: number) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onRestartJourney?: () => void;
  restartLabel?: string;
  className?: string;
};

export function JourneyStepper({
  journey,
  activeStepIndex,
  onNextStep,
  restartLabel = "Comecar novamente",
  className,
}: JourneyStepperProps) {
  const activeStep = getSafeMandalaJourneyStep(journey, activeStepIndex);
  const isLastStep = activeStepIndex === journey.steps.length - 1;
  const hasOptions = Boolean(activeStep.options?.length);
  const flowContent = hasOptions
    ? activeStep.reflectionPrompt
    : activeStep.narrative;

  return (
    <aside className={journeyCx("journey-stepper", "journey-stepper--soft", className)}>
      <div className="journey-stepper__flow">
        <p className="journey-stepper__flow-content">{flowContent}</p>
      </div>

      {hasOptions ? (
        <div className="journey-stepper__options">
          {activeStep.options?.map((option) => (
            <button
              key={option.id}
              type="button"
              className="journey-stepper__option"
              onClick={onNextStep}
            >
              <span className="journey-stepper__option-label">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="journey-stepper__actions">
        {hasOptions ? null : (
          <button
            type="button"
            className={journeyCx(
              "journey-stepper__action",
              "journey-stepper__action--flow",
            )}
            onClick={onNextStep}
          >
            {isLastStep ? restartLabel : "Continuar"}
          </button>
        )}
      </div>
    </aside>
  );
}

export default JourneyStepper;

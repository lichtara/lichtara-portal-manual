import * as React from "react";

import {
  getSafeMandalaJourneyStep,
  type MandalaJourney,
} from "./mandalaJourneys";
import { buildJourneyPath, journeyCx } from "./journeyUI";

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
  onStepSelect,
  onPreviousStep,
  onNextStep,
  onRestartJourney,
  restartLabel = "Comecar novamente",
  className,
}: JourneyStepperProps) {
  const activeStep = getSafeMandalaJourneyStep(journey, activeStepIndex);
  const isLastStep = activeStepIndex === journey.steps.length - 1;
  const pathLabel = buildJourneyPath(journey.path);

  return (
    <aside className={journeyCx("journey-stepper", className)}>
      <div className="journey-stepper__meta">
        <p className="journey-stepper__count">
          Etapa {activeStep.order} de {journey.steps.length}
        </p>
        <h3 className="journey-stepper__title">{activeStep.title}</h3>
        <p className="journey-stepper__agent">
          {activeStep.agentLabel} - {activeStep.experience}
        </p>
      </div>

      <p className="journey-stepper__copy">{activeStep.narrative}</p>
      <p className="journey-stepper__question">
        <strong>Pergunta ativa:</strong> {activeStep.reflectionPrompt}
      </p>
      <p className="journey-stepper__copy">
        <strong>Questao central:</strong> {journey.centralQuestion}
      </p>
      <p className="journey-stepper__path">{pathLabel}</p>

      <ol className="journey-stepper__steps">
        {journey.steps.map((step, index) => {
          const isActive = index === activeStepIndex;
          const isDone = index < activeStepIndex;

          return (
            <li key={step.id}>
              <button
                type="button"
                className={journeyCx(
                  "journey-stepper__step-button",
                  isActive && "journey-stepper__step-button--active",
                  isDone && "journey-stepper__step-button--done",
                )}
                onClick={() => onStepSelect(index)}
              >
                <span className="journey-stepper__step-order">{step.order}</span>
                <span>
                  <span className="journey-stepper__step-label">
                    {step.agentLabel} - {step.title}
                  </span>
                  <br />
                  <span className="journey-stepper__step-experience">
                    {step.experience}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {isLastStep ? (
        <p className="journey-stepper__completion">
          <strong>Fechamento:</strong> {journey.completionCopy}
        </p>
      ) : null}

      {isLastStep && journey.openQuestion ? (
        <p className="journey-stepper__completion">
          <strong>Ponto aberto:</strong> {journey.openQuestion}
        </p>
      ) : null}

      <div className="journey-stepper__actions">
        <button
          type="button"
          className="journey-stepper__action"
          disabled={activeStepIndex === 0}
          onClick={onPreviousStep}
        >
          Etapa anterior
        </button>

        <button
          type="button"
          className="journey-stepper__action"
          onClick={onNextStep}
        >
          {isLastStep ? "Recomecar jornada" : activeStep.ctaLabel}
        </button>

        {onRestartJourney && activeStepIndex > 0 ? (
          <button
            type="button"
            className={journeyCx(
              "journey-stepper__action",
              "journey-stepper__action--quiet",
            )}
            onClick={onRestartJourney}
          >
            {restartLabel}
          </button>
        ) : null}
      </div>
    </aside>
  );
}

export default JourneyStepper;

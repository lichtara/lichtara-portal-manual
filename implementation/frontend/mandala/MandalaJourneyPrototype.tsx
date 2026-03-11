import * as React from "react";

import {
  MandalaCanvas,
  mandalaNodes,
  mandalaRoutes,
  type MandalaNodeId,
} from "./MandalaCanvas";
import {
  getMandalaJourneyById,
  getMandalaJourneyTrail,
  mandalaJourneys,
  type MandalaJourneyId,
} from "./mandalaJourneys";

export type MandalaJourneyPrototypeProps = {
  initialJourneyId?: MandalaJourneyId;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

const MANDALA_JOURNEY_PROTOTYPE_CSS = `
.journey-prototype {
  display: grid;
  gap: 24px;
  font-family: "Georgia", "Times New Roman", serif;
}

.journey-prototype__header {
  display: grid;
  gap: 10px;
}

.journey-prototype__eyebrow {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.journey-prototype__title {
  color: #1f1b16;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.15;
  margin: 0;
}

.journey-prototype__intro {
  color: #7f7668;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 72ch;
}

.journey-prototype__choices {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.journey-prototype__choice {
  appearance: none;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(58, 53, 44, 0.14);
  border-radius: 20px;
  color: #1f1b16;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  max-width: 320px;
  padding: 16px 18px;
  text-align: left;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.journey-prototype__choice:hover,
.journey-prototype__choice:focus-visible {
  border-color: rgba(58, 53, 44, 0.34);
  box-shadow: 0 12px 28px rgba(58, 53, 44, 0.08);
  outline: none;
  transform: translateY(-1px);
}

.journey-prototype__choice--active {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(58, 53, 44, 0.42);
}

.journey-prototype__choice-label {
  font-size: 17px;
  font-weight: 600;
}

.journey-prototype__choice-copy {
  color: #7f7668;
  font-size: 14px;
  line-height: 1.45;
}

.journey-prototype__grid {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
}

.journey-prototype__panel {
  background: linear-gradient(180deg, rgba(250, 247, 240, 0.98), rgba(247, 243, 235, 0.98));
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(58, 53, 44, 0.06);
  display: grid;
  gap: 20px;
  padding: 24px;
}

.journey-prototype__step-meta {
  display: grid;
  gap: 8px;
}

.journey-prototype__step-count {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.12em;
  margin: 0;
  text-transform: uppercase;
}

.journey-prototype__step-title {
  color: #1f1b16;
  font-size: 26px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
}

.journey-prototype__step-agent {
  color: #7f7668;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
}

.journey-prototype__copy,
.journey-prototype__question,
.journey-prototype__completion,
.journey-prototype__path {
  color: #7f7668;
  font-size: 15px;
  line-height: 1.65;
  margin: 0;
}

.journey-prototype__question strong,
.journey-prototype__completion strong {
  color: #1f1b16;
  font-weight: 600;
}

.journey-prototype__steps {
  display: grid;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.journey-prototype__step-button {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 16px;
  color: #1f1b16;
  cursor: pointer;
  display: grid;
  gap: 2px;
  grid-template-columns: 48px minmax(0, 1fr);
  padding: 12px 14px;
  text-align: left;
  transition: background 180ms ease, border-color 180ms ease;
}

.journey-prototype__step-button:hover,
.journey-prototype__step-button:focus-visible {
  background: rgba(255, 255, 255, 0.58);
  border-color: rgba(58, 53, 44, 0.28);
  outline: none;
}

.journey-prototype__step-button--active {
  background: rgba(255, 255, 255, 0.86);
  border-color: rgba(58, 53, 44, 0.42);
}

.journey-prototype__step-button--done {
  border-color: rgba(58, 53, 44, 0.22);
}

.journey-prototype__step-order {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.journey-prototype__step-label {
  font-size: 15px;
  font-weight: 600;
}

.journey-prototype__step-experience {
  color: #7f7668;
  font-size: 13px;
  line-height: 1.4;
}

.journey-prototype__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.journey-prototype__action {
  appearance: none;
  background: transparent;
  border: 1px solid rgba(58, 53, 44, 0.16);
  border-radius: 999px;
  color: #1f1b16;
  cursor: pointer;
  padding: 10px 14px;
  transition: background 180ms ease, border-color 180ms ease;
}

.journey-prototype__action:hover,
.journey-prototype__action:focus-visible {
  background: rgba(255, 255, 255, 0.62);
  border-color: rgba(58, 53, 44, 0.36);
  outline: none;
}

.journey-prototype__action:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

@media (max-width: 980px) {
  .journey-prototype__grid {
    grid-template-columns: 1fr;
  }
}
`;

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function buildJourneyPath(nodeIds: MandalaNodeId[]): string {
  return nodeIds.join(" -> ");
}

function getClosestJourneyStepIndex(
  nodeId: MandalaNodeId,
  currentStepIndex: number,
  steps: Array<{ nodeId: MandalaNodeId }>,
): number {
  let closestIndex = -1;
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < steps.length; index += 1) {
    if (steps[index].nodeId !== nodeId) {
      continue;
    }

    const distance = Math.abs(index - currentStepIndex);

    if (distance < smallestDistance) {
      closestIndex = index;
      smallestDistance = distance;
    }
  }

  return closestIndex;
}

export function MandalaJourneyPrototype({
  initialJourneyId = "perception",
  width = "100%",
  height,
  className,
  style,
}: MandalaJourneyPrototypeProps) {
  const [activeJourneyId, setActiveJourneyId] =
    React.useState<MandalaJourneyId>(initialJourneyId);
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [hoverNodeId, setHoverNodeId] = React.useState<MandalaNodeId | null>(null);

  const activeJourney =
    getMandalaJourneyById(activeJourneyId) ?? mandalaJourneys[0];
  const activeStep = activeJourney.steps[activeStepIndex];
  const trailNodeIds = getMandalaJourneyTrail(activeJourney, activeStepIndex);
  const isLastStep = activeStepIndex === activeJourney.steps.length - 1;
  const pathLabel = buildJourneyPath(activeJourney.path);

  return (
    <section className={cx("journey-prototype", className)} style={style}>
      <style>{MANDALA_JOURNEY_PROTOTYPE_CSS}</style>

      <header className="journey-prototype__header">
        <p className="journey-prototype__eyebrow">Jornadas</p>
        <h2 className="journey-prototype__title">Por onde voce quer comecar?</h2>
        <p className="journey-prototype__intro">
          Cada caminho ativa uma jornada de 7 etapas. O portal deixa de ser menu
          e passa a funcionar como travessia orientada pela mandala.
        </p>
      </header>

      <div className="journey-prototype__choices">
        {mandalaJourneys.map((journey) => {
          const isActive = journey.id === activeJourney.id;

          return (
            <button
              key={journey.id}
              type="button"
              className={cx(
                "journey-prototype__choice",
                isActive && "journey-prototype__choice--active",
              )}
              aria-pressed={isActive}
              onClick={() => {
                setActiveJourneyId(journey.id);
                setActiveStepIndex(0);
                setHoverNodeId(null);
              }}
            >
              <span className="journey-prototype__choice-label">
                {journey.promptLabel}
              </span>
              <span className="journey-prototype__choice-copy">
                {journey.promptDescription}
              </span>
            </button>
          );
        })}
      </div>

      <div className="journey-prototype__grid">
        <MandalaCanvas
          width={width}
          height={height}
          nodes={mandalaNodes}
          routes={mandalaRoutes}
          activeNodeId={activeStep.nodeId}
          hoverNodeId={hoverNodeId}
          activeRouteId={activeJourney.routeOverlayId}
          trailNodeIds={trailNodeIds}
          title={activeJourney.title}
          subtitle={activeJourney.centralQuestion}
          onNodeEnter={setHoverNodeId}
          onNodeLeave={() => setHoverNodeId(null)}
          onNodeSelect={(nodeId) => {
            const stepIndex = getClosestJourneyStepIndex(
              nodeId,
              activeStepIndex,
              activeJourney.steps,
            );

            if (stepIndex >= 0) {
              setActiveStepIndex(stepIndex);
            }
          }}
        />

        <aside className="journey-prototype__panel">
          <div className="journey-prototype__step-meta">
            <p className="journey-prototype__step-count">
              Etapa {activeStep.order} de {activeJourney.steps.length}
            </p>
            <h3 className="journey-prototype__step-title">
              {activeStep.title}
            </h3>
            <p className="journey-prototype__step-agent">
              {activeStep.agentLabel} - {activeStep.experience}
            </p>
          </div>

          <p className="journey-prototype__copy">{activeStep.narrative}</p>
          <p className="journey-prototype__question">
            <strong>Pergunta ativa:</strong> {activeStep.reflectionPrompt}
          </p>
          <p className="journey-prototype__copy">
            <strong>Questao central:</strong> {activeJourney.centralQuestion}
          </p>
          <p className="journey-prototype__path">{pathLabel}</p>

          <ol className="journey-prototype__steps">
            {activeJourney.steps.map((step, index) => {
              const isActive = index === activeStepIndex;
              const isDone = index < activeStepIndex;

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={cx(
                      "journey-prototype__step-button",
                      isActive && "journey-prototype__step-button--active",
                      isDone && "journey-prototype__step-button--done",
                    )}
                    onClick={() => setActiveStepIndex(index)}
                  >
                    <span className="journey-prototype__step-order">
                      {step.order}
                    </span>
                    <span>
                      <span className="journey-prototype__step-label">
                        {step.agentLabel} - {step.title}
                      </span>
                      <br />
                      <span className="journey-prototype__step-experience">
                        {step.experience}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {isLastStep ? (
            <p className="journey-prototype__completion">
              <strong>Fechamento:</strong> {activeJourney.completionCopy}
            </p>
          ) : null}

          {isLastStep && activeJourney.openQuestion ? (
            <p className="journey-prototype__completion">
              <strong>Ponto aberto:</strong> {activeJourney.openQuestion}
            </p>
          ) : null}

          <div className="journey-prototype__actions">
            <button
              type="button"
              className="journey-prototype__action"
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((current) => Math.max(0, current - 1))}
            >
              Etapa anterior
            </button>

            <button
              type="button"
              className="journey-prototype__action"
              onClick={() => {
                if (isLastStep) {
                  setActiveStepIndex(0);
                  setHoverNodeId(null);
                  return;
                }

                setActiveStepIndex((current) =>
                  Math.min(activeJourney.steps.length - 1, current + 1),
                );
              }}
            >
              {isLastStep ? "Recomecar jornada" : activeStep.ctaLabel}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default MandalaJourneyPrototype;

import type { MandalaNodeId } from "./MandalaCanvas";

export const MANDALA_JOURNEY_UI_CSS = `
.journey-screen {
  display: grid;
  gap: 24px;
  font-family: "Georgia", "Times New Roman", serif;
}

.journey-screen__header {
  display: grid;
  gap: 10px;
}

.journey-screen__eyebrow {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.journey-screen__title {
  color: #1f1b16;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.15;
  margin: 0;
}

.journey-screen__intro {
  color: #7f7668;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 72ch;
}

.journey-field {
  display: grid;
  gap: 10px;
}

.journey-field__label {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.journey-field__options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.journey-field__button {
  appearance: none;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 18px;
  color: #1f1b16;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  min-width: 180px;
  padding: 12px 14px;
  text-align: left;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.journey-field__button:hover,
.journey-field__button:focus-visible {
  border-color: rgba(58, 53, 44, 0.3);
  box-shadow: 0 10px 24px rgba(58, 53, 44, 0.08);
  outline: none;
  transform: translateY(-1px);
}

.journey-field__button--active {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(58, 53, 44, 0.38);
}

.journey-field__button-title {
  font-size: 15px;
  font-weight: 600;
}

.journey-field__button-copy {
  color: #7f7668;
  font-size: 13px;
  line-height: 1.45;
}

.journey-field__climate {
  color: #5e564a;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  max-width: 72ch;
  transition: opacity 320ms ease, transform 320ms ease;
}

.journey-field__legend {
  color: #7f7668;
  font-size: 13px;
  line-height: 1.55;
  margin: 0;
  max-width: 72ch;
}

.journey-field__climate--transitioning {
  opacity: 0.58;
  transform: translateY(2px);
}

.journey-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.journey-selector__button {
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

.journey-selector__button:hover,
.journey-selector__button:focus-visible {
  border-color: rgba(58, 53, 44, 0.34);
  box-shadow: 0 12px 28px rgba(58, 53, 44, 0.08);
  outline: none;
  transform: translateY(-1px);
}

.journey-selector__button--active {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(58, 53, 44, 0.42);
}

.journey-selector__label {
  font-size: 17px;
  font-weight: 600;
}

.journey-selector__copy {
  color: #7f7668;
  font-size: 14px;
  line-height: 1.45;
}

.journey-screen__grid {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
}

.journey-stepper {
  background: linear-gradient(180deg, rgba(250, 247, 240, 0.98), rgba(247, 243, 235, 0.98));
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(58, 53, 44, 0.06);
  display: grid;
  gap: 20px;
  padding: 24px;
}

.journey-stepper__meta {
  display: grid;
  gap: 8px;
}

.journey-stepper__count {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.12em;
  margin: 0;
  text-transform: uppercase;
}

.journey-stepper__title {
  color: #1f1b16;
  font-size: 26px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
}

.journey-stepper__agent {
  color: #7f7668;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
}

.journey-stepper__copy,
.journey-stepper__question,
.journey-stepper__completion,
.journey-stepper__path {
  color: #7f7668;
  font-size: 15px;
  line-height: 1.65;
  margin: 0;
}

.journey-stepper__question strong,
.journey-stepper__completion strong,
.journey-stepper__copy strong {
  color: #1f1b16;
  font-weight: 600;
}

.journey-stepper__steps {
  display: grid;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.journey-stepper__step-button {
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

.journey-stepper__step-button:hover,
.journey-stepper__step-button:focus-visible {
  background: rgba(255, 255, 255, 0.58);
  border-color: rgba(58, 53, 44, 0.28);
  outline: none;
}

.journey-stepper__step-button--active {
  background: rgba(255, 255, 255, 0.86);
  border-color: rgba(58, 53, 44, 0.42);
}

.journey-stepper__step-button--done {
  border-color: rgba(58, 53, 44, 0.22);
}

.journey-stepper__step-order {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.journey-stepper__step-label {
  font-size: 15px;
  font-weight: 600;
}

.journey-stepper__step-experience {
  color: #7f7668;
  font-size: 13px;
  line-height: 1.4;
}

.journey-stepper__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.journey-stepper__action {
  appearance: none;
  background: transparent;
  border: 1px solid rgba(58, 53, 44, 0.16);
  border-radius: 999px;
  color: #1f1b16;
  cursor: pointer;
  padding: 10px 14px;
  transition: background 180ms ease, border-color 180ms ease;
}

.journey-stepper__action:hover,
.journey-stepper__action:focus-visible {
  background: rgba(255, 255, 255, 0.62);
  border-color: rgba(58, 53, 44, 0.36);
  outline: none;
}

.journey-stepper__action:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.journey-stepper__action--quiet {
  background: transparent;
  border-color: rgba(58, 53, 44, 0.1);
  color: #7f7668;
}

.operational-journey {
  display: grid;
  gap: 24px;
  max-width: 860px;
}

.operational-journey__header {
  display: grid;
  gap: 10px;
}

.operational-journey__eyebrow,
.operational-journey__count,
.operational-step__label {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.operational-journey__title {
  color: #1f1b16;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0;
}

.operational-journey__intro {
  color: #5e564a;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 60ch;
}

.operational-journey__progress {
  display: grid;
  gap: 10px;
}

.operational-journey__bar {
  background: rgba(58, 53, 44, 0.08);
  border-radius: 999px;
  height: 8px;
  overflow: hidden;
  width: min(320px, 100%);
}

.operational-journey__bar-fill {
  background: #1f1b16;
  border-radius: 999px;
  display: block;
  height: 100%;
  transition: width 240ms ease;
}

.operational-journey__panel {
  background: linear-gradient(180deg, rgba(250, 247, 240, 0.98), rgba(247, 243, 235, 0.98));
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(58, 53, 44, 0.06);
  padding: 28px;
}

.operational-step {
  display: grid;
  gap: 18px;
}

.operational-step__copy-group,
.operational-step__paragraphs {
  display: grid;
  gap: 8px;
}

.operational-step__group {
  display: grid;
  gap: 12px;
}

.operational-step__group + .operational-step__group {
  margin-top: 10px;
}

.operational-step__group-label {
  color: #7f7668;
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.operational-step__quote,
.operational-step__copy,
.operational-step__prompt,
.operational-step__tag {
  color: #2a251e;
  font-size: 18px;
  line-height: 1.65;
  margin: 0;
}

.operational-step__quote {
  font-size: 22px;
}

.operational-step__tag {
  color: #7f7668;
  font-size: 14px;
  line-height: 1.55;
}

.mandala-mini {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 4px 0 10px;
  min-height: 220px;
  position: relative;
}

.mandala-mini__ring {
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 50%;
  height: 180px;
  position: absolute;
  width: 180px;
}

.mandala-mini__core {
  background: radial-gradient(circle, rgba(58, 53, 44, 0.16), rgba(58, 53, 44, 0.04));
  border-radius: 50%;
  height: 18px;
  position: absolute;
  width: 18px;
}

.mandala-mini__agent {
  align-items: center;
  color: #a49a8b;
  display: grid;
  gap: 6px;
  justify-items: center;
  opacity: 0.22;
  position: absolute;
  text-align: center;
  transform: translate(-50%, -50%) scale(1);
  transition: opacity 240ms ease, transform 240ms ease, color 240ms ease;
}

.mandala-mini__agent--past {
  color: #776f63;
  opacity: 0.36;
}

.mandala-mini__agent--active {
  color: #1f1b16;
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.12);
}

.mandala-mini__dot {
  background: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 0 6px rgba(58, 53, 44, 0.04);
  display: block;
  height: 10px;
  width: 10px;
}

.mandala-mini__agent--active .mandala-mini__dot {
  box-shadow: 0 0 0 10px rgba(58, 53, 44, 0.08);
}

.mandala-mini__label {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.operational-step__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.operational-step__chip {
  appearance: none;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(58, 53, 44, 0.12);
  border-radius: 999px;
  color: #5e564a;
  cursor: pointer;
  padding: 8px 12px;
}

.operational-step__chip--active {
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(58, 53, 44, 0.32);
  color: #1f1b16;
}

.operational-step__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.operational-step__action {
  appearance: none;
  background: #1f1b16;
  border: none;
  border-radius: 999px;
  color: #f8f3ea;
  cursor: pointer;
  padding: 11px 16px;
  transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
}

.operational-step__action:hover,
.operational-step__action:focus-visible {
  box-shadow: 0 10px 20px rgba(31, 27, 22, 0.14);
  outline: none;
  transform: translateY(-1px);
}

.operational-step__action:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.operational-step__pause {
  color: #7f7668;
  font-size: 14px;
  line-height: 1.55;
}

@media (max-width: 980px) {
  .journey-screen__grid {
    grid-template-columns: 1fr;
  }
}
`;

export function journeyCx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

export function buildJourneyPath(nodeIds: MandalaNodeId[]): string {
  return nodeIds.join(" -> ");
}

export function getClosestJourneyStepIndex(
  nodeId: MandalaNodeId,
  currentStepIndex: number,
  steps: Array<{ nodeId: MandalaNodeId }>,
): number {
  let closestIndex = -1;
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];

    if (!step || step.nodeId !== nodeId) {
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

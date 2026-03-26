import type { MandalaNodeId } from "./MandalaCanvas";

export const MANDALA_JOURNEY_UI_CSS = `
.journey-screen {
  display: grid;
  gap: 24px;
  font-family: "Inter", system-ui, sans-serif;
}

.journey-screen__header {
  display: grid;
  gap: 10px;
}

.journey-screen__eyebrow {
  color: var(--lichtara-silver);
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.journey-screen__title {
  color: var(--lichtara-gold);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.15;
  margin: 0;
}

.journey-screen__intro {
  color: var(--lichtara-silver);
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
  color: var(--lichtara-silver);
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
  background: rgba(245, 246, 247, 0.9);
  border: 1px solid rgba(201, 210, 217, 0.28);
  border-radius: 18px;
  color: var(--lichtara-ink);
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
  border-color: rgba(212, 175, 55, 0.38);
  box-shadow: 0 10px 24px rgba(0, 8, 20, 0.18);
  outline: none;
  transform: translateY(-1px);
}

.journey-field__button--active {
  background: rgba(10, 26, 47, 0.98);
  border-color: rgba(212, 175, 55, 0.64);
  color: var(--lichtara-gold);
}

.journey-field__button-title {
  font-size: 15px;
  font-weight: 600;
}

.journey-field__button-copy {
  color: rgba(10, 26, 47, 0.72);
  font-size: 13px;
  line-height: 1.45;
}

.journey-field__button--active .journey-field__button-copy {
  color: rgba(201, 210, 217, 0.82);
}

.journey-field__climate {
  color: rgba(245, 246, 247, 0.84);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  max-width: 72ch;
  transition: opacity 320ms ease, transform 320ms ease;
}

.journey-field__legend {
  color: rgba(201, 210, 217, 0.72);
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
  background: rgba(245, 246, 247, 0.92);
  border: 1px solid rgba(201, 210, 217, 0.24);
  border-radius: 20px;
  color: var(--lichtara-ink);
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
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 0 12px 28px rgba(0, 8, 20, 0.16);
  outline: none;
  transform: translateY(-1px);
}

.journey-selector__button--active {
  background: rgba(10, 26, 47, 0.98);
  border-color: rgba(212, 175, 55, 0.64);
  color: var(--lichtara-gold);
}

.journey-selector__label {
  font-size: 17px;
  font-weight: 600;
}

.journey-selector__copy {
  color: rgba(10, 26, 47, 0.72);
  font-size: 14px;
  line-height: 1.45;
}

.journey-selector__button--active .journey-selector__copy {
  color: rgba(201, 210, 217, 0.82);
}

.journey-screen__grid {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
}

.journey-stepper {
  background: linear-gradient(180deg, rgba(245, 246, 247, 0.98), rgba(234, 239, 243, 0.96));
  border: 1px solid rgba(201, 210, 217, 0.26);
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(0, 8, 20, 0.18);
  display: grid;
  gap: 20px;
  padding: 24px;
}

.journey-stepper--soft {
  align-content: space-between;
  gap: 24px;
  min-height: 100%;
}

.journey-stepper__flow {
  display: grid;
  gap: 12px;
}

.journey-stepper__flow-content {
  color: var(--lichtara-ink);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.35;
  margin: 0;
}

.journey-stepper__meta {
  display: grid;
  gap: 8px;
}

.journey-stepper__count {
  color: rgba(10, 26, 47, 0.68);
  font-size: 12px;
  letter-spacing: 0.12em;
  margin: 0;
  text-transform: uppercase;
}

.journey-stepper__title {
  color: var(--lichtara-gold);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
}

.journey-stepper__agent {
  color: rgba(10, 26, 47, 0.74);
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
}

.journey-stepper__copy,
.journey-stepper__question,
.journey-stepper__completion,
.journey-stepper__path {
  color: rgba(0, 8, 20, 0.76);
  font-size: 15px;
  line-height: 1.65;
  margin: 0;
}

.journey-stepper__question strong,
.journey-stepper__completion strong,
.journey-stepper__copy strong {
  color: var(--lichtara-ink);
  font-weight: 600;
}

.journey-stepper__options {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.journey-stepper__option {
  appearance: none;
  align-items: flex-start;
  background: rgba(245, 246, 247, 0.92);
  border: 1px solid rgba(201, 210, 217, 0.3);
  border-radius: 18px;
  color: var(--lichtara-blue);
  cursor: pointer;
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  text-align: left;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.journey-stepper__option:hover,
.journey-stepper__option:focus-visible {
  background: rgba(212, 175, 55, 0.12);
  border-color: rgba(212, 175, 55, 0.5);
  box-shadow: 0 10px 24px rgba(0, 8, 20, 0.12);
  outline: none;
  transform: translateY(-1px);
}

.journey-stepper__option-label {
  font-size: 16px;
  font-weight: 600;
}

.journey-stepper__option-hint {
  color: rgba(10, 26, 47, 0.68);
  font-size: 13px;
  line-height: 1.45;
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
  border: 1px solid rgba(201, 210, 217, 0.24);
  border-radius: 16px;
  color: var(--lichtara-ink);
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
  background: rgba(201, 210, 217, 0.14);
  border-color: rgba(212, 175, 55, 0.38);
  outline: none;
}

.journey-stepper__step-button--active {
  background: rgba(10, 26, 47, 0.98);
  border-color: rgba(212, 175, 55, 0.64);
  color: var(--lichtara-gold);
}

.journey-stepper__step-button--done {
  border-color: rgba(201, 210, 217, 0.38);
}

.journey-stepper__step-order {
  color: rgba(10, 26, 47, 0.6);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.journey-stepper__step-label {
  font-size: 15px;
  font-weight: 600;
}

.journey-stepper__step-experience {
  color: rgba(0, 8, 20, 0.62);
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
  background: rgba(245, 246, 247, 0.92);
  border: 1px solid rgba(201, 210, 217, 0.3);
  border-radius: 999px;
  color: var(--lichtara-blue);
  cursor: pointer;
  padding: 10px 14px;
  transition: background 180ms ease, border-color 180ms ease;
}

.journey-stepper__action:hover,
.journey-stepper__action:focus-visible {
  background: rgba(212, 175, 55, 0.18);
  border-color: rgba(212, 175, 55, 0.5);
  outline: none;
}

.journey-stepper__action:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.journey-stepper__action--quiet {
  background: transparent;
  border-color: rgba(201, 210, 217, 0.18);
  color: rgba(201, 210, 217, 0.82);
}

.journey-stepper__action--flow {
  background: var(--lichtara-gold);
  border-color: rgba(212, 175, 55, 0.58);
  color: var(--lichtara-blue);
  font-weight: 600;
}

.operational-journey {
  align-content: center;
  display: grid;
  gap: 18px;
  justify-self: center;
  max-width: 860px;
  min-height: calc(100vh - 112px);
  width: min(100%, 860px);
}

.operational-journey--entry {
  align-content: center;
}

.operational-journey__header {
  display: grid;
  gap: 10px;
}

.operational-journey__eyebrow,
.operational-journey__count,
.operational-step__label {
  color: rgba(10, 26, 47, 0.66);
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.operational-journey__title {
  color: var(--lichtara-gold);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.1;
  margin: 0;
}

.operational-journey__intro {
  color: rgba(0, 8, 20, 0.74);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 60ch;
}

.operational-journey__progress {
  display: grid;
  gap: 8px;
  justify-items: center;
}

.operational-journey__bar {
  background: rgba(201, 210, 217, 0.2);
  border-radius: 999px;
  height: 4px;
  overflow: hidden;
  width: min(296px, 100%);
}

.operational-journey__bar-fill {
  background: rgba(212, 175, 55, 0.82);
  border-radius: 999px;
  display: block;
  height: 100%;
  transition: width 220ms ease, opacity 180ms ease;
}

.operational-journey__panel {
  backdrop-filter: blur(2px);
  background: rgba(245, 246, 247, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 8, 20, 0.18);
  margin: 0 auto;
  padding: 28px 24px;
  width: 100%;
}

.operational-journey__panel--entry {
  align-items: center;
  display: grid;
  max-width: 700px;
  min-height: auto;
}

.operational-journey__panel--focus {
  max-width: 760px;
}

.operational-journey__panel--insight {
  max-width: 700px;
}

.operational-journey__panel--movement {
  max-width: 700px;
}

.operational-journey__panel--closure {
  max-width: 700px;
  padding-bottom: 24px;
  padding-top: 24px;
}

.operational-step {
  display: grid;
  gap: 18px;
  animation: operationalFadeIn 180ms ease-out both;
}

.operational-step--entry {
  align-content: center;
  gap: 24px;
  justify-items: start;
  min-height: auto;
  margin: 0 auto;
  max-width: 520px;
  width: min(100%, 520px);
}

.operational-step--entry .operational-step__copy-group {
  gap: 20px;
  max-width: 38ch;
}

.operational-step--entry .operational-step__label,
.operational-step--entry .operational-step__actions,
.operational-step--entry .operational-step__tag {
  width: 100%;
}

.operational-step--entry .operational-step__tag {
  color: rgba(10, 26, 47, 0.58);
  font-size: 13px;
  margin-top: 8px;
  max-width: 38ch;
}

.operational-step--entry .operational-step__action {
  min-height: 54px;
  padding: 14px 26px;
}

.operational-step__copy-group,
.operational-step__paragraphs {
  display: grid;
  gap: 8px;
}

.operational-step__group {
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(201, 210, 217, 0.18);
  border-radius: 24px;
  display: grid;
  gap: 12px;
  padding: 20px 18px;
}

.operational-step__group--active {
  animation: operationalFadeIn 220ms ease-out both;
}

.operational-step__group + .operational-step__group {
  margin-top: 0;
}

.operational-step__group-label {
  color: rgba(10, 26, 47, 0.66);
  font-size: 12px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: uppercase;
}

.operational-step__helper {
  color: rgba(10, 26, 47, 0.64);
  font-size: 14px;
  line-height: 1.55;
  margin: 0;
}

.operational-step--focus {
  gap: 16px;
}

.operational-step--focus .operational-step__group {
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
}

.operational-step__selection {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: -4px;
}

.operational-step__selected-chip {
  appearance: none;
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(10, 26, 47, 0.16);
  border-radius: 999px;
  color: rgba(10, 26, 47, 0.82);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  padding: 8px 12px;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease;
}

.operational-step__selected-chip:hover,
.operational-step__selected-chip:focus-visible {
  background: rgba(255, 255, 255, 0.44);
  border-color: rgba(10, 26, 47, 0.22);
  color: rgba(10, 26, 47, 0.92);
  outline: none;
}

.operational-step__quote,
.operational-step__copy,
.operational-step__prompt,
.operational-step__tag {
  color: var(--lichtara-ink);
  font-size: 18px;
  line-height: 1.65;
  margin: 0;
}

.operational-step__quote {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 22px;
  font-weight: 600;
}

.operational-step__prompt {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 20px;
  font-weight: 500;
}

.operational-step__tag {
  color: rgba(10, 26, 47, 0.72);
  font-size: 14px;
  line-height: 1.55;
}

.operational-step--insight .operational-step__copy,
.operational-step--movement .operational-step__copy {
  font-size: 16.5px;
  line-height: 1.75;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
}

.operational-step--closure .operational-step__copy {
  font-size: 18px;
  line-height: 1.65;
  max-width: 34ch;
}

.operational-step--movement {
  gap: 14px;
  justify-items: center;
}

.operational-step--movement .operational-step__actions {
  justify-content: center;
  width: 100%;
}

.operational-step--closure {
  gap: 14px;
  padding-top: 2px;
}

.operational-step__mandala {
  margin-top: -6px;
  opacity: 0.4;
  pointer-events: none;
  transform: scale(0.85);
  transform-origin: center top;
  width: 100%;
}

.mandala-mini {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 168px;
  position: relative;
}

.mandala-mini__ring {
  border: 1px solid rgba(201, 210, 217, 0.28);
  border-radius: 50%;
  height: 150px;
  position: absolute;
  width: 150px;
}

.mandala-mini__core {
  background: radial-gradient(circle, rgba(212, 175, 55, 0.24), rgba(10, 26, 47, 0.1));
  border-radius: 50%;
  height: 14px;
  position: absolute;
  width: 14px;
}

.mandala-mini__agent {
  align-items: center;
  color: rgba(10, 26, 47, 0.32);
  display: grid;
  gap: 6px;
  justify-items: center;
  opacity: 0.18;
  position: absolute;
  text-align: center;
  transform: translate(-50%, -50%) scale(1);
  transition: opacity 240ms ease, transform 240ms ease, color 240ms ease;
}

.mandala-mini__agent--past {
  color: rgba(10, 26, 47, 0.56);
  opacity: 0.28;
}

.mandala-mini__agent--active {
  color: var(--lichtara-gold);
  opacity: 0.92;
  transform: translate(-50%, -50%) scale(1.06);
}

.mandala-mini__dot {
  background: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 0 6px rgba(212, 175, 55, 0.08);
  display: block;
  height: 10px;
  width: 10px;
}

.mandala-mini__agent--active .mandala-mini__dot {
  box-shadow: 0 0 0 10px rgba(212, 175, 55, 0.16);
}

.mandala-mini__label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.operational-step__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.operational-step--focus .operational-step__chips {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.operational-step__chip {
  appearance: none;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(201, 210, 217, 0.22);
  border-radius: 999px;
  color: var(--lichtara-blue);
  cursor: pointer;
  display: inline-grid;
  gap: 4px;
  min-height: 48px;
  padding: 11px 16px;
  text-align: left;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.operational-step__chip:hover,
.operational-step__chip:focus-visible {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(212, 175, 55, 0.28);
  outline: none;
  transform: translateY(-1px);
}

.operational-step__chip--active {
  background: rgba(10, 26, 47, 0.96);
  border-color: rgba(212, 175, 55, 0.56);
  color: var(--lichtara-gold);
}

.operational-step__chip--contextual {
  min-width: 0;
}

.operational-step--focus .operational-step__chip {
  width: 100%;
}

.operational-step__chip-label {
  color: inherit;
  font-size: 15px;
  line-height: 1.25;
}

.operational-step__chip-context {
  color: rgba(10, 26, 47, 0.68);
  font-size: 12px;
  line-height: 1.45;
  max-width: 18ch;
}

.operational-step__chip--active .operational-step__chip-context {
  color: rgba(201, 210, 217, 0.82);
}

.operational-step__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.operational-step__action {
  appearance: none;
  background: var(--lichtara-gold);
  border: 1px solid rgba(212, 175, 55, 0.58);
  border-radius: 999px;
  color: var(--lichtara-blue);
  cursor: pointer;
  font-weight: 600;
  min-height: 46px;
  padding: 10px 20px;
  transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
}

.operational-step__action:hover,
.operational-step__action:focus-visible {
  box-shadow: 0 10px 24px rgba(212, 175, 55, 0.22);
  outline: none;
  transform: translateY(-1px);
}

.operational-step__action:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.operational-step__action--secondary {
  background: transparent;
  border-color: rgba(10, 26, 47, 0.14);
  color: rgba(10, 26, 47, 0.58);
  font-weight: 500;
}

.operational-step__action--secondary:hover,
.operational-step__action--secondary:focus-visible {
  background: rgba(10, 26, 47, 0.04);
  box-shadow: none;
  color: rgba(10, 26, 47, 0.78);
}

.operational-step__pause {
  color: rgba(10, 26, 47, 0.72);
  font-size: 14px;
  line-height: 1.55;
}

@keyframes operationalFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .journey-screen__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .journey-stepper__flow-content {
    font-size: 22px;
    line-height: 1.4;
  }

  .journey-stepper__options {
    grid-template-columns: 1fr;
  }

  .operational-journey {
    gap: 18px;
    max-width: 100%;
    min-height: calc(100vh - 64px);
  }

  .operational-journey--entry {
    min-height: calc(100vh - 64px);
  }

  .operational-journey__panel {
    border-radius: 22px;
    padding: 22px 18px;
  }

  .operational-journey__panel--entry {
    min-height: auto;
  }

  .operational-step {
    gap: 16px;
  }

  .operational-step--entry {
    min-height: auto;
    max-width: none;
    width: 100%;
  }

  .operational-step--entry .operational-step__copy-group,
  .operational-step--entry .operational-step__tag {
    max-width: none;
  }

  .operational-step__group {
    border-radius: 18px;
    gap: 12px;
    padding: 16px 14px;
  }

  .operational-step__group + .operational-step__group {
    margin-top: 0;
  }

  .operational-step__quote {
    font-size: 19px;
    line-height: 1.45;
  }

  .operational-step__prompt {
    font-size: 18px;
    line-height: 1.4;
  }

  .operational-step__copy,
  .operational-step__tag {
    font-size: 15px;
    line-height: 1.55;
  }

  .operational-step--insight .operational-step__copy,
  .operational-step--movement .operational-step__copy,
  .operational-step--closure .operational-step__copy {
    font-size: 15px;
    max-width: none;
  }

  .operational-journey__progress {
    gap: 8px;
  }

  .operational-journey__bar {
    width: 100%;
  }

  .operational-step__chips {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .operational-step__chip,
  .operational-step__chip--contextual {
    min-width: 0;
    width: 100%;
  }

  .operational-step__actions {
    width: 100%;
  }

  .operational-step__action {
    justify-content: center;
    min-height: 48px;
    width: 100%;
  }

  .mandala-mini {
    min-height: 148px;
  }

  .mandala-mini__ring {
    height: 132px;
    width: 132px;
  }
}

@media (max-width: 420px) {
  .operational-step__chips,
  .operational-step--focus .operational-step__chips {
    grid-template-columns: 1fr;
  }

  .operational-step__chip-context {
    max-width: none;
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

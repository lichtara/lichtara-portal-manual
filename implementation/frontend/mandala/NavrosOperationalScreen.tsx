import * as React from "react";

import {
  buildNavrosMovementCopy,
  buildNavrosOrientationCopy,
  buildNavrosReadingCopy,
  movementLabels,
  navrosSuggestedFeelings,
  normalizeNavrosFeeling,
  resolveNextAgent,
  type NavrosOperationalAnswers,
  type NavrosOperationalStepId,
} from "./navrosOperationalJourney";
import { journeyCx } from "./journeyUI";

export type NavrosOperationalScreenProps = {
  step: NavrosOperationalStepId;
  answers: NavrosOperationalAnswers;
  onNext: () => void;
  onUpdate: (data: Partial<NavrosOperationalAnswers>) => void;
  onRestart: () => void;
};

export function NavrosOperationalScreen({
  step,
  answers,
  onNext,
  onUpdate,
  onRestart,
}: NavrosOperationalScreenProps) {
  switch (step) {
    case "entry":
      return <EntryStep onNext={onNext} />;

    case "focus":
      return <FocusStep answers={answers} onNext={onNext} onUpdate={onUpdate} />;

    case "reading":
      return <ReadingStep answers={answers} onNext={onNext} />;

    case "recognition":
      return <RecognitionStep onNext={onNext} />;

    case "orientation":
      return <OrientationStep answers={answers} onNext={onNext} />;

    case "movement":
      return <MovementStep answers={answers} onNext={onNext} />;

    case "closure":
      return <ClosureStep onRestart={onRestart} />;

    default:
      return null;
  }
}

function EntryStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="operational-step">
      <p className="operational-step__label">Entrada</p>
      <div className="operational-step__copy-group">
        <p className="operational-step__quote">
          Voce nao esta aqui para aprender algo novo.
        </p>
        <p className="operational-step__quote">
          Voce esta aqui para reconhecer onde ja esta.
        </p>
      </div>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

type FocusStepProps = {
  answers: NavrosOperationalAnswers;
  onNext: () => void;
  onUpdate: (data: Partial<NavrosOperationalAnswers>) => void;
};

function FocusStep({ answers, onNext, onUpdate }: FocusStepProps) {
  const [area, setArea] = React.useState(answers.area);
  const [context, setContext] = React.useState(answers.context);
  const [feeling, setFeeling] = React.useState(answers.feeling);

  const canContinue = Boolean(area.trim() && context.trim() && feeling.trim());

  function handleNext() {
    if (!canContinue) {
      return;
    }

    onUpdate({ area, context, feeling });
    onNext();
  }

  return (
    <div className="operational-step">
      <p className="operational-step__label">Foco</p>
      <div className="operational-step__field">
        <label className="operational-step__prompt" htmlFor="navros-area">
          Qual area da sua vida esta pedindo mais atencao agora?
        </label>
        <input
          id="navros-area"
          className="operational-step__input"
          value={area}
          onChange={(event) => setArea(event.target.value)}
        />
      </div>
      <div className="operational-step__field">
        <label className="operational-step__prompt" htmlFor="navros-context">
          Como essa area tem se apresentado recentemente?
        </label>
        <input
          id="navros-context"
          className="operational-step__input"
          value={context}
          onChange={(event) => setContext(event.target.value)}
        />
      </div>
      <div className="operational-step__field">
        <label className="operational-step__prompt" htmlFor="navros-feeling">
          Qual sensacao esta mais presente neste momento?
        </label>
        <input
          id="navros-feeling"
          className="operational-step__input"
          value={feeling}
          onChange={(event) => setFeeling(event.target.value)}
        />
        <div className="operational-step__chips">
          {navrosSuggestedFeelings.map((suggestedFeeling) => {
            const isActive =
              normalizeNavrosFeeling(feeling) === suggestedFeeling.id &&
              Boolean(feeling.trim());

            return (
              <button
                key={suggestedFeeling.id}
                type="button"
                className={journeyCx(
                  "operational-step__chip",
                  isActive && "operational-step__chip--active",
                )}
                onClick={() => setFeeling(suggestedFeeling.label)}
              >
                {suggestedFeeling.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          disabled={!canContinue}
          onClick={handleNext}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

function ReadingStep({
  answers,
  onNext,
}: Pick<NavrosOperationalScreenProps, "answers" | "onNext">) {
  const paragraphs = buildNavrosReadingCopy(answers)
    .split("\n\n")
    .filter(Boolean);

  return (
    <div className="operational-step">
      <p className="operational-step__label">Leitura</p>
      <div className="operational-step__paragraphs">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="operational-step__copy">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

function RecognitionStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="operational-step">
      <p className="operational-step__label">Reconhecimento</p>
      <p className="operational-step__copy">
        Isso faz sentido para voce?
      </p>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          Sim
        </button>
      </div>
    </div>
  );
}

function OrientationStep({
  answers,
  onNext,
}: Pick<NavrosOperationalScreenProps, "answers" | "onNext">) {
  return (
    <div className="operational-step">
      <p className="operational-step__label">Orientacao</p>
      <p className="operational-step__copy">
        {buildNavrosOrientationCopy(answers)}
      </p>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

function MovementStep({
  answers,
  onNext,
}: Pick<NavrosOperationalScreenProps, "answers" | "onNext">) {
  const paragraphs = buildNavrosMovementCopy(answers)
    .split("\n\n")
    .filter(Boolean);
  const { movement, agent } = resolveNextAgent(answers.feeling);

  return (
    <div className="operational-step">
      <p className="operational-step__label">Movimento</p>
      <div className="operational-step__paragraphs">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="operational-step__copy">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="operational-step__tag">
        Movimento reconhecido: {movementLabels[movement]} para {agent}
      </p>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

function ClosureStep({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="operational-step">
      <p className="operational-step__label">Fechamento</p>
      <p className="operational-step__copy">
        Voce nao esta mais no mesmo ponto de quando entrou.
      </p>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onRestart}
        >
          Recomecar travessia
        </button>
      </div>
    </div>
  );
}

export default NavrosOperationalScreen;

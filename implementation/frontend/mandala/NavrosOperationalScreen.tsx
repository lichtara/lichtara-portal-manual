import * as React from "react";

import {
  buildNavrosMovementCopy,
  buildNavrosOrientationCopy,
  buildNavrosReadingCopy,
  navrosSuggestedAreas,
  navrosSuggestedStates,
  movementLabels,
  navrosSuggestedFeelings,
  normalizeNavrosReadingFeeling,
  resolveNextAgentFromAnswers,
  type NavrosAgentId,
  type NavrosOperationalAnswers,
  type NavrosOperationalStepId,
} from "./navrosOperationalJourney";
import { MandalaMini } from "./MandalaMini";
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
  const [state, setState] = React.useState(answers.state);
  const [feeling, setFeeling] = React.useState(answers.feeling);
  const [notes, setNotes] = React.useState(answers.notes);

  const canContinue = Boolean(area.trim() && state.trim() && feeling.trim());

  function handleNext() {
    if (!canContinue) {
      return;
    }

    onUpdate({ area, state, feeling, notes });
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
          placeholder="Ex.: trabalho, saude, relacoes, financas"
          value={area}
          onChange={(event) => setArea(event.target.value)}
        />
        <div className="operational-step__chips">
          {navrosSuggestedAreas.map((suggestedArea) => {
            const isActive =
              area.trim().toLowerCase() === suggestedArea.toLowerCase();

            return (
              <button
                key={suggestedArea}
                type="button"
                className={journeyCx(
                  "operational-step__chip",
                  isActive && "operational-step__chip--active",
                )}
                onClick={() => setArea(suggestedArea)}
              >
                {suggestedArea}
              </button>
            );
          })}
        </div>
      </div>
      <div className="operational-step__field">
        <label className="operational-step__prompt" htmlFor="navros-state">
          Como isso tem se apresentado?
        </label>
        <div className="operational-step__chips">
          {navrosSuggestedStates.map((suggestedState) => {
            const isActive =
              state.trim().toLowerCase() === suggestedState.toLowerCase();

            return (
              <button
                key={suggestedState}
                type="button"
                className={journeyCx(
                  "operational-step__chip",
                  isActive && "operational-step__chip--active",
                )}
                onClick={() => setState(suggestedState)}
              >
                {suggestedState}
              </button>
            );
          })}
        </div>
      </div>
      <div className="operational-step__field">
        <label className="operational-step__prompt" htmlFor="navros-feeling">
          Qual dessas sensacoes esta mais proxima agora?
        </label>
        <input
          id="navros-feeling"
          className="operational-step__input"
          placeholder="Ex.: confusao, pressao, travamento"
          value={feeling}
          onChange={(event) => setFeeling(event.target.value)}
        />
        <div className="operational-step__chips">
          {navrosSuggestedFeelings.map((suggestedFeeling) => {
            const isActive =
              normalizeNavrosReadingFeeling(feeling) === suggestedFeeling.id &&
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
      <div className="operational-step__field">
        <label className="operational-step__prompt" htmlFor="navros-notes">
          Se quiser, descreva com suas palavras
        </label>
        <textarea
          id="navros-notes"
          className="operational-step__input operational-step__textarea"
          placeholder="Opcional"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
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
  const { movement, agent } = resolveNextAgentFromAnswers(answers);
  const trajectory: NavrosAgentId[] =
    agent === "NAVROS" ? ["NAVROS"] : ["NAVROS", agent];

  return (
    <div className="operational-step">
      <p className="operational-step__label">Movimento</p>
      <MandalaMini activeAgent={agent} trajectory={trajectory} />
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

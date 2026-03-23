import * as React from "react";

import {
  buildNavrosMovementCopy,
  buildNavrosOrientationCopy,
  buildNavrosReadingCopy,
  normalizeNavrosReadingFeeling,
  resolveNextAgentFromAnswers,
  type NavrosAgentId,
  type NavrosOperationalAnswers,
  type NavrosOperationalStepId,
} from "./navrosOperationalJourney";
import {
  navrosAreaLabels,
  navrosOperationalScreenCopy,
  navrosStateLabels,
  navrosSuggestedAreas,
  navrosSuggestedFeelings,
  navrosSuggestedStates,
} from "./navrosOperationalCopy";
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
      <p className="operational-step__label">
        {navrosOperationalScreenCopy.entry.label}
      </p>
      <div className="operational-step__copy-group">
        {navrosOperationalScreenCopy.entry.quotes.map((quote) => (
          <p key={quote} className="operational-step__quote">
            {quote}
          </p>
        ))}
      </div>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          {navrosOperationalScreenCopy.entry.action}
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

  const canContinue = Boolean(area.trim() && state.trim() && feeling.trim());

  function handleNext() {
    if (!canContinue) {
      return;
    }

    onUpdate({ area, state, feeling });
    onNext();
  }

  return (
    <div className="operational-step">
      <p className="operational-step__label">
        {navrosOperationalScreenCopy.focus.label}
      </p>
      <div className="operational-step__group">
        <p className="operational-step__group-label">
          {navrosOperationalScreenCopy.focus.area.label}
        </p>
        <p className="operational-step__prompt">
          {navrosOperationalScreenCopy.focus.area.prompt}
        </p>
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
                {navrosAreaLabels[suggestedArea]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="operational-step__group">
        <p className="operational-step__group-label">
          {navrosOperationalScreenCopy.focus.state.label}
        </p>
        <p className="operational-step__prompt">
          {navrosOperationalScreenCopy.focus.state.prompt}
        </p>
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
                {navrosStateLabels[suggestedState]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="operational-step__group">
        <p className="operational-step__group-label">
          {navrosOperationalScreenCopy.focus.feeling.label}
        </p>
        <p className="operational-step__prompt">
          {navrosOperationalScreenCopy.focus.feeling.prompt}
        </p>
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
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          disabled={!canContinue}
          onClick={handleNext}
        >
          {navrosOperationalScreenCopy.focus.action}
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
      <p className="operational-step__label">
        {navrosOperationalScreenCopy.reading.label}
      </p>
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
          {navrosOperationalScreenCopy.reading.action}
        </button>
      </div>
    </div>
  );
}

function OrientationStep({
  answers,
  onNext,
}: Pick<NavrosOperationalScreenProps, "answers" | "onNext">) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsReady(true);
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="operational-step">
      <p className="operational-step__label">
        {navrosOperationalScreenCopy.orientation.label}
      </p>
      <p className="operational-step__copy">
        {buildNavrosOrientationCopy(answers)}
      </p>
      <div className="operational-step__actions">
        {isReady ? (
          <button
            type="button"
            className="operational-step__action"
            onClick={onNext}
          >
            {navrosOperationalScreenCopy.orientation.action}
          </button>
        ) : (
          <span className="operational-step__pause">
            {navrosOperationalScreenCopy.orientation.pause}
          </span>
        )}
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
  const { agent } = resolveNextAgentFromAnswers(answers);
  const trajectory: NavrosAgentId[] =
    agent === "NAVROS" ? ["NAVROS"] : ["NAVROS", agent];

  return (
    <div className="operational-step">
      <p className="operational-step__label">
        {navrosOperationalScreenCopy.movement.label}
      </p>
      <MandalaMini activeAgent={agent} trajectory={trajectory} />
      <p className="operational-step__copy">{paragraphs[0]}</p>
      {paragraphs[1] ? (
        <p className="operational-step__tag">{paragraphs[1]}</p>
      ) : null}
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          {navrosOperationalScreenCopy.movement.action}
        </button>
      </div>
    </div>
  );
}

function ClosureStep({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="operational-step">
      <p className="operational-step__label">
        {navrosOperationalScreenCopy.closure.label}
      </p>
      <p className="operational-step__copy">
        {navrosOperationalScreenCopy.closure.quote}
      </p>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onRestart}
        >
          {navrosOperationalScreenCopy.closure.action}
        </button>
      </div>
    </div>
  );
}

export default NavrosOperationalScreen;

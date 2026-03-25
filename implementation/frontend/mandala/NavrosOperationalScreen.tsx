import * as React from "react";

import {
  buildNavrosResponse,
  normalizeNavrosReadingFeeling,
  type NavrosBuiltResponse,
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
  const response = React.useMemo<NavrosBuiltResponse | null>(() => {
    if (!answers.area.trim() || !answers.state.trim() || !answers.feeling.trim()) {
      return null;
    }

    return buildNavrosResponse(answers);
  }, [answers.area, answers.state, answers.feeling]);

  switch (step) {
    case "entry":
      return <EntryStep onNext={onNext} />;

    case "focus":
      return <FocusStep answers={answers} onNext={onNext} onUpdate={onUpdate} />;

    case "insight":
      return response ? <InsightStep response={response} onNext={onNext} /> : null;

    case "movement":
      return response ? <MovementStep response={response} onNext={onNext} /> : null;

    case "closure":
      return <ClosureStep onRestart={onRestart} />;

    default:
      return null;
  }
}

function EntryStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="operational-step operational-step--entry">
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
      <p className="operational-step__tag">
        {navrosOperationalScreenCopy.entry.helper}
      </p>
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
  const hasArea = Boolean(area.trim());
  const hasState = Boolean(state.trim());
  const selectedAreaLabel =
    hasArea && area.trim().toLowerCase() in navrosAreaLabels
      ? navrosAreaLabels[area.trim().toLowerCase() as keyof typeof navrosAreaLabels]
      : area.trim();
  const selectedStateLabel =
    hasState && state.trim().toLowerCase() in navrosStateLabels
      ? navrosStateLabels[state.trim().toLowerCase() as keyof typeof navrosStateLabels]
      : state.trim();

  function handleAreaSelect(nextArea: string) {
    const shouldReset = nextArea !== area;
    const nextState = shouldReset ? "" : state;
    const nextFeeling = shouldReset ? "" : feeling;

    setArea(nextArea);
    setState(nextState);
    setFeeling(nextFeeling);
    onUpdate({
      area: nextArea,
      state: nextState,
      feeling: nextFeeling,
    });
  }

  function handleStateSelect(nextState: string) {
    const shouldReset = nextState !== state;
    const nextFeeling = shouldReset ? "" : feeling;

    setState(nextState);
    setFeeling(nextFeeling);
    onUpdate({
      area,
      state: nextState,
      feeling: nextFeeling,
    });
  }

  function handleFeelingSelect(nextFeeling: string) {
    setFeeling(nextFeeling);
    onUpdate({
      area,
      state,
      feeling: nextFeeling,
    });
    onNext();
  }

  return (
    <div className="operational-step operational-step--focus">
      <p className="operational-step__helper">
        {navrosOperationalScreenCopy.focus.helper}
      </p>
      {hasArea ? (
        <div className="operational-step__selection">
          <button
            type="button"
            className="operational-step__selected-chip"
            onClick={() => handleAreaSelect("")}
          >
            {selectedAreaLabel}
          </button>
          {hasState ? (
            <button
              type="button"
              className="operational-step__selected-chip"
              onClick={() => handleStateSelect("")}
            >
              {selectedStateLabel}
            </button>
          ) : null}
        </div>
      ) : null}

      {!hasArea ? (
        <div className="operational-step__group operational-step__group--active">
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
                    "operational-step__chip--contextual",
                    isActive && "operational-step__chip--active",
                  )}
                  onClick={() => handleAreaSelect(suggestedArea)}
                >
                  <span className="operational-step__chip-label">
                    {navrosAreaLabels[suggestedArea]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {hasArea && !hasState ? (
        <div className="operational-step__group operational-step__group--active">
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
                  onClick={() => handleStateSelect(suggestedState)}
                >
                  <span className="operational-step__chip-label">
                    {navrosStateLabels[suggestedState]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {hasArea && hasState ? (
        <div className="operational-step__group operational-step__group--active">
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
                  onClick={() => handleFeelingSelect(suggestedFeeling.label)}
                >
                  <span className="operational-step__chip-label">
                    {suggestedFeeling.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InsightStep({
  response,
  onNext,
}: {
  response: NavrosBuiltResponse;
  onNext: () => void;
}) {
  return (
    <div className="operational-step operational-step--insight">
      <p className="operational-step__copy">{response.insight}</p>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action"
          onClick={onNext}
        >
          {navrosOperationalScreenCopy.insight.action}
        </button>
      </div>
    </div>
  );
}

function MovementStep({
  response,
  onNext,
}: {
  response: NavrosBuiltResponse;
  onNext: () => void;
}) {
  const { movement, agent } = response;
  const trajectory: NavrosAgentId[] =
    agent === "NAVROS" ? ["NAVROS"] : ["NAVROS", agent];

  return (
    <div className="operational-step operational-step--movement">
      <p className="operational-step__copy">{movement}</p>
      <div className="operational-step__mandala">
        <MandalaMini activeAgent={agent} trajectory={trajectory} />
      </div>
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
    <div className="operational-step operational-step--closure">
      <p className="operational-step__copy">
        {navrosOperationalScreenCopy.closure.quote}
      </p>
      <div className="operational-step__actions">
        <button
          type="button"
          className="operational-step__action operational-step__action--secondary"
          onClick={onRestart}
        >
          {navrosOperationalScreenCopy.closure.action}
        </button>
      </div>
    </div>
  );
}

export default NavrosOperationalScreen;

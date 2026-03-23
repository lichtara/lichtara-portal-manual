import * as React from "react";

import {
  emptyNavrosOperationalAnswers,
  navrosOperationalSteps,
  type NavrosOperationalAnswers,
} from "./navrosOperationalJourney";
import { navrosOperationalStepperCopy } from "./navrosOperationalCopy";
import { MANDALA_JOURNEY_UI_CSS, journeyCx } from "./journeyUI";
import { NavrosOperationalScreen } from "./NavrosOperationalScreen";

export type NavrosOperationalStepperProps = {
  title?: string;
  intro?: string;
  className?: string;
};

export function NavrosOperationalStepper({
  title = navrosOperationalStepperCopy.title,
  intro = navrosOperationalStepperCopy.intro,
  className,
}: NavrosOperationalStepperProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<NavrosOperationalAnswers>(
    emptyNavrosOperationalAnswers,
  );

  const currentStep = navrosOperationalSteps[currentStepIndex];
  const isEntryStep = currentStep?.id === "entry";
  const shouldShowHeader =
    !isEntryStep && Boolean(navrosOperationalStepperCopy.eyebrow || title || intro);

  function next() {
    setCurrentStepIndex((previousIndex) => {
      return Math.min(previousIndex + 1, navrosOperationalSteps.length - 1);
    });
  }

  function restart() {
    setCurrentStepIndex(0);
    setAnswers(emptyNavrosOperationalAnswers);
  }

  function updateAnswers(data: Partial<NavrosOperationalAnswers>) {
    setAnswers((previousAnswers) => {
      return {
        ...previousAnswers,
        ...data,
      };
    });
  }

  return (
    <section
      className={journeyCx(
        "operational-journey",
        isEntryStep && "operational-journey--entry",
        className,
      )}
    >
      <style>{MANDALA_JOURNEY_UI_CSS}</style>

      {shouldShowHeader ? (
        <header className="operational-journey__header">
          {navrosOperationalStepperCopy.eyebrow ? (
            <p className="operational-journey__eyebrow">
              {navrosOperationalStepperCopy.eyebrow}
            </p>
          ) : null}
          {title ? <h2 className="operational-journey__title">{title}</h2> : null}
          {intro ? <p className="operational-journey__intro">{intro}</p> : null}
        </header>
      ) : null}

      {!isEntryStep ? (
        <div className="operational-journey__progress">
          <p className="operational-journey__count">
            {navrosOperationalStepperCopy.progress(
              currentStepIndex + 1,
              navrosOperationalSteps.length,
            )}
          </p>
          <div className="operational-journey__bar" aria-hidden="true">
            <span
              className="operational-journey__bar-fill"
              style={{
                width: `${((currentStepIndex + 1) / navrosOperationalSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      ) : null}

      <div
        className={journeyCx(
          "operational-journey__panel",
          isEntryStep && "operational-journey__panel--entry",
        )}
      >
        <NavrosOperationalScreen
          step={currentStep?.id ?? "entry"}
          answers={answers}
          onNext={next}
          onUpdate={updateAnswers}
          onRestart={restart}
        />
      </div>
    </section>
  );
}

export default NavrosOperationalStepper;

import * as React from "react";

import {
  emptyNavrosOperationalAnswers,
  navrosOperationalSteps,
  type NavrosOperationalAnswers,
} from "./navrosOperationalJourney";
import { MANDALA_JOURNEY_UI_CSS, journeyCx } from "./journeyUI";
import { NavrosOperationalScreen } from "./NavrosOperationalScreen";

export type NavrosOperationalStepperProps = {
  title?: string;
  intro?: string;
  className?: string;
};

export function NavrosOperationalStepper({
  title = "Jornada NAVROS - V1 Operacional",
  intro = "Fluxo continuo, sem bifurcacoes e sem necessidade de explicacao externa.",
  className,
}: NavrosOperationalStepperProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<NavrosOperationalAnswers>(
    emptyNavrosOperationalAnswers,
  );

  const currentStep = navrosOperationalSteps[currentStepIndex];

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
    <section className={journeyCx("operational-journey", className)}>
      <style>{MANDALA_JOURNEY_UI_CSS}</style>

      <header className="operational-journey__header">
        <p className="operational-journey__eyebrow">Travessia</p>
        <h2 className="operational-journey__title">{title}</h2>
        <p className="operational-journey__intro">{intro}</p>
      </header>

      <div className="operational-journey__progress">
        <p className="operational-journey__count">
          Etapa {currentStepIndex + 1} de {navrosOperationalSteps.length}
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

      <div className="operational-journey__panel">
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

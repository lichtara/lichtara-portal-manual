import * as React from "react";

import { MandalaCanvas, mandalaNodes, mandalaRoutes } from "./MandalaCanvas";
import { JourneySelector } from "./JourneySelector";
import { JourneyStepper } from "./JourneyStepper";
import {
  getMandalaJourneyById,
  getMandalaJourneyTrail,
  mandalaJourneys,
  type MandalaJourney,
  type MandalaJourneyId,
} from "./mandalaJourneys";
import {
  getClosestJourneyStepIndex,
  journeyCx,
  MANDALA_JOURNEY_UI_CSS,
} from "./journeyUI";

export type JourneyScreenProps = {
  journeys?: MandalaJourney[];
  initialJourneyId?: MandalaJourneyId;
  width?: number | string;
  height?: number | string;
  title?: string;
  intro?: string;
  showSelector?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function JourneyScreen({
  journeys = mandalaJourneys,
  initialJourneyId = "perception",
  width = "100%",
  height,
  title = "Por onde voce quer comecar?",
  intro = "Cada caminho ativa uma jornada de 7 etapas. O portal deixa de ser menu e passa a funcionar como travessia orientada pela mandala.",
  showSelector = true,
  className,
  style,
}: JourneyScreenProps) {
  if (journeys.length === 0) {
    return null;
  }

  const safeJourney =
    getMandalaJourneyById(initialJourneyId) ??
    journeys.find((journey) => journey.id === initialJourneyId) ??
    journeys[0];
  const [activeJourneyId, setActiveJourneyId] = React.useState<MandalaJourneyId>(
    safeJourney.id,
  );
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [hoverNodeId, setHoverNodeId] = React.useState<
    (typeof mandalaNodes)[number]["id"] | null
  >(null);

  const activeJourney =
    journeys.find((journey) => journey.id === activeJourneyId) ?? journeys[0];
  const activeStep = activeJourney.steps[activeStepIndex];
  const trailNodeIds = getMandalaJourneyTrail(activeJourney, activeStepIndex);
  const isLastStep = activeStepIndex === activeJourney.steps.length - 1;

  return (
    <section className={journeyCx("journey-screen", className)} style={style}>
      <style>{MANDALA_JOURNEY_UI_CSS}</style>

      <header className="journey-screen__header">
        <p className="journey-screen__eyebrow">Jornadas</p>
        <h2 className="journey-screen__title">{title}</h2>
        <p className="journey-screen__intro">{intro}</p>
      </header>

      {showSelector ? (
        <JourneySelector
          journeys={journeys}
          activeJourneyId={activeJourney.id}
          onJourneySelect={(journeyId) => {
            setActiveJourneyId(journeyId);
            setActiveStepIndex(0);
            setHoverNodeId(null);
          }}
        />
      ) : null}

      <div className="journey-screen__grid">
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

        <JourneyStepper
          journey={activeJourney}
          activeStepIndex={activeStepIndex}
          onStepSelect={setActiveStepIndex}
          onPreviousStep={() =>
            setActiveStepIndex((current) => Math.max(0, current - 1))
          }
          onNextStep={() => {
            if (isLastStep) {
              setActiveStepIndex(0);
              setHoverNodeId(null);
              return;
            }

            setActiveStepIndex((current) =>
              Math.min(activeJourney.steps.length - 1, current + 1),
            );
          }}
        />
      </div>
    </section>
  );
}

export default JourneyScreen;

import * as React from "react";

import {
  MandalaCanvas,
  mandalaNodes,
  mandalaRoutes,
  type MandalaNodeId,
} from "./MandalaCanvas";
import { JourneySelector } from "./JourneySelector";
import { JourneyStepper } from "./JourneyStepper";
import {
  mandalaJourneys,
  type MandalaJourney,
  type MandalaJourneyAnalyticsEvent,
  type MandalaJourneyId,
  type MandalaJourneyProgress,
  type MandalaJourneyProgressChange,
} from "./mandalaJourneys";
import {
  getClosestJourneyStepIndex,
  journeyCx,
  MANDALA_JOURNEY_UI_CSS,
} from "./journeyUI";
import { useJourneyAnalytics } from "./useJourneyAnalytics";
import { useJourneyProgress } from "./useJourneyProgress";

export type JourneyScreenProps = {
  journeys?: MandalaJourney[];
  initialJourneyId?: MandalaJourneyId;
  initialStepIndex?: number;
  progress?: MandalaJourneyProgress;
  defaultProgress?: MandalaJourneyProgress;
  storageKey?: string;
  loadPersistedProgress?: () => MandalaJourneyProgress | null | undefined;
  onPersistProgress?: (progress: MandalaJourneyProgress) => void;
  width?: number | string;
  height?: number | string;
  title?: string;
  intro?: string;
  showSelector?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onProgressChange?: (change: MandalaJourneyProgressChange) => void;
  onAnalyticsEvent?: (event: MandalaJourneyAnalyticsEvent) => void;
  onJourneyComplete?: (change: MandalaJourneyProgressChange) => void;
};

export function JourneyScreen({
  journeys = mandalaJourneys,
  initialJourneyId = "perception",
  initialStepIndex = 0,
  progress,
  defaultProgress,
  storageKey,
  loadPersistedProgress,
  onPersistProgress,
  width = "100%",
  height,
  title = "Por onde voce quer comecar?",
  intro = "Cada caminho ativa uma jornada de 7 etapas. O portal deixa de ser menu e passa a funcionar como travessia orientada pela mandala.",
  showSelector = true,
  className,
  style,
  onProgressChange,
  onAnalyticsEvent,
  onJourneyComplete,
}: JourneyScreenProps) {
  if (journeys.length === 0) {
    return null;
  }

  const { trackProgressChange } = useJourneyAnalytics({
    onAnalyticsEvent,
    onJourneyComplete,
  });
  const {
    activeProgress,
    activeJourney,
    activeStep,
    trailNodeIds,
    isLastStep,
    selectJourney,
    selectStep,
    goToPreviousStep,
    goToNextStep,
  } = useJourneyProgress({
    journeys,
    initialJourneyId,
    initialStepIndex,
    progress,
    defaultProgress,
    storageKey,
    loadPersistedProgress,
    onPersistProgress,
    onProgressChange,
    onProgressCommit: trackProgressChange,
  });
  const [hoverNodeId, setHoverNodeId] = React.useState<MandalaNodeId | null>(
    null,
  );

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
            selectJourney(journeyId);
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
              activeProgress.stepIndex,
              activeJourney.steps,
            );

            if (stepIndex >= 0) {
              selectStep(stepIndex, "canvas");
            }
          }}
        />

        <JourneyStepper
          journey={activeJourney}
          activeStepIndex={activeProgress.stepIndex}
          onStepSelect={(stepIndex) => selectStep(stepIndex, "stepper")}
          onPreviousStep={() => goToPreviousStep()}
          onNextStep={() => {
            if (isLastStep) {
              goToNextStep();
              setHoverNodeId(null);
              return;
            }

            goToNextStep();
          }}
        />
      </div>
    </section>
  );
}

export default JourneyScreen;

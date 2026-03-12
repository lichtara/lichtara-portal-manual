import React from "react";
import ReactDOM from "react-dom/client";

import {
  buildTrajectorySnapshot,
  JourneyScreen,
  mandalaPublicV1Journeys,
  type MandalaJourneyAnalyticsEvent,
  type MandalaJourneyProgress,
  type MandalaJourneyProgressChange,
  type MandalaTrajectoryRecord,
  type MandalaTrajectorySnapshot,
  useFieldFlows,
} from "../implementation/frontend/mandala";

import "./styles.css";

const STORAGE_KEY = "lichtara-mandala-progress";
const TRAJECTORY_STORAGE_KEY = "lichtara-mandala-trajectory";

function readPersistedProgress(): MandalaJourneyProgress | null {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as MandalaJourneyProgress;
  } catch {
    return null;
  }
}

function formatProgress(change: MandalaJourneyProgressChange): string {
  return `${change.journey.label}: etapa ${change.step.order} (${change.step.agentLabel})`;
}

function formatAnalyticsEvent(event: MandalaJourneyAnalyticsEvent): string {
  if (event.type === "journey_selected") {
    return `journey_selected -> ${event.journeyId} / etapa ${event.stepIndex + 1}`;
  }

  if (event.type === "journey_step_changed") {
    return `journey_step_changed -> ${event.journeyId} / ${event.stepId}`;
  }

  return `journey_completed -> ${event.journeyId} / ${event.completionMode}`;
}

function readPersistedTrajectory(): MandalaTrajectoryRecord | null {
  try {
    const rawValue = window.localStorage.getItem(TRAJECTORY_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as MandalaTrajectoryRecord;
  } catch {
    return null;
  }
}

function formatTrajectorySnapshot(
  snapshot: MandalaTrajectorySnapshot | null,
): string {
  if (!snapshot) {
    return "Nenhuma trajetoria registrada ainda.";
  }

  return `${snapshot.points.length} pontos -> ${snapshot.path.join(" -> ")}`;
}

function formatTrajectoryRecord(
  record: MandalaTrajectoryRecord | null,
): string {
  return formatTrajectorySnapshot(
    record ? buildTrajectorySnapshot(record) : null,
  );
}

function App() {
  const [persistedProgress, setPersistedProgress] =
    React.useState<MandalaJourneyProgress | null>(() => readPersistedProgress());
  const [persistedTrajectory, setPersistedTrajectory] =
    React.useState<MandalaTrajectoryRecord | null>(() => readPersistedTrajectory());
  const [lastProgressChange, setLastProgressChange] = React.useState<string>(
    "Nenhuma interacao registrada ainda.",
  );
  const [trajectorySummary, setTrajectorySummary] = React.useState<string>(
    () => formatTrajectoryRecord(readPersistedTrajectory()),
  );
  const [analyticsEvents, setAnalyticsEvents] = React.useState<string[]>([]);
  const {
    activePeriod,
    activePeriodId,
    collectiveFlows,
    isTransitioning,
    periods,
    selectPeriod,
  } = useFieldFlows({
    initialPeriodId: "recent",
  });

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Portal Lichtara</p>
        <h1 className="hero__title">Ambiente React para a mandala viva</h1>
        <p className="hero__copy">
          Esta pagina valida a decisao de produto da V1 publica: uma unica
          jornada de Percepcao, iniciada por NAVROS, com as outras rotas
          mantidas apenas como estrutura futura.
        </p>
      </section>

      <section className="app-grid">
        <JourneyScreen
          journeys={mandalaPublicV1Journeys}
          initialJourneyId="perception"
          showSelector={false}
          title="Jornada V1: Percepcao"
          intro="A V1 publica abre com NAVROS e uma unica travessia de 7 etapas. Estrutura e Acao permanecem preparadas, mas fora da primeira exposicao publica."
          loadPersistedProgress={readPersistedProgress}
          onPersistProgress={(progress) => {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            setPersistedProgress(progress);
          }}
          trajectoryStorageKey={TRAJECTORY_STORAGE_KEY}
          loadPersistedTrajectory={readPersistedTrajectory}
          onPersistTrajectory={(record) => {
            setPersistedTrajectory(record);
          }}
          collectiveFlows={collectiveFlows}
          maxCollectiveFlows={3}
          fieldPeriods={periods}
          activeFieldPeriodId={activePeriodId}
          fieldClimateCopy={activePeriod.climateCopy}
          isFieldTransitioning={isTransitioning}
          onFieldPeriodSelect={selectPeriod}
          onProgressChange={(change) => {
            setLastProgressChange(formatProgress(change));
          }}
          onTrajectoryChange={(_, snapshot) => {
            setTrajectorySummary(formatTrajectorySnapshot(snapshot));
          }}
          onAnalyticsEvent={(event) => {
            setAnalyticsEvents((currentEvents) => {
              return [formatAnalyticsEvent(event), ...currentEvents].slice(0, 6);
            });
          }}
        />

        <aside className="inspector">
          <div className="inspector__section">
            <p className="inspector__eyebrow">Persistencia</p>
            <p className="inspector__copy">
              {persistedProgress
                ? `${persistedProgress.journeyId} / etapa ${persistedProgress.stepIndex + 1}`
                : "Sem progresso persistido."}
            </p>
          </div>

          <div className="inspector__section">
            <p className="inspector__eyebrow">Ultima mudanca</p>
            <p className="inspector__copy">{lastProgressChange}</p>
          </div>

          <div className="inspector__section">
            <p className="inspector__eyebrow">Mapa da Travessia</p>
            <p className="inspector__copy">
              {persistedTrajectory
                ? `${persistedTrajectory.mode} / ${trajectorySummary}`
                : "Sem trajetoria persistida."}
            </p>
          </div>

          <div className="inspector__section">
            <p className="inspector__eyebrow">Campo</p>
            <p className="inspector__copy">
              {collectiveFlows.length > 0
                ? `${activePeriod.label} / ${Math.min(collectiveFlows.length, 3)} correntes suaves ativas.`
                : "Sem fluxos coletivos ativos."}
            </p>
          </div>

          <div className="inspector__section">
            <p className="inspector__eyebrow">Analytics</p>
            <ul className="inspector__events">
              {analyticsEvents.length === 0 ? (
                <li className="inspector__event">Nenhum evento emitido ainda.</li>
              ) : (
                analyticsEvents.map((event, index) => (
                  <li key={`${event}-${index}`} className="inspector__event">
                    {event}
                  </li>
                ))
              )}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

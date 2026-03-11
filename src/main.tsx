import React from "react";
import ReactDOM from "react-dom/client";

import {
  JourneyScreen,
  type MandalaJourneyAnalyticsEvent,
  type MandalaJourneyProgress,
  type MandalaJourneyProgressChange,
} from "../implementation/frontend/mandala";

import "./styles.css";

const STORAGE_KEY = "lichtara-mandala-progress";

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

function App() {
  const [persistedProgress, setPersistedProgress] =
    React.useState<MandalaJourneyProgress | null>(() => readPersistedProgress());
  const [lastProgressChange, setLastProgressChange] = React.useState<string>(
    "Nenhuma interacao registrada ainda.",
  );
  const [analyticsEvents, setAnalyticsEvents] = React.useState<string[]>([]);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Portal Lichtara</p>
        <h1 className="hero__title">Ambiente React para a mandala viva</h1>
        <p className="hero__copy">
          Esta pagina conecta o manual com o prototipo interativo ja presente no
          repositorio, sem mover a implementacao original.
        </p>
      </section>

      <section className="app-grid">
        <JourneyScreen
          loadPersistedProgress={readPersistedProgress}
          onPersistProgress={(progress) => {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            setPersistedProgress(progress);
          }}
          onProgressChange={(change) => {
            setLastProgressChange(formatProgress(change));
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

import React from "react";
import ReactDOM from "react-dom/client";

import { JourneyScreen } from "../implementation/frontend/mandala";

import "./styles.css";

function App() {
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

      <JourneyScreen storageKey="lichtara-mandala-progress" />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

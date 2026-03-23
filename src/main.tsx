import React from "react";
import ReactDOM from "react-dom/client";

import {
  NavrosOperationalStepper,
} from "../implementation/frontend/mandala";

import "./styles.css";

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">Portal Lichtara</p>
        <h1 className="hero__title">Tradução operacional da Jornada NAVROS</h1>
        <p className="hero__copy">
          Esta tela valida a V1 como travessia contínua. Sem múltiplos caminhos,
          sem explicação externa e sem depender da mandala para funcionar.
        </p>
      </section>

      <NavrosOperationalStepper />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";

import {
  NavrosOperationalStepper,
  navrosOperationalHeroCopy,
} from "../implementation/frontend/mandala";

import "./styles.css";

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__eyebrow">{navrosOperationalHeroCopy.eyebrow}</p>
        <h1 className="hero__title">{navrosOperationalHeroCopy.title}</h1>
        <p className="hero__copy">{navrosOperationalHeroCopy.intro}</p>
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

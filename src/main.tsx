import React from "react";
import ReactDOM from "react-dom/client";

import {
  NavrosOperationalStepper,
} from "../implementation/frontend/mandala";

import "./styles.css";

function App() {
  return (
    <main className="app-shell">
      <NavrosOperationalStepper />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import * as React from "react";

import { journeyCx } from "./journeyUI";

export type PortalEntryGateProps = {
  eyebrow?: string;
  title?: string;
  lines?: string[];
  helperCopy?: string;
  ctaLabel?: string;
  className?: string;
  onEnter?: () => void;
};

const DEFAULT_LINES = [
  "O Portal Lichtara nao e uma plataforma de conteudo.",
  "Ele e um espaco de navegacao da experiencia.",
  "Comece pela jornada NAVROS para reconhecer o campo em que voce esta.",
];

export function PortalEntryGate({
  eyebrow = "Orientacao inicial",
  title = "Antes da mandala, um pequeno alinhamento.",
  lines = DEFAULT_LINES,
  helperCopy = "Leitura de 10 a 15 segundos para entrar com clareza, sem precisar entender o sistema inteiro.",
  ctaLabel = "Entrar na Mandala",
  className,
  onEnter,
}: PortalEntryGateProps) {
  return (
    <section className={journeyCx("portal-entry-gate", className)}>
      <p className="portal-entry-gate__eyebrow">{eyebrow}</p>
      <h2 className="portal-entry-gate__title">{title}</h2>

      <div className="portal-entry-gate__lines">
        {lines.map((line) => (
          <p key={line} className="portal-entry-gate__line">
            {line}
          </p>
        ))}
      </div>

      <p className="portal-entry-gate__helper">{helperCopy}</p>

      <button
        type="button"
        className="portal-entry-gate__action"
        onClick={() => onEnter?.()}
      >
        {ctaLabel}
      </button>
    </section>
  );
}

export default PortalEntryGate;

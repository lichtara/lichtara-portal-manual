export type NavrosOperationalStepId =
  | "entry"
  | "focus"
  | "reading"
  | "recognition"
  | "orientation"
  | "movement"
  | "closure";

export type NavrosOperationalAnswers = {
  area: string;
  context: string;
  feeling: string;
};

export type NavrosOperationalStep = {
  id: NavrosOperationalStepId;
  label: string;
};

export const navrosOperationalSteps: NavrosOperationalStep[] = [
  { id: "entry", label: "Entrada" },
  { id: "focus", label: "Foco" },
  { id: "reading", label: "Leitura" },
  { id: "recognition", label: "Reconhecimento" },
  { id: "orientation", label: "Orientacao" },
  { id: "movement", label: "Movimento" },
  { id: "closure", label: "Fechamento" },
];

export const emptyNavrosOperationalAnswers: NavrosOperationalAnswers = {
  area: "",
  context: "",
  feeling: "",
};

function hasWord(source: string, candidates: string[]): boolean {
  const normalized = source.trim().toLowerCase();

  return candidates.some((candidate) => normalized.includes(candidate));
}

export function buildNavrosReadingCopy(
  answers: NavrosOperationalAnswers,
): string {
  const area = answers.area.trim() || "uma area importante da sua vida";
  const context =
    answers.context.trim() || "um contexto que ainda esta pedindo leitura";
  const feeling = answers.feeling.trim() || "um movimento interno ainda sem nome";

  return `Voce esta lidando com ${area}. Existe um contexto de ${context} que esta pedindo atencao, e um movimento de ${feeling} que nao deve ser ignorado agora.`;
}

export function buildNavrosOrientationCopy(
  answers: NavrosOperationalAnswers,
): string {
  const area = answers.area.trim() || "essa situacao";
  const feeling = answers.feeling.trim().toLowerCase();

  if (hasWord(feeling, ["clareza", "confus", "duvida"])) {
    return `Nas proximas 24 horas, observe o que em ${area} ainda gera ruido antes de tomar qualquer decisao.`;
  }

  if (hasWord(feeling, ["peso", "cansa", "resist"])) {
    return `Nas proximas 24 horas, observe onde ${area} esta consumindo energia sem devolver clareza.`;
  }

  if (hasWord(feeling, ["agir", "mov", "impulso"])) {
    return `Nas proximas 24 horas, faca apenas um movimento concreto em ${area} e observe como o campo responde.`;
  }

  return `Nas proximas 24 horas, observe como voce reage quando ${area} volta a pedir atencao.`;
}

export function buildNavrosMovementCopy(
  answers: NavrosOperationalAnswers,
): string {
  const feeling = answers.feeling.trim().toLowerCase();

  if (hasWord(feeling, ["clareza", "lucid", "ver"])) {
    return "Voce esta entrando em uma fase de clareza.";
  }

  if (hasWord(feeling, ["agir", "mov", "impulso"])) {
    return "Voce esta entrando em uma fase de movimento.";
  }

  return "Voce esta entrando em uma fase de reorganizacao.";
}

import {
  composeNavrosInsightCopy,
  buildNavrosMovementLineCopy,
  navrosOperationalStepLabels,
  resolveNavrosIntensity,
  navrosSuggestedAreas,
  navrosSuggestedFeelings,
  navrosSuggestedStates,
  type NavrosIntensity,
} from "./navrosOperationalCopy";
import {
  autoCorrectByDomain,
  normalizeNavrosDomain,
} from "./navrosDomainAutoCorrect";
import {
  autoCorrectNavrosCopy,
  validateNavrosCopy,
} from "./navrosOperationalCopyGuardrails";

export type NavrosOperationalStepId =
  | "entry"
  | "focus"
  | "insight"
  | "movement"
  | "closure";

export type NavrosOperationalAnswers = {
  area: string;
  state: string;
  feeling: string;
};

export type NavrosSessionMemory = {
  recentStates: string[];
  recentFeelings: string[];
  lastIntensity?: NavrosIntensity;
};

export type NavrosReadingPatternId =
  | "confusao"
  | "sobrecarga"
  | "paralisia"
  | "duvida"
  | "ansiedade"
  | "desalinhamento"
  | "indefinicao"
  | "fallback";

export type NavrosReadingFeelingId =
  | "confusao"
  | "pressao"
  | "duvida"
  | "travamento"
  | "ansiedade"
  | "desalinhamento"
  | "indefinicao"
  | "fallback";

export type MovementType =
  | "clarify"
  | "organize"
  | "stabilize"
  | "initiate"
  | "expand";

export type NavrosAgentId =
  | "NAVROS"
  | "LUMORA"
  | "SYNTARIS"
  | "FLUX"
  | "VORAX";

export type NavrosOperationalStep = {
  id: NavrosOperationalStepId;
  label: string;
};

export const navrosOperationalSteps: NavrosOperationalStep[] = [
  { id: "entry", label: navrosOperationalStepLabels.entry },
  { id: "focus", label: navrosOperationalStepLabels.focus },
  { id: "insight", label: navrosOperationalStepLabels.insight },
  { id: "movement", label: navrosOperationalStepLabels.movement },
  { id: "closure", label: navrosOperationalStepLabels.closure },
];

export const emptyNavrosOperationalAnswers: NavrosOperationalAnswers = {
  area: "",
  state: "",
  feeling: "",
};

export const emptyNavrosSessionMemory: NavrosSessionMemory = {
  recentStates: [],
  recentFeelings: [],
};

export type NavrosBuiltResponse = {
  insight: string;
  movement: string;
  intensity: NavrosIntensity;
  pattern: NavrosReadingPatternId;
  movementType: MovementType;
  agent: NavrosAgentId;
};

const NAVROS_PATTERN_IDS: NavrosReadingPatternId[] = [
  "confusao",
  "sobrecarga",
  "paralisia",
  "duvida",
  "ansiedade",
  "desalinhamento",
  "indefinicao",
  "fallback",
];

const NAVROS_MEDIUM_MOVEMENT_VARIANTS: Partial<Record<string, string[]>> = {
  "Algo começa a se reorganizar.": [
    "Algo começa a se reorganizar.",
    "Algo começa a ganhar outro arranjo.",
    "Algo começa a encontrar outro eixo.",
  ],
  "Mais clareza começa a se formar.": [
    "Mais clareza começa a se formar.",
    "Mais clareza começa a ganhar forma.",
  ],
  "Um critério começa a aparecer.": [
    "Um critério começa a aparecer.",
    "Um critério começa a ganhar contorno.",
  ],
  "Um movimento pequeno já encontra espaço.": [
    "Um movimento pequeno já encontra espaço.",
    "Um movimento pequeno começa a ganhar espaço.",
  ],
};

const NAVROS_HIGH_MOVEMENT_VARIANTS: Partial<Record<string, string[]>> = {
  "Algo começa a se reorganizar.": [
    "Algo começa a se reorganizar.",
    "Algo precisa começar a se reorganizar.",
    "Algo passa a exigir ajuste para se reorganizar.",
  ],
  "Algo começa a se ajustar.": [
    "Algo começa a se ajustar.",
    "Algo precisa começar a se ajustar.",
    "Algo passa a exigir ajuste para se ajustar.",
  ],
  "Algo começa a encontrar outro arranjo.": [
    "Algo começa a encontrar outro arranjo.",
    "Algo precisa encontrar outro arranjo.",
    "Algo passa a exigir ajuste para encontrar outro arranjo.",
  ],
  "Algo começa a se recompor.": [
    "Algo começa a se recompor.",
    "Algo precisa começar a se recompor.",
    "Algo passa a exigir ajuste para se recompor.",
  ],
  "Algo começa a se reposicionar.": [
    "Algo começa a se reposicionar.",
    "Algo precisa começar a se reposicionar.",
    "Algo passa a exigir ajuste para se reposicionar.",
  ],
  "Um novo equilíbrio começa a aparecer.": [
    "Um novo equilíbrio começa a aparecer.",
    "Um novo equilíbrio precisa começar a aparecer.",
    "Algo passa a exigir ajuste para que outro equilíbrio apareça.",
  ],
  "Um movimento pequeno já encontra espaço.": [
    "Um movimento pequeno já encontra espaço.",
    "Um movimento pequeno precisa encontrar espaço.",
    "Esse movimento já pede espaço para se sustentar.",
  ],
};

function hasWord(source: string, candidates: string[]): boolean {
  const normalized = source.trim().toLowerCase();

  return candidates.some((candidate) => normalized.includes(candidate));
}

function isNavrosReadingPatternId(value: string): value is NavrosReadingPatternId {
  return NAVROS_PATTERN_IDS.includes(value as NavrosReadingPatternId);
}

function getStableChoiceIndex(parts: string[], length: number): number {
  if (length <= 1) {
    return 0;
  }

  const seed = parts.join(":");
  let total = 0;

  for (let index = 0; index < seed.length; index += 1) {
    total += seed.charCodeAt(index) * (index + 1);
  }

  return total % length;
}

function selectStableTextVariant(
  parts: string[],
  variants: string[],
): string {
  const index = getStableChoiceIndex(parts, variants.length);

  return variants[index] ?? variants[0] ?? "";
}

function resolvePattern(
  feeling: string | NavrosReadingPatternId,
): NavrosReadingPatternId {
  return typeof feeling === "string" && isNavrosReadingPatternId(feeling)
    ? feeling
    : normalizeNavrosFeeling(String(feeling));
}

export function normalizeNavrosReadingFeeling(
  feeling: string,
): NavrosReadingFeelingId {
  const normalizedFeeling = feeling.trim().toLowerCase();

  if (!normalizedFeeling) {
    return "fallback";
  }

  if (hasWord(normalizedFeeling, ["confus", "perdid", "sem dire", "sem rumo"])) {
    return "confusao";
  }

  if (hasWord(normalizedFeeling, ["pressao", "pressa", "urgenc", "aperto"])) {
    return "pressao";
  }

  if (hasWord(normalizedFeeling, ["duvid", "indecis", "incert"])) {
    return "duvida";
  }

  if (hasWord(normalizedFeeling, ["trav", "parad", "procrast", "bloque"])) {
    return "travamento";
  }

  if (hasWord(normalizedFeeling, ["ansied", "aceler"])) {
    return "ansiedade";
  }

  if (hasWord(normalizedFeeling, ["desalinh", "desconex", "incomod", "errad", "estranh", "fora do lugar"])) {
    return "desalinhamento";
  }

  if (hasWord(normalizedFeeling, ["indefin", "sem forma", "vago", "vaga", "nevoa"])) {
    return "indefinicao";
  }

  return "fallback";
}

function normalizeNavrosState(state: string): string {
  const normalizedState = state.trim().toLowerCase();

  if (!normalizedState) {
    return "";
  }

  if (hasWord(normalizedState, ["sobrec", "excesso", "acumul"])) {
    return "sobrecarga";
  }

  if (hasWord(normalizedState, ["estagn", "parad", "trav"])) {
    return "estagnacao";
  }

  if (hasWord(normalizedState, ["indefin", "nevoa", "sem forma"])) {
    return "indefinicao";
  }

  if (hasWord(normalizedState, ["instab", "oscil", "volatil"])) {
    return "instabilidade";
  }

  if (hasWord(normalizedState, ["press", "aperto"])) {
    return "pressao";
  }

  if (hasWord(normalizedState, ["mud", "trans"])) {
    return "mudanca";
  }

  if (hasWord(normalizedState, ["inic", "comec"])) {
    return "inicio";
  }

  return normalizedState;
}

function resolvePatternFromSignals(
  normalizedState: string,
  feelingPattern: NavrosReadingPatternId,
): NavrosReadingPatternId {
  if (normalizedState === "sobrecarga") {
    return "sobrecarga";
  }

  if (
    normalizedState === "estagnacao" &&
    (feelingPattern === "duvida" || feelingPattern === "fallback")
  ) {
    return "paralisia";
  }

  if (
    normalizedState === "indefinicao" &&
    (feelingPattern === "duvida" ||
      feelingPattern === "ansiedade" ||
      feelingPattern === "fallback")
  ) {
    return "indefinicao";
  }

  return feelingPattern;
}

function resolvePatternFromAnswers(
  answers: NavrosOperationalAnswers,
): NavrosReadingPatternId {
  return resolvePatternFromSignals(
    normalizeNavrosState(answers.state),
    normalizeNavrosFeeling(answers.feeling),
  );
}

function buildNavrosMovementLine(
  pattern: NavrosReadingPatternId,
  area: string,
): string {
  return buildNavrosMovementLineCopy(
    pattern,
    area.trim().toLowerCase(),
  );
}

function validateBuiltCopy(
  kind: "insight" | "movement",
  text: string,
  answers: NavrosOperationalAnswers,
): void {
  if (!import.meta.env.DEV) {
    return;
  }

  const validation = validateNavrosCopy(text);

  if (!validation.valid) {
    console.warn(`Navros ${kind} copy issue:`, validation.issues, {
      answers,
      text,
    });
  }
}

export function updateNavrosSessionMemory(
  memory: NavrosSessionMemory,
  answers: NavrosOperationalAnswers,
): NavrosSessionMemory {
  const normalizedState = normalizeNavrosState(answers.state);
  const normalizedFeeling = normalizeNavrosReadingFeeling(answers.feeling);

  return {
    recentStates: [...memory.recentStates.slice(-2), normalizedState],
    recentFeelings: [...memory.recentFeelings.slice(-2), normalizedFeeling],
    lastIntensity: resolveNavrosIntensity(normalizedFeeling, normalizedState),
  };
}

export function adjustNavrosIntensityWithMemory(
  base: NavrosIntensity,
  memory: NavrosSessionMemory,
  normalizedFeeling: string,
): NavrosIntensity {
  if (base !== "medium") {
    return base;
  }

  const repeatedFeelingCount = memory.recentFeelings.filter((feeling) => {
    return feeling === normalizedFeeling;
  }).length;

  return repeatedFeelingCount >= 2 ? "high" : base;
}

function applyIntensityToMovement(
  text: string,
  intensity: NavrosIntensity,
  answers: NavrosOperationalAnswers,
): string {
  if (intensity === "low") {
    return text;
  }

  const seedParts = [
    answers.area.trim().toLowerCase(),
    answers.state.trim().toLowerCase(),
    answers.feeling.trim().toLowerCase(),
    intensity,
    text,
  ];

  if (intensity === "medium") {
    const variants = NAVROS_MEDIUM_MOVEMENT_VARIANTS[text];

    if (!variants) {
      return text;
    }

    return selectStableTextVariant(seedParts, variants);
  }

  const variants = NAVROS_HIGH_MOVEMENT_VARIANTS[text];

  if (!variants) {
    return text;
  }

  return selectStableTextVariant(seedParts, variants);
}

export function normalizeNavrosFeeling(
  feeling: string,
): NavrosReadingPatternId {
  const readingFeeling = normalizeNavrosReadingFeeling(feeling);

  switch (readingFeeling) {
    case "confusao":
      return "confusao";

    case "pressao":
    case "ansiedade":
      return "ansiedade";

    case "duvida":
      return "duvida";

    case "travamento":
      return "paralisia";

    case "desalinhamento":
      return "desalinhamento";

    case "indefinicao":
      return "indefinicao";

    default: {
      const normalizedFeeling = feeling.trim().toLowerCase();

      if (hasWord(normalizedFeeling, ["sobrec", "excesso", "peso", "sufoc"])) {
        return "sobrecarga";
      }

      return "fallback";
    }
  }
}

export function getMovementType(
  feeling: string | NavrosReadingPatternId,
): MovementType {
  const pattern = resolvePattern(feeling);

  switch (pattern) {
    case "confusao":
    case "duvida":
      return "clarify";

    case "sobrecarga":
    case "desalinhamento":
      return "organize";

    case "ansiedade":
    case "indefinicao":
    case "fallback":
      return "stabilize";

    case "paralisia":
      return "initiate";

    default:
      return "stabilize";
  }
}

export function getAgentFromMovement(
  movement: MovementType,
): NavrosAgentId {
  switch (movement) {
    case "clarify":
      return "LUMORA";

    case "organize":
      return "SYNTARIS";

    case "stabilize":
      return "NAVROS";

    case "initiate":
      return "FLUX";

    case "expand":
      return "VORAX";

    default:
      return "LUMORA";
  }
}

export function resolveNextAgent(
  feeling: string | NavrosReadingPatternId,
): {
  pattern: NavrosReadingPatternId;
  movement: MovementType;
  agent: NavrosAgentId;
} {
  const pattern = resolvePattern(feeling);
  const movement = getMovementType(pattern);
  const agent = getAgentFromMovement(movement);

  return { pattern, movement, agent };
}

export function resolveNextAgentFromAnswers(
  answers: NavrosOperationalAnswers,
): {
  pattern: NavrosReadingPatternId;
  movement: MovementType;
  agent: NavrosAgentId;
} {
  const pattern = resolvePatternFromSignals(
    normalizeNavrosState(answers.state),
    normalizeNavrosFeeling(answers.feeling),
  );
  const movement = getMovementType(pattern);
  const agent = getAgentFromMovement(movement);

  return { pattern, movement, agent };
}

export function buildNavrosInsightCopy(
  answers: NavrosOperationalAnswers,
  memory: NavrosSessionMemory = emptyNavrosSessionMemory,
): string {
  return buildNavrosResponse(answers, memory).insight;
}

export function buildNavrosMovementCopy(
  answers: NavrosOperationalAnswers,
  memory: NavrosSessionMemory = emptyNavrosSessionMemory,
): string {
  return buildNavrosResponse(answers, memory).movement;
}

export function buildNavrosResponse(
  answers: NavrosOperationalAnswers,
  memory: NavrosSessionMemory = emptyNavrosSessionMemory,
): NavrosBuiltResponse {
  const normalizedState = normalizeNavrosState(answers.state);
  const normalizedFeelingReading = normalizeNavrosReadingFeeling(
    answers.feeling,
  );
  const normalizedFeelingPattern = normalizeNavrosFeeling(answers.feeling);
  const pattern = resolvePatternFromSignals(
    normalizedState,
    normalizedFeelingPattern,
  );
  const domain = normalizeNavrosDomain(answers.area);
  const baseIntensity = resolveNavrosIntensity(
    normalizedFeelingReading,
    normalizedState,
  );
  const intensity = adjustNavrosIntensityWithMemory(
    baseIntensity,
    memory,
    normalizedFeelingReading,
  );
  const rawInsight = composeNavrosInsightCopy(
    answers.area,
    normalizedState,
    normalizedFeelingReading,
    intensity,
    pattern,
  );
  const rawMovement = buildNavrosMovementLine(
    pattern,
    answers.area,
  );
  const insight = autoCorrectNavrosCopy(
    autoCorrectByDomain(rawInsight, domain, "insight"),
  );
  const movement = autoCorrectNavrosCopy(
    applyIntensityToMovement(
      autoCorrectByDomain(rawMovement, domain, "movement"),
      intensity,
      answers,
    ),
  );
  const movementType = getMovementType(pattern);
  const agent = getAgentFromMovement(movementType);

  validateBuiltCopy("insight", insight, answers);
  validateBuiltCopy("movement", movement, answers);

  return {
    insight,
    movement,
    intensity,
    pattern,
    movementType,
    agent,
  };
}

import {
  buildNavrosMovementLineCopy,
  buildNavrosReadingAnchorCopy,
  buildNavrosReadingDirectionCopy,
  buildNavrosReadingStructureCopy,
  navrosOperationalStepLabels,
  resolveNavrosReadingVariantCopy,
  navrosSuggestedAreas,
  navrosSuggestedFeelings,
  navrosSuggestedStates,
  type NavrosReadingVariant,
} from "./navrosOperationalCopy";

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

function hasWord(source: string, candidates: string[]): boolean {
  const normalized = source.trim().toLowerCase();

  return candidates.some((candidate) => normalized.includes(candidate));
}

function isNavrosReadingPatternId(value: string): value is NavrosReadingPatternId {
  return NAVROS_PATTERN_IDS.includes(value as NavrosReadingPatternId);
}

function buildNavrosReadingAnchor(
  area: string,
  state: string,
  variant: NavrosReadingVariant,
): string {
  const normalizedState = normalizeNavrosState(state);

  return buildNavrosReadingAnchorCopy(area, normalizedState, variant);
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

function resolvePatternFromAnswers(
  answers: NavrosOperationalAnswers,
): NavrosReadingPatternId {
  const state = normalizeNavrosState(answers.state);
  const feelingPattern = normalizeNavrosFeeling(answers.feeling);

  if (state === "sobrecarga") {
    return "sobrecarga";
  }

  if (state === "estagnacao" && (feelingPattern === "duvida" || feelingPattern === "fallback")) {
    return "paralisia";
  }

  if (
    state === "indefinicao" &&
    (feelingPattern === "duvida" ||
      feelingPattern === "ansiedade" ||
      feelingPattern === "fallback")
  ) {
    return "indefinicao";
  }

  return feelingPattern;
}

function buildNavrosReadingStructure(
  state: string,
  feeling: string,
  variant: NavrosReadingVariant,
): string {
  const normalizedFeeling = normalizeNavrosReadingFeeling(feeling);

  return buildNavrosReadingStructureCopy(
    normalizeNavrosState(state),
    normalizedFeeling,
    variant,
  );
}

function buildNavrosReadingDirection(
  state: string,
  feeling: string,
  variant: NavrosReadingVariant,
): string {
  return buildNavrosReadingDirectionCopy(
    normalizeNavrosState(state),
    normalizeNavrosReadingFeeling(feeling),
    variant,
  );
}

function resolveNavrosReadingVariant(
  state: string,
  feeling: string,
): NavrosReadingVariant {
  return resolveNavrosReadingVariantCopy(
    normalizeNavrosState(state),
    normalizeNavrosReadingFeeling(feeling),
  );
}

function buildNavrosMovementLine(feeling: string): string {
  return buildNavrosMovementLineCopy(
    normalizeNavrosReadingFeeling(feeling),
  );
}

function lowerFirst(text: string): string {
  if (!text) {
    return text;
  }

  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

function softenNavrosDirection(text: string): string {
  const trimmed = text.trim().replace(/[.!?]+$/u, "");

  if (!trimmed) {
    return "algo comeca a ganhar nitidez";
  }

  const replacements: Array<[RegExp, string]> = [
    [/^Antes de decidir,\s*vale\s+/iu, ""],
    [/^Antes de responder,\s*pode ser mais util\s+/iu, ""],
    [/^Definir um criterio claro tende a\s+/iu, "um criterio claro costuma "],
    [/^Um primeiro passo menor pode ser suficiente para\s+/iu, "um primeiro passo menor ja pode "],
    [/^Ganhar um pouco mais de clareza antes de agir tende a\s+/iu, "mais clareza costuma "],
    [/^Reconhecer o que ja nao faz sentido pode\s+/iu, "reconhecer o que ja nao faz sentido costuma "],
    [/^Observar mais um pouco pode\s+/iu, "observar mais um pouco costuma "],
    [/^Antes de escolher,\s*pode ser mais importante\s+/iu, ""],
    [/^Talvez o proximo passo nao seja decidir ja, mas\s+/iu, ""],
    [/^Antes de resolver,\s*pode ser mais importante\s+/iu, ""],
    [/^Antes de tentar resolver,\s*pode ser mais importante\s+/iu, ""],
    [/^Antes de responder,\s*/iu, ""],
    [/^Antes de avancar,\s*/iu, ""],
    [/^Em vez de retomar tudo,\s*/iu, ""],
    [/^Antes de insistir no que ja nao responde,\s*/iu, ""],
  ];

  const softened = replacements.reduce((current, [pattern, replacement]) => {
    return current.replace(pattern, replacement);
  }, trimmed);

  return lowerFirst(softened.trim());
}

function softenNavrosMovement(text: string): string {
  const trimmed = text.trim().replace(/[.!?]+$/u, "");

  if (!trimmed) {
    return "Algo começa a se reorganizar.";
  }

  const softened = trimmed
    .replace(/^O proximo passo e\s+/iu, "")
    .replace(/^Mais\s+/iu, "Mais ")
    .trim();

  const withLeading = softened === trimmed ? softened : lowerFirst(softened);

  return withLeading.endsWith(".") ? withLeading : `${withLeading}.`;
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
  const pattern = resolvePatternFromAnswers(answers);
  const movement = getMovementType(pattern);
  const agent = getAgentFromMovement(movement);

  return { pattern, movement, agent };
}

export function buildNavrosInsightCopy(
  answers: NavrosOperationalAnswers,
): string {
  const variant = resolveNavrosReadingVariant(answers.state, answers.feeling);
  const anchor = buildNavrosReadingAnchor(
    answers.area,
    answers.state,
    variant,
  );
  const structure = buildNavrosReadingStructure(
    answers.state,
    answers.feeling,
    variant,
  );
  const direction = buildNavrosReadingDirection(
    answers.state,
    answers.feeling,
    variant,
  );

  return `${anchor} ${structure}\n\n${softenNavrosDirection(direction)}.`;
}

export function buildNavrosMovementCopy(
  answers: NavrosOperationalAnswers,
): string {
  return softenNavrosMovement(buildNavrosMovementLine(answers.feeling));
}

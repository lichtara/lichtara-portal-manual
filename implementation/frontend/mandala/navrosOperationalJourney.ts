export type NavrosOperationalStepId =
  | "entry"
  | "focus"
  | "reading"
  | "orientation"
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
  { id: "entry", label: "Entrada" },
  { id: "focus", label: "Foco" },
  { id: "reading", label: "Leitura" },
  { id: "orientation", label: "Orientação" },
  { id: "movement", label: "Movimento" },
  { id: "closure", label: "Fechamento" },
];

export const emptyNavrosOperationalAnswers: NavrosOperationalAnswers = {
  area: "",
  state: "",
  feeling: "",
};

export const navrosSuggestedAreas = [
  "trabalho",
  "saude",
  "relacoes",
  "financas",
  "proposito",
  "transicao",
] as const;

export const navrosAreaLabels: Record<(typeof navrosSuggestedAreas)[number], string> = {
  trabalho: "trabalho",
  saude: "saúde",
  relacoes: "relações",
  financas: "finanças",
  proposito: "propósito",
  transicao: "transição",
};

export const navrosSuggestedStates = [
  "inicio",
  "sobrecarga",
  "mudanca",
  "instabilidade",
  "estagnacao",
] as const;

export const navrosStateLabels: Record<(typeof navrosSuggestedStates)[number], string> = {
  inicio: "início",
  sobrecarga: "sobrecarga",
  mudanca: "mudança",
  instabilidade: "instabilidade",
  estagnacao: "estagnação",
};

export const navrosSuggestedFeelings: Array<{
  id: NavrosReadingFeelingId;
  label: string;
  pattern: NavrosReadingPatternId;
}> = [
  { id: "confusao", label: "confusão", pattern: "confusao" },
  { id: "duvida", label: "dúvida", pattern: "duvida" },
  { id: "ansiedade", label: "ansiedade", pattern: "ansiedade" },
  { id: "travamento", label: "travamento", pattern: "paralisia" },
  { id: "desalinhamento", label: "desalinhamento", pattern: "desalinhamento" },
];

export const movementLabels: Record<MovementType, string> = {
  clarify: "clareza",
  organize: "organização",
  stabilize: "estabilização",
  initiate: "início de movimento",
  expand: "expansão",
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

function resolveAreaPrefix(area: string): string {
  const normalizedArea = area.trim();

  if (!normalizedArea) {
    return "Neste momento,";
  }

  const displayArea =
    normalizedArea in navrosAreaLabels
      ? navrosAreaLabels[normalizedArea as keyof typeof navrosAreaLabels]
      : normalizedArea;

  return `Na área de ${displayArea},`;
}

function buildNavrosReadingAnchor(
  area: string,
  state: string,
): string {
  const areaPrefix = resolveAreaPrefix(area);
  const normalizedState = normalizeNavrosState(state);

  switch (normalizedState) {
    case "inicio":
      return `${areaPrefix} algo está começando a tomar forma.`;

    case "pressao":
      return `${areaPrefix} há uma pressão ativa pedindo resposta.`;

    case "mudanca":
      return `${areaPrefix} um movimento de mudança já está em curso.`;

    case "sobrecarga":
      return `${areaPrefix} há acúmulo no mesmo nível de prioridade.`;

    case "instabilidade":
      return `${areaPrefix} o que aparece ainda muda de forma com rapidez.`;

    case "estagnacao":
      return `${areaPrefix} as coisas não estão avançando como poderiam.`;

    default:
      return `${areaPrefix} algo está pedindo leitura com mais precisão.`;
  }
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
): string {
  const normalizedFeeling = normalizeNavrosReadingFeeling(feeling);

  switch (normalizedFeeling) {
    case "confusao":
      return "Há elementos suficientes para agir, mas ainda sem organização clara para sustentar uma escolha.";

    case "pressao":
      return "A demanda por resposta está mais rápida do que a clareza disponível.";

    case "duvida":
      return "Mais de uma possibilidade se apresenta, mas sem um critério definido entre elas.";

    case "travamento":
      return "Existe movimento possível, mas ele ainda não encontra base suficiente para acontecer.";

    case "ansiedade":
      return "O impulso por resolver pode estar antecipando um passo que ainda não se sustenta.";

    case "desalinhamento":
      return "Algo continua em movimento mesmo já não estando coerente internamente.";

    case "indefinicao":
      return "O que está acontecendo ainda não terminou de se mostrar com clareza.";

    default:
      if (normalizeNavrosState(state) === "sobrecarga") {
        return "Há exigências demais ocupando o mesmo espaço, o que reduz a capacidade de distinguir prioridade.";
      }

      return "Há um padrão em formação que ainda não está completamente claro.";
  }
}

function buildNavrosReadingDirection(
  state: string,
  feeling: string,
): string {
  const normalizedState = normalizeNavrosState(state);
  const normalizedFeeling = normalizeNavrosReadingFeeling(feeling);

  if (normalizedState === "sobrecarga") {
    return "Antes de responder a tudo, vale devolver prioridade apenas ao que realmente pede espaço agora.";
  }

  if (normalizedState === "indefinicao") {
    return "Observar mais um pouco pode permitir que a direção apareça com mais nitidez.";
  }

  if (normalizedState === "estagnacao") {
    return "Um primeiro passo menor pode ser suficiente para devolver movimento ao que ficou parado.";
  }

  switch (normalizedFeeling) {
    case "confusao":
      return "Antes de decidir, vale reduzir as opções ao que realmente importa agora.";

    case "pressao":
      return "Antes de responder, pode ser mais útil desacelerar o ritmo da decisão.";

    case "duvida":
      return "Definir um critério claro tende a tornar a escolha mais simples.";

    case "travamento":
      return "Um primeiro passo menor pode ser suficiente para iniciar movimento.";

    case "ansiedade":
      return "Ganhar um pouco mais de clareza antes de agir tende a evitar desalinhamento.";

    case "desalinhamento":
      return "Reconhecer o que já não faz sentido pode reorganizar o caminho.";

    case "indefinicao":
      return "Observar mais um pouco pode permitir que a direção apareça com mais nitidez.";

    default:
      return "Vale observar antes de tentar resolver imediatamente.";
  }
}

function buildNavrosOrientationAction(
  state: string,
  feeling: string,
): string {
  const normalizedState = normalizeNavrosState(state);
  const normalizedFeeling = normalizeNavrosReadingFeeling(feeling);

  if (normalizedState === "sobrecarga") {
    return "devolva prioridade apenas ao que realmente pede espaço agora, em vez de sustentar tudo no mesmo nível";
  }

  if (normalizedState === "estagnacao") {
    return "dê um primeiro passo pequeno, sem tentar resolver tudo ao mesmo tempo";
  }

  if (normalizedState === "indefinicao") {
    return "observe mais um pouco antes de tentar chegar a uma resposta";
  }

  switch (normalizedFeeling) {
    case "confusao":
      return "reduza as opções ao que realmente importa antes de decidir";

    case "pressao":
      return "evite responder imediatamente ao que parece urgente";

    case "duvida":
      return "defina um critério simples antes de decidir";

    case "travamento":
      return "comece por um passo pequeno, sem tentar resolver tudo de uma vez";

    case "ansiedade":
      return "reserve alguns minutos apenas para observar antes de agir";

    case "desalinhamento":
      return "reconheça o que já não faz sentido sustentar";

    case "indefinicao":
      return "observe mais um pouco antes de tentar chegar a uma resposta";

    default:
      return "observe melhor o que está acontecendo antes de responder";
  }
}

function buildNavrosMovementLine(feeling: string): string {
  const normalizedFeeling = normalizeNavrosReadingFeeling(feeling);

  switch (normalizedFeeling) {
    case "confusao":
      return "O próximo passo é ganhar mais clareza antes de decidir.";

    case "pressao":
      return "O próximo passo é reduzir a urgência antes de responder.";

    case "duvida":
      return "O próximo passo é definir um critério antes de escolher.";

    case "travamento":
      return "O próximo passo é iniciar um movimento pequeno e possível.";

    case "ansiedade":
      return "O próximo passo é ganhar um pouco mais de estabilidade antes de agir.";

    case "desalinhamento":
      return "O próximo passo é reorganizar o que já não faz sentido.";

    case "indefinicao":
      return "O próximo passo é observar mais antes de avançar.";

    default:
      return "O próximo passo é observar melhor antes de responder.";
  }
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

export function buildNavrosReadingCopy(
  answers: NavrosOperationalAnswers,
): string {
  return [
    buildNavrosReadingAnchor(answers.area, answers.state),
    buildNavrosReadingStructure(answers.state, answers.feeling),
    buildNavrosReadingDirection(answers.state, answers.feeling),
  ].join("\n\n");
}

export function buildNavrosOrientationCopy(
  answers: NavrosOperationalAnswers,
): string {
  return `Nas próximas 24 horas, ${buildNavrosOrientationAction(
    answers.state,
    answers.feeling,
  )}.`;
}

export function buildNavrosMovementCopy(
  answers: NavrosOperationalAnswers,
): string {
  const { agent } = resolveNextAgentFromAnswers(answers);

  return `${buildNavrosMovementLine(answers.feeling)}

Você está entrando em uma fase de ${agent}.`;
}

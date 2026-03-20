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

export type NavrosReadingPatternId =
  | "confusao"
  | "sobrecarga"
  | "paralisia"
  | "duvida"
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

export const navrosSuggestedAreas = [
  "trabalho",
  "saude",
  "relacoes",
  "financas",
  "proposito",
  "transicao",
] as const;

export const navrosSuggestedFeelings: Array<{
  id: NavrosReadingPatternId;
  label: string;
}> = [
  { id: "confusao", label: "confusao" },
  { id: "sobrecarga", label: "sobrecarga" },
  { id: "paralisia", label: "paralisia" },
  { id: "duvida", label: "duvida" },
  { id: "ansiedade", label: "ansiedade" },
  { id: "desalinhamento", label: "desalinhamento" },
  { id: "indefinicao", label: "indefinicao" },
];

export const movementLabels: Record<MovementType, string> = {
  clarify: "clareza",
  organize: "organizacao",
  stabilize: "estabilizacao",
  initiate: "inicio de movimento",
  expand: "expansao",
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

  return `Na area de ${normalizedArea},`;
}

function resolvePattern(
  feeling: string | NavrosReadingPatternId,
): NavrosReadingPatternId {
  return typeof feeling === "string" && isNavrosReadingPatternId(feeling)
    ? feeling
    : normalizeNavrosFeeling(String(feeling));
}

type NavrosReadingParts = {
  anchor: string;
  structure: string;
  opening: string;
};

function buildNavrosReadingParts(
  pattern: NavrosReadingPatternId,
  answers: NavrosOperationalAnswers,
): NavrosReadingParts {
  const areaPrefix = resolveAreaPrefix(answers.area);

  switch (pattern) {
    case "confusao":
      return {
        anchor: `${areaPrefix} o que aparece e excesso de possibilidades sem criterio suficiente para escolher.`,
        structure:
          "Nem toda possibilidade precisa do mesmo peso agora. Sem um criterio claro, tudo comeca a parecer urgencia.",
        opening:
          "Antes de decidir, talvez seja mais util reconhecer o que realmente importa neste momento.",
      };

    case "sobrecarga":
      return {
        anchor: `${areaPrefix} o que aparece e um acumulo de demandas no mesmo nivel de prioridade.`,
        structure:
          "Nem tudo que esta na sua frente tem o mesmo peso, mas tudo esta sendo tratado como se tivesse.",
        opening:
          "Antes de tentar dar conta de tudo, pode ser mais util devolver peso ao que realmente importa agora.",
      };

    case "paralisia":
      return {
        anchor: `${areaPrefix} existe movimento possivel, mas ele ainda nao encontrou uma base clara para se sustentar.`,
        structure:
          "Quando falta um ponto de apoio, o sistema segura o movimento em vez de conseguir sustenta-lo.",
        opening:
          "Em vez de empurrar tudo ao mesmo tempo, vale encontrar um primeiro passo que consiga ficar de pe.",
      };

    case "duvida":
      return {
        anchor: `${areaPrefix} existem opcoes viaveis, mas ainda sem uma referencia suficiente para diferenciar uma da outra.`,
        structure:
          "O impasse nao esta apenas nos caminhos disponiveis, mas no criterio que ainda nao foi assumido.",
        opening:
          "Antes de seguir, pode ser mais util definir a referencia a partir da qual voce quer escolher.",
      };

    case "ansiedade":
      return {
        anchor: `${areaPrefix} a pressao por resolver esta chegando antes da clareza.`,
        structure:
          "Quando a resposta corre antes da base, a decisao tende a sair mais acelerada do que coerente.",
        opening:
          "Antes de responder ao tempo externo, talvez seja mais util reduzir o ritmo o suficiente para voltar a se ouvir.",
      };

    case "desalinhamento":
      return {
        anchor: `${areaPrefix} algo continua em movimento mesmo sem corresponder mais ao que se sustenta internamente.`,
        structure:
          "Esse tipo de desconforto costuma aparecer quando a forma externa continua, mas a coerencia interna ja mudou.",
        opening:
          "Antes de ajustar rapido, vale reconhecer com honestidade o que ja nao corresponde mais.",
      };

    case "indefinicao":
      return {
        anchor: `${areaPrefix} o que aparece ainda nao esta totalmente definido.`,
        structure:
          "Nem tudo que esta se movendo aqui ja tomou forma suficiente para sustentar decisao.",
        opening:
          "Antes de resolver isso rapidamente, talvez seja mais util observar um pouco mais o que esta se formando.",
      };

    default:
      return {
        anchor: `${areaPrefix} ainda nao ha forma suficiente para nomear com precisao o que esta acontecendo.`,
        structure:
          "Nem toda experiencia se entrega de imediato. Algumas primeiro pedem permanencia suficiente para se deixar ver.",
        opening:
          "Antes de buscar resposta, vale sustentar um pouco mais a observacao do que esta tentando aparecer.",
      };
  }
}

export function normalizeNavrosFeeling(
  feeling: string,
): NavrosReadingPatternId {
  const normalizedFeeling = feeling.trim().toLowerCase();

  if (!normalizedFeeling) {
    return "fallback";
  }

  if (hasWord(normalizedFeeling, ["confus", "perdid", "sem dire", "sem rumo"])) {
    return "confusao";
  }

  if (hasWord(normalizedFeeling, ["ansied", "urgenc", "aceler", "pressa"])) {
    return "ansiedade";
  }

  if (hasWord(normalizedFeeling, ["sobrec", "pressao", "excesso", "peso", "sufoc"])) {
    return "sobrecarga";
  }

  if (hasWord(normalizedFeeling, ["trav", "parad", "procrast", "bloque"])) {
    return "paralisia";
  }

  if (hasWord(normalizedFeeling, ["indefin", "sem forma", "vago", "vaga", "nevoa"])) {
    return "indefinicao";
  }

  if (hasWord(normalizedFeeling, ["duvid", "indecis", "incert"])) {
    return "duvida";
  }

  if (hasWord(normalizedFeeling, ["desalinh", "desconex", "incomod", "errad", "estranh", "fora do lugar"])) {
    return "desalinhamento";
  }

  return "fallback";
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

export function buildNavrosReadingCopy(
  answers: NavrosOperationalAnswers,
): string {
  const pattern = normalizeNavrosFeeling(answers.feeling);
  const parts = buildNavrosReadingParts(pattern, answers);

  return [parts.anchor, parts.structure, parts.opening].join("\n\n");
}

export function buildNavrosOrientationCopy(
  answers: NavrosOperationalAnswers,
): string {
  const area = answers.area.trim() || "essa situacao";
  const pattern = normalizeNavrosFeeling(answers.feeling);

  switch (pattern) {
    case "confusao":
      return `Nas proximas 24 horas, anote o que em ${area} realmente importa antes de responder a qualquer pressao de decisao.`;

    case "sobrecarga":
      return `Nas proximas 24 horas, retire uma demanda de ${area} do mesmo nivel de prioridade e devolva espaco ao essencial.`;

    case "paralisia":
      return `Nas proximas 24 horas, escolha um passo pequeno em ${area} que possa ser concluido sem preparacao extra.`;

    case "duvida":
      return `Nas proximas 24 horas, escreva qual criterio deve orientar sua escolha em ${area} antes de comparar caminhos.`;

    case "ansiedade":
      return `Nas proximas 24 horas, espere alguns minutos antes de responder ao que parece urgente em ${area}.`;

    case "desalinhamento":
      return `Nas proximas 24 horas, observe onde ${area} continua em movimento mesmo sem coerencia interna.`;

    case "indefinicao":
      return `Nas proximas 24 horas, observe o que em ${area} ainda esta se formando antes de tentar concluir ou decidir.`;

    default:
      return `Nas proximas 24 horas, devolva alguns minutos de observacao a ${area} antes de buscar resposta imediata.`;
  }
}

export function buildNavrosMovementCopy(
  answers: NavrosOperationalAnswers,
): string {
  const { movement, agent } = resolveNextAgent(answers.feeling);

  return `A partir do que apareceu, o proximo passo nao e ampliar, e ${movementLabels[movement]}.

Voce esta entrando em uma fase de ${agent}.`;
}

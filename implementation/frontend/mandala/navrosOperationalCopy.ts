export const navrosOperationalStepperCopy = {
  eyebrow: "",
  title: "",
  intro: "",
  progress(currentStep: number, totalSteps: number): string {
    return `Etapa ${currentStep} de ${totalSteps}`;
  },
} as const;

export const navrosOperationalScreenCopy = {
  entry: {
    label: "Travessia",
    quotes: [
      "Você não está aqui para aprender algo novo.",
      "Você está aqui para reconhecer onde já está.",
    ],
    helper: "Esta travessia começa e termina aqui.",
    action: "Entrar",
  },
  focus: {
    label: "Foco",
    helper: "Deixe vir primeiro.",
  },
  insight: {
    label: "Insight",
    action: "Continuar",
  },
  movement: {
    label: "Movimento",
    action: "Continuar",
  },
  closure: {
    label: "Fechamento",
    quote: "Você não está mais no mesmo ponto de quando entrou.",
    action: "Recomeçar travessia",
  },
} as const;

export const navrosOperationalStepLabels = {
  entry: navrosOperationalScreenCopy.entry.label,
  focus: navrosOperationalScreenCopy.focus.label,
  insight: navrosOperationalScreenCopy.insight.label,
  movement: navrosOperationalScreenCopy.movement.label,
  closure: navrosOperationalScreenCopy.closure.label,
} as const;

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

export const navrosAreaContexts: Record<(typeof navrosSuggestedAreas)[number], string> = {
  trabalho: "rotina e entregas",
  saude: "corpo, energia e descanso",
  relacoes: "com quem você convive",
  financas: "dinheiro, contas e recursos",
  proposito: "sentido e rumo",
  transicao: "algo mudando na sua vida",
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

export const navrosSuggestedFeelings = [
  { id: "confusao", label: "confusão", pattern: "confusao" },
  { id: "duvida", label: "dúvida", pattern: "duvida" },
  { id: "ansiedade", label: "ansiedade", pattern: "ansiedade" },
  { id: "travamento", label: "travamento", pattern: "paralisia" },
  { id: "desalinhamento", label: "desalinhamento", pattern: "desalinhamento" },
] as const;

export type NavrosReadingVariant =
  | "direct"
  | "contemplative"
  | "concrete";

export type NavrosIntensity =
  | "low"
  | "medium"
  | "high";

type NavrosAnchorType =
  | "formation"
  | "overload"
  | "instability"
  | "stagnation";

type NavrosStructureType =
  | "limit"
  | "tension"
  | "contrast";

const NAVROS_READING_ANCHORS_BY_STATE: Record<string, string> = {
  inicio: "algo está começando a tomar forma.",
  pressao: "há uma pressão ativa pedindo resposta.",
  mudanca: "um movimento de mudança já está em curso.",
  sobrecarga: "há acúmulo no mesmo nível de prioridade.",
  instabilidade: "o que aparece ainda muda de forma com rapidez.",
  estagnacao: "as coisas não estão avançando como poderiam.",
};

const NAVROS_CONTEMPLATIVE_ANCHORS_BY_STATE: Record<string, string> = {
  inicio: "algo começou a aparecer, mas ainda não tomou forma por completo.",
  mudanca: "há mudança em curso, mas nem tudo se deixou ler com clareza ainda.",
  instabilidade: "o que aparece se move, mas ainda sem contorno estável.",
  estagnacao: "algo pede releitura antes de voltar a se mover.",
};

const NAVROS_CONCRETE_ANCHORS_BY_STATE: Record<string, string> = {
  inicio: "já existem sinais para começar a responder.",
  mudanca:
    "já existem elementos para agir, mas ainda sem organização clara.",
  sobrecarga: "há acúmulo no mesmo nível de atenção.",
  instabilidade:
    "o que aparece muda rápido, mas já deixa pistas suficientes para orientar um gesto.",
  estagnacao:
    "já existem elementos suficientes para retomar movimento em escala pequena.",
};

const NAVROS_READING_STRUCTURES_BY_FEELING: Record<string, string> = {
  confusao:
    "Há elementos suficientes para agir, mas ainda sem organização clara para sustentar uma escolha.",
  pressao:
    "A demanda por resposta está mais rápida do que a clareza disponível.",
  duvida:
    "Mais de uma possibilidade se apresenta, mas sem um critério definido entre elas.",
  travamento:
    "Existe movimento possível, mas ele ainda não encontra base suficiente para acontecer.",
  ansiedade:
    "O impulso por resolver pode estar antecipando um passo que ainda não se sustenta.",
  desalinhamento:
    "Algo continua em movimento mesmo já não estando coerente internamente.",
  indefinicao:
    "O que está acontecendo ainda não terminou de se mostrar com clareza.",
};

const NAVROS_CONTEMPLATIVE_STRUCTURES_BY_FEELING: Record<string, string> = {
  confusao:
    "Nem toda leitura se revela de imediato. Às vezes, o que parece confusão é apenas algo ainda sem critério suficiente para se organizar.",
  duvida:
    "Quando mais de uma possibilidade se apresenta, a clareza costuma vir menos da resposta imediata e mais do tempo dado ao que realmente pesa.",
  ansiedade:
    "Há uma pressa por resolver, mas parte do que pede leitura ainda não terminou de se mostrar por inteiro.",
  indefinicao:
    "Nem tudo que está em formação já pode ser nomeado. Algumas coisas precisam de espaço antes de se deixarem compreender.",
};

const NAVROS_CONCRETE_STRUCTURES_BY_FEELING: Record<string, string> = {
  pressao:
    "Quando a resposta vem antes da leitura, a ação tende a se espalhar em vez de ganhar direção.",
  ansiedade:
    "O que aparece pede resposta, mas não no ritmo em que está sendo pressionado.",
  travamento:
    "Existe movimento disponível, mas ele ainda não encontrou um ponto simples o bastante para começar.",
  desalinhamento:
    "Quando algo continua em curso sem coerência, a energia é gasta mantendo o que já perdeu sentido.",
};

const NAVROS_STRUCTURE_BY_TYPE: Record<
  NavrosStructureType,
  Record<string, string>
> = {
  limit: {
    confusao:
      "Nem tudo que aparece aqui já se sustenta com clareza.",
    duvida:
      "Ainda não há critério suficiente para sustentar uma escolha.",
    ansiedade:
      "O ritmo interno ainda não acompanha a pressão por resposta.",
    travamento:
      "O movimento ainda não encontrou um ponto simples o bastante para começar.",
    desalinhamento:
      "Parte do que segue ativo já não se sustenta internamente.",
    indefinicao:
      "O que aparece ainda não terminou de se mostrar.",
  },
  tension: {
    confusao:
      "Há elementos presentes, mas ainda sem organização suficiente para orientar uma decisão.",
    duvida:
      "Mais de uma direção aparece, mas nenhuma ainda se sustenta por completo.",
    ansiedade:
      "A resposta parece urgente, mas o que pede leitura ainda não terminou de se formar.",
    travamento:
      "Existe movimento possível, mas ele ainda não encontra base para acontecer.",
    desalinhamento:
      "Algo segue em movimento mesmo fora de coerência.",
    indefinicao:
      "O que aparece ainda oscila sem forma definida.",
  },
  contrast: {
    confusao:
      "Não pela falta de elementos, mas pela forma como ainda não se organizam.",
    duvida:
      "Não pela ausência de direção, mas pela dificuldade de sustentar uma entre elas.",
    ansiedade:
      "Não pela falta de resposta, mas pelo modo como ela está sendo antecipada.",
    travamento:
      "Não pela ausência de movimento, mas pela falta de um ponto de partida simples.",
    desalinhamento:
      "Não por erro evidente, mas por um desvio que ainda não foi interrompido.",
    indefinicao:
      "Não por ausência, mas por algo que ainda não se deixa fixar.",
  },
};

const NAVROS_STATE_STRUCTURE_OVERRIDES: Record<string, Partial<Record<string, string>>> = {
  inicio: {
    confusao:
      "Nem tudo que aparece aqui já encontra base suficiente para sustentar uma escolha.",
    duvida:
      "O que surge ainda não encontrou um critério estável para se diferenciar.",
    ansiedade:
      "Há movimento suficiente para pedir resposta, mas não no ritmo em que ele quer ser lido.",
    indefinicao:
      "Nem tudo que aparece aqui já pode ser sustentado com clareza.",
  },
  mudanca: {
    confusao:
      "O que muda aqui não se organiza por inteiro no mesmo tempo.",
    duvida:
      "Quando algo muda, partes diferentes costumam pedir critérios diferentes antes de se deixarem distinguir.",
    ansiedade:
      "Parte do que está em curso ainda não se deixa acompanhar no ritmo esperado.",
    travamento:
      "Mesmo com movimento disponível, ainda falta um ponto firme para que ele se sustente.",
  },
  sobrecarga: {
    duvida:
      "Exigências demais ocupam o mesmo espaço, dificultando distinguir o que realmente importa.",
    travamento:
      "Exigências demais ocupam o mesmo espaço, dificultando qualquer resposta que precise se sustentar.",
  },
  indefinicao: {
    confusao:
      "Nem tudo que aparece aqui já encontra forma suficiente para ser distinguido.",
    duvida:
      "Ainda não há base suficiente para que as diferenças se mostrem com nitidez.",
    ansiedade:
      "A pressa por definir pode apertar algo que ainda não terminou de aparecer.",
    indefinicao:
      "Nem tudo que aparece aqui já pode ser sustentado com clareza.",
  },
};

const NAVROS_READING_DIRECTIONS_BY_FEELING: Record<string, string> = {
  confusao:
    "O que importa agora aparece melhor quando as opções deixam de ter o mesmo peso.",
  pressao:
    "A direção reaparece quando o ritmo deixa de responder por você.",
  duvida:
    "Um critério claro costuma fazer a escolha se mostrar sozinha.",
  travamento:
    "Um primeiro gesto possível já devolve movimento.",
  ansiedade:
    "Mais clareza costuma mudar o modo como você entra nisso.",
  desalinhamento:
    "O que já não faz sentido, quando reconhecido, reorganiza o caminho.",
  indefinicao:
    "Mais nitidez costuma aparecer quando a resposta não é forçada.",
};

const NAVROS_CONTEMPLATIVE_DIRECTIONS_BY_FEELING: Record<string, string> = {
  confusao:
    "O que ainda está se organizando ganha forma quando não é apressado.",
  duvida:
    "O critério tende a aparecer antes da decisão, quando você não força um fechamento.",
  ansiedade:
    "O que pede leitura amadurece quando o impulso deixa de decidir por você.",
  indefinicao:
    "A direção costuma aparecer quando o que está em formação recebe tempo suficiente.",
};

const NAVROS_CONCRETE_DIRECTIONS_BY_FEELING: Record<string, string> = {
  pressao:
    "Quando o campo se reduz ao essencial, o movimento ganha precisão.",
  ansiedade:
    "Quando o campo se reduz ao essencial, a resposta deixa de se espalhar.",
  travamento:
    "Quando um gesto pequeno encontra espaço, o movimento volta a aparecer.",
  desalinhamento:
    "Quando o que saiu de eixo é visto, a direção começa a retornar.",
};

type NavrosInsightOverride = {
  anchor?: string;
  structure?: string;
  direction?: string;
};

const NAVROS_AREA_STATE_FEELING_INSIGHT_OVERRIDES: Record<string, NavrosInsightOverride> = {
  "saude:sobrecarga:travamento": {
    anchor: "Na área de saúde, há exigências demais ocupando o mesmo espaço.",
    structure: "O corpo pode não responder quando tudo é mantido ao mesmo tempo.",
    direction: "Quando algo encontra espaço suficiente, uma resposta começa a aparecer.",
  },
};

const NAVROS_DIRECTION_VARIANT_POOLS: Array<{
  match: string;
  variants: string[];
}> = [
  {
    match: "Quando o campo se reduz ao essencial, a resposta deixa de se espalhar.",
    variants: [
      "Quando o campo se reduz ao essencial, a resposta deixa de se espalhar.",
      "À medida que o campo se reduz ao essencial, a resposta deixa de se espalhar.",
      "À medida que o essencial ganha mais espaço, algo começa a se organizar.",
      "Quando o que importa começa a se destacar, algo começa a se alinhar.",
      "Quando o essencial ganha espaço, a resposta encontra um eixo mais claro.",
    ],
  },
  {
    match: "O que pede espaço tende a reaparecer quando nem tudo é mantido ao mesmo tempo.",
    variants: [
      "O que pede espaço tende a reaparecer quando nem tudo é mantido ao mesmo tempo.",
      "O que realmente importa tende a reaparecer quando nem tudo é mantido ao mesmo tempo.",
      "O essencial volta a se destacar quando nem tudo permanece ativo ao mesmo tempo.",
      "O que faz diferença começa a se evidenciar quando nem tudo é sustentado junto.",
    ],
  },
  {
    match: "Algo ganha nitidez quando deixa de ser forçado.",
    variants: [
      "Algo ganha nitidez quando deixa de ser forçado.",
      "À medida que deixa de ser forçado, algo ganha nitidez.",
      "Algo começa a ganhar nitidez quando deixa de ser forçado.",
    ],
  },
];

const NAVROS_STRUCTURE_FALLBACKS = [
  "Há elementos presentes, mas ainda sem uma base que se sustente.",
  "O que aparece ainda não encontrou forma suficiente para se manter.",
  "Existe algo em curso, mas ainda sem consistência para se sustentar.",
] as const;

const NAVROS_STRUCTURE_INTENSITY_BY_LEVEL: Record<
  Exclude<NavrosIntensity, "low">,
  Record<string, string>
> = {
  medium: {
    "Há elementos presentes, mas ainda sem organização suficiente para orientar uma decisão.":
      "Há elementos presentes, mas ainda sem organização suficiente para orientar uma decisão com firmeza.",
    "O ritmo interno ainda não acompanha a pressão por resposta.":
      "O ritmo interno ainda não acompanha por completo a pressão por resposta.",
    "Há movimento suficiente para pedir resposta, mas não no ritmo em que ele quer ser lido.":
      "Há movimento suficiente para pedir resposta, mas ainda não no ritmo em que ele quer ser lido.",
  },
  high: {
    "O ritmo interno ainda não acompanha a pressão por resposta.":
      "O ritmo interno ainda não consegue acompanhar a pressão por resposta.",
    "A resposta parece urgente, mas o que pede leitura ainda não terminou de se formar.":
      "A resposta parece urgente, mas o que pede leitura ainda não terminou de se formar por completo.",
    "Existe movimento possível, mas ele ainda não encontra base para acontecer.":
      "Existe movimento possível, mas ele ainda não encontra base suficiente para acontecer.",
    "O movimento ainda não encontrou um ponto simples o bastante para começar.":
      "O movimento ainda não encontrou um ponto simples o bastante para se sustentar.",
    "Há movimento suficiente para pedir resposta, mas não no ritmo em que ele quer ser lido.":
      "Há movimento suficiente para pedir resposta, mas não no ritmo em que está sendo pressionado.",
    "Parte do que está em curso ainda não se deixa acompanhar no ritmo esperado.":
      "Parte do que está em curso ainda não se deixa acompanhar no ritmo exigido.",
  },
};

const NAVROS_DIRECTION_INTENSITY_BY_LEVEL: Record<
  Exclude<NavrosIntensity, "low">,
  Record<string, string[]>
> = {
  medium: {
    "Algo ganha nitidez quando deixa de ser forçado.":
      ["Algo começa a ganhar nitidez quando deixa de ser forçado."],
    "À medida que deixa de ser forçado, algo ganha nitidez.":
      ["À medida que deixa de ser forçado, algo começa a ganhar nitidez."],
    "O que importa agora aparece melhor quando as opções deixam de ter o mesmo peso.":
      ["O que importa agora começa a aparecer melhor quando as opções deixam de ter o mesmo peso."],
    "A direção reaparece quando o ritmo deixa de responder por você.":
      ["A direção começa a reaparecer quando o ritmo deixa de responder por você."],
    "Mais nitidez costuma aparecer quando a resposta não é forçada.":
      ["Mais nitidez começa a aparecer quando a resposta não é forçada."],
  },
  high: {
    "Algo ganha nitidez quando deixa de ser forçado.":
      [
        "Algo precisa ganhar nitidez para que o movimento se sustente.",
        "Algo passa a exigir mais clareza para se sustentar.",
        "O que aparece não se sustenta sem mais clareza.",
      ],
    "À medida que deixa de ser forçado, algo ganha nitidez.":
      [
        "Algo precisa ganhar nitidez para que o movimento se sustente.",
        "Algo passa a exigir mais clareza para se sustentar.",
        "O que aparece não se sustenta sem mais clareza.",
      ],
    "Algo começa a ganhar nitidez quando deixa de ser forçado.":
      [
        "Algo precisa ganhar nitidez para que o movimento se sustente.",
        "Algo passa a exigir mais clareza para se sustentar.",
        "O que aparece não se sustenta sem mais clareza.",
      ],
    "Quando o campo se reduz ao essencial, a resposta deixa de se espalhar.":
      [
        "Quando o campo se reduz ao essencial, a resposta começa a se organizar.",
        "Quando o campo se reduz ao essencial, algo começa a se alinhar.",
        "Quando o campo se reduz ao essencial, a resposta encontra um eixo mais claro.",
      ],
    "À medida que o campo se reduz ao essencial, a resposta deixa de se espalhar.":
      [
        "À medida que o campo se reduz ao essencial, a resposta começa a se organizar.",
        "À medida que o campo se reduz ao essencial, algo começa a se alinhar.",
        "À medida que o campo se reduz ao essencial, a resposta encontra um eixo mais claro.",
      ],
    "Quando um gesto pequeno encontra espaço, o movimento volta a aparecer.":
      [
        "Um gesto pequeno precisa encontrar espaço para que o movimento volte a aparecer.",
        "O movimento só volta a aparecer quando um gesto pequeno encontra espaço.",
        "Quando um gesto pequeno encontra espaço, algo volta a se mover.",
      ],
  },
};

const NAVROS_MOVEMENT_LINES_BY_PATTERN: Record<string, string> = {
  confusao:
    "Mais clareza começa a se formar.",
  sobrecarga:
    "Algo começa a se reorganizar.",
  pressao:
    "A urgência começa a perder força.",
  duvida:
    "Um critério começa a aparecer.",
  paralisia:
    "Um movimento pequeno já encontra espaço.",
  travamento:
    "Um movimento pequeno já encontra espaço.",
  ansiedade:
    "Mais estabilidade pode começar a se firmar.",
  desalinhamento:
    "Algo começa a se reorganizar.",
  indefinicao:
    "A direção começa a ganhar contorno.",
  fallback:
    "Algo começa a se reorganizar.",
};

function classifyNavrosAnchorType(
  normalizedState: string,
): NavrosAnchorType {
  switch (normalizedState) {
    case "inicio":
    case "mudanca":
      return "formation";

    case "sobrecarga":
      return "overload";

    case "instabilidade":
      return "instability";

    case "estagnacao":
      return "stagnation";

    default:
      return "formation";
  }
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

function selectNavrosStructureType(
  anchorType: NavrosAnchorType,
  normalizedState: string,
  normalizedFeeling: string,
): NavrosStructureType {
  const options: Record<NavrosAnchorType, NavrosStructureType[]> = {
    formation: ["limit", "tension"],
    overload: ["contrast", "limit"],
    instability: ["tension", "contrast"],
    stagnation: ["tension", "limit"],
  };
  const available = options[anchorType] ?? ["limit"];
  const index = getStableChoiceIndex(
    [anchorType, normalizedState, normalizedFeeling],
    available.length,
  );

  return available[index] ?? "limit";
}

export function resolveNavrosIntensity(
  normalizedFeeling: string,
  normalizedState = "",
): NavrosIntensity {
  if (normalizedFeeling === "travamento") {
    return "high";
  }

  if (
    normalizedFeeling === "ansiedade" ||
    normalizedFeeling === "confusao" ||
    normalizedFeeling === "pressao" ||
    normalizedFeeling === "desalinhamento" ||
    normalizedState === "sobrecarga"
  ) {
    return "medium";
  }

  return "low";
}

export function applyIntensityToStructure(
  text: string,
  intensity: NavrosIntensity,
): string {
  if (intensity === "low") {
    return text;
  }

  return NAVROS_STRUCTURE_INTENSITY_BY_LEVEL[intensity][text] ?? text;
}

export function applyIntensityToDirection(
  text: string,
  intensity: NavrosIntensity,
  seedParts: string[] = [],
): string {
  if (intensity === "low") {
    return text;
  }

  const variants = NAVROS_DIRECTION_INTENSITY_BY_LEVEL[intensity][text];

  if (!variants) {
    return text;
  }

  return selectStableTextVariant(
    [intensity, ...seedParts, text],
    variants,
  );
}

export function buildNavrosAreaPrefixCopy(area: string): string {
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

export function resolveNavrosReadingVariantCopy(
  normalizedState: string,
  normalizedFeeling: string,
): NavrosReadingVariant {
  if (normalizedState === "sobrecarga" || normalizedFeeling === "desalinhamento") {
    return "direct";
  }

  if (
    normalizedFeeling === "travamento" ||
    normalizedFeeling === "pressao" ||
    normalizedFeeling === "ansiedade" ||
    normalizedState === "estagnacao" ||
    normalizedState === "mudanca"
  ) {
    return "concrete";
  }

  if (
    normalizedFeeling === "duvida" ||
    normalizedFeeling === "confusao" ||
    normalizedFeeling === "indefinicao" ||
    normalizedState === "instabilidade"
  ) {
    return "contemplative";
  }

  return "direct";
}

export function buildNavrosReadingAnchorCopy(
  area: string,
  normalizedState: string,
  variant: NavrosReadingVariant = "direct",
): string {
  const areaPrefix = buildNavrosAreaPrefixCopy(area);
  const stateLineByVariant =
    variant === "contemplative"
      ? NAVROS_CONTEMPLATIVE_ANCHORS_BY_STATE
      : variant === "concrete"
        ? NAVROS_CONCRETE_ANCHORS_BY_STATE
        : NAVROS_READING_ANCHORS_BY_STATE;
  const stateLine =
    stateLineByVariant[normalizedState] ??
    NAVROS_READING_ANCHORS_BY_STATE[normalizedState] ??
    "algo está pedindo leitura com mais precisão.";

  return `${areaPrefix} ${stateLine}`;
}

export function buildNavrosReadingStructureCopy(
  normalizedState: string,
  normalizedFeeling: string,
  variant: NavrosReadingVariant = "direct",
  areaSeed = "",
): string {
  const stateOverride =
    NAVROS_STATE_STRUCTURE_OVERRIDES[normalizedState]?.[normalizedFeeling];

  if (stateOverride) {
    return stateOverride;
  }

  const anchorType = classifyNavrosAnchorType(normalizedState);
  const structureType = selectNavrosStructureType(
    anchorType,
    normalizedState,
    normalizedFeeling,
  );
  const alternativeStructure =
    NAVROS_STRUCTURE_BY_TYPE[structureType]?.[normalizedFeeling];

  if (alternativeStructure) {
    return alternativeStructure;
  }

  const structuresByVariant =
    variant === "contemplative"
      ? NAVROS_CONTEMPLATIVE_STRUCTURES_BY_FEELING
      : variant === "concrete"
        ? NAVROS_CONCRETE_STRUCTURES_BY_FEELING
        : NAVROS_READING_STRUCTURES_BY_FEELING;
  const structure =
    structuresByVariant[normalizedFeeling] ??
    NAVROS_READING_STRUCTURES_BY_FEELING[normalizedFeeling];

  if (structure) {
    return structure;
  }

  if (normalizedState === "sobrecarga") {
    return "Há exigências demais ocupando o mesmo espaço, o que reduz a capacidade de distinguir prioridade.";
  }

  return selectStableTextVariant(
    [areaSeed.trim().toLowerCase(), normalizedState, normalizedFeeling, "structure-fallback"],
    [...NAVROS_STRUCTURE_FALLBACKS],
  );
}

export function buildNavrosReadingDirectionCopy(
  normalizedState: string,
  normalizedFeeling: string,
  variant: NavrosReadingVariant = "direct",
): string {
  const directionsByVariant =
    variant === "contemplative"
      ? NAVROS_CONTEMPLATIVE_DIRECTIONS_BY_FEELING
      : variant === "concrete"
        ? NAVROS_CONCRETE_DIRECTIONS_BY_FEELING
        : NAVROS_READING_DIRECTIONS_BY_FEELING;

  if (normalizedState === "sobrecarga") {
    return "O que pede espaço tende a reaparecer quando nem tudo é mantido ao mesmo tempo.";
  }

  if (normalizedState === "indefinicao") {
    return "A direção costuma ganhar nitidez quando ainda não é forçada a aparecer.";
  }

  if (normalizedState === "estagnacao") {
    return "Um primeiro gesto menor costuma devolver movimento ao que ficou parado.";
  }

  return (
    directionsByVariant[normalizedFeeling] ??
    NAVROS_READING_DIRECTIONS_BY_FEELING[normalizedFeeling] ??
    "Algo ganha nitidez quando deixa de ser forçado."
  );
}

function mergeInsightCopy(
  anchor: string,
  structure: string,
  direction: string,
): string {
  return `${anchor} ${structure} ${direction}`;
}

function buildNavrosInsightOverrideKey(
  area: string,
  normalizedState: string,
  normalizedFeeling: string,
): string {
  return `${area.trim().toLowerCase()}:${normalizedState}:${normalizedFeeling}`;
}

function diversifyNavrosDirectionCopy(
  text: string,
  area: string,
  normalizedState: string,
  normalizedFeeling: string,
): string {
  const pool = NAVROS_DIRECTION_VARIANT_POOLS.find(
    (entry) => entry.match === text,
  );

  if (!pool) {
    return text;
  }

  return selectStableTextVariant(
    [area.trim().toLowerCase(), normalizedState, normalizedFeeling, text],
    pool.variants,
  );
}

export function composeNavrosInsightCopy(
  area: string,
  normalizedState: string,
  normalizedFeeling: string,
  intensity: NavrosIntensity = resolveNavrosIntensity(
    normalizedFeeling,
    normalizedState,
  ),
): string {
  const variant = resolveNavrosReadingVariantCopy(
    normalizedState,
    normalizedFeeling,
  );
  const anchor = buildNavrosReadingAnchorCopy(
    area,
    normalizedState,
    variant,
  );
  const structure = buildNavrosReadingStructureCopy(
    normalizedState,
    normalizedFeeling,
    variant,
    area,
  );
  const direction = buildNavrosReadingDirectionCopy(
    normalizedState,
    normalizedFeeling,
    variant,
  );
  const diversifiedDirection = diversifyNavrosDirectionCopy(
    direction,
    area,
    normalizedState,
    normalizedFeeling,
  );
  const override =
    NAVROS_AREA_STATE_FEELING_INSIGHT_OVERRIDES[
      buildNavrosInsightOverrideKey(area, normalizedState, normalizedFeeling)
    ];

  return mergeInsightCopy(
    override?.anchor ?? anchor,
    override?.structure ?? applyIntensityToStructure(structure, intensity),
    override?.direction ??
      applyIntensityToDirection(diversifiedDirection, intensity, [
        area.trim().toLowerCase(),
        normalizedState,
        normalizedFeeling,
      ]),
  );
}

export function buildNavrosMovementLineCopy(
  normalizedPattern: string,
  normalizedArea = "",
): string {
  if (
    normalizedPattern === "ansiedade" &&
    (normalizedArea === "relacoes" || normalizedArea === "saude")
  ) {
    return "Algo pode começar a se estabilizar.";
  }

  return NAVROS_MOVEMENT_LINES_BY_PATTERN[normalizedPattern] ?? "Algo começa a se reorganizar.";
}

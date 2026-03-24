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
): string {
  const stateOverride =
    NAVROS_STATE_STRUCTURE_OVERRIDES[normalizedState]?.[normalizedFeeling];

  if (stateOverride) {
    return stateOverride;
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

  return "Há um padrão em formação que ainda não está completamente claro.";
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

export function composeNavrosInsightCopy(
  area: string,
  normalizedState: string,
  normalizedFeeling: string,
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
  );
  const direction = buildNavrosReadingDirectionCopy(
    normalizedState,
    normalizedFeeling,
    variant,
  );
  const override =
    NAVROS_AREA_STATE_FEELING_INSIGHT_OVERRIDES[
      buildNavrosInsightOverrideKey(area, normalizedState, normalizedFeeling)
    ];

  return mergeInsightCopy(
    override?.anchor ?? anchor,
    override?.structure ?? structure,
    override?.direction ?? direction,
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

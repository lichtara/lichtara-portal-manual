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
    action: "Continuar",
    helper: "Deixe vir primeiro.",
    area: {
      label: "Área",
      prompt: "Onde isso está mais aparecendo agora?",
    },
    state: {
      label: "Estado",
      prompt: "Como isso tem se apresentado?",
    },
    feeling: {
      label: "Sensação",
      prompt: "E agora, o que está mais presente?",
    },
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

export const movementLabels = {
  clarify: "clareza",
  organize: "organização",
  stabilize: "estabilização",
  initiate: "início de movimento",
  expand: "expansão",
} as const;

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
  inicio: "já existem sinais suficientes para começar a responder.",
  mudanca:
    "já existem elementos suficientes para agir, mas ainda sem organização clara.",
  sobrecarga: "há acúmulo demais ocupando o mesmo espaço.",
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
    "Quando o impulso por resolver chega primeiro, o movimento perde precisão mesmo parecendo urgente.",
  travamento:
    "Existe movimento disponível, mas ele ainda não encontrou um ponto simples o bastante para começar.",
  desalinhamento:
    "Quando algo continua em curso sem coerência, a energia é gasta mantendo o que já perdeu sentido.",
};

const NAVROS_READING_DIRECTIONS_BY_FEELING: Record<string, string> = {
  confusao:
    "Antes de decidir, vale reduzir as opções ao que realmente importa agora.",
  pressao:
    "Antes de responder, pode ser mais útil desacelerar o ritmo da decisão.",
  duvida:
    "Definir um critério claro tende a tornar a escolha mais simples.",
  travamento:
    "Um primeiro passo menor pode ser suficiente para iniciar movimento.",
  ansiedade:
    "Ganhar um pouco mais de clareza antes de agir tende a evitar desalinhamento.",
  desalinhamento:
    "Reconhecer o que já não faz sentido pode reorganizar o caminho.",
  indefinicao:
    "Observar mais um pouco pode permitir que a direção apareça com mais nitidez.",
};

const NAVROS_CONTEMPLATIVE_DIRECTIONS_BY_FEELING: Record<string, string> = {
  confusao:
    "Antes de escolher, pode ser mais importante permanecer tempo suficiente diante do que ainda está se organizando.",
  duvida:
    "Talvez o próximo passo não seja decidir já, mas perceber qual critério começa a se mostrar com mais verdade.",
  ansiedade:
    "Antes de resolver, pode ser mais importante sustentar a observação do que responder ao primeiro impulso.",
  indefinicao:
    "Antes de tentar resolver, pode ser mais importante sustentar a observação do que ainda está aparecendo.",
};

const NAVROS_CONCRETE_DIRECTIONS_BY_FEELING: Record<string, string> = {
  pressao:
    "Antes de responder, reduzir o campo ao que é essencial pode tornar o próximo passo mais preciso.",
  ansiedade:
    "Antes de avançar, reduzir o campo ao que é essencial pode devolver precisão ao próximo passo.",
  travamento:
    "Em vez de retomar tudo, escolha um gesto pequeno que já possa ser sustentado.",
  desalinhamento:
    "Antes de insistir no que já não responde, reorganizar o que ficou fora de eixo pode devolver direção.",
};

const NAVROS_ORIENTATION_ACTIONS_BY_FEELING: Record<string, string> = {
  confusao:
    "reduza as opções ao que realmente importa antes de decidir",
  pressao:
    "evite responder imediatamente ao que parece urgente",
  duvida:
    "defina um critério simples antes de decidir",
  travamento:
    "comece por um passo pequeno, sem tentar resolver tudo de uma vez",
  ansiedade:
    "reserve alguns minutos apenas para observar antes de agir",
  desalinhamento:
    "reconheça o que já não faz sentido sustentar",
  indefinicao:
    "observe mais um pouco antes de tentar chegar a uma resposta",
};

type NavrosOrientationCopy = {
  lead: string;
  support: string;
};

const NAVROS_DIRECT_ORIENTATION_VARIANTS: NavrosOrientationCopy[] = [
  {
    lead: "Hoje, retire uma coisa desse mesmo nível de prioridade.",
    support:
      "Não precisa resolver tudo — apenas devolver espaço ao que realmente importa agora.",
  },
  {
    lead: "Antes de responder ao próximo pedido, pause e escolha o que fica de fora.",
    support:
      "Clareza também vem do que você decide não sustentar agora.",
  },
];

const NAVROS_CONTEMPLATIVE_ORIENTATION_VARIANTS: NavrosOrientationCopy[] = [
  {
    lead: "Hoje, apenas observe quando isso voltar a aparecer.",
    support:
      "Sem tentar resolver — só reconheça como se repete.",
  },
  {
    lead: "Se isso surgir novamente, não responda de imediato.",
    support:
      "Dê um pouco mais de tempo para entender o que está se formando.",
  },
];

const NAVROS_CONCRETE_ORIENTATION_VARIANTS: NavrosOrientationCopy[] = [
  {
    lead: "Escolha uma única ação e leve até o fim.",
    support:
      "Evite abrir novos movimentos antes de concluir esse.",
  },
  {
    lead: "No próximo momento em que isso pedir resposta, reduza para um único passo.",
    support:
      "Movimento claro vem de direção, não de quantidade.",
  },
];

const NAVROS_MOVEMENT_LINES_BY_FEELING: Record<string, string> = {
  confusao:
    "O próximo passo é ganhar mais clareza antes de decidir.",
  pressao:
    "O próximo passo é reduzir a urgência antes de responder.",
  duvida:
    "O próximo passo é definir um critério antes de escolher.",
  travamento:
    "O próximo passo é iniciar um movimento pequeno e possível.",
  ansiedade:
    "O próximo passo é ganhar um pouco mais de estabilidade antes de agir.",
  desalinhamento:
    "O próximo passo é reorganizar o que já não faz sentido.",
  indefinicao:
    "O próximo passo é observar mais antes de avançar.",
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

function getStableVariantIndex(
  parts: string[],
  length: number,
): number {
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
    return "Antes de responder a tudo, vale devolver prioridade apenas ao que realmente pede espaço agora.";
  }

  if (normalizedState === "indefinicao") {
    return "Observar mais um pouco pode permitir que a direção apareça com mais nitidez.";
  }

  if (normalizedState === "estagnacao") {
    return "Um primeiro passo menor pode ser suficiente para devolver movimento ao que ficou parado.";
  }

  return (
    directionsByVariant[normalizedFeeling] ??
    NAVROS_READING_DIRECTIONS_BY_FEELING[normalizedFeeling] ??
    "Vale observar antes de tentar resolver imediatamente."
  );
}

export function buildNavrosOrientationActionCopy(
  normalizedState: string,
  normalizedFeeling: string,
): string {
  if (normalizedState === "sobrecarga") {
    return "devolva prioridade apenas ao que realmente pede espaço agora, em vez de sustentar tudo no mesmo nível";
  }

  if (normalizedState === "estagnacao") {
    return "dê um primeiro passo pequeno, sem tentar resolver tudo ao mesmo tempo";
  }

  if (normalizedState === "indefinicao") {
    return "observe mais um pouco antes de tentar chegar a uma resposta";
  }

  return (
    NAVROS_ORIENTATION_ACTIONS_BY_FEELING[normalizedFeeling] ??
    "observe melhor o que está acontecendo antes de responder"
  );
}

export function buildNavrosOrientationLeadCopy(action: string): string {
  return `Nas próximas 24 horas, ${action}.`;
}

export function buildNavrosOrientationVariantCopy(
  normalizedState: string,
  normalizedFeeling: string,
  variant: NavrosReadingVariant = "direct",
): string {
  const options =
    variant === "contemplative"
      ? NAVROS_CONTEMPLATIVE_ORIENTATION_VARIANTS
      : variant === "concrete"
        ? NAVROS_CONCRETE_ORIENTATION_VARIANTS
        : NAVROS_DIRECT_ORIENTATION_VARIANTS;
  const selected = options[
    getStableVariantIndex(
      [normalizedState, normalizedFeeling, variant],
      options.length,
    )
  ] ?? {
    lead: "Hoje, observe com mais cuidado o que volta a pedir espaço.",
    support: "Basta um próximo passo possível para manter a leitura viva.",
  };

  return `${selected.lead}\n\n${selected.support}`;
}

export function buildNavrosMovementLineCopy(
  normalizedFeeling: string,
): string {
  return (
    NAVROS_MOVEMENT_LINES_BY_FEELING[normalizedFeeling] ??
    "O próximo passo é observar melhor antes de responder."
  );
}

export function buildNavrosMovementPhaseCopy(agent: string): string {
  return `Você está entrando em uma fase de ${agent}.`;
}

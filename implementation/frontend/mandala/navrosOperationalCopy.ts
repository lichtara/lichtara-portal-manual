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
    action: "Entrar",
  },
  focus: {
    label: "Foco",
    action: "Continuar",
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
      prompt: "Qual dessas sensações está mais próxima agora?",
    },
  },
  reading: {
    label: "Leitura",
    action: "Continuar",
  },
  orientation: {
    label: "Orientação",
    action: "Continuar",
    pause: "Deixe essa orientação pousar por um instante.",
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
  reading: navrosOperationalScreenCopy.reading.label,
  orientation: navrosOperationalScreenCopy.orientation.label,
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
  trabalho: "o que você faz",
  saude: "corpo e energia",
  relacoes: "com outras pessoas",
  financas: "dinheiro e recursos",
  proposito: "sentido e direção",
  transicao: "mudança em curso",
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

const NAVROS_READING_ANCHORS_BY_STATE: Record<string, string> = {
  inicio: "algo está começando a tomar forma.",
  pressao: "há uma pressão ativa pedindo resposta.",
  mudanca: "um movimento de mudança já está em curso.",
  sobrecarga: "há acúmulo no mesmo nível de prioridade.",
  instabilidade: "o que aparece ainda muda de forma com rapidez.",
  estagnacao: "as coisas não estão avançando como poderiam.",
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

export function buildNavrosReadingAnchorCopy(
  area: string,
  normalizedState: string,
): string {
  const areaPrefix = buildNavrosAreaPrefixCopy(area);
  const stateLine =
    NAVROS_READING_ANCHORS_BY_STATE[normalizedState] ??
    "algo está pedindo leitura com mais precisão.";

  return `${areaPrefix} ${stateLine}`;
}

export function buildNavrosReadingStructureCopy(
  normalizedState: string,
  normalizedFeeling: string,
): string {
  const structure = NAVROS_READING_STRUCTURES_BY_FEELING[normalizedFeeling];

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
): string {
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

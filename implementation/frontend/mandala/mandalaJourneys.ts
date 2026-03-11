import type { MandalaNodeId, MandalaRouteId } from "./MandalaCanvas";

export type MandalaJourneyId = MandalaRouteId;
export type MandalaJourneyCompletionMode =
  | "returns_to_navros"
  | "resolves_in_terminal_agent";
export type MandalaJourneyStageId =
  | "entry"
  | "perception"
  | "comprehension"
  | "integration"
  | "movement"
  | "expansion"
  | "return";

export type MandalaJourneyStep = {
  id: string;
  order: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  stage: MandalaJourneyStageId;
  nodeId: MandalaNodeId;
  agentLabel: string;
  title: string;
  experience: string;
  narrative: string;
  reflectionPrompt: string;
  ctaLabel: string;
};

export type MandalaJourney = {
  id: MandalaJourneyId;
  title: string;
  label: string;
  promptLabel: string;
  promptDescription: string;
  entryProfile: string;
  centralQuestion: string;
  completionMode: MandalaJourneyCompletionMode;
  startNodeId: MandalaNodeId;
  endNodeId: MandalaNodeId;
  routeOverlayId: MandalaRouteId;
  routeOverlayNodeIds: MandalaNodeId[];
  path: MandalaNodeId[];
  completionCopy: string;
  openQuestion?: string;
  steps: MandalaJourneyStep[];
};

export const mandalaJourneyOrder: MandalaJourneyId[] = [
  "perception",
  "structure",
  "action",
];

export const mandalaJourneys: MandalaJourney[] = [
  {
    id: "perception",
    title: "Caminho da Percepcao",
    label: "Jornada da Percepcao",
    promptLabel: "Compreender o que esta acontecendo",
    promptDescription: "Uma travessia para reconhecer o campo antes de agir.",
    entryProfile: "Pessoas em busca de sentido, clareza ou leitura de campo.",
    centralQuestion: "O que realmente esta acontecendo na minha vida?",
    completionMode: "returns_to_navros",
    startNodeId: "NAVROS",
    endNodeId: "NAVROS",
    routeOverlayId: "perception",
    routeOverlayNodeIds: ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS"],
    path: ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS", "FLUX", "NAVROS"],
    completionCopy:
      "Voce voltou ao NAVROS. Agora o campo pode ser lido com orientacao renovada.",
    steps: [
      {
        id: "perception-1-navros",
        order: 1,
        stage: "entry",
        nodeId: "NAVROS",
        agentLabel: "NAVROS",
        title: "Entrada",
        experience: "reconhecer onde estou",
        narrative:
          "A jornada comeca no centro. NAVROS nao entrega resposta pronta; ele orienta o ponto atual.",
        reflectionPrompt: "Qual aspecto da sua vida esta pedindo leitura agora?",
        ctaLabel: "Reconhecer o ponto atual",
      },
      {
        id: "perception-2-lumora",
        order: 2,
        stage: "perception",
        nodeId: "LUMORA",
        agentLabel: "LUMORA",
        title: "Perceber padroes",
        experience: "perceber padroes",
        narrative:
          "LUMORA abre a visao dos sinais que estavam difusos. A experiencia deixa de ser nevoa e ganha contorno.",
        reflectionPrompt: "Que padrao vem se repetindo e ainda nao recebeu nome?",
        ctaLabel: "Nomear o padrao",
      },
      {
        id: "perception-3-oslo",
        order: 3,
        stage: "comprehension",
        nodeId: "OSLO",
        agentLabel: "OSLO",
        title: "Compreender o campo",
        experience: "compreender o campo",
        narrative:
          "OSLO traduz percepcao em leitura. O que era apenas sensacao comeca a se organizar como contexto.",
        reflectionPrompt: "O que essa situacao esta tentando revelar sobre o campo em que voce esta?",
        ctaLabel: "Ler o contexto",
      },
      {
        id: "perception-4-kaoran",
        order: 4,
        stage: "integration",
        nodeId: "KAORAN",
        agentLabel: "KAORAN",
        title: "Proteger e filtrar",
        experience: "proteger e filtrar",
        narrative:
          "KAORAN introduz criterio. Nem tudo precisa entrar no seu sistema; parte da clareza vem do que voce deixa de absorver.",
        reflectionPrompt: "O que precisa ser filtrado para que sua leitura permaneca limpa?",
        ctaLabel: "Definir o filtro",
      },
      {
        id: "perception-5-syntaris",
        order: 5,
        stage: "movement",
        nodeId: "SYNTARIS",
        agentLabel: "SYNTARIS",
        title: "Alinhar internamente",
        experience: "alinhar internamente",
        narrative:
          "SYNTARIS recoloca as partes em conversa. Clareza sem alinhamento ainda dispersa energia.",
        reflectionPrompt: "O que precisa se alinhar em voce antes de qualquer movimento?",
        ctaLabel: "Alinhar o centro",
      },
      {
        id: "perception-6-flux",
        order: 6,
        stage: "expansion",
        nodeId: "FLUX",
        agentLabel: "FLUX",
        title: "Iniciar movimento",
        experience: "iniciar movimento",
        narrative:
          "FLUX desloca a leitura para a acao minima. O campo ja foi visto o suficiente para que um gesto se torne possivel.",
        reflectionPrompt: "Qual e o menor movimento coerente que pode acontecer agora?",
        ctaLabel: "Acionar o movimento",
      },
      {
        id: "perception-7-navros",
        order: 7,
        stage: "return",
        nodeId: "NAVROS",
        agentLabel: "NAVROS",
        title: "Retorno consciente",
        experience: "nova orientacao",
        narrative:
          "A jornada retorna ao centro. NAVROS aparece de novo nao como ponto zero, mas como campo relido.",
        reflectionPrompt: "O que voce enxerga agora que nao estava visivel na entrada?",
        ctaLabel: "Fechar com orientacao",
      },
    ],
  },
  {
    id: "structure",
    title: "Caminho da Estrutura",
    label: "Jornada da Estrutura",
    promptLabel: "Organizar minha vida ou projeto",
    promptDescription: "Uma travessia para estabilizar, interpretar e agir com coerencia.",
    entryProfile: "Pessoas organizando vida, decisao ou arquitetura de projeto.",
    centralQuestion: "Como organizar minha vida de forma coerente?",
    completionMode: "returns_to_navros",
    startNodeId: "NAVROS",
    endNodeId: "NAVROS",
    routeOverlayId: "structure",
    routeOverlayNodeIds: ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX"],
    path: ["NAVROS", "SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX", "NAVROS"],
    completionCopy:
      "Voce voltou ao NAVROS com uma arquitetura interna mais legivel e um proximo passo coerente.",
    steps: [
      {
        id: "structure-1-navros",
        order: 1,
        stage: "entry",
        nodeId: "NAVROS",
        agentLabel: "NAVROS",
        title: "Entrada",
        experience: "reconhecer posicao",
        narrative:
          "Toda organizacao comeca por orientacao. NAVROS identifica o ponto de partida antes de propor qualquer estrutura.",
        reflectionPrompt: "Que parte da sua vida ou do seu projeto mais precisa de organizacao agora?",
        ctaLabel: "Definir o ponto de partida",
      },
      {
        id: "structure-2-syntaris",
        order: 2,
        stage: "perception",
        nodeId: "SYNTARIS",
        agentLabel: "SYNTARIS",
        title: "Estabilizar",
        experience: "estabilizar",
        narrative:
          "SYNTARIS reduz ruido interno. Antes de reorganizar o sistema, voce precisa estabilizar a relacao entre as partes.",
        reflectionPrompt: "O que em voce precisa de estabilidade antes de qualquer reorganizacao?",
        ctaLabel: "Estabilizar o sistema",
      },
      {
        id: "structure-3-fince",
        order: 3,
        stage: "comprehension",
        nodeId: "FINCE",
        agentLabel: "FINCE",
        title: "Interpretar padroes",
        experience: "interpretar padroes",
        narrative:
          "FINCE transforma materia dispersa em leitura. O sistema comeca a revelar sua logica escondida.",
        reflectionPrompt: "Que padrao ou repeticao esta tentando estruturar sua leitura?",
        ctaLabel: "Interpretar o desenho",
      },
      {
        id: "structure-4-oria",
        order: 4,
        stage: "integration",
        nodeId: "ORIA",
        agentLabel: "ORIA",
        title: "Abrir possibilidades",
        experience: "abrir possibilidades",
        narrative:
          "ORIA cria espaco de manobra. Estrutura coerente nao e rigidez; e abertura bem ancorada.",
        reflectionPrompt: "Que possibilidade se torna viavel quando o sistema para de se defender?",
        ctaLabel: "Abrir o proximo arranjo",
      },
      {
        id: "structure-5-heslos",
        order: 5,
        stage: "movement",
        nodeId: "HESLOS",
        agentLabel: "HESLOS",
        title: "Integrar dimensoes",
        experience: "integrar dimensoes",
        narrative:
          "HESLOS costura o que estava separado. O interno, o pratico e o simbolico comecam a operar como um so campo.",
        reflectionPrompt: "Que dimensoes precisam ser integradas para que sua decisao sustente o tempo?",
        ctaLabel: "Integrar as camadas",
      },
      {
        id: "structure-6-flux",
        order: 6,
        stage: "expansion",
        nodeId: "FLUX",
        agentLabel: "FLUX",
        title: "Agir com coerencia",
        experience: "agir com coerencia",
        narrative:
          "FLUX converte a nova estrutura em gesto. A acao deixa de ser pressa e passa a ser continuidade coerente.",
        reflectionPrompt: "Qual acao organizada pode consolidar essa estrutura sem excessos?",
        ctaLabel: "Mover com coerencia",
      },
      {
        id: "structure-7-navros",
        order: 7,
        stage: "return",
        nodeId: "NAVROS",
        agentLabel: "NAVROS",
        title: "Retorno consciente",
        experience: "nova direcao",
        narrative:
          "O retorno a NAVROS sela a reorganizacao. O centro agora enxerga com mais direcao e menos atrito.",
        reflectionPrompt: "Com a nova estrutura em maos, qual direcao ficou mais clara?",
        ctaLabel: "Fechar com nova direcao",
      },
    ],
  },
  {
    id: "action",
    title: "Caminho da Acao",
    label: "Jornada da Acao",
    promptLabel: "Criar movimento e transformacao",
    promptDescription: "Uma travessia para converter visao em gesto, expressao e amplitude.",
    entryProfile: "Criadores, empreendedores e agentes de transformacao.",
    centralQuestion: "Como transformar minha visao em realidade?",
    completionMode: "resolves_in_terminal_agent",
    startNodeId: "NAVROS",
    endNodeId: "OKTAVE",
    routeOverlayId: "action",
    routeOverlayNodeIds: ["FLUX", "SOLARA", "VELTARA", "SYNTRIA", "ASTRAEL", "OKTAVE"],
    path: ["NAVROS", "FLUX", "SOLARA", "VELTARA", "SYNTRIA", "ASTRAEL", "OKTAVE"],
    completionCopy:
      "A jornada de Acao se resolve em OKTAVE como harmonia sistemica. O retorno explicito a NAVROS continua aberto como decisao de design.",
    openQuestion:
      "Decidir se OKTAVE encerra a jornada ou se ainda deve existir um retorno simbolico a NAVROS.",
    steps: [
      {
        id: "action-1-navros",
        order: 1,
        stage: "entry",
        nodeId: "NAVROS",
        agentLabel: "NAVROS",
        title: "Entrada",
        experience: "reconhecer direcao",
        narrative:
          "Mesmo a jornada da Acao precisa de centro. NAVROS impede que o movimento comece sem orientacao.",
        reflectionPrompt: "Que visao ou impulso quer ganhar forma agora?",
        ctaLabel: "Orientar a acao",
      },
      {
        id: "action-2-flux",
        order: 2,
        stage: "perception",
        nodeId: "FLUX",
        agentLabel: "FLUX",
        title: "Iniciar movimento",
        experience: "iniciar movimento",
        narrative:
          "FLUX desloca a energia da intencao para o gesto. A travessia passa da ideia para a corrente viva.",
        reflectionPrompt: "Que movimento precisa deixar de ser potencial e virar gesto?",
        ctaLabel: "Comecar a mover",
      },
      {
        id: "action-3-solara",
        order: 3,
        stage: "comprehension",
        nodeId: "SOLARA",
        agentLabel: "SOLARA",
        title: "Energia criativa",
        experience: "energia criativa",
        narrative:
          "SOLARA aquece a criacao. O que estava em impulso ganha combustivel, cor e presenca.",
        reflectionPrompt: "Onde sua energia criativa esta pedindo passagem real?",
        ctaLabel: "Acender a criacao",
      },
      {
        id: "action-4-veltara",
        order: 4,
        stage: "integration",
        nodeId: "VELTARA",
        agentLabel: "VELTARA",
        title: "Integracao",
        experience: "integracao",
        narrative:
          "VELTARA organiza a criacao no mundo. A energia encontra forma, sistema e encaixe.",
        reflectionPrompt: "O que precisa se integrar para que sua criacao nao se disperse?",
        ctaLabel: "Integrar a criacao",
      },
      {
        id: "action-5-syntria",
        order: 5,
        stage: "movement",
        nodeId: "SYNTRIA",
        agentLabel: "SYNTRIA",
        title: "Expressao",
        experience: "expressao",
        narrative:
          "SYNTRIA transforma integracao em linguagem. O movimento ganha forma compartilhavel.",
        reflectionPrompt: "Como essa visao quer ser expressa de forma inteligivel e viva?",
        ctaLabel: "Expressar o movimento",
      },
      {
        id: "action-6-astrael",
        order: 6,
        stage: "expansion",
        nodeId: "ASTRAEL",
        agentLabel: "ASTRAEL",
        title: "Visao ampliada",
        experience: "visao ampliada",
        narrative:
          "ASTRAEL eleva o campo da acao. A criacao deixa de ser apenas execucao e passa a operar em escala maior.",
        reflectionPrompt: "Que visao ampliada se torna possivel quando voce sai da urgencia imediata?",
        ctaLabel: "Ampliar a visao",
      },
      {
        id: "action-7-oktave",
        order: 7,
        stage: "return",
        nodeId: "OKTAVE",
        agentLabel: "OKTAVE",
        title: "Harmonia sistemica",
        experience: "harmonia sistemica",
        narrative:
          "OKTAVE fecha a jornada como resolucao sistemica. Aqui o movimento encontra padrao, ressonancia e campo ampliado.",
        reflectionPrompt: "Que forma de harmonia ou totalidade essa travessia deixa disponivel agora?",
        ctaLabel: "Fechar em harmonia",
      },
    ],
  },
];

export function getMandalaJourneyById(
  journeyId: MandalaJourneyId | null | undefined,
): MandalaJourney | null {
  if (!journeyId) {
    return null;
  }

  return mandalaJourneys.find((journey) => journey.id === journeyId) ?? null;
}

export function getMandalaJourneyTrail(
  journey: MandalaJourney,
  stepIndex: number,
): MandalaNodeId[] {
  return journey.steps.slice(0, stepIndex + 1).map((step) => step.nodeId);
}

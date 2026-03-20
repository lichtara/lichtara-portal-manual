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
  | "fallback";

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
];

function hasWord(source: string, candidates: string[]): boolean {
  const normalized = source.trim().toLowerCase();

  return candidates.some((candidate) => normalized.includes(candidate));
}

function resolveAreaPrefix(area: string): string {
  const normalizedArea = area.trim();

  if (!normalizedArea) {
    return "Neste momento,";
  }

  return `Em ${normalizedArea},`;
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

  if (hasWord(normalizedFeeling, ["sobrec", "pressao", "pressa", "excesso", "peso", "sufoc"])) {
    return "sobrecarga";
  }

  if (hasWord(normalizedFeeling, ["trav", "parad", "procrast", "bloque"])) {
    return "paralisia";
  }

  if (hasWord(normalizedFeeling, ["duvid", "indecis", "incert"])) {
    return "duvida";
  }

  if (hasWord(normalizedFeeling, ["ansied", "urgenc", "aceler", "pressa"])) {
    return "ansiedade";
  }

  if (hasWord(normalizedFeeling, ["desalinh", "desconex", "incomod", "errad", "estranh", "fora do lugar"])) {
    return "desalinhamento";
  }

  return "fallback";
}

export function buildNavrosReadingCopy(
  answers: NavrosOperationalAnswers,
): string {
  const areaPrefix = resolveAreaPrefix(answers.area);
  const pattern = normalizeNavrosFeeling(answers.feeling);

  switch (pattern) {
    case "confusao":
      return `${areaPrefix} o que esta diante de voce nao e ausencia de caminho, mas presenca de multiplas possibilidades sem organizacao suficiente para escolher.

A confusao surge quando ainda nao ha um criterio claro sustentando suas decisoes.

Antes de avancar, o ponto nao e escolher melhor, mas reconhecer o que, para voce, realmente importa neste momento.`;

    case "sobrecarga":
      return `${areaPrefix} o que voce esta vivendo nao e apenas volume, e acumulo sem distribuicao.

Quando muitas coisas ocupam o mesmo nivel de prioridade, o sistema interno perde capacidade de resposta.

O proximo passo nao e fazer mais, mas reorganizar o que realmente precisa de espaco agora.`;

    case "paralisia":
      return `${areaPrefix} ha movimento disponivel, mas ele ainda nao encontrou um ponto de apoio claro.

A paralisia nao indica falta de capacidade, mas ausencia de uma base suficientemente estavel para iniciar.

Em vez de tentar avancar em tudo, reduza o movimento ate encontrar um primeiro passo que possa ser sustentado.`;

    case "duvida":
      return `${areaPrefix} a duvida que aparece aqui nao e um erro, e um sinal de que existe mais de uma possibilidade viavel.

O impasse nao esta nas opcoes, mas na ausencia de um criterio que diferencie uma da outra.

O que precisa ser visto agora nao e qual caminho seguir, mas a partir de qual referencia voce esta escolhendo.`;

    case "ansiedade":
      return `${areaPrefix} existe uma pressao por resolucao, mas ela nao vem necessariamente da situacao em si.

A urgencia tende a antecipar movimentos antes que a base esteja clara, o que pode gerar decisoes desalinhadas.

Antes de responder ao tempo externo, e necessario recuperar um minimo de clareza interna sobre o que esta acontecendo.`;

    case "desalinhamento":
      return `${areaPrefix} o desconforto que aparece nao e aleatorio, e um sinal de desalinhamento entre o que esta sendo vivido e o que ja nao se sustenta internamente.

Esse tipo de sensacao costuma surgir quando algo continua em movimento, mesmo depois de ter perdido coerencia.

O ponto agora nao e ajustar rapidamente, mas reconhecer com honestidade o que ja nao corresponde mais.`;

    default:
      return `${areaPrefix} existe um movimento acontecendo que ainda nao esta totalmente claro.

Antes de tentar resolver ou avancar, vale observar com mais atencao o que esta se formando.

A clareza aqui nao vem de resposta imediata, mas de permanencia suficiente para perceber o que se organiza.`;
  }
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

    default:
      return `Nas proximas 24 horas, observe como voce reage quando ${area} volta a pedir atencao.`;
  }
}

export function buildNavrosMovementCopy(
  answers: NavrosOperationalAnswers,
): string {
  const pattern = normalizeNavrosFeeling(answers.feeling);

  switch (pattern) {
    case "confusao":
    case "duvida":
      return "Voce esta entrando em uma fase de clareza.";

    case "paralisia":
      return "Voce esta entrando em uma fase de movimento.";

    case "sobrecarga":
    case "ansiedade":
    case "desalinhamento":
      return "Voce esta entrando em uma fase de reorganizacao.";

    default:
      return "Voce esta entrando em uma fase de reorganizacao.";
  }
}

export type NavrosCopyValidationResult = {
  valid: boolean;
  issues: string[];
};

const INSTRUCTION_PATTERNS = [
  "antes de",
  "faca",
  "faça",
  "tente",
  "evite",
  "defina",
  "reserve",
  "comece por",
  "o proximo passo e",
  "o próximo passo é",
] as const;

const TEMPORAL_PATTERNS = [
  "nas proximas",
  "nas próximas",
  "hoje",
  "amanha",
  "amanhã",
  "agora voce deve",
  "agora você deve",
  "a partir de agora",
] as const;

const FALSE_CERTAINTY_PATTERNS = [
  "vai",
  "vai acontecer",
  "comeca a se firmar",
  "começa a se firmar",
  "vai se resolver",
  "se resolve",
  "vai melhorar",
] as const;

const GENERIC_PATTERNS = [
  "nem tudo",
  "nem sempre",
  "ha um momento",
  "há um momento",
  "as vezes",
  "às vezes",
  "em algum momento",
] as const;

function normalizeForMatch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .toLowerCase();
}

function compactWhitespace(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;!?])/g, "$1")
    .trim();
}

export function hasInstruction(text: string): boolean {
  const lowered = normalizeForMatch(text);

  return INSTRUCTION_PATTERNS.some((pattern) => lowered.includes(pattern));
}

export function hasTemporalPrescription(text: string): boolean {
  const lowered = normalizeForMatch(text);

  return TEMPORAL_PATTERNS.some((pattern) => lowered.includes(pattern));
}

export function hasFalseCertainty(text: string): boolean {
  const lowered = normalizeForMatch(text);

  return FALSE_CERTAINTY_PATTERNS.some((pattern) => lowered.includes(pattern));
}

export function hasRepetition(text: string): boolean {
  const lowered = normalizeForMatch(text);

  const repeatedConcepts = [
    ["forma", "formacao", "tomar forma"],
    ["prioridade", "mesmo nivel", "mesmo nivel de prioridade"],
    ["clareza", "nitidez", "claro"],
    ["movimento", "avancar", "andar"],
  ] as const;

  return repeatedConcepts.some((group) => {
    const matches = group.filter((word) => lowered.includes(word));
    return matches.length > 1;
  });
}

export function soundsGeneric(text: string): boolean {
  const lowered = normalizeForMatch(text);

  return GENERIC_PATTERNS.some((pattern) => lowered.includes(pattern));
}

export function validateNavrosCopy(text: string): NavrosCopyValidationResult {
  const issues: string[] = [];

  if (hasInstruction(text)) {
    issues.push("Contém instrução explícita ou implícita");
  }

  if (hasTemporalPrescription(text)) {
    issues.push("Contém prescrição temporal");
  }

  if (hasFalseCertainty(text)) {
    issues.push("Afirma algo que pode não ser verdadeiro para o usuário");
  }

  if (hasRepetition(text)) {
    issues.push("Possível redundância estrutural");
  }

  if (soundsGeneric(text)) {
    issues.push("Estrutura genérica ou previsível");
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

function removeTemporal(text: string): string {
  return compactWhitespace(
    text
      .replace(/nas proximas\s*\d+\s*\w+/giu, "")
      .replace(/nas próximas\s*\d+\s*\w+/giu, "")
      .replace(/\bhoje[, ]*/giu, "")
      .replace(/\bamanh[ãa][, ]*/giu, "")
      .replace(/a partir de agora[, ]*/giu, ""),
  );
}

function softenCertainty(text: string): string {
  return compactWhitespace(
    text
      .replace(/\bcomeca a se firmar\b/giu, "pode começar a se firmar")
      .replace(/\bcomeça a se firmar\b/giu, "pode começar a se firmar")
      .replace(/\bvai acontecer\b/giu, "pode acontecer")
      .replace(/\bvai se resolver\b/giu, "pode se reorganizar")
      .replace(/\bse resolve\b/giu, "pode se reorganizar")
      .replace(/\bvai melhorar\b/giu, "pode melhorar")
      .replace(/\besta resolvido\b/giu, "começa a se reorganizar")
      .replace(/\bestá resolvido\b/giu, "começa a se reorganizar"),
  );
}

function removeInstruction(text: string): string {
  return compactWhitespace(
    text
      .replace(/\bantes de\s+/giu, "")
      .replace(/\bvale\s+/giu, "")
      .replace(/\bdeve\b/giu, "")
      .replace(/\btente\b/giu, "")
      .replace(/\bevite\b/giu, "")
      .replace(/\bo proximo passo e\b/giu, "")
      .replace(/\bo próximo passo é\b/giu, ""),
  );
}

function reduceRepetition(text: string): string {
  const replacements: Array<[RegExp, string]> = [
    [/prioridade[^.]*prioridade/giu, "o que realmente importa"],
    [/suficiente[^.]*suficiente/giu, "já há base para avançar"],
    [/forma(?:cao|ção)?[^.]*forma(?:cao|ção)?/giu, "algo começa a se delinear"],
  ];

  return compactWhitespace(
    replacements.reduce((accumulator, [pattern, replacement]) => {
      return accumulator.replace(pattern, replacement);
    }, text),
  );
}

export function autoCorrectNavrosCopy(text: string): string {
  let result = text;

  result = removeTemporal(result);
  result = softenCertainty(result);
  result = removeInstruction(result);
  result = reduceRepetition(result);

  return result.trim();
}

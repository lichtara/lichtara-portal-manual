export type NavrosDomain =
  | "trabalho"
  | "saude"
  | "relacoes"
  | "financas"
  | "proposito"
  | "transicao";

function compactWhitespace(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;!?])/g, "$1")
    .trim();
}

export function normalizeNavrosDomain(area: string): NavrosDomain {
  const normalized = area.trim().toLowerCase();

  if (normalized.includes("saude")) {
    return "saude";
  }

  if (normalized.includes("rel")) {
    return "relacoes";
  }

  if (normalized.includes("fin")) {
    return "financas";
  }

  if (normalized.includes("prop")) {
    return "proposito";
  }

  if (normalized.includes("trans")) {
    return "transicao";
  }

  return "trabalho";
}

function applyGlobalSafety(text: string): string {
  return compactWhitespace(
    text
      .replace(/comeca a se firmar/giu, "pode começar a se firmar")
      .replace(/começa a se firmar/giu, "pode começar a se firmar")
      .replace(/vai acontecer/giu, "pode acontecer")
      .replace(/vai se resolver/giu, "pode se reorganizar")
      .replace(/^é\s+/giu, "")
      .replace(/^isso\s+/giu, ""),
  );
}

function correctSaude(text: string): string {
  return compactWhitespace(
    text
      .replace(/\bcampo\b/giu, "corpo")
      .replace(/\bresposta\b/giu, "resposta do corpo")
      .replace(/se estabilizar/giu, "encontrar mais estabilidade")
      .replace(/se reorganizar/giu, "começar a se reorganizar")
      .replace(/deixa de se espalhar/giu, "pode ganhar mais direção"),
  );
}

function correctRelacoes(text: string): string {
  return compactWhitespace(
    text
      .replace(/se estabilizar/giu, "encontrar outro ritmo")
      .replace(/se firmar/giu, "ganhar outra forma")
      .replace(/ganha nitidez/giu, "pode ganhar mais clareza"),
  );
}

function correctFinancas(text: string): string {
  return compactWhitespace(
    text
      .replace(/ganha mais clareza/giu, "fica mais claro")
      .replace(/comeca a se reorganizar/giu, "começa a se organizar melhor")
      .replace(/começa a se reorganizar/giu, "começa a se organizar melhor"),
  );
}

function correctProposito(text: string): string {
  return compactWhitespace(
    text
      .replace(/\bcampo\b/giu, "direção")
      .replace(/se espalhar/giu, "perder foco")
      .replace(/ganha nitidez/giu, "fica mais claro com o tempo"),
  );
}

function correctTransicao(text: string): string {
  return compactWhitespace(
    text
      .replace(/se organizar/giu, "se reorganizar aos poucos")
      .replace(/comeca a se formar/giu, "começa a se delinear")
      .replace(/começa a se formar/giu, "começa a se delinear"),
  );
}

function correctTrabalho(text: string): string {
  return text;
}

function applyDomainRules(text: string, domain: NavrosDomain): string {
  switch (domain) {
    case "saude":
      return correctSaude(text);

    case "relacoes":
      return correctRelacoes(text);

    case "financas":
      return correctFinancas(text);

    case "proposito":
      return correctProposito(text);

    case "transicao":
      return correctTransicao(text);

    case "trabalho":
    default:
      return correctTrabalho(text);
  }
}

export function autoCorrectByDomain(
  text: string,
  domain: NavrosDomain,
): string {
  const globallySafe = applyGlobalSafety(text);
  const domainSafe = applyDomainRules(globallySafe, domain);

  return domainSafe.trim();
}

export type NavrosDomain =
  | "trabalho"
  | "saude"
  | "relacoes"
  | "financas"
  | "proposito"
  | "transicao";

export type NavrosDomainAutoCorrectMode =
  | "insight"
  | "movement";

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

function correctSaude(
  text: string,
  mode: NavrosDomainAutoCorrectMode,
): string {
  return compactWhitespace(
    text
      .replace(/\bpede resposta\b/giu, "pede atenção")
      .replace(/se estabilizar/giu, "encontrar mais estabilidade")
      .replace(
        /deixa de se espalhar/giu,
        mode === "movement" ? "pode ganhar mais direção" : "deixa de se dispersar",
      ),
  );
}

function correctRelacoes(
  text: string,
  mode: NavrosDomainAutoCorrectMode,
): string {
  return compactWhitespace(
    text
      .replace(
        /se estabilizar/giu,
        mode === "movement" ? "ganhar outro ritmo" : "encontrar outro ritmo",
      )
      .replace(/se firmar/giu, mode === "movement" ? "aparecer" : "ganhar outra forma")
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

function correctTransicao(
  text: string,
  mode: NavrosDomainAutoCorrectMode,
): string {
  return compactWhitespace(
    text
      .replace(/se organizar/giu, "se reorganizar aos poucos")
      .replace(/comeca a se formar/giu, "começa a se delinear")
      .replace(/começa a se formar/giu, "começa a se delinear")
      .replace(/se estabilizar/giu, mode === "movement" ? "ganhar outro ritmo" : "se estabilizar")
      .replace(/se firmar/giu, mode === "movement" ? "aparecer" : "se firmar"),
  );
}

function correctTrabalho(text: string): string {
  return text;
}

function applyDomainRules(
  text: string,
  domain: NavrosDomain,
  mode: NavrosDomainAutoCorrectMode,
): string {
  switch (domain) {
    case "saude":
      return correctSaude(text, mode);

    case "relacoes":
      return correctRelacoes(text, mode);

    case "financas":
      return correctFinancas(text);

    case "proposito":
      return correctProposito(text);

    case "transicao":
      return correctTransicao(text, mode);

    case "trabalho":
    default:
      return correctTrabalho(text);
  }
}

export function autoCorrectByDomain(
  text: string,
  domain: NavrosDomain,
  mode: NavrosDomainAutoCorrectMode = "insight",
): string {
  const globallySafe = applyGlobalSafety(text);
  const domainSafe = applyDomainRules(globallySafe, domain, mode);

  return domainSafe.trim();
}

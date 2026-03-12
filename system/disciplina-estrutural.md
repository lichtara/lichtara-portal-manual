# Disciplina Estrutural

## Proposito

Esta nota existe para proteger a coerencia do Lichtara durante a expansao do sistema.

Regra central:

> nao expandir o sistema mais rapido do que a clareza dele

O Lichtara ja possui algo raro: alinhamento entre teoria, experiencia e implementacao. Essa coerencia e mais importante do que velocidade de proliferacao de features.

## Criterio de Decisao

Antes de aceitar uma nova ideia, perguntar:

`isso muda a arquitetura do sistema ou apenas melhora a experiencia?`

Leitura pratica:

- se melhora a experiencia, pode evoluir com mais liberdade
- se muda a arquitetura, precisa de pausa, nomeacao clara e reconciliacao com a matriz canonica

## Dois Tipos de Crescimento

| Tipo | Natureza | Exemplo |
| --- | --- | --- |
| estrutural | altera a forma do sistema | nova rota, nova ontologia, nova camada de dados, novo runtime |
| ornamental | refina a experiencia sem mudar o sistema | animacao, transicao, copy, clima visual, microinteracao |

Regra:

- crescimento ornamental e permitido quando o nucleo esta claro
- crescimento estrutural exige deliberacao explicita

## Quatro Perguntas de Controle

1. Isso preserva `Field / Coherence / Limit` como gramatica minima do sistema?
2. Isso preserva `NAVROS / SYNTARIS / FLUX` como nucleo operativo?
3. Isso continua cabendo na mandala, em vez de criar um segundo sistema paralelo?
4. Isso reduz ou aumenta a carga cognitiva da V1 publica?

Se a resposta a qualquer uma delas for incerta, a mudanca deve ser tratada como estrutural.

## Guardrails Atuais

- `NAVROS` permanece o eixo inicial da experiencia publica
- a V1 publica continua com uma unica jornada exposta: `Percepcao`
- `Estrutura` e `Acao` permanecem como capacidade arquitetural, nao como exposicao imediata
- toda nova experiencia deve caber na mandala
- o repo cresce por camadas claras, nao por proliferacao de pastas sem criterio

## Aplicacao ao Trabalho com Codex

Ao propor ou implementar um proximo passo:

- liberar com mais autonomia refinamentos de experiencia, clareza e interface
- revisar com mais cuidado mudancas de modelo, ontologia, governanca, taxonomia ou arquitetura do repo
- preferir modularizacao progressiva a reestruturacoes grandes

Formula curta:

`experiencia pode iterar rapido`

`arquitetura deve iterar devagar`

## Horizonte de Expansao

O Lichtara pode crescer, no futuro, para algo mais modular:

- jornadas como modulos de experiencia
- mandala como mapa comum
- engine como runtime de navegacao

Mas esse horizonte nao deve antecipar a V1.

Regra:

- primeiro provar a clareza de `NAVROS -> Percepcao`
- depois modularizar com base no que realmente se manteve coerente

## Documento Relacionado

- [matriz-canonica-do-sistema.md](matriz-canonica-do-sistema.md)
- [lichtara-core-architecture.md](lichtara-core-architecture.md)
- [portal-architecture.md](portal-architecture.md)
- [../implementation/portal-roadmap-e-backlog.md](../implementation/portal-roadmap-e-backlog.md)

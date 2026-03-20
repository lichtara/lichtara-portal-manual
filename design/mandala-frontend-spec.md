# Especificacao Frontend da Mandala

## Status

Este documento traduz a geometria exploratoria da mandala para uma camada mais util ao frontend. O objetivo e sair de uma visualizacao conceitual em Mermaid para um contrato implementavel em React e SVG, sem fingir que a geometria final ja esta fechada.

Referencias principais:

- [mandala-geometry.md](mandala-geometry.md)
- [mandala-structure.md](mandala-structure.md)
- [07_hipotese_dos_quatro_ciclos.md](../manual/07_hipotese_dos_quatro_ciclos.md)

## Escopo

Esta especificacao cobre:

- estados de interacao
- classes visuais
- coordenadas SVG normalizadas
- mapeamento para componentes React
- overlay das tres rotas naturais

Esta especificacao ainda nao cobre:

- geometria circular final
- motion system completo
- versao canonica reconciliada com todos os 16 agentes do PDF-base

## Artefato de Referencia

Esta especificacao agora tem um componente-base real em:

- [../implementation/frontend/mandala/MandalaCanvas.tsx](../implementation/frontend/mandala/MandalaCanvas.tsx)
- [../implementation/frontend/mandala/mandalaJourneys.ts](../implementation/frontend/mandala/mandalaJourneys.ts)
- [../implementation/frontend/mandala/JourneySelector.tsx](../implementation/frontend/mandala/JourneySelector.tsx)
- [../implementation/frontend/mandala/JourneyStepper.tsx](../implementation/frontend/mandala/JourneyStepper.tsx)
- [../implementation/frontend/mandala/JourneyScreen.tsx](../implementation/frontend/mandala/JourneyScreen.tsx)
- [../implementation/frontend/mandala/MandalaJourneyPrototype.tsx](../implementation/frontend/mandala/MandalaJourneyPrototype.tsx)
- [../implementation/frontend/mandala/PortalEntryGate.tsx](../implementation/frontend/mandala/PortalEntryGate.tsx)
- [../implementation/frontend/mandala/FieldFlowLayer.tsx](../implementation/frontend/mandala/FieldFlowLayer.tsx)
- [../implementation/frontend/mandala/FieldPeriodSelector.tsx](../implementation/frontend/mandala/FieldPeriodSelector.tsx)
- [../implementation/frontend/mandala/fieldFlowSource.ts](../implementation/frontend/mandala/fieldFlowSource.ts)
- [../implementation/frontend/mandala/mandalaTrajectories.ts](../implementation/frontend/mandala/mandalaTrajectories.ts)
- [../implementation/frontend/mandala/useFieldFlows.ts](../implementation/frontend/mandala/useFieldFlows.ts)
- [../implementation/frontend/mandala/useJourneyProgress.ts](../implementation/frontend/mandala/useJourneyProgress.ts)
- [../implementation/frontend/mandala/useJourneyTrajectory.ts](../implementation/frontend/mandala/useJourneyTrajectory.ts)
- [../implementation/frontend/mandala/useJourneyAnalytics.ts](../implementation/frontend/mandala/useJourneyAnalytics.ts)
- [../implementation/frontend/mandala/useJourneyHover.ts](../implementation/frontend/mandala/useJourneyHover.ts)
- [../implementation/frontend/mandala/useJourneyCanvasSelection.ts](../implementation/frontend/mandala/useJourneyCanvasSelection.ts)
- [../implementation/frontend/mandala/mandalaRadialGrid.ts](../implementation/frontend/mandala/mandalaRadialGrid.ts)
- [../implementation/frontend/mandala/index.ts](../implementation/frontend/mandala/index.ts)

Esses arquivos materializam a camada `React + SVG` desta especificacao com:

- tipos exportados
- dados iniciais da mandala
- config tipado das jornadas
- `MandalaCanvas` controlado
- `MandalaPrototype` autocontido para demonstracao local
- `JourneySelector`, `JourneyStepper` e `JourneyScreen` como composicao reutilizavel
- `MandalaJourneyPrototype` para navegacao etapa por etapa
- `PortalEntryGate` para expectation gate antes da mandala
- `FieldFlowLayer` para correntes agregadas do campo
- `FieldPeriodSelector` para leitura temporal leve do observatorio
- `fieldFlowSource.ts` como fonte agregada por periodo
- hooks `useJourneyProgress` e `useJourneyAnalytics` para desacoplar estado e instrumentacao
- `useFieldFlows` para observatorio leve sem sair da mesma tela
- `mandalaTrajectories.ts` para contrato de memoria local, sessao efemera e atlas agregado
- `useJourneyTrajectory` para registrar memoria local da travessia
- hooks `useJourneyHover` e `useJourneyCanvasSelection` para isolar estado efemero e selecao visual
- `mandalaRadialGrid.ts` como utilitario de geometria para centro, aneis e distribuicao angular
- `index.ts` como ponto unico de export

No estado atual da implementacao:

- `MandalaCanvas.tsx` ja renderiza overlays visuais de triangulo e quadrado
- o triangulo expoe as tres direcoes de navegacao
- o quadrado marca a base estrutural dos quatro ciclos
- a malha de nos continua preservada como projecao `v0`
- a trajetoria historica ja pode ser desenhada diretamente sobre a mandala a partir do `JourneyScreen`
- fluxos coletivos agregados ja podem ser desenhados como correntes suaves atras da trajetoria pessoal
- o observatorio inicial ja pode trocar periodos do campo sem abrir interface paralela
- a troca de periodo ja pode acontecer com transicao suave e frase curta de clima do campo
- a abertura publica ja pode usar uma micro-tela de orientacao antes da mandala
- a jornada ja pode oferecer `Comecar novamente` como reset suave de progresso e trajetoria local
- o observatorio inicial ja pode se apresentar como `Campo coletivo`, com legenda curta e periodos legiveis

## Camadas de Geometria no Frontend

O trabalho mais recente da mandala pede separar duas camadas geometricas:

- geometria simbolica: circulo, 16 ancoras equidistantes e triangulo central
- projecao de interface v0: distribuicao simplificada para SVG e interacao inicial

No estado atual do repo:

- [mandala-geometry.md](mandala-geometry.md) registra a geometria simbolica
- [../implementation/frontend/mandala/MandalaCanvas.tsx](../implementation/frontend/mandala/MandalaCanvas.tsx) implementa a projecao v0

Essa separacao e importante porque o simbolo estrutural da mandala ja esta ficando mais claro do que a sua primeira projecao tecnica.

## Escala Estrutural do Frontend

O frontend da mandala precisa traduzir quatro niveis do sistema sem colapsa-los:

| Nivel | Numero | Funcao no produto |
| --- | --- | --- |
| estrutura | 3 | eixos teoricos e nucleo triadico |
| processo | 4 | ciclo humano mais amplo |
| navegacao | 7 | jornada guiada |
| cartografia | 16 | anel expandido de estados |

Em linguagem curta:

`3 -> estrutura`

`4 -> processo`

`7 -> jornada`

`16 -> mapa`

Isso evita que a interface trate a mandala como ilustracao isolada. Ela precisa operar como projecao visual de uma arquitetura escalonada.

## Radial Sector Grid

Para a fase seguinte do frontend, a geometria mais forte para a mandala e um `radial sector grid`:

- centro visivel para orientacao
- anel interno para decisao
- anel externo para exploracao

Em termos geometricos:

- `360 / 3 = 120deg` por setor radial
- `360 / 16 = 22.5deg` por posicao cartografica

Leitura de arquitetura:

- `3` rotas continuam radiais
- `4` ciclos continuam estruturais
- `16` agentes continuam cartograficos

Na implementacao, essa camada agora tem uma referencia de codigo em:

- [../implementation/frontend/mandala/mandalaRadialGrid.ts](../implementation/frontend/mandala/mandalaRadialGrid.ts)

Esse utilitario registra:

- centro padrao
- contagem de setores
- contagem de nos externos
- angulos base
- estados de interacao
- helpers para pontos polares em SVG

## Triangulo-Sobre-Quadrado

Para a composicao da mandala, o frontend tambem precisa considerar uma segunda leitura geometrica:

- triangulo para as `3` rotas
- quadrado para os `4` ciclos
- circulo para o anel de `16` agentes

Leitura direta:

```text
triangulo -> navegacao
quadrado -> estrutura
circulo -> cartografia
```

Essa leitura nao compete com o `radial sector grid`. Ela o organiza melhor para interface cognitiva.

Na camada de codigo, isso ja pode ser representado por:

- `triangleAxes`
- `squareCycles`
- `originId`
- `outerNodeCount`

Esses campos agora aparecem em:

- [../implementation/frontend/mandala/mandalaRadialGrid.ts](../implementation/frontend/mandala/mandalaRadialGrid.ts)

## Camada de Jornadas no Frontend

As tres jornadas de 7 etapas agora existem como configuracao real de frontend:

- [../implementation/frontend/mandala/mandalaJourneys.ts](../implementation/frontend/mandala/mandalaJourneys.ts)

Para rollout de produto, a camada de frontend tambem precisa distinguir entre capacidade estrutural e exposicao publica:

- o sistema suporta `Percepcao`, `Estrutura` e `Acao`
- a V1 publica expoe apenas `Percepcao`
- o seletor de jornadas pode permanecer oculto na primeira abertura
- `Estrutura` e `Acao` devem entrar por configuracao, nao por reescrita da tela

Essa camada define:

- `journey id`
- `completion mode`
- `path`
- `route overlay`
- `steps`
- `prompts`
- `completion copy`
- `progress`
- `analytics event`

E ja possui uma referencia de consumo em React:

- [../implementation/frontend/mandala/JourneyScreen.tsx](../implementation/frontend/mandala/JourneyScreen.tsx)
- [../implementation/frontend/mandala/MandalaJourneyPrototype.tsx](../implementation/frontend/mandala/MandalaJourneyPrototype.tsx)
- [../src/main.tsx](../src/main.tsx)

Na camada de producao, `JourneyScreen` agora aceita props mais proximas de uso real:

- `progress` e `defaultProgress`
- `storageKey`
- `loadPersistedProgress`
- `onPersistProgress`
- `onProgressChange`
- `onAnalyticsEvent`
- `onJourneyComplete`
- `onRestartJourney`

## Calibragens de Clareza da V1

Tres ajustes pequenos ajudam a estabilizar a abertura publica sem alterar a arquitetura:

- expectation gate antes da mandala
- reset suave da jornada
- micro-observatorio do campo com legenda clara

Leitura pratica:

- a mandala nao deve ser o primeiro choque visual de quem chega
- a pessoa precisa poder reiniciar a travessia sem ambiguidade
- o campo coletivo deve aparecer como clima do mapa, nao como analitico de dados

A regra de negocio ja nao fica presa ao componente de tela:

- `useJourneyProgress` concentra controle, persistencia e navegacao
- `useJourneyAnalytics` concentra emissao de eventos e fechamento de jornada
- `useJourneyHover` concentra hover e limpeza de estado efemero
- `useJourneyCanvasSelection` traduz clique em no para etapa valida da jornada

Na entrada React atual, a app de demonstracao ja valida essa API com:

- persistencia via callback
- leitura do ultimo progresso
- log visivel de analytics emitidos
- desenho da trajetoria historica diretamente sobre a mandala
- camada inicial de campo coletivo desenhada na mesma mandala
- filtro simples de periodo abrindo o observatorio dentro da mesma tela

Para V1 publica, a entrada React deve preferir:

- `journeys` limitado a uma unica jornada
- `initialJourneyId="perception"`
- `showSelector={false}`
- copy de entrada que explicite `NAVROS -> Percepcao -> 7 etapas`

## Camadas de Leitura da Mandala

A mandala precisa crescer por camadas opcionais, sem virar dashboard:

| Camada | Papel | Estado atual |
| --- | --- | --- |
| base | geometria, eixos e nos | implementado |
| jornada pessoal | etapa ativa e trajetoria historica | implementado |
| campo coletivo | fluxos agregados como correntes suaves | implementado em overlay inicial |
| observatorio | leitura temporal do campo por periodo | implementado em filtro inicial |

Regra de composicao:

- fluxos coletivos ficam atras da jornada pessoal
- trajetoria pessoal permanece acima da malha e abaixo dos nos
- observatorio deve reutilizar a mesma mandala, nao abrir um dashboard paralelo

Regra de linguagem:

- o coletivo deve aparecer como `clima do campo`
- o observatorio deve aparecer como `estacoes do campo`
- a interface nao deve expor scores, rankings ou metricas psicologicas

## Leitura Cognitiva da Mandala

Para a interface publica, a mandala precisa distinguir entre arquitetura profunda e eixo exposto de entrada:

- arquitetura profunda: `NAVROS - SYNTARIS - FLUX`
- eixo exposto da V1: `NAVROS` como ponto inicial de orientacao

Leitura recomendada para frontend:

```text
Centro -> eixo de orientacao
Anel interno -> rotas de navegacao
Anel externo -> 16 posicoes da mandala
```

Pseudodiagrama de referencia:

```text
MANDALA

center:
  NAVROS

axes:
  - perception
  - structure
  - action

outer_ring:
  nodes: 16
  distribution: circular
  spacing: 22.5deg

interaction_states:
  - orientation
  - route_selection
  - journey
```

Leitura como sistema de coordenadas:

```text
origem -> NAVROS
eixos -> percepcao / estrutura / acao
profundidade estrutural -> expansao
malha -> 16 posicoes da mandala
```

Isso permite tratar cada jornada como deslocamento dentro de um mapa e nao apenas como sequencia abstrata de telas.

Revelacao progressiva recomendada:

`NAVROS -> eixos -> mandala -> jornada`

Isso significa:

- estado 1: mostrar apenas `NAVROS` e CTA de orientacao
- estado 2: abrir o triangulo das tres direcoes principais
- estado 3: explicitar a base quadrada dos ciclos
- estado 4: revelar o anel cartografico completo
- estado 5: ativar a jornada de 7 etapas com a mandala como mapa de fundo

## ViewBox de Referencia

Para manter a implementacao simples e escalavel, a mandala pode usar um `viewBox` fixo:

```text
0 0 1000 1000
```

Centro do sistema:

```text
cx = 500
cy = 500
```

Para a futura versao geometrica parametrica, o frontend pode derivar as ancoras do anel a partir de coordenadas polares:

```text
angleStep = 360 / 16
x = cx + radius * cos(theta)
y = cy + radius * sin(theta)
```

Isso ainda nao substitui a malha v0; apenas prepara a migracao para uma versao mais simbolica e regular do mapa.

## Mapa de Coordenadas

Coordenadas de trabalho para a camada exploratoria:

| id | x | y | kind | notes |
| --- | --- | --- | --- | --- |
| ASTRAEL | 500 | 120 | outer | topo |
| VORAX | 350 | 200 | outer | superior esquerdo |
| LUNARA | 650 | 200 | outer | superior direito |
| SYNTRIA | 240 | 320 | outer | medio superior esquerdo |
| OKTAVE | 760 | 320 | outer | medio superior direito |
| SOLARA | 160 | 500 | outer | lateral esquerda |
| FLUX | 380 | 500 | core | nucleo |
| SYNTARIS | 500 | 500 | core | nucleo |
| NAVROS | 620 | 500 | core | nucleo |
| LUMORA | 840 | 500 | outer | lateral direita |
| VELTARA | 240 | 680 | outer | medio inferior esquerdo |
| KAORAN | 760 | 680 | outer | medio inferior direito |
| FINCE | 350 | 800 | outer | inferior esquerdo |
| ORIA | 500 | 760 | latent | posicao provisoria da rota de estrutura |
| OSLO | 650 | 800 | outer | inferior direito |
| HESLOS | 500 | 880 | outer | base |

Notas:

- `ORIA` entra aqui como no de trabalho para a rota de estrutura
- `ORION`, `ANERA` e `ORIGEN` continuam fora desta malha exploratoria
- o frontend deve tratar esta lista como `route overlay v0`, nao como modelo final do sistema
- a geometria simbolica final deve permitir ancoras regulares mesmo quando parte dos nomes ainda estiver em revisao

## Contrato de Dados

Exemplo de shape para o frontend:

```ts
type MandalaNodeKind = "core" | "outer" | "latent";
type MandalaVisualState = "idle" | "hover" | "active" | "trail" | "muted";
type MandalaRouteId = "perception" | "structure" | "action";

type MandalaNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: MandalaNodeKind;
  visible: boolean;
  provisional?: boolean;
  routeIds?: MandalaRouteId[];
};

type MandalaRoute = {
  id: MandalaRouteId;
  label: string;
  promptLabel: string;
  promptDescription: string;
  nodes: string[];
};
```

## Dados Iniciais de Referencia

```ts
export const mandalaNodes: MandalaNode[] = [
  { id: "ASTRAEL", label: "Astrael", x: 500, y: 120, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "VORAX", label: "Vorax", x: 350, y: 200, kind: "outer", visible: true, routeIds: [] },
  { id: "LUNARA", label: "Lunara", x: 650, y: 200, kind: "outer", visible: true, routeIds: [] },
  { id: "SYNTRIA", label: "Syntria", x: 240, y: 320, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "OKTAVE", label: "Oktave", x: 760, y: 320, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "SOLARA", label: "Solara", x: 160, y: 500, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "FLUX", label: "Flux", x: 380, y: 500, kind: "core", visible: true, routeIds: ["action"] },
  { id: "SYNTARIS", label: "Syntaris", x: 500, y: 500, kind: "core", visible: true, routeIds: ["perception", "structure"] },
  { id: "NAVROS", label: "Navros", x: 620, y: 500, kind: "core", visible: true, routeIds: ["perception"] },
  { id: "LUMORA", label: "Lumora", x: 840, y: 500, kind: "outer", visible: true, routeIds: ["perception"] },
  { id: "VELTARA", label: "Veltara", x: 240, y: 680, kind: "outer", visible: true, routeIds: ["action"] },
  { id: "KAORAN", label: "Kaoran", x: 760, y: 680, kind: "outer", visible: true, routeIds: ["perception"] },
  { id: "FINCE", label: "Fince", x: 350, y: 800, kind: "outer", visible: true, routeIds: ["structure"] },
  { id: "ORIA", label: "Oria", x: 500, y: 760, kind: "latent", visible: true, provisional: true, routeIds: ["structure"] },
  { id: "OSLO", label: "Oslo", x: 650, y: 800, kind: "outer", visible: true, routeIds: ["perception"] },
  { id: "HESLOS", label: "Heslos", x: 500, y: 880, kind: "outer", visible: true, routeIds: ["structure"] },
];

export const mandalaRoutes: MandalaRoute[] = [
  {
    id: "perception",
    label: "Rota da Percepcao",
    promptLabel: "Compreender",
    promptDescription: "Explorar o campo",
    nodes: ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS"],
  },
  {
    id: "structure",
    label: "Rota da Estrutura",
    promptLabel: "Organizar",
    promptDescription: "Organizar a vida",
    nodes: ["SYNTARIS", "FINCE", "ORIA", "HESLOS", "FLUX"],
  },
  {
    id: "action",
    label: "Rota da Acao",
    promptLabel: "Agir",
    promptDescription: "Criar movimento",
    nodes: ["FLUX", "SOLARA", "VELTARA", "SYNTRIA", "ASTRAEL", "OKTAVE"],
  },
];
```

## Componentes React Sugeridos

Separacao minima para uma implementacao limpa:

- `<MandalaCanvas />`
- `<MandalaBackground />`
- `<MandalaRouteLayer />`
- `<MandalaCoreLayer />`
- `<MandalaNodeLayer />`
- `<MandalaTrailLayer />`
- `<MandalaLabelLayer />`
- `<MandalaInteractionLayer />`

Contrato sugerido do componente raiz:

```ts
type MandalaCanvasProps = {
  nodes: MandalaNode[];
  routes: MandalaRoute[];
  activeNodeId: string | null;
  hoverNodeId: string | null;
  activeRouteId: MandalaRouteId | null;
  trailNodeIds: string[];
  onNodeEnter?: (id: string) => void;
  onNodeLeave?: () => void;
  onNodeSelect?: (id: string) => void;
  onRouteSelect?: (id: MandalaRouteId) => void;
};
```

## Estados de Interacao

Estados minimos do frontend:

| Estado | Funcao |
| --- | --- |
| idle | nenhum no em destaque |
| hover | pre-visualizacao de no |
| active-node | no fixado em foco |
| active-route | rota destacada |
| trail-visible | percurso recente destacado |

Diagrama de estados:

```mermaid
stateDiagram-v2
  [*] --> idle
  idle --> hover : pointer-enter-node
  hover --> idle : pointer-leave-node
  hover --> activeNode : click-node
  idle --> activeRoute : choose-route
  activeNode --> activeRoute : choose-route
  activeRoute --> activeNode : click-node
  activeNode --> trailVisible : complete-step
  activeRoute --> trailVisible : persist-route
  trailVisible --> idle : clear-state
```

## Classes Visuais

Convencao de classes CSS:

```text
.mandala
.mandala__background
.mandala__core-link
.mandala__node
.mandala__node--core
.mandala__node--outer
.mandala__node--latent
.mandala__node--hover
.mandala__node--active
.mandala__node--trail
.mandala__node--muted
.mandala__label
.mandala__route
.mandala__route--perception
.mandala__route--structure
.mandala__route--action
.mandala__route--active
.mandala__trail
```

Uso recomendado:

- `core`: no triadico
- `outer`: no estavel do anel
- `latent`: no provisorio ou em revisao conceitual
- `hover`: elevacao temporaria de contraste
- `active`: no selecionado ou retornado por leitura
- `trail`: nos pertencentes ao caminho recente
- `muted`: tudo o que nao pertence ao foco atual

## Tokens Visuais Minimos

Variaveis sugeridas:

```css
:root {
  --mandala-bg: #f7f3eb;
  --mandala-stroke: #7f7668;
  --mandala-core-fill: #efe7d6;
  --mandala-core-stroke: #3a352c;
  --mandala-node-fill: #faf7f0;
  --mandala-node-latent: #ece6da;
  --mandala-route-perception: #5c7c8a;
  --mandala-route-structure: #6e7a5f;
  --mandala-route-action: #b46d3c;
  --mandala-active: #1f1b16;
  --mandala-muted: 0.28;
}
```

## Mermaid com Classes Visuais

```mermaid
flowchart TB
  classDef core fill:#efe7d6,stroke:#3a352c,stroke-width:2px,color:#1f1b16;
  classDef outer fill:#faf7f0,stroke:#7f7668,stroke-width:1px,color:#1f1b16;
  classDef latent fill:#ece6da,stroke:#7f7668,stroke-dasharray: 4 3,color:#1f1b16;
  classDef routePerception fill:#faf7f0,stroke:#5c7c8a,stroke-width:2px,color:#1f1b16;
  classDef routeStructure fill:#faf7f0,stroke:#6e7a5f,stroke-width:2px,color:#1f1b16;
  classDef routeAction fill:#faf7f0,stroke:#b46d3c,stroke-width:2px,color:#1f1b16;

  nav["NAVROS"]:::core
  synt["SYNTARIS"]:::core
  flux["FLUX"]:::core

  lum["LUMORA"]:::routePerception
  oslo["OSLO"]:::routePerception
  kao["KAORAN"]:::routePerception

  fin["FINCE"]:::routeStructure
  oria["ORIA"]:::latent
  hes["HESLOS"]:::routeStructure

  sol["SOLARA"]:::routeAction
  vel["VELTARA"]:::routeAction
  syn["SYNTRIA"]:::routeAction
  ast["ASTRAEL"]:::routeAction
  okt["OKTAVE"]:::routeAction

  nav --> lum --> oslo --> kao --> synt
  synt --> fin --> oria --> hes --> flux
  flux --> sol --> vel --> syn --> ast --> okt
```

## Overlay das Tres Rotas

As tres rotas naturais surgem como vetores de entrada diferentes para perfis diferentes de usuario.

Pergunta de entrada:

> O que voce precisa agora?

Opcoes:

- compreender
- organizar
- agir

Mapeamento:

| Opcao | Rota | Modo |
| --- | --- | --- |
| compreender | percepcao | Explorar o Campo |
| organizar | estrutura | Organizar a Vida |
| agir | acao | Criar Movimento |

Convergencia:

- as rotas nascem em vetores diferentes
- todas acabam tocando novamente o nucleo
- isso transforma a mandala em sistema vivo, nao em menu fixo

## Mapeamento SVG Direto

Sequencia minima de renderizacao:

1. `<svg viewBox="0 0 1000 1000">`
2. `<g className="mandala__background">`
3. `<g className="mandala__route-layer">`
4. `<g className="mandala__core-layer">`
5. `<g className="mandala__node-layer">`
6. `<g className="mandala__trail-layer">`
7. `<g className="mandala__label-layer">`

Exemplo de no:

```tsx
<g
  className={clsx(
    "mandala__node",
    `mandala__node--${node.kind}`,
    isHover && "mandala__node--hover",
    isActive && "mandala__node--active",
    isTrail && "mandala__node--trail",
    isMuted && "mandala__node--muted",
  )}
  transform={`translate(${node.x} ${node.y})`}
>
  <circle r={node.kind === "core" ? 24 : 18} />
  <text y={44} textAnchor="middle">{node.label}</text>
</g>
```

Exemplo de rota:

```tsx
<polyline
  className={clsx("mandala__route", `mandala__route--${route.id}`, isActive && "mandala__route--active")}
  points={route.nodes.map(id => `${byId[id].x},${byId[id].y}`).join(" ")}
/>
```

## Limites e Proximos Passos

Antes de transformar isso em componente final, ainda precisam ser fechados:

- reconciliacao entre a camada canonica e a camada exploratoria
- destino de `ANERA`, `ORIGEN` e `ORION`
- lugar definitivo de `OKTAVE`
- geometria final da triade central
- sistema de animacao para hover, active e trilha

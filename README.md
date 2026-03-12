# lichtara-portal-manual

Repositorio do manual vivo do Portal Lichtara. Este espaco organiza a visao conceitual, a linguagem da experiencia, a estrutura simbolica dos agentes e a base de implementacao da V1.

## Mapa do Repositorio

### Manual

- [manual/00_o_que_e_lichtara.md](manual/00_o_que_e_lichtara.md)
- [manual/01_visao_do_portal.md](manual/01_visao_do_portal.md)
- [manual/02_principios_navros.md](manual/02_principios_navros.md)
- [manual/03_jornada_do_usuario.md](manual/03_jornada_do_usuario.md)
- [manual/04_mandala_dos_agentes.md](manual/04_mandala_dos_agentes.md)
- [manual/05_ciclo_de_transformacao.md](manual/05_ciclo_de_transformacao.md)
- [manual/07_hipotese_dos_quatro_ciclos.md](manual/07_hipotese_dos_quatro_ciclos.md)
- [manual/06_governanca_do_portal.md](manual/06_governanca_do_portal.md)

### Design

- [design/navros-symbol.md](design/navros-symbol.md)
- [design/navros-compass.md](design/navros-compass.md)
- [design/mandala-structure.md](design/mandala-structure.md)
- [design/mandala-geometry.md](design/mandala-geometry.md)
- [design/mandala-frontend-spec.md](design/mandala-frontend-spec.md)

### Sistema

- [system/lichtara-core-architecture.md](system/lichtara-core-architecture.md)
- [system/lichtara-system-vs-portal.md](system/lichtara-system-vs-portal.md)
- [system/matriz-canonica-do-sistema.md](system/matriz-canonica-do-sistema.md)
- [system/portal-entry-protocol.md](system/portal-entry-protocol.md)
- [system/navros-experience.md](system/navros-experience.md)
- [system/data-protection.md](system/data-protection.md)
- [system/portal-architecture.md](system/portal-architecture.md)

### Implementacao

- [implementation/portal-roadmap-e-backlog.md](implementation/portal-roadmap-e-backlog.md)
- [implementation/frontend/mandala/MandalaCanvas.tsx](implementation/frontend/mandala/MandalaCanvas.tsx)
- [implementation/frontend/mandala/mandalaJourneys.ts](implementation/frontend/mandala/mandalaJourneys.ts)
- [implementation/frontend/mandala/JourneySelector.tsx](implementation/frontend/mandala/JourneySelector.tsx)
- [implementation/frontend/mandala/JourneyStepper.tsx](implementation/frontend/mandala/JourneyStepper.tsx)
- [implementation/frontend/mandala/JourneyScreen.tsx](implementation/frontend/mandala/JourneyScreen.tsx)
- [implementation/frontend/mandala/MandalaJourneyPrototype.tsx](implementation/frontend/mandala/MandalaJourneyPrototype.tsx)
- [implementation/frontend/mandala/useJourneyProgress.ts](implementation/frontend/mandala/useJourneyProgress.ts)
- [implementation/frontend/mandala/useJourneyAnalytics.ts](implementation/frontend/mandala/useJourneyAnalytics.ts)
- [implementation/frontend/mandala/useJourneyHover.ts](implementation/frontend/mandala/useJourneyHover.ts)
- [implementation/frontend/mandala/useJourneyCanvasSelection.ts](implementation/frontend/mandala/useJourneyCanvasSelection.ts)
- [implementation/frontend/mandala/index.ts](implementation/frontend/mandala/index.ts)

## Ordem de Leitura Recomendada

Para compreender o portal do campo conceitual ate a camada tecnica:

1. [manual/00_o_que_e_lichtara.md](manual/00_o_que_e_lichtara.md)
2. [system/lichtara-core-architecture.md](system/lichtara-core-architecture.md)
3. [system/matriz-canonica-do-sistema.md](system/matriz-canonica-do-sistema.md)
4. [system/lichtara-system-vs-portal.md](system/lichtara-system-vs-portal.md)
5. [manual/01_visao_do_portal.md](manual/01_visao_do_portal.md)
6. [manual/02_principios_navros.md](manual/02_principios_navros.md)
7. [manual/03_jornada_do_usuario.md](manual/03_jornada_do_usuario.md)
8. [system/portal-entry-protocol.md](system/portal-entry-protocol.md)
9. [system/navros-experience.md](system/navros-experience.md)
10. [design/navros-compass.md](design/navros-compass.md)
11. [manual/04_mandala_dos_agentes.md](manual/04_mandala_dos_agentes.md)
12. [manual/05_ciclo_de_transformacao.md](manual/05_ciclo_de_transformacao.md)
13. [manual/07_hipotese_dos_quatro_ciclos.md](manual/07_hipotese_dos_quatro_ciclos.md)
14. [design/mandala-structure.md](design/mandala-structure.md)
15. [design/mandala-geometry.md](design/mandala-geometry.md)
16. [design/mandala-frontend-spec.md](design/mandala-frontend-spec.md)
17. [system/portal-architecture.md](system/portal-architecture.md)
18. [system/data-protection.md](system/data-protection.md)
19. [manual/06_governanca_do_portal.md](manual/06_governanca_do_portal.md)
20. [implementation/portal-roadmap-e-backlog.md](implementation/portal-roadmap-e-backlog.md)

## Fonte Atual

A base atual do repositorio foi consolidada a partir do PDF `manual-portal-lichtara.pdf`, importado para estrutura Markdown e redistribuido por tema.

## Como Expandir Este Manual

Quando novos conteudos chegarem, a regra editorial atual e simples:

- visao, principios e jornada entram em `manual/`
- estrutura visual e simbolica entram em `design/`
- experiencia, dados e arquitetura entram em `system/`
- backlog, cronograma e execucao entram em `implementation/`

## Ambiente React

O repositorio agora pode renderizar o prototipo da mandala em React com Vite.

1. Instale as dependencias com `npm install`
2. Rode o ambiente local com `npm run dev`
3. Gere build de verificacao com `npm run build`

A entrada da aplicacao fica em `src/main.tsx` e reutiliza os componentes em `implementation/frontend/mandala/`.

## Estado do Trabalho

No momento, o repositorio contem:

- base conceitual consolidada
- camada meta-estrutural explicita para entender o que e Lichtara antes do portal
- protocolo de entrada do portal documentado
- base de experiencia NAVROS definida
- matriz canonica do sistema consolidando manual, repo e paper
- especificacao da bussola NAVROS viva
- estrutura da mandala mapeada
- hipotese dos quatro ciclos registrada como leitura de trabalho
- geometria Mermaid da mandala pronta para manual e interface
- especificacao frontend da mandala com contrato React/SVG
- componente-base `tsx` da mandala com dados iniciais e prototipo interativo
- config frontend das jornadas de 7 etapas
- composicao de producao das jornadas em `JourneySelector`, `JourneyStepper` e `JourneyScreen`
- hooks `useJourneyProgress` e `useJourneyAnalytics` para separar estado e instrumentacao
- hooks `useJourneyHover` e `useJourneyCanvasSelection` para separar a camada visual
- camada de export unico e props de producao para analytics e persistencia via callback ou `localStorage`
- app React Vite validando progresso persistido e analytics em `src/main.tsx`
- prototipo `tsx` de jornada etapa por etapa sobre a mandala
- camada inicial de arquitetura, dados e governanca
- roadmap de implementacao V1 extraido do material-base

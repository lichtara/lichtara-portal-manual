# lichtara-portal-manual

Repositorio do manual vivo do Portal Lichtara. Este espaco organiza a visao conceitual, a linguagem da experiencia, a estrutura simbolica dos agentes e a base de implementacao da V1.

## O Que e o Portal Lichtara

O Portal Lichtara e a interface publica do sistema Lichtara.

Ele apresenta um sistema de navegacao da consciencia estruturado por tres rotas de experiencia:

- percepcao
- estrutura
- acao

Cada rota e composta por jornadas guiadas dentro da mandala do sistema.

No recorte publico da V1, a arquitetura ja suporta as tres rotas, mas a exposicao inicial fica concentrada em `NAVROS -> Percepcao`.

## Arquitetura Minima da V1

O corte operacional da abertura publica esta organizado em tres camadas:

- experiencia do usuario: `Entrada -> Reconhecimento do Campo -> Mandala -> Jornada -> Trajetoria -> Retorno`
- arquitetura do sistema: `Portal Interface -> Journey Engine -> Trajectory System -> Field Observatory -> Data Layer`
- infraestrutura tecnica: `Frontend React -> State Layer -> Persistence Layer -> Analytics Layer`

Leitura de rigor:

- isso descreve o nucleo operacional da V1
- nao substitui a arquitetura mais ampla do sistema Lichtara

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
- [system/disciplina-estrutural.md](system/disciplina-estrutural.md)
- [system/portal-entry-protocol.md](system/portal-entry-protocol.md)
- [system/navros-experience.md](system/navros-experience.md)
- [system/mapa-da-travessia.md](system/mapa-da-travessia.md)
- [system/data-protection.md](system/data-protection.md)
- [system/portal-architecture.md](system/portal-architecture.md)

### Implementacao

- [implementation/portal-roadmap-e-backlog.md](implementation/portal-roadmap-e-backlog.md)
- [implementation/frontend/mandala/MandalaCanvas.tsx](implementation/frontend/mandala/MandalaCanvas.tsx)
- [implementation/frontend/mandala/mandalaJourneys.ts](implementation/frontend/mandala/mandalaJourneys.ts)
- [implementation/frontend/mandala/JourneySelector.tsx](implementation/frontend/mandala/JourneySelector.tsx)
- [implementation/frontend/mandala/JourneyStepper.tsx](implementation/frontend/mandala/JourneyStepper.tsx)
- [implementation/frontend/mandala/JourneyScreen.tsx](implementation/frontend/mandala/JourneyScreen.tsx)
- [implementation/frontend/mandala/NavrosOperationalStepper.tsx](implementation/frontend/mandala/NavrosOperationalStepper.tsx)
- [implementation/frontend/mandala/NavrosOperationalScreen.tsx](implementation/frontend/mandala/NavrosOperationalScreen.tsx)
- [implementation/frontend/mandala/navrosOperationalJourney.ts](implementation/frontend/mandala/navrosOperationalJourney.ts)
- [implementation/frontend/mandala/MandalaJourneyPrototype.tsx](implementation/frontend/mandala/MandalaJourneyPrototype.tsx)
- [implementation/frontend/mandala/PortalEntryGate.tsx](implementation/frontend/mandala/PortalEntryGate.tsx)
- [implementation/frontend/mandala/FieldFlowLayer.tsx](implementation/frontend/mandala/FieldFlowLayer.tsx)
- [implementation/frontend/mandala/FieldPeriodSelector.tsx](implementation/frontend/mandala/FieldPeriodSelector.tsx)
- [implementation/frontend/mandala/fieldFlowSource.ts](implementation/frontend/mandala/fieldFlowSource.ts)
- [implementation/frontend/mandala/mandalaTrajectories.ts](implementation/frontend/mandala/mandalaTrajectories.ts)
- [implementation/frontend/mandala/useFieldFlows.ts](implementation/frontend/mandala/useFieldFlows.ts)
- [implementation/frontend/mandala/useJourneyProgress.ts](implementation/frontend/mandala/useJourneyProgress.ts)
- [implementation/frontend/mandala/useJourneyTrajectory.ts](implementation/frontend/mandala/useJourneyTrajectory.ts)
- [implementation/frontend/mandala/useJourneyAnalytics.ts](implementation/frontend/mandala/useJourneyAnalytics.ts)
- [implementation/frontend/mandala/useJourneyHover.ts](implementation/frontend/mandala/useJourneyHover.ts)
- [implementation/frontend/mandala/useJourneyCanvasSelection.ts](implementation/frontend/mandala/useJourneyCanvasSelection.ts)
- [implementation/frontend/mandala/index.ts](implementation/frontend/mandala/index.ts)

## Ordem de Leitura Recomendada

Para compreender o portal do campo conceitual ate a camada tecnica:

1. [manual/00_o_que_e_lichtara.md](manual/00_o_que_e_lichtara.md)
2. [system/lichtara-core-architecture.md](system/lichtara-core-architecture.md)
3. [system/matriz-canonica-do-sistema.md](system/matriz-canonica-do-sistema.md)
4. [system/disciplina-estrutural.md](system/disciplina-estrutural.md)
5. [system/lichtara-system-vs-portal.md](system/lichtara-system-vs-portal.md)
6. [manual/01_visao_do_portal.md](manual/01_visao_do_portal.md)
7. [manual/02_principios_navros.md](manual/02_principios_navros.md)
8. [manual/03_jornada_do_usuario.md](manual/03_jornada_do_usuario.md)
9. [system/portal-entry-protocol.md](system/portal-entry-protocol.md)
10. [system/navros-experience.md](system/navros-experience.md)
11. [system/mapa-da-travessia.md](system/mapa-da-travessia.md)
12. [design/navros-compass.md](design/navros-compass.md)
13. [manual/04_mandala_dos_agentes.md](manual/04_mandala_dos_agentes.md)
14. [manual/05_ciclo_de_transformacao.md](manual/05_ciclo_de_transformacao.md)
15. [manual/07_hipotese_dos_quatro_ciclos.md](manual/07_hipotese_dos_quatro_ciclos.md)
16. [design/mandala-structure.md](design/mandala-structure.md)
17. [design/mandala-geometry.md](design/mandala-geometry.md)
18. [design/mandala-frontend-spec.md](design/mandala-frontend-spec.md)
19. [system/portal-architecture.md](system/portal-architecture.md)
20. [system/data-protection.md](system/data-protection.md)
21. [manual/06_governanca_do_portal.md](manual/06_governanca_do_portal.md)
22. [implementation/portal-roadmap-e-backlog.md](implementation/portal-roadmap-e-backlog.md)

## Fonte Atual

A base atual do repositorio foi consolidada a partir do PDF `manual-portal-lichtara.pdf`, importado para estrutura Markdown e redistribuido por tema.

## Como Expandir Este Manual

Quando novos conteudos chegarem, a regra editorial atual e simples:

- visao, principios e jornada entram em `manual/`
- estrutura visual e simbolica entram em `design/`
- experiencia, dados e arquitetura entram em `system/`
- backlog, cronograma e execucao entram em `implementation/`

## Ambiente React

O repositorio agora pode renderizar prototipos operacionais do Portal Lichtara em React com Vite.

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
- nota curta de disciplina estrutural para guiar futuras expansoes
- especificacao da bussola NAVROS viva
- estrutura da mandala mapeada
- hipotese dos quatro ciclos registrada como leitura de trabalho
- geometria Mermaid da mandala pronta para manual e interface
- especificacao frontend da mandala com contrato React/SVG
- componente-base `tsx` da mandala com dados iniciais e prototipo interativo
- config frontend das jornadas de 7 etapas
- composicao de producao das jornadas em `JourneySelector`, `JourneyStepper` e `JourneyScreen`
- hooks `useJourneyProgress` e `useJourneyAnalytics` para separar estado e instrumentacao
- `FieldFlowLayer`, `FieldPeriodSelector` e `useFieldFlows` para abrir o campo coletivo na mesma mandala
- hook `useJourneyTrajectory` para registrar trajetoria local da jornada
- hooks `useJourneyHover` e `useJourneyCanvasSelection` para separar a camada visual
- camada de export unico e props de producao para analytics e persistencia via callback ou `localStorage`
- app React Vite validando a jornada operacional pura em `src/main.tsx`
- prototipo `tsx` de jornada etapa por etapa sobre a mandala preservado no repositorio para integracao posterior
- trajetoria historica desenhada diretamente sobre a mandala no prototipo React
- camada inicial de fluxos coletivos desenhada atras da trajetoria pessoal no prototipo React
- observatorio inicial com filtro de periodo sem sair da mesma interface
- transicao suave entre periodos e frase curta de clima do campo no observatorio inicial
- expectation gate inicial antes da mandala para orientar a primeira entrada
- reset suave de jornada para limpar progresso e trajetoria local sem mexer na camada agregada
- micro-observatorio mais inteligivel como `Campo coletivo`, com legenda curta e periodos legiveis
- traducao operacional da Jornada NAVROS em um fluxo React direto de 7 estados
- leitura NAVROS reforcada por padroes estruturais de nomeacao, tensao e direcao
- contrato tecnico inicial para trajetorias, memoria local e atlas agregado da mandala
- camada inicial de arquitetura, dados e governanca
- arquitetura minima operacional da V1 consolidada em tres camadas
- roadmap de implementacao V1 extraido do material-base

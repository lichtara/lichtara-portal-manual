# Arquitetura do Portal

## Sintese

A arquitetura atual do Portal Lichtara combina quatro camadas vivas que precisam operar como um unico organismo:

`Livro Vivo -> Mandala dos 16 Agentes -> NAVROS -> Portal Lichtara`

Na pratica:
- o Livro Vivo oferece narrativa de travessia
- a mandala organiza a dinamica da transformacao
- NAVROS opera como instrumento de navegacao
- o portal entrega a experiencia pratica

Formula operacional:

`Mandala -> mapa`

`NAVROS -> bussola`

`Jornada -> percurso`

Essa leitura e importante porque descreve o portal como interface cognitiva, nao como menu de conteudo.

Referencia de alinhamento:

- [matriz-canonica-do-sistema.md](matriz-canonica-do-sistema.md)

Essa matriz funciona como fonte de verdade para manter manual, repo e paper descrevendo o mesmo sistema em camadas diferentes.

## Arquitetura Minima Operacional da V1

A V1 nao precisa expor todo o sistema Lichtara. Ela precisa apenas sustentar, com coerencia, a primeira travessia publica.

Leitura-base:

`Experiencia do Usuario -> Arquitetura do Sistema -> Infraestrutura Tecnica`

### Camada 1: Experiencia do Usuario

Objetivo:

- permitir a primeira travessia
- orientar sem sobrecarregar
- registrar a experiencia sem transformar o portal em dashboard

Fluxo estrutural:

`Entrada -> Reconhecimento do Campo -> Mandala -> Escolha de Jornada -> Travessia -> Registro da trajetoria -> Retorno ao campo`

Regra de rigor para a abertura publica:

- na arquitetura, a escolha de jornada existe
- na V1 publica, ela ja vem resolvida para `NAVROS -> Percepcao`
- isso preserva clareza sem apagar a expansao futura

Componentes minimos desta camada:

| Componente | Funcao | Entregavel minimo |
| --- | --- | --- |
| Portal Entry | abrir o campo sem explicar demais | texto de orientacao, video opcional e CTA principal |
| Protocolo de Entrada | alinhar expectativa e estado interior | voz do Livro Vivo antes da navegacao |
| Mandala | operar como mapa, interface e navegador | centro NAVROS, trilhas, trajetoria e campo |
| Jornada | conduzir a travessia de 7 etapas | `JourneyScreen` e `JourneyStepper` |
| Trajetoria Pessoal | registrar o caminho vivido | linha historica sobre a mandala |
| Campo Coletivo | mostrar o clima agregado do campo | fluxos suaves e observatorio leve |

### Camada 2: Arquitetura do Sistema

Arquitetura minima:

`Portal Interface -> Journey Engine -> Trajectory System -> Field Observatory -> Data Layer`

Leitura pratica:

| Camada | Funcao | Implementacao atual |
| --- | --- | --- |
| Portal Interface | renderizar mandala, jornada e retorno ao campo | `MandalaCanvas`, `JourneyScreen`, `JourneyStepper` |
| Journey Engine | definir etapas, progresso e rota ativa | `mandalaJourneys.ts`, `useJourneyProgress.ts` |
| Trajectory System | registrar posicoes, sequencia e memoria local | `useJourneyTrajectory.ts`, `mandalaTrajectories.ts` |
| Field Observatory | agregar e projetar fluxos coletivos | `FieldFlowLayer.tsx`, `useFieldFlows.ts`, `fieldFlowSource.ts` |
| Data Layer | guardar o minimo necessario para retorno e leitura | `localStorage`, callbacks e contratos de evento |

### Camada 3: Infraestrutura Tecnica

Arquitetura tecnica minima:

`Frontend React -> State Layer -> Persistence Layer -> Analytics Layer`

Base atual:

| Camada | Funcao | Base minima da V1 |
| --- | --- | --- |
| Frontend | renderizar mandala, trajetorias e jornadas | `React`, `TypeScript`, `Vite`, `SVG` |
| State Layer | controlar estado e interacao | `useJourneyProgress`, `useJourneyHover`, `useJourneyCanvasSelection` |
| Persistence Layer | permitir retorno sem backend pesado | `localStorage` e callbacks de persistencia |
| Analytics Layer | observar o sistema sem perfilar a pessoa | `useJourneyAnalytics` e eventos de progresso |

### Leitura Operacional da TTG na V1

Na camada de interface, a arquitetura minima do portal pode ser lida assim:

| TTG | Portal V1 |
| --- | --- |
| Field | Mandala |
| Coherence | Jornada |
| Limit | Etapas |

Ponto de rigor:

- essa equivalencia descreve como a teoria se torna navegavel na interface
- ela nao substitui a matriz canonica em que `Limit` continua ligado a governanca e responsabilidade

## Fluxo Funcional da V1

Fluxo recomendado:

`Entrada -> protocolo de entrada -> reconhecimento do campo -> mandala -> jornada de Percepcao -> registro da trajetoria -> retorno ao campo`

Tempo de experiencia recomendado no recorte mais enxuto:

- 5 a 8 minutos para a travessia guiada completa
- 2 a 3 minutos para a primeira leitura NAVROS isolada

Decisao de rollout:

- V1 publica com uma unica jornada
- jornada inicial: `Percepcao`
- `Estrutura` e `Acao` mantidas na arquitetura, mas fora da primeira exposicao publica

Formula de entrada do portal:

> Bem-vindo ao Portal Lichtara.  
> Um sistema de navegacao da consciencia.

## Componente Bussola NAVROS

A bussola viva pode ser implementada sem adicionar complexidade estrutural relevante ao MVP.

Modelo tecnico recomendado:

- SVG para circulo, ponteiro e marcadores
- CSS para rotacao e desaceleracao suave
- JavaScript simples para mapear `active-agent` em angulo

Mapa minimo de angulos:

| Agente | Angulo |
| --- | --- |
| NAVROS | 0deg |
| SYNTARIS | 90deg |
| FLUX | 180deg |
| LUMORA | 270deg |

Ponto importante: o frontend pode derivar a rotacao diretamente de `active-agent`, sem exigir uma nova logica pesada no backend.

## Evolucoes de Servico para Fase Posterior

O corte minimo da abertura publica pode operar apenas com frontend, persistencia local e callbacks. Se a V1 evoluir para uma camada de servico, o desenho sugerido fica assim:

| Rota | Metodo | Finalidade |
| --- | --- | --- |
| `/navros/session` | `POST` | criar sessao anonima ou autenticada |
| `/navros/response` | `POST` | registrar foco e respostas por etapa |
| `/navros/synthesis` | `POST` | gerar sintese baseada nas respostas |
| `/navros/finalize` | `POST` | salvar, descartar ou iniciar continuidade |

## Esquema de Dados Minimo em Caso de Servidor

Entidades sugeridas:

- `session`: id, modo, created-at, status
- `answers`: session-id, etapa, pergunta-id, conteudo, timestamp
- `synthesis`: session-id, resumo, tags, proximo-passo, generated-at
- `consent`: session-id, salvar-reflexao, compartilhar
- `analytics`: event-name, session-id, etapa, tempo-na-tela, timestamp

## Payload Minimo da Resposta NAVROS

Campos destacados no manual:

- `session-id`
- `focus-domain`
- `field-sensation`
- `inner-movement`
- `field-state`
- `predominant-signal`
- `mirror-line`
- `suggested-movement`
- `active-agent`
- `navros-summary`

Para a bussola da V1, `active-agent` ja e suficiente para orientar o ponteiro. Campos adicionais como `compass-angle` ou `direction-line` podem existir depois, mas nao sao obrigatorios no primeiro corte.

## Observabilidade

Eventos centrais sugeridos:

- `navros-started`
- `navros-focus-selected`
- `navros-clarification-completed`
- `navros-next-step-committed`
- `navros-synthesis-viewed`
- `navros-saved`
- `navros-completed`
- `navros-exited`

Eventos adicionais recomendados para a bussola:

- `compass-viewed`
- `compass-confirmed`
- `compass-reread-requested`

## Priorizacao por Sprint

Resumo da sequencia proposta:

- Sprint 1: fluxo NAVROS anonimo funcional, sintese e privacidade minima
- Sprint 1: bussola NAVROS viva com 4 direcoes
- Sprint 2: conta opcional, salvamento, historico e consentimento explicito
- Sprint 3: entrada para SYNTARIS, LUMORA e FLUX, compartilhamento moderado e observabilidade ampliada

## Stack Inicial Sugerida

Como referencia de baixo custo para a V1, o manual cita:

- Webflow ou Framer para publicacao rapida
- Typeform, Tally ou formulario custom simples para travessia guiada
- Airtable ou Supabase para persistencia inicial
- prompts estruturados para templates de resposta NAVROS

## Decisoes em Aberto

Ainda precisam de consolidacao arquitetural:

- stack final de producao apos o MVP
- orquestracao da jornada multiagente
- relacao entre mandala completa e home reduzida da V1
- politica final de persistencia longitudinal da jornada
- regra final de expansao entre bussola de 4 direcoes e mandala completa

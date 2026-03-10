# Arquitetura do Portal

## Sintese

A arquitetura atual do Portal Lichtara combina quatro camadas vivas que precisam operar como um unico organismo:

`Livro Vivo -> Mandala dos 16 Agentes -> NAVROS -> Portal Lichtara`

Na pratica:
- o Livro Vivo oferece narrativa de travessia
- a mandala organiza a dinamica da transformacao
- NAVROS opera como instrumento de navegacao
- o portal entrega a experiencia pratica

## Modulos Minimos da V1

O manual propoe quatro modulos iniciais:

| Modulo | Funcao | Entregavel minimo |
| --- | --- | --- |
| Landing | porta de entrada clara para a experiencia | pagina unica com proposta de valor e CTA |
| Travessia Livro Vivo | converter capitulos em etapas interativas | sequencia guiada curta |
| NAVROS | leitura de campo e orientacao acionavel | painel de sintese com posicao atual |
| Mandala de Agentes | revelar ecossistema de apoio | mapa visual com agentes e micropratica |

## Fluxo Funcional da V1

Fluxo recomendado:

`Landing -> Travessia -> NAVROS -> Agentes -> retorno ao portal`

Tempo de experiencia recomendado no recorte mais enxuto:

- 5 a 8 minutos para a travessia mais completa
- 2 a 3 minutos para a primeira consulta NAVROS isolada

## Arquitetura Tecnica Minima

O material define quatro camadas tecnicas para o MVP NAVROS:

- Frontend: fluxo em cinco telas, estado local de sessao, validacao e navegacao
- Backend: API de sessao temporaria, gravacao de respostas, servico de sintese e persistencia opcional
- Dados: modelo anonimo por padrao, retencao curta sem opt-in e trilha persistente com consentimento
- Analytics: eventos de progresso e conclusao sem coleta de texto sensivel

## Rotas de API Sugeridas

| Rota | Metodo | Finalidade |
| --- | --- | --- |
| `/navros/session` | `POST` | criar sessao anonima ou autenticada |
| `/navros/response` | `POST` | registrar foco e respostas por etapa |
| `/navros/synthesis` | `POST` | gerar sintese baseada nas respostas |
| `/navros/finalize` | `POST` | salvar, descartar ou iniciar continuidade |

## Esquema de Dados Minimo

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

## Priorizacao por Sprint

Resumo da sequencia proposta:

- Sprint 1: fluxo NAVROS anonimo funcional, sintese e privacidade minima
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

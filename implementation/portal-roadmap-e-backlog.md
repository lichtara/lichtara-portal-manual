# Roadmap e Backlog de Implementacao

## Proposito

Este documento consolida a camada operacional extraida do manual-base do Portal Lichtara. Ele organiza o que precisa ser construido para a V1, em que sequencia, com quais frentes de responsabilidade e sob quais criterios de validacao.

## Norte da V1

A primeira versao do portal deve ser pequena, elegante e potente. O objetivo nao e lancar todo o ecossistema, mas colocar no ar uma experiencia curta, marcante, repetivel e capaz de provar valor real.

Sinal de validacao desejado:

> um grupo inicial de pessoas relata aumento real de clareza e capacidade de decisao apos a travessia

## Escopo Minimo

Os modulos minimos consolidados no material atual sao:

| Modulo | Funcao | Entregavel minimo |
| --- | --- | --- |
| Landing | abrir o portal com proposta de valor clara | pagina unica com CTA principal |
| NAVROS | realizar leitura inicial de campo | fluxo curto com perguntas e sintese |
| Agente Ativo | abrir continuidade imediata | painel contextual com pratica ou reflexao |
| Mandala | mostrar o mapa vivo do sistema | home circular com centro NAVROS e agentes orbitais |
| Persistencia Opcional | permitir retorno consciente | historico simples sob consentimento |

## Fluxo Prioritario

Fluxo-base da V1:

`landing -> consulta NAVROS -> sintese -> agente ativo -> retorno ao portal`

Fluxo expandido previsto:

`mandala -> modo navegacao -> NAVROS -> agente ativo -> trilha recente -> continuidade`

## Cronograma Consolidado

O material-base propoe um ciclo de 12 semanas, de `09/03/2026` a `31/05/2026`, organizado em 3 sprints de 4 semanas.

### Sprint 1: MVP Anonimo Funcional

Janela:
- 09/03/2026 a 05/04/2026

Objetivo:
- colocar NAVROS no ar com fluxo completo, sintese funcional e privacidade minima aplicada

Entregas-chave:
- wireflow validado
- frontend de 5 telas
- rotas base de sessao, resposta, sintese e finalizacao
- armazenamento temporario
- saida segura sem salvamento

Indicador de sucesso:
- pessoa usuaria conclui o fluxo em 10 a 15 minutos com sintese gerada

### Sprint 2: Persistencia e Retorno

Janela:
- 06/04/2026 a 03/05/2026

Objetivo:
- ativar conta opcional, consentimento explicito, salvamento de reflexao e reentrada de jornada

Entregas-chave:
- regra de identidade opcional
- historico simples
- retomada de jornada
- dashboard de salvamento e retorno

Indicador de sucesso:
- taxa de salvamento e retorno cresce com baixa friccao

### Sprint 3: Expansao da Jornada

Janela:
- 04/05/2026 a 31/05/2026

Objetivo:
- expandir o sistema para continuidade multiagente, comunidade moderada e observabilidade ampliada

Entregas-chave:
- entradas para SYNTARIS, LUMORA e FLUX
- mapa de progressao de jornadas
- compartilhamento com consentimento
- observabilidade operacional

Indicador de sucesso:
- progressao entre jornadas e retencao por ciclo tornam-se visiveis

## Backlog Prioritario por Camada

### Frontend

Sprint 1:
- landing com CTA consultar NAVROS
- tela de entrada NAVROS
- pergunta 1, pergunta 2 e pergunta 3
- tela de resposta NAVROS
- micro-ritual de leitura
- estados de progresso e saida segura

Sprint 2:
- sessao local e retomada
- login opcional
- historico de reflexoes
- continuidade de retorno

Sprint 3:
- home da mandala viva
- alternancia entre modo navegacao e modo exploracao
- trilha recente
- tela de agente ativo
- fluxo de comunidade

### Backend e Engine NAVROS

Sprint 1:
- contrato de entrada
- classificador de campo
- gerador de sinal predominante
- gerador de movimento sugerido
- resolucao de agente ativo
- template final de resposta

Sprint 2:
- persistencia por usuario
- leitura de historico
- rastreabilidade basica

Sprint 3:
- orquestracao multi-jornada
- moderacao de compartilhamentos
- controles avancados de operacao

### Dados e Analytics

Sprint 1:
- sessao anonima por padrao
- descarte sem opt-in
- funil basico de eventos NAVROS

Sprint 2:
- consentimento persistido
- auditoria basica
- funil de salvamento e retorno

Sprint 3:
- trilha evolutiva por ciclo
- versionamento de sinteses
- coortes por jornada

## Sequencia Recomendada de Execucao

Ordem consolidada a partir do material:

1. landing e CTA principal
2. fluxo NAVROS de perguntas
3. contrato de payload da engine
4. classificacao de campo e resposta NAVROS
5. micro-ritual e tela final
6. reacao da mandala ao agente ativo
7. painel do agente ativo
8. persistencia e retorno
9. trilha recente
10. modos navegacao e exploracao

## Owners por Frente

O PDF traz um modelo inicial de ownership por frente. Mantendo a estrutura e removendo dependencias de nomes proprios, o desenho fica assim:

| Frente | Responsabilidade principal |
| --- | --- |
| Produto | priorizacao, escopo e decisao semanal |
| UX e Conteudo | fluxo NAVROS, copy e reducao de friccao |
| Backend | APIs, regras de negocio e integracao |
| Dados | eventos, dashboards, retencao e leitura de funil |
| Privacidade | consentimento, LGPD e politicas de uso |
| Comunidade | compartilhamento, moderacao e continuidade |

## Criterios de Aceite da V1

Uma primeira versao pode ser considerada pronta quando:

- as cinco telas principais operam sem bloqueio
- a sintese e gerada a partir das respostas e do proximo passo
- o uso anonimo funciona de ponta a ponta
- salvar ou sair sem salvar respeita consentimento
- o fluxo produz percepcao real de clareza em poucos minutos

## Dependencias Criticas

Antes de ampliar a experiencia, precisam estar estaveis:

- textos finais de tela
- politica minima de privacidade
- taxonomia de estados de campo
- contrato do payload NAVROS
- regra de agente ativo

## Riscos a Vigiar

- excesso de escopo antes da validacao do fluxo principal
- coleta de dados acima do necessario
- resposta NAVROS vaga demais para gerar valor
- mandala visualmente rica demais para a maturidade da V1
- expansao para multiplos agentes antes de provar NAVROS

## Proximas Decisoes Estruturais

Pontos ainda abertos que merecem fechamento antes de acelerar desenvolvimento:

- stack definitiva apos o MVP
- numero inicial de agentes expostos na home
- regra de persistencia longitudinal da jornada
- relacao entre Livro Vivo interativo e consulta NAVROS isolada
- criterios de rollout entre V1 fechada e abertura publica

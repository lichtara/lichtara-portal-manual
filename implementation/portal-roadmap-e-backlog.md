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
| Landing | abrir o portal com proposta de valor clara e estado interior adequado | pagina unica com triade de frases e CTA principal |
| NAVROS | realizar leitura inicial de campo | fluxo curto com perguntas, bussola e sintese |
| Agente Ativo | abrir continuidade imediata | painel contextual com pratica ou reflexao |
| Mandala | mostrar o mapa vivo do sistema | home circular com centro NAVROS e agentes orbitais |
| Persistencia Opcional | permitir retorno consciente | historico simples sob consentimento |

## Fluxo Prioritario

Fluxo-base da V1:

`landing -> consulta NAVROS -> bussola viva -> sintese -> agente ativo -> retorno ao portal`

Com camada de abertura contemplativa:

`landing -> protocolo de entrada -> consulta NAVROS -> bussola viva -> sintese -> agente ativo -> retorno ao portal`

Regra de rollout publico:

- a V1 publica deve operar com uma unica jornada
- essa jornada deve ser `Percepcao`
- `Estrutura` e `Acao` permanecem preparadas na arquitetura, mas nao expostas como seletor inicial

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
- componente de bussola viva com 4 direcoes
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
- abertura do portal com triade de frases e unico CTA
- landing com CTA consultar NAVROS
- tela de entrada NAVROS
- pergunta 1, pergunta 2 e pergunta 3
- bussola NAVROS viva com 4 direcoes
- tela de resposta NAVROS
- micro-ritual de leitura
- confirmacao `Isso faz sentido para voce?`
- estados de progresso e saida segura

Sprint 2:
- sessao local e retomada
- login opcional
- historico de reflexoes
- continuidade de retorno
- memoria local do `Mapa da Travessia`

Sprint 3:
- home da mandala viva
- alternancia entre modo navegacao e modo exploracao
- rota publica unica de `Percepcao` estabilizada
- rotas `Estrutura` e `Acao` preparadas sob feature flag ou rollout posterior
- stepper de jornadas guiadas de 7 etapas
- alinhamento das etapas com a progressao narrativa do Capitulo 01 do Livro Vivo
- trilha recente
- trajetorias agregadas da mandala em modo anonimo
- tela de agente ativo
- fluxo de comunidade

### Backend e Engine NAVROS

Sprint 1:
- contrato de entrada
- classificador de campo
- gerador de sinal predominante
- gerador de movimento sugerido
- resolucao de agente ativo
- mapeamento inicial de 4 direcoes
- template final de resposta

Sprint 2:
- persistencia por usuario
- leitura de historico
- rastreabilidade basica
- sessao efemera para trajetoria anonima opcional

Sprint 3:
- orquestracao multi-jornada
- estado de progressao por etapa da jornada
- agregacao anonima de fluxos para atlas coletivo
- moderacao de compartilhamentos
- controles avancados de operacao

### Dados e Analytics

Sprint 1:
- sessao anonima por padrao
- descarte sem opt-in
- funil basico de eventos NAVROS
- eventos `compass-viewed`, `compass-confirmed` e `compass-reread-requested`

Sprint 2:
- consentimento persistido
- auditoria basica
- funil de salvamento e retorno
- leitura basica de trajetorias locais sem perfil persistente

Sprint 3:
- trilha evolutiva por ciclo
- versionamento de sinteses
- coortes por jornada
- atlas coletivo apenas com fluxos agregados

## Sequencia Recomendada de Execucao

Ordem consolidada a partir do material:

1. landing e CTA principal
2. fluxo NAVROS de perguntas
3. contrato de payload da engine
4. classificacao de campo e resposta NAVROS
5. micro-ritual e bussola viva
6. reacao da mandala ao agente ativo
7. tela final e confirmacao de leitura
8. painel do agente ativo
9. persistencia e retorno
10. trilha recente
11. modos navegacao e exploracao
12. jornadas guiadas de 7 etapas

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

- a abertura cria estado de entrada sem excesso de explicacao
- as cinco telas principais operam sem bloqueio
- a bussola identifica uma direcao e para com suavidade
- a sintese e gerada a partir das respostas e do proximo passo
- o uso anonimo funciona de ponta a ponta
- salvar ou sair sem salvar respeita consentimento
- o fluxo produz percepcao real de clareza em poucos minutos

## Dependencias Criticas

Antes de ampliar a experiencia, precisam estar estaveis:

- textos finais de tela
- triade de abertura consolidada
- politica minima de privacidade
- taxonomia de estados de campo
- contrato do payload NAVROS
- regra de agente ativo
- mapeamento entre agente ativo e direcao da bussola
- leitura consolidada da estrutura de 7 movimentos do Capitulo 01 para nomeacao final da jornada
- regra de governanca para memoria local, sessao efemera e atlas agregado

## Riscos a Vigiar

- excesso de escopo antes da validacao do fluxo principal
- coleta de dados acima do necessario
- resposta NAVROS vaga demais para gerar valor
- bussola visualmente pesada demais para a proposta da V1
- mandala visualmente rica demais para a maturidade da V1
- expansao para multiplos agentes antes de provar NAVROS
- captura de trajetoria antes de fechar regras de privacidade e apagamento

## Proximas Decisoes Estruturais

Pontos ainda abertos que merecem fechamento antes de acelerar desenvolvimento:

- stack definitiva apos o MVP
- numero inicial de agentes expostos na home
- regra de persistencia longitudinal da jornada
- relacao entre Livro Vivo interativo e consulta NAVROS isolada
- criterios de rollout entre V1 fechada e abertura publica
- regra de transicao entre bussola de 4 direcoes e mandala completa
- criterio de abertura publica das rotas `Estrutura` e `Acao` apos a V1
- regra de fechamento das jornadas de 7 etapas, especialmente na passagem entre `ASTRAEL`, `OKTAVE` e `NAVROS`
- momento adequado para abrir `Mapa da Travessia` e atlas coletivo

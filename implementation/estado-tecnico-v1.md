# Estado Tecnico da V1

Data de referencia: 2026-03-23

Este arquivo registra um snapshot tecnico do estado atual da V1.

Nao e documento canonico do sistema.

Nao substitui manual, teoria, especificacao ou backlog.

Serve para:
- registrar o que esta ativo no prototipo
- separar camada principal de camadas secundarias no repo
- orientar refinamentos sem perder contexto tecnico

## Runtime Ativo

O entrypoint atual do prototipo esta em `src/main.tsx`.

Hoje ele renderiza diretamente:

- `implementation/frontend/mandala/NavrosOperationalStepper.tsx`

Isso significa que a V1 publica atual roda no fluxo operacional NAVROS, e nao no fluxo mais antigo baseado em `JourneyScreen`.

## Fluxo Operacional Ativo

O fluxo ativo da V1 hoje tem 6 etapas:

1. `entry`
2. `focus`
3. `reading`
4. `orientation`
5. `movement`
6. `closure`

O step explicito de reconhecimento foi removido da V1 operacional para reduzir atrito.

## Arquitetura Atual

### 1. Orquestracao

`implementation/frontend/mandala/NavrosOperationalStepper.tsx`

Responsavel por:
- controlar `currentStepIndex`
- manter `answers`
- avancar e reiniciar a travessia
- esconder cabecalho e progresso na tela de entrada

### 2. Experiencia de cada etapa

`implementation/frontend/mandala/NavrosOperationalScreen.tsx`

Responsavel por:
- renderizar cada estado da experiencia
- tratar a entrada como cena propria
- fazer o `FocusStep` funcionar em sequencia
- renderizar leitura, orientacao, movimento e fechamento

### 3. Logica da travessia

`implementation/frontend/mandala/navrosOperationalJourney.ts`

Responsavel por:
- normalizar `area`, `state` e `feeling`
- resolver padrao de leitura
- resolver `movement -> agent`
- compor leitura, orientacao e movimento

### 4. Fonte unica de copy

`implementation/frontend/mandala/navrosOperationalCopy.ts`

Responsavel por:
- centralizar toda a copy visivel da V1
- definir labels e prompts
- definir listas sugeridas
- definir variacoes controladas de leitura e orientacao

### 5. UI da jornada

`implementation/frontend/mandala/journeyUI.ts`

Responsavel por:
- tema visual da jornada
- responsividade
- centralizacao da tela de entrada
- hierarquia visual dos grupos e chips

## Estado do FocusStep

O `FocusStep` ja nao opera como formulario simultaneo.

Hoje ele funciona em sequencia:

1. escolher `area`
2. revelar `state`
3. revelar `feeling`
4. avancar automaticamente ao clicar em `feeling`

Decisoes importantes ja aplicadas:
- sem campos de texto visiveis
- sem botao `Continuar` dentro do foco
- sem decisao multipla simultanea
- micro-linha de entrada: `Deixe vir primeiro.`

## Estado da Leitura

A leitura NAVROS hoje e composta por 3 camadas fixas:

1. `anchor`
2. `structure`
3. `direction`

Ela usa 3 variacoes controladas de superficie:

- `direct`
- `contemplative`
- `concrete`

A variacao nao e aleatoria.

Ela e resolvida por:

- `state + feeling`

Resultado pratico:
- `sobrecarga` e `desalinhamento` tendem a leitura mais direta
- `duvida`, `confusao`, `indefinicao` e `instabilidade` tendem a leitura mais contemplativa
- `ansiedade`, `travamento`, `mudanca` e `estagnacao` tendem a leitura mais concreta

## Estado da Orientacao

A orientacao agora acompanha a mesma variacao da leitura.

Ela deixou de ser texto fixo e passou a operar como:

- continuacao coerente da leitura
- duas linhas curtas
- um gesto executavel

Ela nao funciona como conselho generico.

Ela funciona como proximo passo possivel dentro do mesmo campo ja lido.

## Estado do Movimento

O `MovementStep` hoje ja faz a transicao:

- `pattern -> movement -> agent`

Ele mostra:
- linha principal de movimento
- fase do agente em tom secundario
- `MandalaMini` como reflexo visual minimo

O rastro atual da mandala minima e curto:

- `NAVROS -> agente`

Nao ha navegacao, selecao, zoom ou historico analitico nessa camada.

## Estado Visual da V1

A identidade visual ativa usa:

- azul profundo
- dourado ativador
- prateado vibrante
- off-white tecnico
- preto cosmico

Tipografia:

- `Inter` como base
- `Cormorant Garamond` para titulos e frases principais

Estado atual da tela 1:
- centralizada vertical e horizontalmente
- sem explicacao tecnica
- com largura interna refinada
- com a frase de seguranca:
  `Esta travessia comeca e termina aqui.`

## Mobile-First

A V1 ja recebeu uma passada mobile-first em `journeyUI.ts`.

Pontos ja tratados:
- painel mais compacto
- progresso em largura total
- CTA em largura total no mobile
- chips em grade de 2 colunas e depois 1 coluna
- reducao de tipografia e espacos em telas menores

## Camadas Secundarias Mantidas no Repo

O repo ainda preserva uma camada mais ampla da mandala, que nao e o fluxo principal da V1 operacional:

- `implementation/frontend/mandala/JourneyScreen.tsx`
- `implementation/frontend/mandala/JourneyStepper.tsx`
- `implementation/frontend/mandala/mandalaJourneys.ts`

Essa camada segue util para:
- prototipos de jornadas da mandala
- experimentos de trajetoria
- integracoes futuras

Ela ja recebeu evolucao minima:
- `reflectionPrompt` com `options`
- primeira etapa da jornada de percepcao com escolha estruturada
- stepper antigo capaz de renderizar opcoes como interacao

## Persistencia e Dados

No fluxo operacional ativo:
- a travessia funciona sem backend
- o foco principal esta em experiencia e clareza

No repo, continuam presentes contratos e camadas de dados mais amplas:
- trajetorias
- fluxos coletivos
- observatorio
- persistencia local
- analytics

Essas camadas existem, mas nao sao hoje o entrypoint principal do prototipo em `src/main.tsx`.

## Validado Ate Aqui

Ja esta validado por testes reais:
- a V1 funciona sem explicacao externa
- a leitura gera reconhecimento
- a orientacao produz direcao pratica
- o sistema nao depende de repertorio conceitual previo
- a interface e hoje o principal lugar de calibracao, nao a estrutura base

## Em Calibracao

Pontos ainda vivos de calibracao:
- micro-ajustes de linguagem
- fluidez perceptiva do foco
- recorrencia sem repeticao excessiva
- alinhamento futuro entre leitura + orientacao como bloco unico
- leitura de uso real em celular

## Regra de Trabalho Atual

Nao expandir a arquitetura mais rapido do que a clareza da experiencia.

No momento, a V1 esta em:

- refinamento
- lapidacao
- estabilizacao

Nao esta em:

- expansao estrutural
- IA generativa livre
- multiplas travessias encadeadas

## Proximo Passo Natural

O proximo refinamento tecnico mais coerente e aproximar visualmente `reading + orientation`, para que parecam dois momentos do mesmo gesto e nao dois blocos separados.

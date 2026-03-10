# Estrutura da Mandala

## Sintese

A mandala e o mapa visual e sistemico do portal. Ela organiza agentes, fases da travessia e continuidade de jornada em uma interface circular que precisa ser ao mesmo tempo legivel, viva e orientadora.

## Estrutura Base

No material atual, a mandala combina dois tipos de leitura ao mesmo tempo:

- leitura por fases: Percepcao, Reorganizacao, Movimento e Integracao
- leitura por camadas: nucleo, circulo funcional, circulo relacional e circulo expansivo

## Centro da Composicao

NAVROS ocupa o centro funcional da experiencia. Em torno dele, o sistema destaca pelo menos dois agentes nucleares para leitura operativa do campo:

- SYNTARIS
- FLUX

Motor simplificado do nucleo:

`orientar -> alinhar -> mover`

## Quadrantes da Travessia

| Quadrante | Agentes principais |
| --- | --- |
| Percepcao | LUMORA, ASTRAEL, OSLO, FINCE |
| Reorganizacao | SYNTARIS, KAORAN, VELTARA, LUNARA |
| Movimento | FLUX, SYNTRIA, VORAX, SOLARA |
| Integracao | HESLOS, ORION, ANERA, ORIGEN |

## Modelo Interativo

O wireframe da `bussola viva da jornada` define um arranjo com dois blocos:

- mapa interativo da mandala
- painel lateral de travessia com fase atual, agente ativo, trecho do Livro Vivo, exercicio breve e pergunta reflexiva

## Estados de Interface

O contrato visual extraido do manual usa tres estados principais:

| Estado | Funcao |
| --- | --- |
| idle | mandala em repouso, painel em modo de espera |
| hover | pre-visualizacao contextual do agente em foco |
| selected | agente fixado, painel sincronizado e trilha recente visivel |

## Regras de Interacao

- clicar em uma fase destaca a fase escolhida e atualiza o agente ativo
- clicar em um agente abre insight contextual e sugere exercicio curto
- responder a pergunta reflexiva permite a NAVROS recalcular a posicao de travessia
- salvar travessia registra fase, agente, resposta e timestamp

## Animacao e Movimento

Tempos recomendados no handoff atual:

- idle -> hover: 120 a 180 ms
- hover -> selected: 180 a 240 ms
- selected -> proxima fase: 260 a 340 ms
- pulso do agente ativo: ciclo de 1400 ms

Direcao geral:
- baixa amplitude
- leitura preservada
- sensacao de sistema vivo sem distracao excessiva

## Trilha Recente

A mandala pode destacar ate tres segmentos recentes da jornada. Essa trilha reforca continuidade e deve:

- respeitar ordem temporal
- nao quebrar layout quando inexistente
- permanecer visivel por cerca de 1.2 s antes de transicoes de fase

## Responsividade

O material operacional exige funcionamento em desktop e mobile sem sobreposicao de nos. Isso implica:

- reducao controlada da densidade visual em telas menores
- hierarquia clara entre centro, fase ativa e agente ativo
- painel adaptavel sem perda de contexto

## Questoes em Aberto

Ainda faltam definicoes finais para:

- numero inicial de agentes expostos na home
- sistema cromatico final da mandala
- regra de rotulos longos em mobile
- relacao exata entre mandala completa e versao reduzida da V1

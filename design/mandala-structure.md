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

## Camadas Visuais Fundamentais

Para a interface do portal, a mandala precisa permitir uma leitura imediata em tres camadas:

| Camada | Funcao |
| --- | --- |
| centro | eixo de orientacao |
| anel interno | rotas ou setores de navegacao |
| anel externo | posicoes da mandala |

Na projecao publica da V1, isso significa:

- `NAVROS` precisa aparecer como eixo legivel de entrada
- `Percepcao`, `Estrutura` e `Acao` podem aparecer como direcoes cognitivas
- os 16 agentes permanecem como anel cartografico mais amplo

Regra de rigor:

- a interface pode expor `NAVROS` como centro de entrada
- a arquitetura profunda continua sustentada por `NAVROS - SYNTARIS - FLUX`

## Triangulo, Quadrado e Circulo

Para a leitura visual da mandala, tres geometrias precisam operar juntas:

| Geometria | Funcao |
| --- | --- |
| triangulo | direcoes de navegacao |
| quadrado | estabilidade dos ciclos |
| circulo | totalidade do sistema |

Traducao para o portal:

- triangulo: `Percepcao`, `Estrutura`, `Acao`
- quadrado: `Percepcao`, `Estrutura`, `Acao`, `Expansao`
- circulo: anel cartografico mais amplo da mandala

Essa combinacao e especialmente util porque evita a sensacao de divisao arbitraria do circulo. A pessoa percebe direcao, base estrutural e campo total ao mesmo tempo.

## Versao de Entrada da V1

Antes da mandala completa, a experiencia pode comecar por uma versao reduzida e tecnicamente leve: a `bussola NAVROS viva`.

Mapa inicial:

| Direcao | Agente | Funcao |
| --- | --- | --- |
| Norte | NAVROS | orientacao |
| Leste | SYNTARIS | alinhamento |
| Sul | FLUX | movimento |
| Oeste | LUMORA | clareza |

Essa versao funciona como leitura inicial do campo e evita sobrecarga cognitiva no primeiro contato.

## Quadrantes da Travessia

| Quadrante | Agentes principais |
| --- | --- |
| Percepcao | LUMORA, ASTRAEL, OSLO, FINCE |
| Reorganizacao | SYNTARIS, KAORAN, VELTARA, LUNARA |
| Movimento | FLUX, SYNTRIA, VORAX, SOLARA |
| Integracao | HESLOS, ORION, ANERA, ORIGEN |

Existe tambem uma leitura espacial complementar em consolidacao, registrada em [07_hipotese_dos_quatro_ciclos.md](../manual/07_hipotese_dos_quatro_ciclos.md), em que os quadrantes aparecem como quatro ciclos de transformacao orbitando o nucleo triadico.

Como referencia visual mais pronta para manual e interface, a versao em Mermaid foi registrada em [mandala-geometry.md](mandala-geometry.md).

Como ponte direta para implementacao, o contrato mais proximo do frontend foi registrado em [mandala-frontend-spec.md](mandala-frontend-spec.md).

## Diagrama Espacial de Trabalho

Como desenho textual de referencia, a mandala pode ser visualizada assim:

```text
                    ASTRAEL
             VORAX           LUNARA

        SYNTRIA                     OKTAVE


SOLARA       FLUX - SYNTARIS - NAVROS       LUMORA


        VELTARA                     KAORAN

             FINCE           OSLO
                    HESLOS
```

Esse desenho ainda nao resolve toda a geometria da mandala, mas ja ajuda a fixar tres decisoes de design:

- a triade NAVROS-SYNTARIS-FLUX precisa permanecer altamente visivel
- os agentes externos devem funcionar como anel de navegacao
- a mandala deve permitir leitura por quadrantes e por travessia

## Leitura de Interface

Se o portal evoluir da bussola para a mandala completa, a interface pode apresentar:

- centro: motor de navegacao
- anel: agentes e estados
- trilha: caminho recente do usuario
- rotas: vetores naturais de entrada

Exemplo de leitura de percurso:

`NAVROS -> LUMORA -> SYNTARIS -> FLUX -> SYNTRIA -> ASTRAEL -> OKTAVE`

Isso reforca a ideia de que a mandala nao e apenas iconografia. Ela precisa funcionar como mapa navegavel da experiencia.

Pergunta de entrada sugerida para a camada de rotas:

`O que voce precisa agora?`

Opcoes de trabalho:

- compreender
- organizar
- agir

## Revelacao Progressiva

A mandala nao deve aparecer completa no primeiro segundo. A revelacao mais legivel para a experiencia atual e:

`NAVROS -> eixos -> mandala -> jornada`

Traducao de interface:

1. estado de orientacao: `NAVROS`
2. estado de navegacao: triangulo com `Percepcao`, `Estrutura`, `Acao`
3. estado estrutural: quadrado invisivel dos ciclos `Percepcao`, `Estrutura`, `Acao`, `Expansao`
4. estado cartografico: circulo externo com a mandala mais ampla
5. estado de jornada: `etapa 1 -> etapa 7`

Essa progressao reduz sobrecarga cognitiva sem desmontar a arquitetura do sistema.

## Modelo Interativo

O wireframe da `bussola viva da jornada` define um arranjo com dois blocos:

- mapa interativo da mandala
- painel lateral de travessia com fase atual, agente ativo, trecho do Livro Vivo, exercicio breve e pergunta reflexiva

Na V1, esse modelo pode ser dividido em duas camadas:

- camada 1: bussola de 4 direcoes, central e focada
- camada 2: expansao opcional para mapa maior

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

Na entrada por bussola, a regra fica ainda mais simples:

- NAVROS identifica a direcao principal
- o ponteiro desacelera e para em um dos quatro pontos
- a interface mostra a frase correspondente
- a pessoa pode confirmar a leitura ou pedir nova leitura
- so depois aparece a opcao `Explorar o mapa`

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

Exemplo de leitura curta:

`LUMORA -> NAVROS -> SYNTARIS`

## Expansao Progressiva

O crescimento ideal da estrutura visual e:

`4 direcoes -> 8 pontos -> 16 agentes -> mandala completa`

Essa progressao permite que o portal pareca vivo desde cedo sem exigir que a pessoa compreenda o sistema inteiro de uma vez.

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
- regra exata de transicao entre bussola inicial e mapa completo
- fechamento geometrico da versao circular com triade central e 16 posicoes

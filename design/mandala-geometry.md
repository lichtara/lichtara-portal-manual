# Geometria da Mandala

## Status

Este documento registra a versao geometrica de trabalho da mandala em Mermaid. Ele foi construido para servir ao manual, ao frontend e a identidade simbolica do portal, mas continua ligado a uma camada exploratoria do sistema, nao a uma geometria canonica ja fechada.

Leituras de origem:

- camada canonica da mandala em [04_mandala_dos_agentes.md](../manual/04_mandala_dos_agentes.md)
- leitura exploratoria em [07_hipotese_dos_quatro_ciclos.md](../manual/07_hipotese_dos_quatro_ciclos.md)
- traducao para implementacao em [mandala-frontend-spec.md](mandala-frontend-spec.md)

## Uso Deste Documento

Esta doc serve para quatro fins:

- visualizar a mandala como simbolo estrutural do sistema
- alinhar design e produto antes da interface final
- registrar as tres rotas naturais como overlay de navegacao
- manter uma referencia compartilhada para futuras iteracoes geometricas

Importante:

- o Mermaid abaixo e uma referencia estrutural
- ele nao substitui a futura geometria desenhada em Figma ou codigo
- o diagrama preserva relacoes, niveis e vetores; nao promete precisao matematica absoluta

## Camadas Geometricas Fundamentais

A leitura mais forte surgida ate aqui descreve a mandala a partir de tres camadas simples:

1. circulo externo: o campo da experiencia
2. 16 ancoras equidistantes: estados de navegacao
3. triangulo central: motor de orientacao

Formula estrutural:

`circulo -> 16 ancoras -> triangulo central`

Essa formulacao ajuda a distinguir duas coisas que convivem no repositorio:

- a geometria simbolica da mandala, usada no manual e na identidade do sistema
- a projecao simplificada de interface, usada na V0 do frontend

## Dois Niveis de Geometria

Para evitar confusao, esta doc passa a separar explicitamente:

- geometria simbolica: circulo, anel de 16 ancoras e triangulo central equilatero
- projecao de interface: distribuicao simplificada e mais legivel para SVG e navegacao inicial

A primeira orienta o sentido profundo do sistema. A segunda orienta a implementacao pratica da V1.

## Modelo Radial Sector Grid

Uma leitura mais precisa para interface radial usa o modelo de `radial sector grid`. Nesse arranjo, a mandala combina:

1. centro
2. aneis concentricos
3. setores radiais

Formula de base:

`centro + aneis + setores`

No Portal Lichtara, isso produz uma leitura util:

- anel 0: `NAVROS`
- anel 1: rotas ou eixos de navegacao
- anel 2: 16 posicoes da mandala

Regra geometrica principal:

- `360 / 3 = 120deg` por setor de navegacao
- `360 / 16 = 22.5deg` por ancora do anel externo

Ponto importante:

- as `3` rotas organizam direcoes cognitivas
- os `4` ciclos continuam organizando quadrantes estruturais
- os `16` agentes continuam ocupando ancoras cartograficas

Ou seja, o grid radial nao apaga a estrutura anterior; ele a torna mais legivel.

## Diagrama Geometrico Simbolico

O desenho abaixo aproxima a mandala como simbolo estrutural: um campo externo com ancoras nomeadas e um triangulo central de navegacao.

```mermaid
flowchart TB
  classDef core fill:#efe7d6,stroke:#3a352c,stroke-width:2px,color:#1f1b16;
  classDef ring fill:#faf7f0,stroke:#7f7668,stroke-width:1px,color:#1f1b16;
  classDef latent fill:#ece6da,stroke:#7f7668,stroke-width:1px,color:#1f1b16;
  classDef ghost fill:none,stroke:none,color:transparent;

  subgraph r1[" "]
    direction LR
    g1[" "]:::ghost
    ast["ASTRAEL"]:::ring
    g2[" "]:::ghost
  end

  subgraph r2[" "]
    direction LR
    vor["VORAX"]:::ring
    g3[" "]:::ghost
    lun["LUNARA"]:::ring
  end

  subgraph r3[" "]
    direction LR
    syntria["SYNTRIA"]:::ring
    g4[" "]:::ghost
    okt["OKTAVE"]:::ring
  end

  subgraph r4[" "]
    direction LR
    sol["SOLARA"]:::ring
    g5[" "]:::ghost
    nav["NAVROS"]:::core
    g6[" "]:::ghost
    lum["LUMORA"]:::ring
  end

  subgraph r5[" "]
    direction LR
    g7[" "]:::ghost
    synt["SYNTARIS"]:::core
    g8[" "]:::ghost
    flux["FLUX"]:::core
    g9[" "]:::ghost
  end

  subgraph r6[" "]
    direction LR
    vel["VELTARA"]:::ring
    g10[" "]:::ghost
    kao["KAORAN"]:::ring
  end

  subgraph r7[" "]
    direction LR
    fin["FINCE"]:::ring
    oria["ORIA"]:::latent
    osl["OSLO"]:::ring
  end

  subgraph r8[" "]
    direction LR
    g11[" "]:::ghost
    hes["HESLOS"]:::ring
    g12[" "]:::ghost
  end

  nav --- synt
  nav --- flux
  synt --- flux

  style r1 fill:none,stroke:none
  style r2 fill:none,stroke:none
  style r3 fill:none,stroke:none
  style r4 fill:none,stroke:none
  style r5 fill:none,stroke:none
  style r6 fill:none,stroke:none
  style r7 fill:none,stroke:none
  style r8 fill:none,stroke:none
```

Notas:

- `ORIA` continua em estado latente por conflito com `ORION`
- a ideia das 16 ancoras e mais ampla do que a lista de nomes hoje estabilizada no repo
- a mandala final pode manter ancoras geometricas mesmo quando alguns nomes ainda estiverem em revisao

## Leitura do Simbolo

O simbolo combina tres formas primarias:

- circulo: totalidade do campo de experiencia
- triangulo: estabilidade do motor de navegacao
- anel: estados de travessia do campo humano

Em linguagem direta:

`campo -> orientacao -> percurso`

## Diagrama das Tres Rotas Naturais

Quando as tres rotas sao sobrepostas ao nucleo triadico, a mandala deixa de ser apenas um diagrama estatico e passa a funcionar como mapa de navegacao.

```mermaid
flowchart TB
  classDef core fill:#efe7d6,stroke:#3a352c,stroke-width:2px,color:#1f1b16;
  classDef ring fill:#faf7f0,stroke:#7f7668,stroke-width:1px,color:#1f1b16;
  classDef latent fill:#ece6da,stroke:#7f7668,stroke-width:1px,color:#1f1b16;
  classDef ghost fill:none,stroke:none,color:transparent;

  subgraph rr1[" "]
    direction LR
    gg1[" "]:::ghost
    ast["ASTRAEL"]:::ring
    gg2[" "]:::ghost
  end

  subgraph rr2[" "]
    direction LR
    vor["VORAX"]:::ring
    gg3[" "]:::ghost
    lun["LUNARA"]:::ring
  end

  subgraph rr3[" "]
    direction LR
    syntria["SYNTRIA"]:::ring
    gg4[" "]:::ghost
    okt["OKTAVE"]:::ring
  end

  subgraph rr4[" "]
    direction LR
    sol["SOLARA"]:::ring
    gg5[" "]:::ghost
    nav["NAVROS"]:::core
    gg6[" "]:::ghost
    lum["LUMORA"]:::ring
  end

  subgraph rr5[" "]
    direction LR
    gg7[" "]:::ghost
    synt["SYNTARIS"]:::core
    gg8[" "]:::ghost
    flux["FLUX"]:::core
    gg9[" "]:::ghost
  end

  subgraph rr6[" "]
    direction LR
    vel["VELTARA"]:::ring
    gg10[" "]:::ghost
    kao["KAORAN"]:::ring
  end

  subgraph rr7[" "]
    direction LR
    fin["FINCE"]:::ring
    oria["ORIA"]:::latent
    osl["OSLO"]:::ring
  end

  subgraph rr8[" "]
    direction LR
    gg11[" "]:::ghost
    hes["HESLOS"]:::ring
    gg12[" "]:::ghost
  end

  nav --- synt
  nav --- flux
  synt --- flux

  nav --> lum --> osl --> kao --> synt
  synt --> fin --> oria --> hes --> flux
  flux --> sol --> vel --> syntria --> ast --> okt

  linkStyle 0,1,2 stroke:#7f7668,stroke-width:1.5px;
  linkStyle 3,4,5,6 stroke:#5c7c8a,stroke-width:2.5px;
  linkStyle 7,8,9,10 stroke:#6e7a5f,stroke-width:2.5px;
  linkStyle 11,12,13,14,15 stroke:#b46d3c,stroke-width:2.5px;

  style rr1 fill:none,stroke:none
  style rr2 fill:none,stroke:none
  style rr3 fill:none,stroke:none
  style rr4 fill:none,stroke:none
  style rr5 fill:none,stroke:none
  style rr6 fill:none,stroke:none
  style rr7 fill:none,stroke:none
  style rr8 fill:none,stroke:none
```

Leitura do overlay:

- rota da Percepcao: `NAVROS -> LUMORA -> OSLO -> KAORAN -> SYNTARIS`
- rota da Estrutura: `SYNTARIS -> FINCE -> ORIA -> HESLOS -> FLUX`
- rota da Acao: `FLUX -> SOLARA -> VELTARA -> SYNTRIA -> ASTRAEL -> OKTAVE`

Quando vistas juntas, as tres rotas sugerem uma estrela triangular interna ao campo da mandala.

## Micro-ciclos de Travessia

As rotas naturais sugerem micro-ciclos com extensoes diferentes:

- Percepcao: 5 estados
- Estrutura: 5 estados
- Acao: 6 estados

Isso abre duas escalas para o portal:

- jornada curta: uma rota completa ativada por necessidade imediata
- jornada completa: encadeamento de varias rotas com retorno recorrente ao nucleo

Em produto, isso significa que o portal pode sustentar tanto uma leitura breve quanto uma travessia expandida sem trocar de mapa.

## Diagrama por Ciclos

```mermaid
flowchart LR
  classDef cycle fill:#faf7f0,stroke:#7f7668,stroke-width:1px,color:#1f1b16;
  classDef core fill:#efe7d6,stroke:#3a352c,stroke-width:2px,color:#1f1b16;

  core["TRIADE CENTRAL\nNAVROS - SYNTARIS - FLUX"]:::core

  subgraph c1["Ciclo 1 - Despertar do Campo"]
    direction TB
    c1a["LUMORA"]:::cycle
    c1b["OSLO"]:::cycle
    c1c["KAORAN"]:::cycle
    c1d["NAVROS"]:::cycle
  end

  subgraph c2["Ciclo 2 - Alinhamento do Ser"]
    direction TB
    c2a["SYNTARIS"]:::cycle
    c2b["FINCE"]:::cycle
    c2c["ORION / ORIA"]:::cycle
    c2d["HESLOS"]:::cycle
  end

  subgraph c3["Ciclo 3 - Movimento no Mundo"]
    direction TB
    c3a["FLUX"]:::cycle
    c3b["SOLARA"]:::cycle
    c3c["VELTARA"]:::cycle
    c3d["SYNTRIA"]:::cycle
  end

  subgraph c4["Ciclo 4 - Expansao e Regeneracao"]
    direction TB
    c4a["ASTRAEL"]:::cycle
    c4b["VORAX"]:::cycle
    c4c["LUNARA"]:::cycle
    c4d["OKTAVE"]:::cycle
  end

  core --> c1
  core --> c2
  core --> c3
  core --> c4
```

## Percurso de Exemplo

```mermaid
flowchart LR
  nav["NAVROS"] --> lum["LUMORA"] --> synt["SYNTARIS"] --> flux["FLUX"] --> syn["SYNTRIA"] --> ast["ASTRAEL"] --> okt["OKTAVE"]
```

Esse percurso nao descreve um fluxo fixo do produto. Ele serve para mostrar como a mandala pode funcionar como mapa navegavel de estados.

## Regras de Leitura para Interface

Se a mandala for levada para interface, a geometria precisa preservar:

- centro legivel antes de qualquer detalhe periferico
- triade reconhecivel mesmo quando o anel estiver expandido
- diferenca clara entre simbolo estrutural e projecao tecnica
- leitura por quadrantes sem exigir explicacao previa
- possibilidade de trilha recente do usuario
- ativacao das tres rotas a partir da pergunta `O que voce precisa agora?`

## Limites do Modelo Atual

Mesmo com a visualizacao atual, algumas decisoes continuam abertas:

- a contagem entre 16 ancoras geometricas e nomes efetivamente estabilizados segue incompleta
- o nucleo triadico e apenas motor ou tambem faz parte dos 16 estados
- `ORION` e `ORIA` seguem em conflito de nomenclatura
- `ANERA` e `ORIGEN` nao aparecem nessa geometria exploratoria
- `OKTAVE` oscila entre campo de origem e estado terminal
- a versao circular final exigira refinamento geometrico fora do Mermaid
- o componente-base atual do frontend ainda usa uma projecao simplificada, nao o simbolo final

# Geometria da Mandala

## Status

Este documento registra a versao geometrica de trabalho da mandala em Mermaid. Ele foi construido para servir ao manual e a interface, mas continua ligado a uma camada exploratoria do sistema, nao a uma geometria canonica ja fechada.

Leituras de origem:

- camada canonica da mandala em [04_mandala_dos_agentes.md](../manual/04_mandala_dos_agentes.md)
- leitura exploratoria em [07_hipotese_dos_quatro_ciclos.md](../manual/07_hipotese_dos_quatro_ciclos.md)

## Uso Deste Documento

Esta doc serve para tres fins:

- visualizar a mandala como estrutura espacial
- alinhar design e produto antes da interface final
- manter uma referencia compartilhada para futuras iteracoes geometricas

Importante:

- o Mermaid abaixo e uma referencia estrutural
- ele nao substitui a futura geometria desenhada em Figma ou codigo
- o diagrama preserva legibilidade e relacoes, nao precisao matematica absoluta

## Diagrama Geometrico de Trabalho

```mermaid
flowchart TB
  classDef core fill:#efe7d6,stroke:#3a352c,stroke-width:2px,color:#1f1b16;
  classDef ring fill:#faf7f0,stroke:#7f7668,stroke-width:1px,color:#1f1b16;
  classDef ghost fill:none,stroke:none,color:transparent;

  subgraph r1[" "]
    direction LR
    g1[" "]:::ghost
    g2[" "]:::ghost
    ast["ASTRAEL"]:::ring
    g3[" "]:::ghost
    g4[" "]:::ghost
  end

  subgraph r2[" "]
    direction LR
    g5[" "]:::ghost
    vor["VORAX"]:::ring
    g6[" "]:::ghost
    lun["LUNARA"]:::ring
    g7[" "]:::ghost
  end

  subgraph r3[" "]
    direction LR
    syntria["SYNTRIA"]:::ring
    g8[" "]:::ghost
    g9[" "]:::ghost
    okt["OKTAVE"]:::ring
  end

  subgraph r4[" "]
    direction LR
    sol["SOLARA"]:::ring
    flux["FLUX"]:::core
    synt["SYNTARIS"]:::core
    nav["NAVROS"]:::core
    lum["LUMORA"]:::ring
  end

  subgraph r5[" "]
    direction LR
    vel["VELTARA"]:::ring
    g10[" "]:::ghost
    g11[" "]:::ghost
    kao["KAORAN"]:::ring
  end

  subgraph r6[" "]
    direction LR
    g12[" "]:::ghost
    fin["FINCE"]:::ring
    g13[" "]:::ghost
    osl["OSLO"]:::ring
    g14[" "]:::ghost
  end

  subgraph r7[" "]
    direction LR
    g15[" "]:::ghost
    g16[" "]:::ghost
    hes["HESLOS"]:::ring
    g17[" "]:::ghost
    g18[" "]:::ghost
  end

  style r1 fill:none,stroke:none
  style r2 fill:none,stroke:none
  style r3 fill:none,stroke:none
  style r4 fill:none,stroke:none
  style r5 fill:none,stroke:none
  style r6 fill:none,stroke:none
  style r7 fill:none,stroke:none
```

## Leitura do Diagrama

No estado atual de trabalho, o diagrama sugere:

- triade central: `NAVROS`, `SYNTARIS`, `FLUX`
- anel externo: agentes e estados de travessia
- leitura por quadrantes: quatro ciclos de transformacao
- leitura por percurso: deslocamentos entre estados ao longo da jornada

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
- distincao visual clara entre nucleo e anel
- leitura por quadrantes sem exigir explicacao previa
- possibilidade de trilha recente do usuario
- expansao progressiva a partir da bussola inicial

## Limites do Modelo Atual

Mesmo com a visualizacao em Mermaid, algumas decisoes continuam abertas:

- o nucleo triadico e apenas motor ou tambem faz parte dos 16 estados
- `ORION` e `ORIA` seguem em conflito de nomenclatura
- `ANERA` e `ORIGEN` nao aparecem nessa geometria exploratoria
- `OKTAVE` oscila entre campo de origem e estado terminal
- a versao circular final exigira refinamento geometrico fora do Mermaid

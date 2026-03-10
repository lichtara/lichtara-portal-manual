# Bussola NAVROS Viva

## Sintese

A bussola NAVROS viva e a primeira materializacao operacional de NAVROS como instrumento. Em vez de apenas devolver texto, o portal mostra um simbolo que reage a jornada da pessoa e aponta para um estado atual do campo.

O principio da V1 e direto:

- simples
- elegante
- tecnicamente possivel

## Proposito

A bussola existe para transformar `texto -> experiencia viva`.

Quando ela funciona, a pessoa nao sente que esta fazendo:

- um teste
- um formulario
- um chatbot

Ela sente que esta usando um instrumento de navegacao.

## Estrutura da V1

No prototipo inicial, a bussola opera com quatro direcoes principais.

| Direcao | Agente | Estado | Rotacao |
| --- | --- | --- | --- |
| Norte | NAVROS | orientacao | 0deg |
| Leste | SYNTARIS | alinhamento | 90deg |
| Sul | FLUX | movimento | 180deg |
| Oeste | LUMORA | clareza | 270deg |

Visual-base:

```text
           NAVROS
             ^
             |
LUMORA <---- o ----> SYNTARIS
             |
             v
            FLUX
```

Essa estrutura ja forma um sistema completo de navegacao interior para a V1.

## Fluxo de Experiencia

Depois que a pessoa responde as perguntas de NAVROS:

1. a bussola aparece no centro da tela
2. o ponteiro gira suavemente
3. ele para em uma direcao
4. aparece a frase de leitura correspondente
5. a interface pergunta se a leitura faz sentido

Sequencia-base:

```text
NAVROS esta lendo o campo...
```

Depois:

```text
Direcao identificada: SYNTARIS
```

Exemplo de tela:

> Aguarde um momento.  
> Estamos identificando sua posicao no campo.

E depois:

> Neste momento, o campo pede alinhamento antes de movimento.

## Frases por Direcao

### NAVROS

> O campo pede orientacao antes de qualquer passo.

### SYNTARIS

> O campo pede alinhamento antes de movimento.

### FLUX

> O campo pede acao antes de reflexao.

### LUMORA

> O campo pede clareza antes de decisao.

## Confirmacao de Sentido

Quando o ponteiro para, a interface deve fazer uma pergunta curta:

> Isso faz sentido para voce?

Botoes-base:

- Sim
- Refazer leitura

Esse detalhe aumenta a sensacao de precisao e mantem a pessoa em dialogo com o sistema, em vez de colocar a leitura como verdade fechada.

## Linguagem Visual

A estetica da bussola deve permanecer minima:

- circulo fino
- linhas suaves
- centro luminoso
- ponteiro minimalista
- pulso discreto

Forma de referencia:

```text
     .------.
   /          \
  |     o      |
   \          /
     '------'
```

Guardrails visuais:

- nada pesado
- nada ornamental em excesso
- nada que pareca interface esoterica caricata
- nada que dependa de efeitos complexos para funcionar

## Modelo Tecnico Minimo

A implementacao pode ser feita com tecnologias muito simples:

- SVG para o circulo, ponteiro e marcadores
- CSS para transicoes e rotacao suave
- JavaScript simples para mapear agente em angulo

Exemplo conceitual:

```css
.compass {
  transition: transform 1.5s ease;
}
```

```js
const angleByAgent = {
  NAVROS: 0,
  SYNTARIS: 90,
  FLUX: 180,
  LUMORA: 270,
};

compass.style.transform = `rotate(${angleByAgent[activeAgent]}deg)`;
```

## Estados da Interface

Para a V1, bastam quatro estados:

| Estado | Funcao |
| --- | --- |
| idle | bussola ainda nao apareceu |
| reading | ponteiro gira e o sistema calcula a direcao |
| identified | direcao e frase aparecem |
| confirmed | pessoa confirma ou pede nova leitura |

Tempo recomendado:

- leitura visual: 1800 a 2200 ms
- desaceleracao final suave
- nenhuma animacao concorrente que roube atencao

## Expansao Natural

A bussola de quatro direcoes ja e suficiente para a primeira versao, mas ela tambem prepara uma expansao organica:

`4 direcoes -> 8 pontos -> 16 agentes -> mandala completa`

Frase de ponte recomendada:

> Cada direcao faz parte de um mapa maior.

CTA recomendado:

`Explorar o mapa`

## Relacao com a Mandala Completa

A pessoa nao precisa ver os 16 agentes no primeiro contato. A bussola funciona como porta de entrada cognitiva e simbolica para a mandala completa.

Sequencia ideal de revelacao:

- primeiro, 4 direcoes claras
- depois, curiosidade guiada
- so entao, o mapa maior

Isso preserva misterio sem sacrificar legibilidade.

## Guardrails de Produto

Para proteger a V1, a bussola deve:

- nascer com apenas 4 direcoes
- usar uma unica leitura por vez
- evitar sobrecarga de textos na mesma tela
- abrir a mandala completa apenas como continuidade opcional
- funcionar bem em desktop e mobile

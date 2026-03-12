# Lichtara System vs Portal

## Sintese

Lichtara e o sistema.

O portal e uma interface do sistema.

Essa distincao precisa ficar explicita para evitar que decisao de produto seja confundida com decisao ontologica.

## Distincao Basica

| Camada | Definicao |
| --- | --- |
| Lichtara | sistema de navegacao da experiencia humana |
| Portal Lichtara | interface publica e navegavel desse sistema |

## O Que Pertence ao Sistema Lichtara

Pertence ao sistema:

- Livro Vivo
- Mandala
- nucleo `NAVROS - SYNTARIS - FLUX`
- ciclos, rotas e jornadas
- paper e formalizacao teorica
- principios de governanca e limite

Esses elementos definem o que Lichtara e, independentemente de como a experiencia seja implementada.

## O Que Pertence ao Portal

Pertence ao portal:

- telas e fluxos
- perguntas
- bussola viva
- stepper das jornadas
- mandala interativa
- persistencia de progresso
- analytics e observabilidade

Esses elementos definem como o sistema se torna experiencia acessivel.

## Regra de Projeto

Quando houver duvida, perguntar:

- estamos mudando o sistema ou apenas a interface?
- estamos mudando ontologia ou apenas UX?
- estamos mexendo na verdade estrutural ou apenas no modo de apresentacao?

## Estrutura Recomendada

Leitura hierarquica:

`Lichtara System`

- `Livro Vivo`
- `Mandala`
- `Portal`
- `Paper`

Leitura funcional:

`sistema -> linguagem -> interface -> experiencia`

## Consequencia Pratica

Essa separacao protege o projeto em tres pontos:

- evita que decisoes de UI deformem o sistema
- evita que o sistema fique preso a uma unica implementacao
- permite que manual, repo e paper crescam sem confundir camada conceitual com camada de produto

## Referencias

- [matriz-canonica-do-sistema.md](matriz-canonica-do-sistema.md)
- [portal-architecture.md](portal-architecture.md)
- [../manual/00_o_que_e_lichtara.md](../manual/00_o_que_e_lichtara.md)

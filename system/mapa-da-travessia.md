# Mapa da Travessia

## Sintese

Se a mandala funciona como mapa e a jornada funciona como movimento, o portal pode registrar trajetorias da experiencia ao longo do tempo.

Formula-base:

`mapa + movimento + memoria`

Essa camada transforma o portal em instrumento de navegacao experiencial e nao apenas em conjunto de jornadas isoladas.

## Ideia Central

Cada travessia desloca a pessoa dentro da mandala:

`estado inicial -> jornada -> novo estado`

Quando esse deslocamento e registrado, o sistema passa a mostrar:

- onde a jornada comecou
- por quais pontos a pessoa passou
- como o campo mudou ao longo do tempo

## Componentes da Camada de Trajetoria

| Camada | Funcao |
| --- | --- |
| Mandala | mapa |
| Jornada | movimento |
| Historico | trajetoria |

Leitura operacional:

- cada etapa da jornada corresponde a um ponto da mandala
- a sequencia de etapas forma um vetor de travessia
- vetores recorrentes formam memoria de experiencia

## Mapa Pessoal

Uma futura tela chamada `Mapa da Travessia` pode mostrar:

- caminhos ja percorridos
- pontos ainda nao explorados
- retorno frequente a certos eixos
- deslocamentos entre `Percepcao`, `Estrutura`, `Acao` e `Expansao`

Essa camada deve ser apresentada como apoio de navegacao, nao como avaliacao psicologica.

## Trajetoria sem Identidade

Regra estrutural:

`experiencia != identidade`

O sistema pode registrar trajetorias sem registrar quem a pessoa e.

Registro minimo:

```json
{
  "session": "hash-temporario",
  "journey": "perception",
  "trajectory": ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS", "FLUX", "NAVROS"],
  "timestamp": "2026-03-12T12:00:00Z"
}
```

Esse desenho evita dependencia de:

- nome
- email
- identificador permanente
- perfil individual persistente por default

## Modos de Memoria

O portal pode operar em tres modos de memoria:

| Modo | Funcao | Risco |
| --- | --- | --- |
| local_only | historico fica apenas no dispositivo | baixo |
| ephemeral_session | historico de sessao curta e anonimizada | medio |
| aggregated_atlas | apenas fluxos coletivos agregados | baixo |

Ordem recomendada:

1. `local_only`
2. `ephemeral_session`
3. `aggregated_atlas`

## Atlas Coletivo

Em camada agregada, o portal pode mostrar fluxos coletivos sem expor trajetorias individuais.

Exemplo:

```json
{
  "movement": "perception->structure",
  "count": 142
}
```

Essa camada pode revelar:

- movimentos mais frequentes
- eixos mais explorados
- pontos pouco visitados da mandala
- correntes coletivas de travessia

## Guardrails de Limit

O principio `Limit` entra aqui como governanca estrutural.

Regras minimas:

- nao transformar trajetoria em produto comercial
- nao perfilar individuos
- nao criar score de consciencia
- nao usar classificacao psicologica para persuasao
- manter apagamento simples e reversibilidade

## Regras de Produto

Se essa camada entrar no portal, ela deve:

- fortalecer orientacao
- ampliar consciencia do percurso
- sugerir exploracao sem prescrever identidade

Ela nao deve:

- parecer ranking
- parecer teste de personalidade
- parecer dashboard de performance interior

## Camadas Tecnicas

Arquitetura minima sugerida:

1. interface React
2. memoria local de trajetoria
3. agregacao anonima opcional
4. atlas coletivo sem identidades persistentes

## Documento Relacionado

- [data-protection.md](data-protection.md)
- [navros-experience.md](navros-experience.md)
- [../manual/06_governanca_do_portal.md](../manual/06_governanca_do_portal.md)
- [../implementation/frontend/mandala/mandalaTrajectories.ts](../implementation/frontend/mandala/mandalaTrajectories.ts)

# Governanca do Portal

## Sintese

No material-base, governanca aparece como um gesto de cuidado aplicado ao produto. Ela combina disciplina de execucao, protecao de dados e coerencia de experiencia para que o portal cresca sem perder integridade. O principio explicito da V1 e:

`maximo cuidado com minima coleta`

## Escopo de Governanca

A governanca do portal precisa cobrir pelo menos seis frentes:

- produto e priorizacao
- UX e reducao de friccao
- backend e regras de negocio
- dados, analytics e retencao
- privacidade e conformidade LGPD
- compartilhamento e comunidade

## Principio Norteador

O portal lida com respostas profundas sobre contexto emocional, relacional e existencial. Por isso, governanca nao e apenas um tema tecnico ou juridico; ela faz parte do cuidado da experiencia.

Desdobramentos do principio:
- coletar o minimo necessario
- tornar salvamento opcional
- deixar consentimento claro
- impedir uso comercial indevido de conteudo intimo
- restringir acesso por perfil e necessidade operacional

## Modelo Inicial de Frentes

O manual propoe um modelo de equipes responsaveis por frente:

| Frente | Escopo principal |
| --- | --- |
| Horizonte | produto, priorizacao semanal e governanca de escopo |
| Navegacao | UX/UI do fluxo NAVROS e reducao de friccao |
| Orquestra | APIs, regras de negocio e integracao backend |
| Sinal | dados, eventos, dashboards e retencao |
| Guardiao | privacidade, consentimento e politicas LGPD |
| Comunidade | compartilhamento, moderacao e continuidade de jornada |

Os nomes de pessoas citados no PDF aparecem como exemplo inicial e podem ser substituidos.

## Cadencia Recomendada

O plano operacional do manual assume:

- revisao semanal de escopo
- tres sprints de quatro semanas
- decisao de continuidade ao fim de cada sprint

Criticos de cada sprint:
- Sprint 1: colocar NAVROS no ar com privacidade minima aplicada
- Sprint 2: ativar salvamento opcional e retorno de jornada
- Sprint 3: expandir para proximas jornadas com observabilidade e moderacao

## Regras de Decisao para a V1

Uma iniciativa deve entrar na V1 quando:

- melhora clareza ou utilidade da primeira travessia
- reduz friccao importante no fluxo
- preserva simplicidade operacional
- nao aumenta risco de dados de forma desnecessaria

Uma iniciativa deve esperar quando:

- depende de narrativa ou sistema ainda nao estabilizado
- exige coleta adicional sem ganho claro
- adiciona complexidade sem melhorar a travessia principal

## Politicas Minimas de Operacao

- uso anonimo deve ser possivel no primeiro contato
- sair sem salvar deve descartar dados transitorios
- compartilhamento com comunidade exige consentimento explicito
- historico persistente so deve existir com opt-in
- analytics nao deve indexar conteudo textual sensivel

## Incidentes e Escalacao

Mesmo sem um manual completo de incidentes, o material sugere algumas prioridades claras:

- incidentes de privacidade e consentimento tem prioridade maxima
- perda de integridade do fluxo NAVROS afeta diretamente a proposta de valor
- erros de classificacao devem ter fallback seguro em vez de resposta vazia

## Criterios de Qualidade

Uma entrega pode ser considerada governada de forma adequada quando:

- ha criterios de aceite verificaveis
- existem regras claras de consentimento e descarte
- o ownership esta definido
- a experiencia continua coerente com os principios Navros

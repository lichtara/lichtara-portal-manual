# Protecao de Dados

## Sintese

No Portal Lichtara, protecao de dados e parte do cuidado da experiencia. O material-base explicita que respostas profundas podem revelar dados sensiveis de contexto emocional, relacional e existencial.

Referencia regulatoria mencionada:

- LGPD, no contexto brasileiro

## Principio Norteador

`maximo cuidado com minima coleta`

Esse principio protege a pessoa usuaria, fortalece confianca e cria base saudavel para expansao futura.

## Coleta Minima

No primeiro encontro com NAVROS, a recomendacao explicita e priorizar experiencia anonima e evitar coleta obrigatoria de identificacao como:

- nome
- e-mail
- telefone

## Aviso Claro Antes da Experiencia

O manual propoe um aviso simples antes de qualquer resposta:

> Privacidade e cuidado  
> As reflexoes que voce escrever aqui pertencem a voce.  
> O Portal Lichtara nao compartilha essas informacoes com terceiros.  
> Voce pode optar por nao salvar suas respostas.

Botoes recomendados:
- continuar anonimamente
- salvar minha jornada

## Salvamento Opcional

Salvar progresso deve ser uma escolha explicita. Conta e identificacao entram apenas quando a pessoa decide preservar historico.

Implicacoes:
- historico persistente exige opt-in
- sair sem salvar deve descartar dados transitorios
- reentrada com memoria depende de consentimento previo

## Restricao de Uso Comercial

O manual e explicito: respostas pessoais nao devem ser usadas como insumo comercial.

Isso exclui:
- segmentacao de anuncios com base em respostas intimas
- ofertas persuasivas baseadas em vulnerabilidade
- reutilizacao de conteudo reflexivo para marketing

## Armazenamento e Seguranca

Para a fase inicial, a base tecnica recomendada e simples, mas robusta:

- criptografia em transito e em repouso
- banco de dados com controles de seguranca ativos
- acesso restrito por perfil e necessidade operacional

## Analytics da V1

A politica proposta para analytics e:

- medir comportamento de fluxo sem indexar texto pessoal em dashboards
- registrar apenas eventos de navegacao e conclusao
- anonimizar identificadores quando nao houver cadastro
- permitir exclusao dos dados salvos mediante solicitacao da pessoa usuaria

## Modelo de Dados Minimo Relacionado a Consentimento

Campos destacados no material:

- session
- answers
- synthesis
- consent
- analytics

O bloco `consent` precisa registrar ao menos:
- salvar reflexao: sim ou nao
- compartilhar: sim ou nao

## Compartilhamento e Comunidade

Qualquer compartilhamento com comunidade deve pedir consentimento explicito antes de publicar ou persistir informacoes relacionadas a reflexoes da pessoa.

## Prioridades de Risco

Os riscos mais sensiveis na V1 sao:

- coleta excessiva cedo demais
- persistencia sem opt-in
- indexacao de texto sensivel em analytics
- uso comercial de conteudo intimo
- acesso interno acima do necessario

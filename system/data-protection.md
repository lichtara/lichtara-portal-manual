# Protecao de Dados

## Sintese

No Portal Lichtara, proteger dados e parte do mesmo gesto de cuidado que acolhe a experiencia. O material-base explicita que respostas profundas podem revelar dados sensiveis de contexto emocional, relacional e existencial.

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

## Trajetorias sem Identidade

Se o portal registrar trajetorias na mandala, a regra estrutural precisa ser:

`experiencia != identidade`

Implicacoes:

- trajetorias podem existir sem nome ou email
- identificadores devem ser efemeros por default
- a V1 deve preferir memoria local antes de memoria de servidor

Exemplo de registro minimo:

```json
{
  "session": "hash-temporario",
  "journey": "perception",
  "trajectory": ["NAVROS", "LUMORA", "OSLO", "KAORAN", "SYNTARIS", "FLUX", "NAVROS"],
  "timestamp": "2026-03-12T12:00:00Z"
}
```

## Identidade Efemera

Uma implementacao alinhada ao principio de `Limit` deve usar identificacao curta e nao permanente.

Recomendacao:

- gerar `session hash` aleatorio
- usar validade de sessao ou janela curta
- tornar dados anonimos apos expiracao

Isso reduz drasticamente a chance de reconstruir identidade a partir da experiencia.

## Memoria Local e Atlas Agregado

Ordem de preferencia:

1. historico pessoal apenas no dispositivo
2. memoria de sessao anonimizada
3. atlas coletivo apenas em camada agregada

Exemplo de agregacao etica:

```json
{
  "movement": "perception->structure",
  "count": 142
}
```

Essa camada permite leitura coletiva de fluxos sem expor trajetorias individuais.

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

Riscos adicionais para a camada de trajetoria:

- transformar experiencia em perfil individual
- manter identificadores permanentes sem necessidade
- criar score, ranking ou inferencia psicologica indevida
- impedir apagamento rapido da memoria registrada

# ADR-002: Questionario de feedback integrado na PWA

**Data:** 2026-06-20
**Status:** Aceito

## Contexto

Todos os colaboradores passam pela PWA. Oportunidade unica de medir literacia digital da equipe e eficacia comunicacional do onboarding sem pesquisa separada.

## Decisao

Adicionar tela de feedback como penultima (21/22), com 5 perguntas escala Likert (1-5) e 1 texto livre. Dados salvos em localStorage. Todas as 5 escalares obrigatorias para habilitar submit, texto livre opcional.

## Perguntas

1. Experiencia previa com ferramentas Google (literacia digital)
2. Aparencia e facilidade de uso do aplicativo (UX/UI)
3. Clareza sobre email de acesso vs corporativo (comunicacao)
4. Dificuldade do SMTP (complexidade percebida)
5. Confianca pos-processo (resultado do onboarding)
6. Texto livre: o que ficou confuso + preferencia de modo visual

## Alternativas consideradas

1. **Google Forms externo** — tiraria o usuario da PWA, quebrando a experiencia
2. **7 perguntas** — reduzido para 6 (5+1) para evitar fadiga apos 19 telas de conteudo
3. **Envio automatico para Sheets** — adiado; requer API key. Implementar quando pronto

## Consequencias

- Tela 22 total (era 21), impacta contagem no header (21/22, 22/22)
- Dados ficam em localStorage ate integrar com backend (Google Sheets API)
- Botao celebration muda de "Ver meu painel" para "Compartilhar sua opiniao"

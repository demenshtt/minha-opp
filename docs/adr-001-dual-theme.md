# ADR-001: Tema dual (claro/escuro) com toggle na splash

**Data:** 2026-06-20
**Status:** Aceito

## Contexto

A PWA era dark-only. O gestor (Luciano) nao curte modo escuro e identificou que parte da equipe pode preferir modo claro. Alem disso, a preferencia de tema pode ser coletada como metrica de UX.

## Decisao

Implementar tema claro via CSS Custom Properties com seletor `[data-theme="light"]`, toggle na splash screen, e persistencia em localStorage. Detectar `prefers-color-scheme` para primeira visita.

## Alternativas consideradas

1. **Apenas claro** — descartado, o dark ja era padrao e funciona bem
2. **Toggle no header (todas as telas)** — descartado, geraria distracao durante o onboarding; a escolha na splash e suficiente

## Consequencias

- Tokens de cor duplicados (dark em `:root`, light em `[data-theme="light"]`)
- Logo da splash muda automaticamente: `padrao` (dark text) no claro, `fonte-branca` no escuro
- Feedback do questionario pode revelar preferencia de tema da equipe

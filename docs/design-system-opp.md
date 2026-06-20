# Design System Grupo Opp+ — Guia de Implementacao

Referencia tecnica para aplicar o DS Opp+ v1.1 em qualquer projeto.

## Origem

Extraido do MDC-GDI (Manual de Diretrizes Corporativas) e formalizado como CSS Custom Properties em `public/css/tokens.css`.

## Temas

Dois temas disponíveis, ativados via atributo `data-theme` no `<html>`:

- **Escuro** (padrao): `<html>` sem atributo ou `data-theme="dark"`
- **Claro**: `data-theme="light"`

### Troca de tema via JS

```javascript
document.documentElement.setAttribute('data-theme', 'light'); // claro
document.documentElement.setAttribute('data-theme', 'dark');  // escuro
localStorage.setItem('theme', theme); // persistir escolha
```

### Deteccao de preferencia do sistema

```javascript
if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  applyTheme('light');
}
```

## Tipografia

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-display` | Comfortaa | Titulos e destaques |
| `--font-body` | Comfortaa | Texto corrido |
| `--font-mono` | Montserrat | Labels, badges, dados |

### Tamanhos

| Token | px | Uso |
|-------|----|----|
| `--font-size-xs` | 11 | Dicas, hints |
| `--font-size-sm` | 13 | Texto secundario |
| `--font-size-base` | 15 | Corpo de texto |
| `--font-size-lg` | 18 | Subtitulos |
| `--font-size-xl` | 24 | Titulos de secao |
| `--font-size-2xl` | 32 | Titulos de pagina |
| `--font-size-3xl` | 48 | Hero/splash |

## Cores — Tema Escuro (padrao)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-primary` | #0F1419 | Fundo principal |
| `--color-bg-secondary` | #1A1F26 | Cards, header |
| `--color-bg-tertiary` | #242A33 | Inputs, destaques |
| `--color-text-primary` | #E8E8E8 | Texto principal |
| `--color-text-secondary` | #B0B0B0 | Texto auxiliar |
| `--color-text-tertiary` | #808080 | Labels, dicas |
| `--color-action-primary` | #219653 | Botoes, progresso |
| `--color-primary` | #6FCF97 | Destaques, links |
| `--color-success` | #6FCF97 | Confirmacoes |
| `--color-warning` | #F2C94C | Alertas |
| `--color-error` | #FF6B6B | Erros |
| `--color-info` | #ACD4F1 | Informativo |

## Cores — Tema Claro

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-primary` | #FFFFFF | Fundo principal |
| `--color-bg-secondary` | #F5F7F5 | Cards, header |
| `--color-bg-tertiary` | #EAEFEA | Inputs, destaques |
| `--color-text-primary` | #1A1A1A | Texto principal |
| `--color-text-secondary` | #4A4A4A | Texto auxiliar |
| `--color-text-tertiary` | #7A7A7A | Labels, dicas |
| `--color-action-primary` | #219653 | Botoes, progresso |
| `--color-primary` | #219653 | Destaques, links |
| `--color-success` | #219653 | Confirmacoes |
| `--color-warning` | #E6A817 | Alertas |
| `--color-error` | #D32F2F | Erros |
| `--color-info` | #2F80ED | Informativo |

## Espacamento (Grid 8px)

| Token | px |
|-------|----|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 24 |
| `--space-6` | 32 |
| `--space-8` | 48 |
| `--space-12` | 64 |

## Bordas e Sombras

| Token | Valor |
|-------|-------|
| `--radius-xs` | 4px |
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 20px |
| `--radius-full` | 9999px |
| `--shadow-sm` | 0 1px 3px rgba(0,0,0,0.1) |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.1) |

## Transicoes

| Token | Valor |
|-------|-------|
| `--transition-fast` | 100ms ease |
| `--transition-base` | 150ms ease |
| `--transition-slow` | 300ms ease |

## Breakpoints

| Token | px | Uso |
|-------|----|-----|
| `--breakpoint-xs` | 320 | Celulares pequenos |
| `--breakpoint-sm` | 480 | Celulares padrao (max-width do app) |
| `--breakpoint-md` | 768 | Tablets |

## Como reutilizar

1. Copiar `tokens.css` para o novo projeto
2. Importar as fontes Google (Comfortaa + Montserrat)
3. Usar as variaveis CSS nos componentes
4. Para tema: definir `data-theme="light"` ou `data-theme="dark"` no `<html>`

```html
<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
```

## Referencia completa

Documento fonte no Drive: `SUP_DesignSystemv1/PWA_DESIGN_TOKENS/Atualizar System Design com Modernidade e Essência/`

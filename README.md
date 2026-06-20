# Minha Opp+

PWA de onboarding digital gamificado para colaboradores do Grupo Opp+.

## O que faz

Substitui o Manual do Colaborador e o Guia de Primeiros Passos por uma experiencia interativa em 4 missoes (22 telas). O colaborador aprende sobre suas ferramentas digitais, regras de seguranca e configura o SMTP do email corporativo no celular — tudo guiado passo a passo.

## Stack

- **Vanilla JS** — sem frameworks, zero dependencias
- **CSS Custom Properties** — Design System Opp+ v1.1 com tema claro e escuro
- **Mobile-first** — otimizado para celulares (viewport 375px+)
- **PWA** — installavel, offline-ready via Service Worker
- **Hospedagem:** Vercel (free tier)

## Estrutura

```
public/
  index.html          # Shell da PWA
  manifest.json       # Manifest PWA
  css/
    tokens.css        # Design tokens (tipografia, cores, espacamento, temas)
    app.css           # Componentes visuais
  js/
    app.js            # Logica completa (state, navegacao, renderers, feedback)
  data/
    users.json        # Banco de colaboradores (sem dados sensiveis)
  img/
    logo-rebrand-*    # 14 variantes SVG do logo Grupo Opp+
docs/
  revisao-conteudo-pwa.md   # Conteudo v1.1 revisado
```

## Como rodar

```bash
npx serve public -l 3000
```

Abrir `http://localhost:3000` no navegador.

## Missoes

| # | Missao | Telas | Conteudo |
|---|--------|-------|----------|
| 1 | Preparacao | 1-3 | Splash, identificacao por email, overview personalizado |
| 2 | Suas Ferramentas | 4-9 | Identidade digital, ferramentas Google, privacidade, conduta, seguranca, termo |
| 3 | Configurando o Celular | 10-19 | Wizard SMTP 9 passos com dados pre-preenchidos |
| 4 | Finalizacao | 20-22 | Celebracao, questionario de feedback, resumo de acessos |

## Funcionalidades

- **Lookup de usuario** — email pessoal busca perfil no JSON, preenche tudo automaticamente
- **Logos progressivos** — 8 milestones desbloqueiam variantes de cor do logo
- **Feedback haptico/auditivo** — vibracoes e tons programaticos a cada interacao
- **Tema claro/escuro** — toggle na splash, detecta preferencia do sistema
- **Questionario de feedback** — 5 escalas Likert + texto livre, mede literacia digital e eficacia comunicacional
- **Confetti** — animacao canvas na tela de celebracao

## Seguranca

- Senha de app de 16 digitos **nunca** embutida no codigo
- `users.json` exclui senhas, telefones e dados de login
- CSV fonte com dados sensiveis **nunca** copiado para o repositorio

## Licenca

Uso interno Grupo Opp+. Todos os direitos reservados.

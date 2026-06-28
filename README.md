# Minha Opp+

PWA de onboarding digital gamificado para colaboradores do Grupo Opp+.

**URL:** [grupooppmais.com.br/minhaopp](https://www.grupooppmais.com.br/minhaopp)

## O que faz

Substitui o Manual do Colaborador e o Guia de Primeiros Passos por uma experiencia interativa em 4 missoes (22 telas). O colaborador aprende sobre suas ferramentas digitais, regras de seguranca e configura o SMTP do email corporativo no celular — tudo guiado passo a passo.

## Stack

- **Vanilla JS** — sem frameworks, zero dependencias
- **CSS Custom Properties** — Design System Opp+ v1.1 com tema claro e escuro
- **Mobile-first** — otimizado para celulares (viewport 375px+)
- **PWA** — installavel, offline-ready via Service Worker
- **Backend:** Google Apps Script + Google Sheets (free tier)
- **Hospedagem:** Vercel (free tier)

## Estrutura

```
public/
  index.html              # Placeholder raiz ("Em breve")
  minhaopp/
    index.html            # Entry point PWA
    manifest.json         # Manifest PWA
    sw.js                 # Service Worker (network-first)
    css/
      tokens.css          # Design tokens (tipografia, cores, espacamento, temas)
      app.css             # Componentes visuais
    js/
      app.js              # Logica completa (~1600 linhas)
    img/
      icon/               # 7 icones progressivos
      logo/               # Logos (padrao + diamante)
      icon-192.png        # PWA icon
      icon-512.png        # PWA icon
docs/                     # Dossie, ADRs, revisao de conteudo
db/                       # Referencia da planilha app
```

## Como rodar

```bash
npx serve public -l 3000
```

Abrir `http://localhost:3000/minhaopp` no navegador.

## Missoes

| # | Missao | Telas | Conteudo |
|---|--------|-------|----------|
| 1 | Preparacao | 1-3 | Splash, identificacao por email, overview personalizado |
| 2 | Suas Ferramentas | 4-9 | Identidade digital, ferramentas Google, privacidade, conduta, seguranca, termo |
| 3 | Configurando o Celular | 10-20 | Wizard SMTP 10 passos via Chrome desktop mode |
| 4 | Finalizacao | 21-22 | Celebracao, questionario de feedback, resumo de acessos |

## Funcionalidades

- **Lookup de usuario** — email pessoal busca perfil via Google Sheets API
- **Logos progressivos** — 7 milestones desbloqueiam variantes de cor do logo
- **Feedback haptico/auditivo** — vibracoes e tons programaticos a cada interacao
- **Tema claro/escuro** — toggle na splash, detecta preferencia do sistema
- **Questionario de feedback** — 5 escalas Likert + texto livre
- **Tap-to-copy** — campos criticos do SMTP copiaveis com um toque
- **Confetti** — animacao canvas na tela de celebracao
- **Banner de instalacao** — prompt nativo para adicionar a tela inicial

## Seguranca

- Chave de integracao (16 digitos) **nunca** embutida no codigo
- Dados sensiveis **nunca** copiados para o repositorio
- Planilha admin nunca acessada diretamente pelo app (IMPORTRANGE)

## Licenca

Uso interno Grupo Opp+. Todos os direitos reservados.
Desenvolvido por Sistere Stabilis com assistencia de IA Claude (Anthropic).

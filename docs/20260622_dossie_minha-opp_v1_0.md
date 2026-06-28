# DOSSIÊ PRO>SIGA — MINHA OPP+ v1.0

**Projeto:** minha-opp
**Data:** 2026-06-22
**Operador:** Luciano F. Oliveira (ΣΘ Sistere Stabilis)
**Assistente:** Claude Opus 4.6
**Status:** Em produção — pendente redesenho UX

---

## 1. OBJETIVO DO PROJETO

PWA de onboarding gamificado para colaboradores do Grupo Opp+. Guia o usuário na configuração do e-mail corporativo @grupooppmais.com.br no celular, explicando o ecossistema Google Workspace que recebem.

**URL de produção:** www.grupooppmais.com.br/minhaopp

---

## 2. ESCOPO ENTREGUE

### 2.1 Funcionalidades

| Feature | Status | Commit |
|---|---|---|
| Estrutura inicial PWA (Vanilla JS, mobile-first) | Entregue | 34c0abc |
| 21 telas, 4 missões, conteúdo completo | Entregue | b0adfa4 |
| Tema claro/escuro com toggle | Entregue | a0fe40b |
| Questionário de feedback (5 perguntas + texto livre) | Entregue | a0fe40b |
| Logos progressivos (7 variantes desbloqueáveis) | Entregue | b0adfa4, f203d0b |
| Haptic feedback e sons de progresso | Entregue | b0adfa4 |
| Documentação (README, ADRs, Design System guide) | Entregue | fad0720 |
| Otimização de imagens (SVG→PNG, 14.1MB→1.07MB) | Entregue | 3f6590e |
| Subpath /minhaopp (raiz para futuro site) | Entregue | 580d520 |
| Fix tela em branco (trailing slash) | Entregue | f9b0f66 |
| Ilustrações SVG mockup Gmail (6 passos SMTP) | Entregue | 27fdb37 |
| Atalhos funcionais na tela de resumo | Entregue | fa52f28 |
| Sistema icon/logo separados | Entregue | f203d0b |
| PWA install prompt + service worker | Entregue | d0d201c |
| Integração Google Sheets API (leitura + escrita) | Entregue | 5b72d02 |

### 2.2 Progressão de logos

```
padrão (tela 0) → esmeralda (2) → branco (3) → rubi (5)
→ prata-brilhante (7) → ouro-brilhante (9) → diamante (15)
```

- **icon/** (quadrado) — usado no header, 7 variantes
- **logo/** (retangular) — usado no splash (padrão) e resumo (diamante)

### 2.3 Fluxo de missões

```
Missão 1 — Preparação: splash → email-input → overview
Missão 2 — Suas Ferramentas: identity → tools → privacy → conduct → security → terms
Missão 3 — Configurando o Celular: smtp-intro → smtp-1..6 (com ilustrações SVG)
Missão 4 — Finalização: smtp-final → congratulations → summary → feedback → farewell
```

---

## 3. ARQUITETURA

### 3.1 Stack

| Camada | Tecnologia | Custo |
|---|---|---|
| Frontend | Vanilla JS, CSS custom properties, HTML5 | Grátis |
| Hosting | Vercel (auto-deploy on push) | Grátis |
| Repositório | GitHub (demenshtt/minha-opp) | Grátis |
| Backend (dados) | Google Apps Script (sheets-api-gateway) | Grátis |
| Banco de dados | Google Sheets (IMPORTRANGE) | Grátis |
| Domínio | Registro.br → Vercel | Pago (domínio) |
| Service Worker | Network-first, cache v2 | N/A |

### 3.2 Estrutura de arquivos

```
C:\dev\minha-opp\
├── public/
│   ├── index.html                    ← Placeholder raiz ("Em breve")
│   └── minhaopp/
│       ├── index.html                ← Entry point PWA
│       ├── manifest.json             ← PWA manifest
│       ├── sw.js                     ← Service worker v10
│       ├── css/tokens.css            ← Design tokens
│       ├── css/app.css               ← Estilos
│       ├── js/app.js                 ← Lógica (~1600 linhas)
│       ├── img/icon/                 ← 7 ícones progressivos
│       ├── img/logo/                 ← 2 logos (padrão + diamante)
│       ├── img/icon-192.png          ← PWA icon
│       ├── img/icon-512.png          ← PWA icon
│       └── data/users.json           ← LEGADO (pendente remoção)
├── vercel.json                       ← trailingSlash: false
└── docs/                             ← Documentação do projeto
```

### 3.3 Fluxo de dados

```
[Usuário] → GET API_URL → [Apps Script] → [Sheets: aba USERS via IMPORTRANGE] → JSON
[Usuário] → POST API_URL → [Apps Script] → [Sheets: aba MINHAOPP_FEEDBACK] → append
```

**Apps Script:** Projeto standalone "sheets-api-gateway" na conta opp@grupooppmais.com.br. Configuração 100% via Script Properties (zero hardcode). Reutilizável em outros projetos.

**Planilha app:** `20260622_db_minha-opp_v1_0` (ID: 1kcnRRYz4GFRcM7nTtWbQkbbjawYOb7UQIpU6J9gsoiI)
- Aba USERS: IMPORTRANGE da planilha admin (6 colunas: Nome, E-mail Particular, E-mail Acesso, E-mail Grupo, Função, Status)
- Aba MINHAOPP_FEEDBACK: respostas do questionário (auto-criada pelo script)

---

## 4. DECISÕES ARQUITETURAIS (ADRs)

| # | Decisão | Motivo |
|---|---|---|
| 001 | Tema dual (dark/light) | Acessibilidade, preferência do usuário |
| 002 | Feedback via questionário | Medir compreensão e usabilidade |
| 003 | Vanilla JS, sem framework | Simplicidade, zero build, manutenibilidade |
| 004 | PWA no subpath /minhaopp | Raiz reservada para site institucional, sem hífen para facilitar digitação |
| 005 | Icon separado de Logo | Ícone quadrado (header) vs logo retangular (splash/resumo) |
| 006 | Google Sheets como backend | Gratuito, sem servidor, familiar ao operador |
| 007 | Apps Script standalone | Reutilizável, configurável via properties |
| 008 | Planilha separada (IMPORTRANGE) | Não expor dados admin ao app |
| 009 | Senha 1o acesso = email pessoal | Fácil memorização, Workspace força troca |
| 010 | Network-first service worker | Conteúdo sempre atualizado, cache como fallback |

---

## 5. CLASSIFICAÇÃO DE RECURSOS (Governança)

| Recurso | Classificação | Conta |
|---|---|---|
| Código-fonte (GitHub) | SISTERE (IP) | demenshtt |
| Vercel hosting | HÍBRIDO | opp-8353 |
| Apps Script | CLIENTE (dados) | opp@ |
| Planilha admin | CLIENTE (dados) | Drive Opp+ |
| Planilha app | CLIENTE (dados) | Drive Opp+ |
| Domínio grupooppmais.com.br | CLIENTE | Registro.br |

---

## 6. REGRAS DE SEGURANÇA

1. Senha de app (16 dígitos): informada pessoalmente, NUNCA no código
2. users.json exclui senhas, telefones e credenciais
3. CSV admin contém dados sensíveis — NUNCA copiar para repositório
4. Código em C:\dev\, NUNCA dentro do Google Drive sincronizado
5. Pastas Drive Opp+: NUNCA renomear sem autorização coletiva confirmada
6. Premissa de gratuidade total até comunicação explícita do operador

---

## 7. PADRÕES CRIADOS NESTE CICLO

1. **Nomenclatura de imagens digitais** — `função-sujeito-variante.ext` (vocabulário controlado)
2. **Nomenclatura de arquivos Drive** — `AAAAMMDD_categoria_descricao_v1_0` (sem hífen em datas)
3. **Governança de recursos free-tier** — SISTERE / CLIENTE / HÍBRIDO
4. **Proposição proativa de padrões** — sempre que faltar padrão recorrente

---

## 8. DIAGNÓSTICO DE CAMPO (2026-06-22)

Feedback real de 2+ usuários revelou problemas críticos de compreensão:

| Problema | Causa | Severidade |
|---|---|---|
| Não entendem 2 e-mails | Conceito não contextualizado | Alta |
| Não sabem o que é Workspace | Falta de onboarding conceitual | Alta |
| Executam passos no app errado | Tutorial p/ navegador, usam Gmail app | Alta |
| Não leem o conteúdo | Cultura mobile, scroll rápido | Média |
| Senha 1o acesso não informada | Lacuna no fluxo | Alta |
| Pós-PWA sem direção | Falta checklist de conclusão | Média |

---

## 9. PENDÊNCIAS

### Prioridade Imediata
- [ ] Confirmar API Sheets funcionando (teste de login)
- [ ] Confirmar feedback gravando na aba MINHAOPP_FEEDBACK
- [ ] Remover data/users.json após confirmação

### UX Overhaul (aprovado, 3 camadas)
- [ ] **Camada 1** — Contexto: boas-vindas expandida, explicação Workspace/emails, pré-contexto SMTP, tela de conclusão
- [ ] **Camada 2** — Portões: quiz de compreensão após blocos críticos
- [ ] **Camada 3** — Áylos narrador: Web Speech API (TTS), expressões SVG do mascote

### Governança
- [ ] Formalizar diretriz de governança de recursos como doc no Drive
- [ ] Criar Registro de Ativos Digitais (planilha)

### Futuro
- [ ] Domínio dedicado www.minhaopp.com.br
- [ ] Áylos como bot funcional (MOD_aylos, Telegram)

---

## 10. GIT LOG COMPLETO

```
5b72d02 2026-06-22 feat: migrate user data and feedback to Google Sheets API
d0d201c 2026-06-22 feat: add PWA install prompt with service worker
f203d0b 2026-06-22 refactor: new image system with icon/logo separation
fa52f28 2026-06-21 feat: activate summary shortcuts and prepare PWA icon support
27fdb37 2026-06-21 feat: add Gmail mockup illustrations to SMTP setup steps
f9b0f66 2026-06-20 fix: add trailing slash redirect to prevent blank page
580d520 2026-06-20 refactor: move PWA to /minha-opp subpath
34be4e0 2026-06-20 refactor: replace diamante with ouro-brilhante as top-tier logo
3f6590e 2026-06-20 perf: replace SVG logos with optimized PNGs (14.1MB -> 1.07MB)
3e2c668 2026-06-20 fix: correct accent on Grupo Ágora (was Agora)
16ead2e 2026-06-20 fix: use diamante PNG on light theme to avoid black background
c1ce43a 2026-06-20 fix: increase splash logo to 210px and fix header logo on light theme
fad0720 2026-06-20 docs: add README, Design System guide, and ADRs for theme and feedback
a0fe40b 2026-06-20 feat: add light theme, theme toggle, and feedback questionnaire
b0adfa4 2026-06-20 feat: implement v1.1 content, progressive logos, and haptic/audio feedback
34c0abc 2026-06-18 feat: initial project structure for minha-opp PWA
```

---

**Autoria:** ΣΘ Sistere Stabilis + Claude Opus 4.6
**Próxima revisão:** Após conclusão da Camada 1 do UX Overhaul

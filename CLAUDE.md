# PROJETO MINHA-OPP — CLAUDE.md

> PWA de onboarding gamificado para colaboradores do Grupo Opp+.
> Herda diretrizes do Acórdão PRO>SIGA v2.0 (Perfil Slim).

---

## §1 — DIRETRIZES DE COMPORTAMENTO

Aplicam-se integralmente as 14 diretrizes do Acórdão PRO>SIGA Perfil Slim v1.0.
Referência canônica: `H:\Meu Drive\drive-demens-sistere\_claude_code\CLAUDE.md`

Destaques para este projeto:
- **Docência** (§1.13): Explicar cada decisão técnica ao operador.
- **Manutenibilidade** (§1.8): Código que qualquer pessoa consiga manter.
- **Segurança Shift-Left** (§1.12): Credenciais (senha de app) nunca persistidas no código.

---

## §2 — CONTEXTO DO PROJETO

**O que é:** PWA mobile-first que guia colaboradores do Grupo Opp+ na configuração do email corporativo (@grupooppmais.com.br) no Gmail pessoal, em formato interativo e gamificado.

**Público-alvo:** Jovens trabalhadores com baixo letramento digital. Usam celular, não computador. Preferem interação a leitura.

**O que NÃO é:** Sistema complexo, ERP, dashboard. É um wizard interativo com rastreamento de progresso.

**Fluxo principal:** 9 passos guiados para configurar "Enviar como" no Gmail pessoal usando conta SMTP da Opp.

---

## §3 — STACK E PREMISSAS

- **Frontend:** HTML + CSS + JavaScript vanilla (sem framework — simplicidade e zero dependência)
- **Design System:** Grupo Opp+ v1.1 (Comfortaa + Montserrat, verde esmeralda #219653, tema escuro)
- **Hospedagem:** Vercel (free tier) com domínio www.grupooppmais.com.br
- **Persistência MVP:** localStorage (sem backend)
- **Persistência futura:** Google Sheets API (entrega rápida) → Supabase (fins didáticos)
- **Premissa de gratuidade:** Tudo deve ser gratuito — dev, stack, usuários finais

---

## §4 — CONVENÇÕES

Herda integralmente o Padrão de Nomenclatura ΣΘ Sistere Stabilis v1-0:
- Pastas: `kebab-case`
- Arquivos de código: `kebab-case.js`, `kebab-case.css`
- Constantes: `SCREAMING_SNAKE_CASE`
- Classes CSS: `kebab-case` (seguindo Design System Opp+)
- Código: **inglês**
- Docs humanos: **português**
- Commits: inglês, convencionais (feat:, fix:, docs:, etc.)

---

## §5 — PREMISSAS OPERACIONAIS

1. **Gratuidade total.** Sem exceções até comunicação explícita.
2. **Um projeto por vez até entrega.** Foco neste antes de qualquer outro.
3. **Mobile-first.** Tudo pensado para celular. Desktop é bônus.
4. **Sem framework pesado.** Vanilla JS. O colaborador abre no 3G do campo.
5. **Segurança:** Senha de app de 16 dígitos é informada pessoalmente ou por mensagem segura, nunca embutida no código da PWA.

---

## §6 — REFERÊNCIAS

- Design System Opp+: `I:\Meu Drive\🏢 GRUPO_OPP_+\04_TECNOLOGIA_INFORMACAO\DESIGN_SYSTEM\`
- POP workflow CIF: `I:\Meu Drive\_ADMIM_WORKSPACE\LOG_ADMIN_WORKSPACE_ACOES\POP_202601_CLOUD_IDENTITY_FREE_STAPS.MD`
- Manual do Colaborador: `I:\Meu Drive\_ADMIM_WORKSPACE\CLOUD_IDENTITY_FREE_USERS\USERS_MANUALS\`
- Projeto base Claude Code: `H:\Meu Drive\drive-demens-sistere\_claude_code\`

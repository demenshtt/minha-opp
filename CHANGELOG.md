# Changelog

Todas as mudancas notaveis deste projeto serao documentadas neste arquivo.

## [1.0.0] — 2026-06-28

Primeira versao estavel, testada em campo e aprovada pelo operador.

### Entregue
- Onboarding gamificado completo: 4 missoes, 22 telas
- Fluxo SMTP reescrito para Chrome desktop mode (10 passos)
- Email unificado (corporateEmail unico, sem dual accessEmail)
- 18 melhorias de UX a partir de testes em campo
- Integracao Google Sheets API (leitura de usuarios + escrita de feedback)
- Tema claro/escuro com toggle e deteccao de preferencia do sistema
- Logos progressivos (7 variantes desbloqueadas por milestones)
- Feedback haptico (vibracoes) e auditivo (tons programaticos)
- Questionario de feedback (5 escalas Likert + texto livre)
- Confetti e celebracao sonora na conclusao
- Tap-to-copy em campos criticos do SMTP
- Modal explicativo de 2FA
- Links de download do Chrome (Play Store + App Store)
- Banner de instalacao PWA + mencao nas telas finais
- Service worker network-first com cache fallback
- Creditos footer (Sistere Stabilis + Claude/Anthropic)

### Infraestrutura
- Vercel free tier com dominio grupooppmais.com.br
- Apps Script standalone (sheets-api-gateway) na conta Opp+
- Planilha intermediaria com IMPORTRANGE (ADR-008)
- Subpath /minhaopp (raiz reservada para site institucional)

### Seguranca
- Chave de integracao (16 digitos) nunca embutida no codigo
- Dados sensiveis excluidos do repositorio
- Planilha admin nunca acessada diretamente pelo app

# MINHA OPP+ — REVISAO DE CONTEUDO DA PWA

> **Objetivo:** Este documento lista todas as 21 telas da PWA na sequencia de navegacao.
> Edite os textos livremente e devolva o arquivo. Atualizarei o codigo da PWA com base nas suas alteracoes.
>
> **Data:** 2026-06-19
> **Versao:** v1.0-rascunho

---

## LEGENDA

- `{NOME}` = Primeiro nome do colaborador (ex: "Aldo")
- `{NOME_COMPLETO}` = Nome completo (ex: "Aldo Vicente Silva")
- `{FUNCAO}` = Funcao/cargo (ex: "Piloto")
- `{EMAIL_PESSOAL}` = Email pessoal digitado na tela 2 (ex: "aldopva@hotmail.com")
- `{EMAIL_CORPORATIVO}` = Email corporativo (ex: "aldosilva@grupooppmais.com.br")
- `{EMAIL_ACESSO}` = Email de acesso/login (ex: "aldosilvaacesso@grupooppmais.com.br")
- [ICONE: emoji] = Icone/emoji exibido na tela
- [CARD tipo] = Cartao visual (accent=verde, warning=amarelo, info=azul, neutro=cinza)
- [BOTAO: texto] = Botao de acao
- [INPUT: tipo] = Campo de entrada do usuario
- [LISTA] = Lista de itens
- [VALOR COPIAVEL] = Texto verde que o usuario pode tocar para copiar

> **Para adicionar conteudo novo:** escreva normalmente abaixo do titulo da tela, indicando se e paragrafo, card, lista, etc.
> **Para remover:** risque o texto com ~~assim~~ ou apague.
> **Para corrigir ortografia:** edite diretamente.

---

## FASE 1 — BOAS-VINDAS

---

### TELA 01 / 21 — Splash (tela inicial)

**ID interno:** `splash`

[LOGO: icone Opp+ centralizado]

**Titulo:** Minha Opp+

**Subtitulo:** Seu onboarding digital

**Texto:** Configure seu email corporativo e conheca as ferramentas do Grupo Opp+ em poucos minutos.

[BOTAO: Comecar]

---

### TELA 02 / 21 — Identificacao por email

**ID interno:** `email-input`

**Badge:** Fase 1

**Titulo:** Qual e o seu email pessoal?

**Texto:** Digite o email que voce usa no dia a dia (Gmail, Hotmail, etc.). Vamos usar ele para carregar seus dados do Grupo Opp+.

[INPUT: email — placeholder "Ex: seunome@gmail.com"]
[Label do campo: "Seu email pessoal"]

**Mensagem de erro (se email nao encontrado):**
⚠️ Email nao encontrado. Verifique se digitou corretamente ou procure o administrador do TI.

[BOTAO: Buscar meus dados]

---

### TELA 03 / 21 — Visao geral personalizada

**ID interno:** `overview`

**Badge:** Fase 1

**Titulo:** Ola, {NOME}!

**Texto:** Encontramos seus dados. Voce e {FUNCAO} no Grupo Opp+ e seu email corporativo e:

[CARD accent]
[ICONE: ✉️] Seu email corporativo
[VALOR COPIAVEL] {EMAIL_CORPORATIVO}
Este e o endereco que seus contatos profissionais verao quando voce enviar um email pelo Grupo Opp+.

**Texto:** Nos proximos minutos voce vai:

[LISTA]
- [ICONE: 📋] **Conhecer suas ferramentas** — Drive, Docs, Calendar, Meet e mais
- [ICONE: 🔐] **Entender suas responsabilidades** — Normas, seguranca e boas praticas
- [ICONE: ✉️] **Configurar o email no seu celular** — Passo a passo guiado com seus dados reais

[BOTAO: Vamos la!]

---

## FASE 2 — APRESENTACAO

---

### TELA 04 / 21 — Sua identidade digital

**ID interno:** `identity`

**Badge:** Fase 2 — Apresentacao

**Titulo:** Sua identidade digital

**Texto:** {NOME}, voce tem dois enderecos no Grupo Opp+. Cada um tem uma funcao diferente:

[CARD accent]
[ICONE: 🔑] Email de Acesso (login)
[VALOR COPIAVEL] {EMAIL_ACESSO}
Use para: fazer login no Google, acessar Drive, Calendar, Docs.
Perceba o "acesso" no endereco — ele identifica que e o login tecnico.

[CARD info]
[ICONE: ✉️] Email Corporativo (comunicacao)
[VALOR COPIAVEL] {EMAIL_CORPORATIVO}
Use para: enviar e receber emails profissionais. Este e o endereco que seus contatos verao.

[CARD warning]
[ICONE: ⚠️] Por que sao diferentes?
O email de acesso e seu login tecnico. O email corporativo e sua identidade publica. Nos vamos configurar os dois para trabalharem juntos.

[BOTAO: Voltar] [BOTAO: Continuar]

---

### TELA 05 / 21 — Suas ferramentas

**ID interno:** `tools`

**Badge:** Fase 2 — Apresentacao

**Titulo:** Suas ferramentas

**Texto:** Com sua conta, voce tem acesso gratuito a estas ferramentas do Google:

[LISTA]
- [ICONE: 📄] **Google Docs, Sheets, Slides** — Crie e edite documentos, planilhas e apresentacoes com seus colegas em tempo real.
- [ICONE: 📅] **Google Calendar** — Organize sua agenda e agende reunioes.
- [ICONE: 📹] **Google Meet** — Videoconferencias e chamadas em tempo real.
- [ICONE: 💬] **Google Chat** — Comunicacao interna instantanea — substitui WhatsApp para assuntos de trabalho.
- [ICONE: 📁] **Google Drive Compartilhado** — Seu escritorio digital na nuvem. Armazene e compartilhe arquivos com a equipe.

[BOTAO: Voltar] [BOTAO: Continuar]

---

### TELA 06 / 21 — Privativo vs Corporativo

**ID interno:** `privacy`

**Badge:** Fase 2 — Apresentacao

**Titulo:** Privativo vs Corporativo

**Texto:** E fundamental entender a separacao entre sua vida pessoal e profissional:

[CARD accent]
[ICONE: 🏢] Espaco Corporativo
Tudo dentro do login {EMAIL_ACESSO} e corporativo. A empresa pode auditar esses dados para garantir seguranca. Nao use este login para assuntos pessoais.

[CARD info]
[ICONE: 🏠] Espaco Privativo
Seu email pessoal ({EMAIL_PESSOAL}) continua sendo seu espaco de total privacidade. A empresa nao tem acesso a ele, mesmo que voce receba encaminhamentos de emails profissionais la.

**Texto:** Respeitamos sua privacidade. Apenas pedimos que mantenha essa distincao clara para proteger voce e a empresa.

[BOTAO: Voltar] [BOTAO: Continuar]

---

### TELA 07 / 21 — Responsabilidade profissional

**ID interno:** `conduct`

**Badge:** Fase 2 — Apresentacao

**Titulo:** Responsabilidade profissional

**Texto:** Quando voce usa o email {EMAIL_CORPORATIVO}, voce fala em nome da empresa.

[CARD warning]
[ICONE: ⚡] O que isso significa na pratica
Cada email enviado, documento editado ou mensagem no Chat carrega o nome e a credibilidade do Grupo Opp+.

[LISTA]
- [ICONE: 📝] **Rastreabilidade** — Todas as interacoes em documentos e sistemas ficam registradas sob sua identidade oficial.
- [ICONE: 🏷️] **Propriedade** — Comunicacoes e arquivos criados neste ambiente sao propriedade do Grupo Opp+ e devem ser usados exclusivamente para fins profissionais.
- [ICONE: 🤝] **Tom profissional** — Mantenha comunicacao respeitosa e alinhada aos valores da empresa em todas as interacoes.

[BOTAO: Voltar] [BOTAO: Continuar]

---

### TELA 08 / 21 — Seguranca de dados

**ID interno:** `security`

**Badge:** Fase 2 — Apresentacao

**Titulo:** Seguranca de dados

**Texto:** Para proteger voce, a empresa e nossos dados, siga estas diretrizes:

[CARD accent]
[ICONE: 🔒] Ative a verificacao em duas etapas (2FA)
Faca isso no seu primeiro login com {EMAIL_ACESSO}. Adiciona uma camada extra de seguranca.

[CARD warning]
[ICONE: 🚫] Nunca compartilhe sua senha
Sua senha e pessoal e intransferivel. O Grupo Opp+ nunca solicitara sua senha por email ou telefone.

[CARD info]
[ICONE: 📱] Notifique perda de dispositivo
Se perder ou tiver roubado um celular/computador com acesso a conta corporativa, avise imediatamente o TI.

[CARD neutro]
[ICONE: 🔗] Nao compartilhe links internos
Nunca compartilhe links de arquivos do Drive com emails externos sem autorizacao da gestao.

[BOTAO: Voltar] [BOTAO: Continuar]

---

### TELA 09 / 21 — Termo de ciencia

**ID interno:** `terms`

**Badge:** Fase 2 — Apresentacao

**Titulo:** Termo de ciencia

**Texto:** {NOME}, antes de prosseguir para a configuracao do email, confirme que voce leu e compreendeu as informacoes apresentadas.

[CARD neutro]
Ao marcar abaixo, voce declara que:

• Entendeu a diferenca entre email de acesso e email corporativo
• Conhece as ferramentas disponiveis
• Compreende a separacao entre espaco privativo e corporativo
• Esta ciente das normas de conduta e responsabilidade
• Conhece as diretrizes de seguranca

[CHECKBOX]
Eu, {NOME_COMPLETO}, li e compreendi todas as informacoes sobre minha identidade digital, responsabilidades e seguranca no Grupo Opp+.

[BOTAO: Voltar] [BOTAO: Prosseguir para configuracao] (desabilitado ate marcar checkbox)

---

## FASE 3 — CONFIGURACAO SMTP

---

### TELA 10 / 21 — Introducao a configuracao

**ID interno:** `smtp-intro`

**Badge:** Fase 3 — Configuracao

**Titulo:** Hora de configurar!

**Texto:** {NOME}, agora vamos configurar seu Gmail pessoal ({EMAIL_PESSOAL}) para enviar emails como {EMAIL_CORPORATIVO}.

[CARD accent]
[ICONE: 📋] O que voce precisa ter em maos
• Seu celular com o Gmail aberto
• A Senha de Aplicativo (codigo de 16 letras que o administrador enviou para voce)

[CARD info]
[ICONE: ✅] Dados que ja temos
• Email corporativo: {EMAIL_CORPORATIVO}
• Servidor SMTP: smtp.gmail.com
• Porta: 465 (SSL)
• Usuario SMTP: opp@grupooppmais.com.br

[CARD warning]
[ICONE: ⚠️] Nao tem a senha de app?
Se nao recebeu ou perdeu a senha de 16 letras, procure o administrador do TI antes de continuar.

[BOTAO: Voltar] [BOTAO: Iniciar configuracao]

---

### TELA 11 / 21 — Passo 1: Abrir Gmail

**ID interno:** `smtp-1`

**Badge:** Passo 1 de 9

**Numero do passo:** 1

**Acao:** Abra o Gmail

**Detalhe:** No seu celular, abra o aplicativo do Gmail.

Certifique-se de que voce esta logado na sua conta pessoal ({EMAIL_PESSOAL}), nao na corporativa.

**Dica:** [ICONE: 💡] Toque no icone do Gmail no seu celular.

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 12 / 21 — Passo 2: Configuracoes

**ID interno:** `smtp-2`

**Badge:** Passo 2 de 9

**Numero do passo:** 2

**Acao:** Va em Configuracoes

**Detalhe:** Toque no menu (tres linhas ou sua foto no canto) e depois em "Configuracoes".

Em seguida, toque na sua conta pessoal ({EMAIL_PESSOAL}).

**Dica:** [ICONE: 💡] No computador: clique na engrenagem > "Ver todas as configuracoes" > aba "Contas e Importacao".

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 13 / 21 — Passo 3: Adicionar endereco

**ID interno:** `smtp-3`

**Badge:** Passo 3 de 9

**Numero do passo:** 3

**Acao:** Adicionar outro endereco

**Detalhe:** Procure a opcao "Enviar e-mail como" ou "Adicionar outro endereco de e-mail".

Toque nela para abrir o formulario.

**Dica:** [ICONE: 💡] No celular, pode aparecer como "Contas" > "Adicionar conta" > "Outro".

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 14 / 21 — Passo 4: Preencher dados

**ID interno:** `smtp-4`

**Badge:** Passo 4 de 9

**Numero do passo:** 4

**Acao:** Preencha seus dados

**Detalhe:** Na janela que abriu, preencha:

[CARD accent]
Nome
[VALOR COPIAVEL] {NOME_COMPLETO} | Grupo Opp+
Este nome aparecera para quem receber seus emails.

[CARD accent]
Endereco de e-mail
[VALOR COPIAVEL] {EMAIL_CORPORATIVO}

**Dica:** [ICONE: 💡] Toque nos valores verdes para copiar e colar no Gmail.

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 15 / 21 — Passo 5: Desmarcar alias

**ID interno:** `smtp-5`

**Badge:** Passo 5 de 9

**Numero do passo:** 5

**Acao:** Desmarque "Tratar como alias"

**Detalhe:** Muito importante!

Desmarque a caixinha "Tratar como um alias".

Isso garante que o email {EMAIL_CORPORATIVO} funcione de forma independente do seu email pessoal.

**Dica:** [ICONE: 💡] Se essa opcao nao aparecer, nao se preocupe — siga para o proximo passo.

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 16 / 21 — Passo 6: Servidor SMTP

**ID interno:** `smtp-6`

**Badge:** Passo 6 de 9

**Numero do passo:** 6

**Acao:** Configurar servidor SMTP

**Detalhe:** Preencha os dados do servidor exatamente como abaixo:

[CARD accent]
Servidor SMTP
[VALOR COPIAVEL] smtp.gmail.com

[CARD accent]
Porta
[VALOR COPIAVEL] 465

[CARD accent]
Seguranca
Marque "Conexao segura usando SSL"

**Dica:** [ICONE: 💡] Toque nos valores verdes para copiar. Se pedir tipo de seguranca, escolha SSL (nao TLS).

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 17 / 21 — Passo 7: Usuario SMTP

**ID interno:** `smtp-7`

**Badge:** Passo 7 de 9

**Numero do passo:** 7

**Acao:** Nome de usuario SMTP

**Detalhe:** No campo "Nome de usuario", digite:

[VALOR COPIAVEL] opp@grupooppmais.com.br

Atencao: nao e o seu email ({EMAIL_CORPORATIVO}) — e o email da conta principal da empresa, que libera o envio para todos.

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 18 / 21 — Passo 8: Senha de aplicativo

**ID interno:** `smtp-8`

**Badge:** Passo 8 de 9

**Numero do passo:** 8

**Acao:** Senha de aplicativo

**Detalhe:** No campo "Senha", cole a senha de aplicativo de 16 letras que voce recebeu do administrador.

[CARD warning]
[ICONE: ⚠️] Cuidado
• Cole sem espacos (16 letras grudadas)
• Esta senha e diferente da sua senha de login
• Se nao tem ou perdeu, procure o administrador do TI
• Depois de colar, toque em "Adicionar conta"

**Nota de seguranca:** [ICONE: 🔒] A senha de aplicativo e fornecida pessoalmente e nunca aparece neste app por seguranca.

[BOTAO: Voltar] [BOTAO: Ja fiz isso ✓]

---

### TELA 19 / 21 — Passo 9: Confirmar e finalizar

**ID interno:** `smtp-9`

**Badge:** Passo 9 de 9

**Numero do passo:** 9

**Acao:** Confirmar e finalizar

**Detalhe:** Dois ultimos ajustes:

[CARD accent]
1. Confirmar codigo
O Google enviou um email de confirmacao para {EMAIL_PESSOAL}. Abra-o, copie o codigo de confirmacao e cole na janelinha que apareceu.

[CARD accent]
2. Responder pelo mesmo endereco
Em "Contas e Importacao" > "Enviar e-mail como:", marque:
"Responder pelo mesmo endereco para o qual a mensagem foi enviada"

**Dica:** [ICONE: 🎯] Isso garante que quando alguem mandar email para {EMAIL_CORPORATIVO}, voce responda pelo @grupooppmais — nao pelo @gmail.

[BOTAO: Voltar] [BOTAO: Configuracao concluida! 🎉]

---

## FASE 4 — CONCLUSAO

---

### TELA 20 / 21 — Celebracao

**ID interno:** `celebration`

**Badge:** (sem badge)

[ICONE: 🎉 grande + animacao confetti]

**Titulo:** Parabens, {NOME}!

**Texto:** Voce concluiu o onboarding do Grupo Opp+!

Seu email corporativo {EMAIL_CORPORATIVO} esta configurado e pronto para usar.

[BOTAO: Ver meu resumo]

---

### TELA 21 / 21 — Resumo final

**ID interno:** `summary`

**Badge:** Concluido

**Titulo:** Seu resumo, {NOME}

**Texto:** Guarde estas informacoes. Voce pode acessar este app a qualquer momento.

[LOGO: Grupo Opp+ completo (icone + texto)]

**Tabela de dados:**

| Campo             | Valor                |
|-------------------|----------------------|
| Nome completo     | {NOME_COMPLETO}      |
| Funcao            | {FUNCAO}             |
| Email pessoal     | {EMAIL_PESSOAL}      |
| Email corporativo | {EMAIL_CORPORATIVO}  |
| Email de acesso   | {EMAIL_ACESSO}       |
| Termos aceitos    | Sim ✓                |
| Status            | Concluido ✓          |

**Subtitulo:** Links uteis

[LISTA]
- [ICONE: 📁] **Google Drive** — drive.google.com
- [ICONE: 📧] **Google Groups** — groups.google.com
- [ICONE: 💬] **Google Chat** — chat.google.com

[CARD info]
Precisa de ajuda?
Entre em contato com o administrador do sistema.

[BOTAO: Refazer onboarding]

---

## NOTAS PARA REVISAO

**Ortografia:** Todo o conteudo atual esta SEM acentuacao (ex: "voce" em vez de "você", "nao" em vez de "não"). Isso foi feito por seguranca de encoding. Se desejar com acentos, basta escrever normalmente neste documento que farei a conversao.

**Conteudo novo:** Para adicionar uma tela nova, indique a posicao desejada (ex: "entre a tela 05 e 06") e escreva o conteudo seguindo o formato acima.

**Remocao de tela:** Indique "REMOVER ESTA TELA" no titulo.

**Reordenacao:** Indique "MOVER PARA: posicao X" no titulo.

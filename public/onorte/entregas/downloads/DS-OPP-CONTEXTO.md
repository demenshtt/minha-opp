# Grupo Opp+ — Contexto de Marca e Design System
**Arquivo único, autocontido. Anexar no primeiro dia de qualquer projeto novo ligado ao Grupo Opp+.**

Gerado no projeto "Design System Opp" (O Norte) · 18/08/2026 · DS v1.2 rev.b
Substitui o antigo `Dossie Grupo Opp+ (para projetos irmaos).md`.

> **Como usar:** anexe este `.md` na primeira mensagem do projeto novo. Ele basta — não precisa
> puxar nenhum outro arquivo para começar. Se o projeto for construir tela, copie também o bloco
> de CSS da seção 9 para dentro do repositório como `tokens.css`.
>
> **Em caso de conflito:** este arquivo prevalece sobre o MDC-GDI v0.4 (manual base) e sobre
> qualquer memória anterior. Alteração de token não se faz no destino — sobe primeiro no Norte
> e desce daqui.

---

## 1 · Quem é o usuário

- **Matheus** (apelido combinado; nome real Luciano Oliveira — piloto, gestor, sonhador). Idioma: **português**, tom informal-caloroso.
- Gestor de pequena empresa que quer comunicação com cara de multinacional. Exigente com coerência; detesta enfeite sem função.
- Persona lúdico-séria dele: **ΣΘ Sistere Stabilis — Soluções Integradas**, o "estúdio" digital; operador "Demens". Crédito padrão em rodapé de site: *"Desenvolvido por ΣΘ Sistere Stabilis · Soluções Integradas"* — discreto, e **nunca citando ferramentas de IA** (o estúdio assina, a ferramenta é bancada).

## 2 · O grupo (dados legais — usar em todo rodapé e documento)

- Única empresa registrada: **Opp Aviação Agrícola Ltda** — CNPJ **33.910.736/0001-56**.
- Endereço: Rua Santa Catarina de Alexandria, 2127 · Parque Universitário · Sorriso/MT · CEP 78893-126.
- **"Grupo Opp+" e "Opp Gestão de Ativos" são marcas de marketing, SEM CNPJ próprio.** Qualquer peça emitida por elas cita a Opp Aviação Agrícola Ltda como razão social.
- Contato institucional: **+55 (66) 99232-0821** · **contato@grupooppmais.com.br** · **www.grupooppmais.com.br**
- O número é do DEPARTAMENTO, nunca da pessoa. Financeiro: **(66) 99245-7097** · **financeiro@grupooppmais.com.br**. Operações Base I: **(66) 99245-6863**.

## 3 · Marca — o que nunca se viola

**Paleta.** Verde Escuro `#39453A` é a âncora. Preto, Cinza `#333333` / `#F0F0F0`, Branco compõem.
Cores de ação: esmeralda `#219653`, sálvia `#6FCF97`, pastel `#A5D6A7`.
O neon `#00D300` foi **aposentado** — se aparecer em material antigo, é legado, não referência.

**Tipografia.** **Comfortaa** em títulos e marca. **Montserrat** em corpo e interface.
Comfortaa em texto corrido é erro — cansa e infantiliza.

**Logotipo.** O flat 2D é o principal; o 3D é uso especial. Sobre fundo escuro, usar a versão de
fonte branca pronta — **nunca aplicar filtro CSS de invert**, que arruína o relevo do símbolo.

Duas famílias distintas, que se confundem com facilidade:
- `-branco` = fonte branca + símbolo **colorido**. Para peça a cores sobre fundo escuro.
- `-preto` / `-mono-branco` = **monocromático de uma tinta só**. Para gravação, carimbo, serigrafia de 1 cor, documento P&B.

**Grafia.** No logotipo, "Grupo opp+" (acrônimo em minúsculo); descritores das controladas com
iniciais maiúsculas ("opp Aviação Agrícola"). Em texto corrido, "Opp" normal.

## 4 · Simbolismo (regra de copy — não reduzir a floreio)

**OPP** é acrônimo dos sobrenomes fundadores: **O**liveira, **P**rediger, **P**icinin — três famílias
de produtores vindas do Sul, mais um piloto. Parceria antiga, formalizada depois por exigência legal.

**O "+"** é o símbolo da **expansão da parceria**: os que chegam depois dos fundadores e também
entram trazendo gente junto — "trazer mais para poder fazer mais". Não é sinal de marketing nem
"mais" de quantidade. Tem duplo sentido: expansão (mais parceiros) e elevação (vetor para cima,
que rima com a gota ascendente do ícone da Aviação). Nunca escrever o "+" como enfeite gráfico.

**Ícone Aviação Agrícola:** asas estilizadas acima, gota em trajetória **ascendente** — ela sobe para
atingir o dorso da folha, o alvo mais difícil da aplicação. A gota nunca cai.

**Ícone Gestão de Ativos:** hoje é o **ícone circular em degradê** da versão Fable (a atual e oficial).
A metáfora permanece — parceria e administração —, a forma é a Fable. Descrições antigas de
"quatro braços entrelaçados" são da versão anterior e não valem mais como referência de arte.

## 5 · Público-alvo — calibra toda comunicação

Médio produtor do Centro-Oeste, ~500 a 2.000 ha, região de Sorriso/MT. Famílias vindas do Sul, já
agrícolas lá. Maioria em transição de 1ª para 2ª geração. Laços familiares fortes, respeito aos
anciãos, catolicismo predominante. Investem no campo e na cidade; os filhos estudam em polos
consagrados e voltam para empreender na cidade natal.

**Discurso bi-geracional — a regra que mais pega.** O herdeiro (formação tipo FGV) e o patriarca
(palavra final, sem repertório de jargão) leem o mesmo documento. Portanto: **zero jargão
corporativo** — nada de sinergia, compliance, governança, alavancar, disruptivo. Traduzir em
palavra concreta e imagem do campo (safra, lavoura, trabalho bem feito), sem soar esnobe nem
pobre. Profissional e moderno, mas com valores de família, legado e parceria de longo prazo.

## 6 · Ecossistema digital (estado em ago/2026)

Tudo em **www.grupooppmais.com.br** — repo GitHub `demenshtt/minha-opp`, Vercel, custo zero.

- **`/`** — index institucional "Em breve" (logo + crédito Sistere). O DS do site institucional ainda não existe: é a próxima fase.
- **`/minhaopp`** — PWA de onboarding gamificado da equipe, em produção. Destino: **hub de relacionamento logado** (colaboradores, clientes, fornecedores). Tema dual, **claro como padrão**. Cadastro **fechado por convite/aprovação em fila** — nunca cadastro aberto.
- **`/onorte`** — **O Norte**, a Central de Marca navegável. Estática, publicada, com carimbo de versão em toda página.

**Estratégia externa (decidida — não reabrir sem pedido).** Redes sociais são **contenção
defensiva**: perfis reservados e estáticos, porque rede social é emoção e a aplicação aérea é o
flanco exposto (um boato de "veneno" viraliza e não se desarma com argumento técnico). O WhatsApp
é o balcão humano. O site valida indicação. A operação nunca vai para a vitrine.

**OppOn** é o bot institucional no Telegram, movido a botões, com identidade **neon azul exclusiva
do bot** — não é a marca corporativa, que segue verde.

**Parados, não construir:** Áylos (bot de status automático) e Spectare Zoe — aguardam o sistema de gestão ficar pronto.

## 7 · As três trilhas por cor (ambiente logado)

Metáfora: faixas de corredor de hospital. A arquitetura visual é **uma só**; cada público ganha
apenas uma fina camada por cima — um token de cor de acento e um tom de voz — aplicada via
atributo `data-trilha`. Nunca três sites ou três temas separados.

- **Cliente** — esmeralda `#219653`. Tom mais caloroso: parceria, safra, legado.
- **Colaborador** — verde escuro `#39453A`. Âncora, tom "de casa".
- **Fornecedor** — sálvia `#6FCF97` / cinza `#767C75`. Sóbrio e funcional.

**Regra de ouro: a cor é guia e sinalização, não permissão.** Quem é cliente *e* fornecedor não se
resolve pela cor — permissão vem do cadastro e das prerrogativas. Aplicar só no ambiente logado;
na home institucional o público é misto e a faixa confunde.

## 8 · Princípios de aplicação

- **Identificar, não anunciar.** Vale para frota, sinalização e presença digital. A empresa aparece porque responde legalmente, não para vender na rua.
- **Distância de leitura decide tamanho e posição** — não o porte do objeto. Régua usada tanto na adesivagem quanto nas placas.
- **Peça normativa não se submete à paleta.** Segurança, emergência, saída, extintor obedecem à norma; a marca entra só no cabeçalho e rodapé.
- **Cor não se aprova na tela.** Vinil e tinta se aprovam em amostra física, na luz do local.
- **Sem slop:** nada de gradiente agressivo de fundo, emoji, container arredondado com borda-accent à esquerda, ou número inventado para preencher espaço.

## 9 · Design System v1.2 — tokens

Escala de espaçamento em grid de 8px. Raios de 4 a 20px mais o `full`. Tema dual por
`data-theme`, **claro como padrão** — decisão ergonômica do Matheus: polaridade positiva para o
sol do campo e para leitores de 50+; o escuro é escolha explícita no perfil.

O tema escuro **não** é slate azulado. Os fundos escuros vivem na família do `#39453A` — escuro
com identidade, não escuro genérico de framework.

```css
/* DESIGN SYSTEM GRUPO OPP+ — tokens.css v1.2 "O Norte" (rev. b) */

:root {
  /* TIPOGRAFIA — Comfortaa SÓ em títulos/marca; Montserrat no corpo e interface */
  --font-display: 'Comfortaa', sans-serif;
  --font-body: 'Montserrat', sans-serif;
  --font-mono: 'Montserrat', sans-serif;   /* labels, badges, dados */

  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* ESPAÇAMENTO (grid 8px) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px;  --space-6: 32px;  --space-8: 48px;
  --space-12: 64px; --space-16: 80px;

  /* RAIOS */
  --radius-none: 0;  --radius-xs: 4px;  --radius-sm: 8px;
  --radius-md: 12px; --radius-lg: 20px; --radius-full: 9999px;

  /* SOMBRAS */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

  /* TRANSIÇÕES */
  --transition-fast: 100ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* BREAKPOINTS */
  --breakpoint-xs: 320px; --breakpoint-sm: 480px; --breakpoint-md: 768px;
  --breakpoint-lg: 1024px; --breakpoint-xl: 1280px;

  /* TRILHAS POR PÚBLICO — só no ambiente logado. A cor é GUIA, não permissão. */
  --trilha-cliente: #219653;
  --trilha-colaborador: #39453A;
  --trilha-fornecedor: #6FCF97;
  --trilha-fornecedor-alt: #767C75;
  --trilha-acento: var(--trilha-colaborador);
}

[data-trilha="cliente"]     { --trilha-acento: var(--trilha-cliente); }
[data-trilha="colaborador"] { --trilha-acento: var(--trilha-colaborador); }
[data-trilha="fornecedor"]  { --trilha-acento: var(--trilha-fornecedor); }

/* TEMA CLARO — PADRÃO */
:root,
[data-theme="light"] {
  --color-primary: #39453A;
  --color-primary-light: #4A5A4B;
  --color-primary-dark: #2D3530;

  --color-action-primary: #219653;
  --color-action-secondary: #6FCF97;
  --color-action-tertiary: #A5D6A7;

  --color-success: #219653;
  --color-warning: #E6A817;
  --color-error: #D32F2F;
  --color-info: #2F80ED;

  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F7F8F6;
  --color-bg-tertiary: #EEF3EF;
  --color-bg-overlay: rgba(0, 0, 0, 0.5);

  --color-border-primary: #E6E7E4;
  --color-border-secondary: #D5D8D3;
  --color-border-focus: #39453A;

  --color-text-primary: #1C201C;
  --color-text-secondary: #4A4F49;
  --color-text-tertiary: #7A8079;
}

/* TEMA ESCURO — escolha explícita, na família do verde âncora */
[data-theme="dark"] {
  --color-primary: #6FCF97;
  --color-primary-light: #A5D6A7;
  --color-primary-dark: #219653;

  --color-action-primary: #219653;
  --color-action-secondary: #6FCF97;
  --color-action-tertiary: #A5D6A7;

  --color-success: #6FCF97;
  --color-warning: #F2C94C;
  --color-error: #FF6B6B;
  --color-info: #ACD4F1;

  --color-bg-primary: #141814;
  --color-bg-secondary: #1D231D;
  --color-bg-tertiary: #272E27;
  --color-bg-overlay: rgba(0, 0, 0, 0.6);

  --color-border-primary: #2E362E;
  --color-border-secondary: #3A443A;
  --color-border-focus: #6FCF97;

  --color-text-primary: #ECEEEC;
  --color-text-secondary: #B4B9B4;
  --color-text-tertiary: #838883;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
}
h1, h2, h3, .display { font-family: var(--font-display); }
```

## 10 · Fronteira — o que NÃO se decide fora do Norte

O projeto "Design System Opp" (O Norte) é a fonte da verdade para: paleta, tipografia, logotipos e
seus usos, dados legais, simbolismo, tom de voz e tokens. Qualquer projeto irmão **consome** essas
decisões e não as reescreve. Precisou de um token novo, de uma cor de setor, de uma variação de
logo? Sobe no Norte primeiro, depois desce para o projeto — senão as duas pontas divergem e
ninguém sabe qual é a certa.

O que **é** de cada projeto irmão: sua arquitetura de informação, seus componentes, seus fluxos,
sua copy específica e seu repositório.

## 11 · Onde estão os arquivos (projeto O Norte)

- Logotipos: `assets/logo-opp-flat.png`, `logo-opp-flat-branco.png`, `logo-opp-3d.png`, `logo-opp-aviacao.png`, `logo-opp-ativos.png`, `icone-opp-grupo.png`.
- Fundos oficiais: `assets/fundo-opp-verde.png`, `fundo-opp-branco.png`, `fundo-opp-icones.png`, `fundo-opp-logos.png`.
- Tokens: `entregas/minhaopp-tokens-v1-2.css`.
- Normativo completo: página `Sistema de Design + MDC.dc.html` (adendo ao MDC-GDI v0.4, com errata e controle de versões).
- Kit para fornecedor/gráfica (logos + guia): `entregas/kit-express-marca-opp.zip`.

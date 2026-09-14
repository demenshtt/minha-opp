# Norte v2026.09.13-2 — pacote de publicação

Este pacote É o conteúdo de `public/onorte/`. Cada arquivo daqui vai para lá, na mesma
estrutura — nada de subpasta extra, nada de renomear.

## O que mudou nesta versão

Rodada de **desfricção**: tirar o que impedia a equipe de usar os templates.

1. **Três downloads voltaram a funcionar.** O kit express, o contexto do design system e
   o `tokens.css` davam 404 no ar. Causa: moravam em `entregas/`, e só
   `entregas/downloads/` é publicada. Movidos para lá e todos os links reapontados.
2. **O telefone antigo saiu de todas as peças.** O (41) era celular pessoal. Agora o
   contato é do departamento: institucional **(66) 99232-0821** em rodapé, timbrado,
   proposta, guia, vCard, ficha, OppOn e presença digital; o cartão do Gestor Financeiro
   passou à linha do Financeiro, **(66) 99245-7097**.
3. **O PDF parou de sair sujo.** O link "Voltar à Central" e o selo de versão apareciam
   impressos no meio do documento. A regra de impressão foi para dentro do `carimbo.js`,
   que toda página já carrega — resolve em todas de uma vez, sem editar 45 arquivos.
4. **Template de Apresentação ganhou arquivo.** Botão de baixar na própria página, com
   `.pptx` editável de 8 slides gerado da página, notas de uso em cada slide.
5. **O lockup da frota entrou em Logotipos Oficiais.** As seis artes estavam só na página
   de Adesivagem — quem procurava logotipo não achava. Agora estão no catálogo, com
   ponteiro para as regras de aplicação.
6. **A especificação do MERA parou de contradizer a regra de contato.** Ela ainda tratava
   os telefones como pendência em aberto e citava o celular pessoal como "contato
   institucional registrado no Norte". Agora registra a regra fechada: institucional,
   Financeiro e Operações Base I.

## Correções sobre o pacote -1 (que não chegou a ser publicado)

O recorte `-1` tinha dois defeitos, achados na conferência antes do commit:

- **Faltava `ios-frame.jsx`.** A página `Minha Opp+ - Portal (conceito).dc.html` monta as
  nove telas dentro dele. Publicar sem esse arquivo deixaria a página vazia no ar.
- **O telefone pessoal sobrevivia no MERA**, num texto de pendência já vencida.

Os dois estão resolvidos aqui. O `-1` não deve ser publicado.

## Arquivos que precisam subir, senão algo quebra

- **`arquivo-button.js`** — novo na raiz. Sem ele, o botão "Baixar PowerPoint" da página
  `Template de Apresentação.dc.html` simplesmente não aparece.
- **`ios-frame.jsx`** — já existe no ar e **continua necessário**. Faltava por engano no
  recorte `-1`; está aqui. Não remover.

## Conferência antes de subir

- `carimbo.js` → `VERSAO = '2026.09.13-2'`
- `versao.json` → `"versao": "2026.09.13-2"`
- os dois números são iguais. Se divergirem, toda página do site diz "desatualizada".

## Depois de subir

Abrir **grupooppmais.com.br/onorte no celular** (não no computador que publicou) e
conferir se o rodapé diz `Norte v2026.09.13-2` · **em dia**. Se disser "desatualizada",
o `versao.json` não subiu junto. Se disser "sem índice", subiu no lugar errado.

## O que este pacote NÃO leva (de propósito)

| Fora | Por quê |
|---|---|
| `releases/` | acervo de entregas; publicar faria cada entrega carregar todas as anteriores |
| `assets/_arquivo/` | logos substituídos, guardados só para histórico |
| `assets/lockup-aviacao-grupo.jpg` | substituído pelo PNG transparente |
| `o-norte.dc.html` e `o-norte-print.dc.html` | nomes antigos da apresentação, duplicados de `O Norte - Apresentação` |
| `uploads/`, `scraps/`, `screenshots/` | material de trabalho, não é conteúdo |
| `entregas/` (exceto `downloads/`) | kits, handoffs e cópias offline — entrega avulsa, não é site |

## Inventário

- **55 páginas** (`.dc.html` e as cópias `-print`)
- **apoio:** `support.js` · `carimbo.js` · `busca-indice.js` · `deck-stage.js` ·
  `doc-page.js` · `image-slot.js` · `print-button.js` · `word-button.js` ·
  **`arquivo-button.js`** · `ios-frame.jsx` · `fontes.css` · `index.html` · `versao.json`
- **`assets/`** — logotipos, lockups, avatares, fotos de base, fundos, favicons e
  `assets/fontes/`
- **`entregas/downloads/`** — os modelos `.docx`, o `.pptx` novo do template, as artes de
  cartão, o kit express e os dois arquivos do design system

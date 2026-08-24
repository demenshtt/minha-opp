# Norte v2026.08.23-2 — pacote de publicação

Entrega de **23/08/2026, 04:05 (hora de Cuiabá)**.
Este pacote É o conteúdo de `public/onorte/`. Cada arquivo daqui vai para lá, na mesma
estrutura — nada de subpasta extra, nada de renomear.

## O que mudou nesta versão

1. **Fontes da Marca entrou na busca do hub.** A página existia desde a v-1 mas não
   era encontrável: quem digitasse "fonte", "instalar" ou "montserrat" não achava nada.
   Agora acha a página e os dois kits `.zip` direto no resultado.
2. **A apresentação O Norte ganhou o carimbo de versão**, que faltava — era a única
   página do índice sem selo. Ele aparece no rodapé do slide de encerramento.
3. **Índice completo.** `Ficha Cadastral da Empresa` e `Minha Opp+ · Laudo de Revisão`
   estavam no ar sem constar no `versao.json`, então nunca conseguiam dizer se estavam
   em dia. Agora constam.

Da versão anterior (v2026.08.23-1), que este pacote também carrega: as duas famílias
tipográficas servidas pelo próprio site (nenhuma página depende mais do Google), o
botão de copiar mensagem no Contato Digital e as regras fechadas do Cartão de Visita.

## Conferência antes de subir

- `carimbo.js` → `VERSAO = '2026.08.23-2'`
- `versao.json` → `"versao": "2026.08.23-2"`
- os dois números são iguais. Se divergirem, toda página do site diz "desatualizada".

## Depois de subir

Abrir **grupooppmais.com.br/onorte no celular** (não no computador que publicou) e
conferir se o rodapé diz `Norte v2026.08.23-2` · **em dia**. Se disser "desatualizada",
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

- **53 páginas** (`.dc.html` e as cópias `-print`)
- **apoio:** `support.js` · `carimbo.js` · `busca-indice.js` · `deck-stage.js` ·
  `doc-page.js` · `image-slot.js` · `print-button.js` · `word-button.js` ·
  `ios-frame.jsx` · `fontes.css` · `index.html` · `versao.json`
- **`assets/`** — logotipos, avatares, fotos de base, fundos, favicons e
  `assets/fontes/` (as duas variáveis usadas pelo site + os dois kits de download)
- **`entregas/downloads/`** — os modelos `.docx`, o `.pptx` e as artes de cartão que
  os botões de baixar das páginas apontam

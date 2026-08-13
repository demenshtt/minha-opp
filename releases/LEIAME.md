# releases/ — acervo de entregas do Norte

Toda publicação fica arquivada aqui, uma por arquivo, sem sobrescrever a anterior.

## Nome do arquivo

    onorte_v<AAAA.MM.DD-n>_<AAAAMMDD-HHMM>.zip

- **v\<AAAA.MM.DD-n\>** — a versão do carimbo, idêntica à de `carimbo.js` e `versao.json`.
- **\<AAAAMMDD-HHMM\>** — carimbo de tempo da entrega, hora de Cuiabá.

Exemplo: `onorte_v2026.08.12-11_20260812-1840.zip`

A versão diz *o que* é; o carimbo de tempo diz *quando* saiu. Duas entregas da mesma
versão (recorte refeito, correção de empacotamento) se distinguem pela hora.

## Regras

1. **Não publicar esta pasta.** `releases/` fica no repositório e no espelho do Drive;
   nunca entra em `public/onorte/`. Publicar o acervo dentro do site faria cada
   entrega carregar todas as anteriores.
2. **Não sobrescrever.** Entrega arquivada não se corrige — se saiu errada, sobe
   uma nova com carimbo de tempo novo.
3. **Uma entrega por publicação.** Se o pacote não foi publicado, não vira release.
4. **O zip é o recorte curado**, não a pasta de trabalho: sem `uploads/`,
   `scraps/` (exceto o que alguma página referencia), `_arquivo/` e sobras de
   impressão órfãs.

## Espelho no Drive

Mesma pasta, mesmos nomes. O Drive é cópia de segurança do acervo — a fonte é o
repositório.

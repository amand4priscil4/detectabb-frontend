# Instruções para Gerar Ícones do PWA

Para que o PWA funcione corretamente, você precisa gerar os ícones PNG nos tamanhos especificados.

## Opções para gerar os ícones:

### Opção 1: Usar a logo existente do Banco do Brasil
Você pode usar a logo existente `public/logo_banco_do_brasil.jpg` e converter para PNG nos seguintes tamanhos:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

### Opção 2: Usar ferramentas online
Use um gerador de ícones PWA online como:
- https://www.pwabuilder.com/imageGenerator
- https://maskable.app/editor
- https://realfavicongenerator.net/

Faça upload da logo do Banco do Brasil e baixe todos os tamanhos gerados.

### Opção 3: Usar o ícone SVG criado
Um arquivo SVG base foi criado em `public/icons/icon.svg`. Você pode:
1. Abrir no Figma, Adobe Illustrator ou Inkscape
2. Personalizar com a identidade visual do DetectaBB
3. Exportar nos tamanhos necessários

### Opção 4: Usar comandos (requer ImageMagick instalado)
```bash
# Instalar ImageMagick primeiro
# https://imagemagick.org/script/download.php

# Converter logo existente
convert public/logo_banco_do_brasil.jpg -resize 72x72 public/icons/icon-72x72.png
convert public/logo_banco_do_brasil.jpg -resize 96x96 public/icons/icon-96x96.png
convert public/logo_banco_do_brasil.jpg -resize 128x128 public/icons/icon-128x128.png
convert public/logo_banco_do_brasil.jpg -resize 144x144 public/icons/icon-144x144.png
convert public/logo_banco_do_brasil.jpg -resize 152x152 public/icons/icon-152x152.png
convert public/logo_banco_do_brasil.jpg -resize 192x192 public/icons/icon-192x192.png
convert public/logo_banco_do_brasil.jpg -resize 384x384 public/icons/icon-384x384.png
convert public/logo_banco_do_brasil.jpg -resize 512x512 public/icons/icon-512x512.png
```

## Após gerar os ícones:
Coloque todos os arquivos PNG na pasta `public/icons/` com os nomes:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

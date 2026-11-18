# Portfólio — Breno Carvalho

Portfólio profissional estático desenvolvido com HTML5, Tailwind CSS, CSS3 e JavaScript puro.

## Executar localmente

Requisitos: Node.js 18+ e npm.

```bash
npm ci
npm run build
npx serve dist
```

Depois, abra o endereço informado pelo servidor local. O comando `npm run build` recompila o Tailwind e cria a pasta `dist/` com somente os arquivos necessários para publicação.

Para desenvolvimento com recompilação automática do Tailwind:

```bash
npm run dev
```

O projeto não possui backend. O formulário valida os dados e abre o aplicativo de e-mail padrão usando `mailto:`; ele não simula um envio bem-sucedido.

## Estrutura

- `index.html`: marcação semântica e conteúdo do portfólio.
- `assets/computador-768.webp` e `assets/computador-1536.webp`: versões responsivas da ilustração usada no hero.
- `assets/fonts/inter-latin-variable.woff2`: fonte Inter local em formato variável.
- `src/input.css`: fonte Tailwind e estilos customizados.
- `src/style.css`: CSS compilado para uso no navegador.
- `src/script.js`: tema, menu, navegação, animações e formulário.

O tema escuro pode ser alternado no cabeçalho e a preferência fica salva no `localStorage`. Na primeira visita, o site respeita a preferência de tema do sistema operacional.

## Publicar com Caddy

O Caddy deve servir a pasta `dist/` como raiz do site estático. Exemplo de bloco para a configuração do servidor:

```caddyfile
brenocarvalhodev.io {
    root * /var/www/breno-carvalho/dist
    file_server
}
```

A configuração existente da VPS não é alterada por este projeto. Após executar o build localmente, copie somente o conteúdo de `dist/` para o diretório publicado configurado no Caddy:

```bash
rsync -av dist/ usuario@servidor:/var/www/breno-carvalho/dist/
```

Não publique `node_modules`, `package-lock.json`, `package.json`, `tailwind.config.js`, `src/input.css` ou outros arquivos de desenvolvimento.

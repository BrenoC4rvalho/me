# Portfólio — Breno Carvalho

Portfólio profissional estático desenvolvido com HTML5, Tailwind CSS, CSS3 e JavaScript puro.

## Executar localmente

Requisitos: Node.js 18+ e npm.

```bash
npm install
npm run build
npx serve .
```

Depois, abra o endereço informado pelo servidor local. Para desenvolvimento com recompilação automática do Tailwind:

```bash
npm run dev
```

O projeto não possui backend. O formulário valida os dados e abre o aplicativo de e-mail padrão usando `mailto:`; ele não simula um envio bem-sucedido.

## Estrutura

- `index.html`: marcação semântica e conteúdo do portfólio.
- `assets/computador.png`: ilustração usada no hero.
- `src/input.css`: fonte Tailwind e estilos customizados.
- `src/style.css`: CSS compilado para uso no navegador.
- `src/script.js`: tema, menu, navegação, animações e formulário.
- `portifolio.png`: referência visual original.

O tema escuro pode ser alternado no cabeçalho e a preferência fica salva no `localStorage`. Na primeira visita, o site respeita a preferência de tema do sistema operacional.

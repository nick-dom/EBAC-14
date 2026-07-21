# Nexus Verse

Projeto feito para o módulo 17 da EBAC. É um catálogo de jogos indie fictício, construído em React com Vite.

A proposta do exercício era praticar componentes reutilizáveis, props, state, formulário controlado e useEffect. Resolvi ir um pouco além do pedido e montar um catálogo mais completo, com navegação entre páginas e um visual mais trabalhado (tema meio cyberpunk/arcade), mas a base é toda a que foi pedida no exercício.

Todos os jogos e estúdios do catálogo são inventados — não existem de verdade. As imagens de capa são fotos reais do Unsplash, usadas só como referência visual.

## O que tem no projeto

- Lista de jogos carregada com useState + useEffect, simulando uma chamada de API com setTimeout (aparece "carregando..." enquanto isso)
- Formulário para cadastrar um jogo novo no catálogo — nome, preço e descrição são obrigatórios, os outros campos são opcionais
- Busca por nome e filtro por gênero
- Três páginas (Início, Catálogo, Sobre) navegando com React Router, mais uma página de erro 404
- Componente de card de jogo reutilizável, que recebe nome, preço, imagem e descrição via props

## Estrutura

```
nexus-verse/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── SectionHeading.jsx
    │   ├── GameCard.jsx       -> o "ProdutoCard" do exercício
    │   ├── GameGrid.jsx       -> renderiza os cards com .map()
    │   ├── GameForm.jsx       -> o "ProdutoForm" do exercício
    │   ├── Loading.jsx
    │   └── ScrollToTop.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Catalogo.jsx       -> página principal, onde fica a lógica de state/useEffect
    │   ├── Sobre.jsx
    │   └── NaoEncontrado.jsx
    └── data/
        └── jogos.js            -> dados mockados usados na simulação de API
```

## Como rodar

Precisa ter o Node instalado (18 ou mais recente).

```bash
git clone https://github.com/nick-dom/EBAC-14.git
cd EBAC-14
npm install
npm run dev
```

Depois é só abrir o local host.

Outros comandos úteis:

```bash
npm run build     # gera a versão de produção
npm run preview   # serve a build de produção
```

## Tecnologias usadas

React 19, Vite, React Router e Tailwind CSS v4 (integrado direto no build do Vite, não via CDN). Ícones com a lib lucide-react.

---

All rights reserved with huskyn

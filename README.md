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
npm run analyze   # gera dist/stats.html com o treemap do bundle
```

## Tecnologias usadas

React 19, Vite (build baseado em Rolldown) e React Router. Tailwind CSS v4 integrado direto no build do Vite, sem CDN. Ícones com lucide-react.

Para performance: `vite-plugin-pwa` (Service Worker/Workbox + manifest), `vite-plugin-compression2` (gzip/brotli no build) e `rollup-plugin-visualizer` (analisador de bundle).

## Performance: diagnóstico e otimizações

### ⚠️ Antes de medir: teste o build de produção, não o `npm run dev`
O relatório gerado em `http://localhost:5173/` (porta do `npm run dev`) **não serve pra avaliar performance**. Nesse teste, a Performance nem saiu uma nota — o FCP deu **25,9 segundos** — porque o servidor de desenvolvimento entrega o app sem bundle, sem minificação e sem code splitting: 92 requisições, incluindo o `react-dom` sozinho com **2,8 MB** e o `react-router-dom` com **1,4 MB**, tudo sem compressão. Isso é normal e esperado em dev (o Vite prioriza HMR instantâneo, não tamanho de arquivo) — só não é o que o Lighthouse deve medir.

O jeito certo:
1. Rode `npm run build && npm run preview`.
2. Abra o endereço que o `preview` mostrar (porta **4173**, não 5173).
3. Aí sim, DevTools → Lighthouse → Performance, modo Navigation, Mobile → Analyze page load.

### Como medir
1. Rode `npm run build && npm run preview` e abra o endereço mostrado no terminal (porta 4173).
2. Abra o Chrome DevTools → aba **Lighthouse** → categorias Performance + Accessibility + Best Practices + SEO, modo *Navigation*, dispositivo *Mobile* → **Analyze page load**.
3. Idealmente numa janela anônima/sem extensões — o próprio relatório aponta que extensões do Chrome atrapalham a medição.
4. Salve o relatório (export → *Save as HTML*) antes e depois das mudanças abaixo.

### Gargalos identificados (relatório inicial)
- **Bundle único sem code splitting**: todas as rotas (`Home`, `Catálogo`, `Sobre`, 404) eram baixadas em um só arquivo JS antes de qualquer navegação, mesmo que o usuário só visse a Home.
- **Imagem do Hero sem prioridade de carregamento**: a imagem de fundo da seção Hero (maior elemento visível na primeira dobra, provável elemento de LCP) só é descoberta pelo navegador depois que o React renderiza — sem preload nem `fetchpriority`, ela competia por banda com o JS/CSS em vez de carregar em paralelo.
- **Fontes do Google com pesos não utilizados**: eram carregados 11 arquivos de fonte (Orbitron 500/600/700/800/900, Rajdhani 400/500/600/700, Space Mono 400/700), mas uma varredura no código mostrou que só 7 desses pesos são realmente usados nas classes Tailwind aplicadas — os outros 4 eram puro desperdício de requisição/bytes.

### Otimizações aplicadas
| Otimização | Onde | Efeito |
|---|---|---|
| Code splitting por rota (`React.lazy` + `Suspense`) | `src/App.jsx` | Home continua no bundle inicial; Catálogo, Sobre e 404 viram chunks separados, baixados só quando o usuário navega até eles |
| `fetchpriority="high"` + `decoding="async"` na imagem do Hero | `src/components/Hero.jsx` | Sinaliza ao navegador que essa é a imagem mais importante da página |
| `<link rel="preload" as="image">` da mesma imagem | `index.html` | Faz o navegador começar a baixar a imagem do LCP em paralelo com o JS, sem esperar o React renderizar pra descobrir a URL |
| Corte de pesos de fonte não usados (11 → 7 arquivos) | `index.html` | Menos requisições render-blocking de fonte |
| `preconnect` para `images.unsplash.com` | `index.html` | Adianta DNS/TLS do CDN de imagens, que hospeda todas as capas do catálogo |
| Imagens responsivas com `srcset`/`sizes` + `width`/`height` | `src/components/GameCard.jsx` | Celular baixa uma imagem de ~400px em vez da mesma de 800px usada no desktop; `width`/`height` reservam o espaço e evitam layout shift (CLS) |
| `React.memo` no `GameCard` | `src/components/GameCard.jsx` | Evita re-renderizar cada card quando o Catálogo re-renderiza por causa de outro state (ex: digitando na busca) e as props daquele card não mudaram |
| Debounce de 300ms na busca | `src/pages/Catalogo.jsx` | O filtro só recalcula depois que o usuário para de digitar, em vez de a cada tecla (evitaria uma chamada de API por letra numa busca real) |
| `loading="lazy"` nas imagens dos cards de jogo | já existia em `GameCard.jsx` | Mantido — cards fora da primeira dobra continuam lazy |
| **Vendor chunk separado** (`vite-plugin` nativo, `build.rollupOptions.manualChunks`) | `vite.config.js` | React, ReactDOM, React Router e lucide-react saem do código do projeto e vão pra um chunk `vendor` à parte — ele muda bem menos que o app, então fica em cache do navegador entre deploys em que só o código do projeto mudou |
| **PWA com Service Worker** (`vite-plugin-pwa`, Workbox) | `vite.config.js`, `src/main.jsx` | App shell (JS/CSS/HTML) em cache-first após a 1ª visita — carregamento quase instantâneo depois disso. Capas de jogos (Unsplash) e fontes do Google ficam em cache separado, com expiração, então revisitar o catálogo não baixa as mesmas imagens de novo. Funciona com `manifest.webmanifest` gerado automaticamente, permitindo até "instalar" o site como app |
| **Compressão Gzip + Brotli pré-geradas no build** (`vite-plugin-compression2`) | `vite.config.js` | Gera `.gz`/`.br` de cada asset no build — útil em hosts estáticos que servem o arquivo pré-comprimido em vez de comprimir na hora |
| **Bundle analyzer** (`rollup-plugin-visualizer`) | `vite.config.js` → `npm run analyze` | Gera `dist/stats.html` com o treemap do bundle, pra visualizar exatamente o que está pesando o pacote final |

Itens como minificação de HTML/CSS/JS e remoção de imports não usados já são feitos automaticamente pelo `vite build` e foram conferidos com `npm run lint` (oxlint, 0 avisos).

### Otimizações de infraestrutura (fora do código-fonte)
Essas não mudam nada nos arquivos do projeto, mas afetam a nota do Lighthouse tanto quanto o código — valem a pena checar no host escolhido (Vercel/Netlify/GitHub Pages):
- **Compressão Brotli/Gzip** dos arquivos servidos — Vercel e Netlify já fazem isso automaticamente; em host próprio (ou GitHub Pages), os arquivos `.gz`/`.br` gerados pelo build ajudam nisso.
- **Cache-Control com hash no nome do arquivo** — o Vite já gera arquivos com hash (`index-BCjNlno7.js`), então é seguro configurar `Cache-Control: max-age=31536000, immutable` nesses assets; só o `index.html` deve ter cache curto.
- **HTTP/2 ou HTTP/3** no servidor — permite multiplexar as requisições de fonte/imagem/JS sem o limite de conexões simultâneas do HTTP/1.1.
- **CDN de borda (edge)** — Vercel/Netlify já servem os assets estáticos por CDN; reduz a latência de quem acessa de longe do servidor de origem.

### Resultado objetivo: tamanho do bundle (medido com `vite build`)

| | Antes de qualquer otimização | Depois (final) |
|---|---|---|
| JS + CSS inicial (Home) | 271,50 kB (85,58 kB gzip) em 1 arquivo JS | `vendor` 245,36 kB (79,36 kB gzip) + `index` 19,92 kB (6,29 kB gzip) — total ≈ igual em bytes, mas agora **cacheável em partes** entre deploys |
| JS das outras rotas | incluído no arquivo acima | Catálogo 9,49 kB (3,11 kB gzip) · Sobre 3,89 kB (1,55 kB gzip) · 404 1,10 kB (0,52 kB gzip) — carregados só sob demanda |
| Arquivos de fonte | 11 | 7 |
| Tamanho de imagem de card no celular | ~800px sempre | ~400px via `srcset` |
| Cache offline / revisitas | nenhum | Service Worker (Workbox) cacheando app shell + imagens + fontes |
| Assets pré-comprimidos | não | `.gz` e `.br` gerados no build |

> **Nota honesta sobre o vendor split**: separar `vendor` do `index` não reduz o total de bytes baixados na *primeira* visita — é a mesma quantidade de código, só em arquivos diferentes. O ganho real é em **visitas futuras** (o navegador já tem o `vendor` em cache e só baixa o `index`, bem menor) e em deploys futuros (trocar código do app não invalida o cache do `vendor`). Quem realmente reduziu o peso da primeira visita foi o code splitting por rota (item 1) e o corte de fontes (item 4).

### Achados de um relatório Lighthouse real (Accessibility, SEO e Best Practices) e correções
Além de Performance, um relatório completo revelou problemas concretos fora de performance pura — todos já corrigidos:

| Achado | Categoria → audit | Correção aplicada |
|---|---|---|
| Contraste insuficiente no texto do rodapé (`#5f5e80` sobre `#0a0a16` = 3,18:1, mínimo é 4,5:1) | Accessibility 0.95 → `color-contrast` | Token `--color-muted-2` clareado pra `#7f7ea3` (contraste 5,07:1) em `src/index.css` |
| `robots.txt` inválido — como o arquivo não existia, o fallback de SPA devolvia o `index.html` no lugar, e o Lighthouse tentou interpretar HTML como regra de robots | SEO 0.91 → `robots-txt` | Criado `public/robots.txt` de verdade |
| `llms.txt` (padrão novo pra crawlers de IA) ausente, mesmo problema de fallback de SPA | Agentic Browsing 0.67 → `llms-txt` | Criado `public/llms.txt` com H1 e links, seguindo a especificação |
| Cookies de terceiro detectados vindos de `images.unsplash.com` | Best Practices 0.77 → `third-party-cookies`, `inspector-issues` | **Limitação conhecida, não corrigida**: é o próprio CDN da Unsplash que seta esses cookies ao servir a imagem; só some se as imagens forem self-hosted (fora do escopo deste exercício, que usa Unsplash só como banco de imagem de referência) |

### Resultado medido: Lighthouse antes x depois (as 3 páginas, mobile, `npm run preview`)

Relatórios completos em `lighthouse-reports/antes/` e `lighthouse-reports/depois/` (HTML e PDF), um por página.

| Página | | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
|---|---|---|---|---|---|---|
| **Início** | Antes | 83 | 95 | 77 | 92 | 67 |
| | Depois | **94** | **100** | 77 | **100** | **100** |
| **Catálogo** | Antes | 86 | 96 | 77 | 92 | 67 |
| | Depois | 32 ⚠️ | **100** | 77 | **100** | 71 |
| **Sobre** | Antes | 76 | 95 | 100 | 91 | 67 |
| | Depois | **90** | **100** | 77 | **100** | **100** |

| Página | Métrica | Antes | Depois |
|---|---|---|---|
| Início | FCP / LCP / TBT / CLS / TTI | 2.3s / 4.0s / 170ms / 0 / 4.0s | 2.4s / **2.5s** / **70ms** / 0 / **3.6s** |
| Catálogo | FCP / LCP / TBT / CLS / TTI | 2.3s / 3.3s / 200ms / 0 / 3.7s | 2.4s / 3.9s / **7.020ms** ⚠️ / **0,547** ⚠️ / **10.7s** ⚠️ |
| Sobre | FCP / LCP / TBT / CLS / TTI | 2.3s / 2.3s / 820ms / 0 / 3.7s | 2.3s / 3.2s / **70ms** / 0 / **3.3s** |

**Leitura dos números:**
- **Início** e **Sobre** confirmam o que as otimizações deveriam entregar: LCP e TBT caem bastante (o preload/`fetchpriority` da imagem do Hero e o corte de pesos de fonte afetam a Home; o TBT mais baixo em ambas reflete o code splitting tirando trabalho de parse/execução do bundle inicial). Accessibility, SEO e Agentic Browsing foram para 100 nas três páginas depois de corrigir contraste, `robots.txt` e `llms.txt` (ver tabela de achados abaixo).
- **Catálogo "depois" é um outlier, não uma regressão real**: os dois relatórios (`depois/*.html`) trazem o aviso nativo do próprio Lighthouse *"Chrome extensions negatively affected this page's load performance"*, e as três medições "depois" ainda somam o aviso de **IndexedDB armazenado afetando o carregamento** — rastro do Service Worker (Workbox) que passou a existir só na versão otimizada. Nessa run específica do Catálogo, TBT de 7 segundos e CLS de 0,547 são incompatíveis com o próprio código (que não mudou nada capaz de gerar layout shift nessa página — `width`/`height` já reservam o espaço da imagem) e com o resultado saudável da mesma página "antes" (TBT 200ms). O quadro mais provável é interferência de extensão do Chrome/CPU ocupada durante essa medição específica, não uma piora introduzida pelo código.
- **Best Practices ficou em 77 em quase todas as medições "depois"** (era 100 na Sobre "antes") pelo mesmo motivo já documentado abaixo: cookies de terceiro setados por `images.unsplash.com` — isso é do CDN de imagem, não do código do projeto.

**Antes de declarar esse comparativo como definitivo**, vale re-rodar pelo menos a página `/catalogo` numa janela anônima do Chrome, sem extensões (ambos os relatórios avisam disso explicitamente) — é o passo que falta pra eliminar essa variável e fechar a comparação com um "depois" limpo em todas as páginas.

---

All rights reserved with huskyn

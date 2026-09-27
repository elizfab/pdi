<h1 align="left">
  <a href="https://elizabetesousafabri.com.br" target="_blank">
    <img src="" width="40" />
  </a>
  <span>Carteira de Saúde e Vacinação</span>
</h1>

# Roadmap — PDI

> Roadmap do projeto `pdi`.
> Serve como manual de consulta e fonte de dados para o portfólio.
>
> - Data de início: `01/01/2026`
> - Última atualização: `26/09/2026`
> - Status: `[x] Em andamento | [ ] Finalizado | [ ] Arquivado`

---

## 1. Identidade do projeto

| Campo             | Valor                                       |
| ----------------- | ------------------------------------------- |
| `slug`            | `pdi`                                       |
| Título            | `PDI — Plano de Desenvolvimento Individual` |
| Categoria         | `Frontend`                                  |
| Tipo              | `Pessoal`                                   |
| Escopo            | `Frontend`                                  |
| Domínio principal | `https://pdi.elizabetesousafabri.com.br`    |

- **Descrição curta:** Aplicação web para apresentação pública do Plano de Desenvolvimento Individual, com identidade visual independente, navegação por abas e suporte a tema claro/escuro.
- **Propósito / por quê foi criado:** Centralizar e comunicar de forma elegante a trajetória profissional, objetivos, metas, conquistas, plano de ação e estudos em uma página pública de fácil acesso.
- **O que resolve:** Elimina a dispersão das informações de carreira e entrega um cartão de visitas profissional interativo e atualizável.

---

## 2. Introdução

O PDI é um app frontend em Angular 21, standalone, zoneless e com signals. A página exibe as seções Hero, Sobre, Trajetória, Jornada Comparativa, Metas, Plano de Ação, Evolução, Entregas, Conquistas, Família, Sonhos e Links, organizadas em abas (`PdiTabs`). O layout possui header, footer, scroll progress, back-to-top e modal de detalhes, além de troca dinâmica de logo e carregamento lazy do CSS próprio. Não há backend — os dados vivem em `pdi-data.ts` e são servidos por `PdiService`.

---

## 3. Índice

1. [Identidade do projeto](#1-identidade-do-projeto)
2. [Introdução](#2-introdução)
3. [Habilidades e pré-requisitos](#4-habilidades-e-pré-requisitos)
4. [Stack técnica e tópicos de estudo](#5-stack-técnica-e-tópicos-de-estudo)
5. [Como executar](#6-como-executar)
6. [Estrutura de repositório](#7-estrutura-de-repositório)
7. [Deploy e configurações](#8-deploy-e-configurações)
8. [Screenshots e ativos visuais](#9-screenshots-e-ativos-visuais)
9. [Dados do portfólio](#10-dados-do-portfólio)
10. [Checklist de finalização](#11-checklist-de-finalização)
11. [Links e referências](#12-links-e-referências)
12. [Notas de evolução](#13-notas-de-evolução)

---

## 4. Habilidades e pré-requisitos

### Conhecimentos esperados

- Angular 21 standalone, signals, change detection `OnPush` e zoneless.
- TypeScript 5.9, SCSS e design tokens.
- Acessibilidade (foco visível, `aria-*`, `prefers-reduced-motion`).
- IntersectionObserver para animações de scroll.
- Jest para testes unitários com `jest-preset-angular` v17.

### Ferramentas / versões

- Node.js 22
- Angular CLI 21.2.9
- npm 10.9.7
- Jest 30
- Chrome/Chromium instalado (para screenshots com Puppeteer)

---

## 5. Stack técnica e tópicos de estudo

### Tecnologias

| Tecnologia       | Uso / papel no projeto                        |
| ---------------- | --------------------------------------------- |
| `Angular 21`     | Framework principal do frontend               |
| `TypeScript 5.9` | Linguagem do frontend                         |
| `SCSS`           | Estilização com tokens de design e CSS escopo |
| `Jest`           | Testes unitários do frontend                  |
| `Puppeteer`      | Screenshots das telas                         |

### Tópicos de estudo / aprofundamento

- App embutido com layout próprio e CSS carregado sob demanda (`inject: false`).
- Subdomínio próprio com redirecionamento canônico e guard Angular.
- Tema claro/escuro via `data-theme` e `localStorage`.
- Scroll progress, back-to-top e navegação por abas acessíveis.
- Modal de detalhes com Escape para fechar.

---

## 6. Como executar

### Desenvolvimento local

```bash
# Frontend
cd frontend
npm install
npm run start:dev   # http://localhost:6014
```

### Acesso após subir

| Serviço | URL local               |
| ------- | ----------------------- |
| Web     | `http://localhost:6014` |

### Variáveis de ambiente relevantes

- Não há variáveis de ambiente sensíveis. Os dados estão em `src/app/pdi/pdi-data.ts` (não commite segredos, mesmo que não haja).

---

## 7. Estrutura de repositório

```txt
pdi/
├── .gitignore
├── README.md
├── angular.json
├── package.json
├── .prettierrc
├── .editorconfig
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── pdi.ts
│   │   ├── pdi.html
│   │   ├── pdi.scss
│   │   ├── pdi-types.ts
│   │   ├── pdi-data.ts
│   │   ├── pdi.service.ts
│   │   ├── pdi.spec.ts
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── header/
│   │       │   ├── footer/
│   │       │   ├── scroll-progress/
│   │       │   ├── scroll-nav/
│   │       │   └── back-to-top/
│   │       ├── sections/
│   │       │   ├── hero/
│   │       │   ├── sobre/
│   │       │   ├── trajetoria/
│   │       │   ├── jornada-comparativa/
│   │       │   ├── metas/
│   │       │   ├── plano-acao/
│   │       │   ├── evolucao/
│   │       │   ├── entregas/
│   │       │   ├── conquistas/
│   │       │   ├── familia/
│   │       │   ├── sonhos/
│   │       │   ├── inicio/
│   │       │   ├── links/
│   │       │   └── tabs/
│   │       └── shared/
│   │           ├── modal/
│   │           ├── chart-bars/
│   │           └── filter-bar/
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   ├── setup-jest.ts
│   └── styles.scss
├── docs/
│   └── screenshots/
├── scripts/
│   └── screenshots.mjs
└── jest.config.ts
```

---

## 8. Deploy e configurações

### Provedor / plataforma

- **Frontend:** Hostinger (subdomínio `pdi.elizabetesousafabri.com.br`) / Vercel
- **Backend:** Não há backend.
- **Banco:** Não há banco.

### Domínios e URLs

| Ambiente | URL                                              |
| -------- | ------------------------------------------------ |
| Produção | `https://pdi.elizabetesousafabri.com.br`         |
| Repo     | `https://github.com/elizabetefabri/pdi-frontend` |

### Credenciais de acesso (ambiente de teste/dev)

- Não aplicável.

### Portas planejadas

| Serviço  | Porta local | Observação                       |
| -------- | ----------- | -------------------------------- |
| Frontend | `6014`      | Porta definida em `package.json` |

---

## 9. Screenshots e ativos visuais

Os prints são gerados pelo `frontend/scripts/screenshots.mjs`. O app possui uma rota pública (`/`) que exibe todo o conteúdo do PDI.

### Rotas a capturar

```js
const ROUTES = [{ path: '/', name: '01-home' }];
```

### Estrutura de páginas / imagens

| Ordem | Rota | Nome do arquivo | Descrição da tela      | Destino no portfólio               |
| ----- | ---- | --------------- | ---------------------- | ---------------------------------- |
| 1     | `/`  | `01-home.png`   | Página completa do PDI | `/images/projects/pdi/01-home.png` |

### Comandos

```bash
cd frontend
npm run screenshots

# Usa um servidor já rodando
SHOTS_BASE_URL=http://localhost:6014 npm run screenshots

# Captura também variante escura (tema padrão é claro)
SHOTS_DARK=1 npm run screenshots

# Define caminho alternativo do Chrome
CHROME_PATH=/caminho/do/chrome npm run screenshots
```

### Diretórios de saída

| Origem           | Destino dos screenshots                                  | Finalidade                               |
| ---------------- | -------------------------------------------------------- | ---------------------------------------- |
| Projeto          | `frontend/docs/screenshots/`                             | Documentação do próprio projeto e README |
| README do GitHub | `.github/assets/images/projects-personal/pdi/`           | Ativos do README do repositório          |
| Portfólio        | `portfolio-angular-frontend/public/images/projects/pdi/` | Exibição no portfólio Angular            |

### Logo / capa

- Logo do app: `frontend/public/logo.png`
- Capa do portfólio: `portfolio-angular-frontend/public/images/projects/pdi/logo.png`

### Fluxo de publicação dos ativos

1. Após finalizar as telas, execute `npm run screenshots`.
2. Valide os arquivos em `frontend/docs/screenshots/`.
3. Copie os arquivos selecionados para o README do GitHub do projeto: `.github/assets/images/projects-personal/pdi/`.
4. Copie os arquivos selecionados para o portfólio: `portfolio-angular-frontend/public/images/projects/pdi/`.
5. Atualize a seção `## 10. Dados do portfólio` deste roadmap com os caminhos finais.
6. Replique as informações em `src/app/shared/data/projects/portfolio-personal.data.ts`.
   Futuramente esse passo será substituído por um formulário/backend no próprio portfólio.

---

## 10. Dados do portfólio

> Seção pronta para ser copiada para `portfolio-personal.data.ts`.

```ts
{
  slug: 'pdi',
  title: 'PDI — Plano de Desenvolvimento Individual',
  description:
    'Aplicação web para apresentação pública do Plano de Desenvolvimento Individual, ' +
    'com identidade visual independente, navegação por abas e suporte a tema claro/escuro.',
  category: 'Frontend',
  typeTag: 'pessoal',
  techs: ['Angular 21', 'TypeScript', 'SCSS', 'Jest', 'Puppeteer'],
  image: {
    src: '/images/projects/pdi/logo.png',
    alt: 'Logo do PDI',
    fit: 'contain',
  },
  repoUrl: 'https://github.com/elizabetefabri/pdi-frontend',
  demoUrl: 'https://pdi.elizabetesousafabri.com.br',
  problem:
    'Dificuldade em comunicar de forma clara e visual a trajetória, objetivos, ' +
    'metas e conquistas profissionais em um só lugar.',
  solution:
    'Página única e interativa com seções de hero, sobre, trajetória, metas, ' +
    'plano de ação, conquistas, sonhos e links, navegáveis por abas.',
  technicalDecisions: [
    'Design system próprio com tokens SCSS e temas claro/escuro',
    'Standalone components, signals e change detection OnPush',
    'CSS carregado sob demanda para não pesar o bundle inicial',
    'Dados estáticos tipados servidos por PdiService sem backend',
    'Jest para testes unitários com jest-preset-angular v17',
  ],
  gallery: [
    {
      src: '/images/projects/pdi/01-home.png',
      alt: 'Página completa do PDI',
    },
  ],
}
```

### Campos pendentes de preenchimento

- [x] `slug`
- [x] `title`
- [x] `description`
- [x] `category`
- [x] `typeTag`
- [x] `techs`
- [x] `image.src` e `image.alt`
- [x] `repoUrl`
- [x] `demoUrl`
- [x] `problem`
- [x] `solution`
- [x] `technicalDecisions`
- [x] `gallery`

---

## 11. Checklist de finalização

### Planejamento e setup

- [x] Nome e domínio definidos
- [ ] Repositório criado no GitHub
- [ ] Estrutura `frontend/` criada a partir do template
- [ ] `.env` e `.env.example` configurados (não aplicável)
- [ ] `docker-compose.yml` ajustado e testado (não aplicável)

### Desenvolvimento

- [ ] Telas / rotas principais implementadas
- [ ] Integração frontend ↔ backend concluída (não aplicável)
- [ ] Testes unitários passando
- [ ] Build de produção gerado sem erros

### Documentação

- [ ] `README.md` do projeto preenchido
- [ ] `CHANGELOG.md` ou `WIP.md` atualizados

### Captura de imagens

- [ ] `scripts/screenshots.mjs` configurado com as rotas do projeto
- [ ] Prints gerados em `frontend/docs/screenshots/`
- [ ] Logo/capa produzida (`public/logo.png`)
- [ ] Prints copiados para `portfolio-angular-frontend/public/images/projects/pdi/`

### Deploy

- [ ] Frontend publicado em Hostinger / Vercel
- [ ] Testes de fumaça no ambiente de produção

### Portfólio

- [x] Seção `## 10. Dados do portfólio` preenchida
- [ ] Entrada inserida em `portfolio-personal.data.ts`
- [ ] Imagens ajustadas no portfólio (`public/images/projects/pdi/...`)
- [ ] Deploy do portfólio realizado e card funcionando

---

## 12. Links e referências

### Projeto

- Repo: `https://github.com/elizabetefabri/pdi-frontend`
- Deploy: `https://pdi.elizabetesousafabri.com.br`
- README: `pdi/README.md` (em andamento)

### Documentação e caderno de estudos

- Template de roadmap por projeto: `MFE/.github/assets/documentation/00.template.roadmap.md`
- Spec do PDI no portfólio: `portfolio-angular-frontend/docs/SDD/PDI/spec.md`

### Gerenciamento

- Dados do portfólio: `portfolio-angular-frontend/src/app/shared/data/projects/portfolio-personal.data.ts`

---

## 13. Notas de evolução

- O PDI nasceu como app embutido no portfólio Angular e será publicado como projeto frontend próprio.
- O app é zoneless, usa signals e standalone components.
- O CSS é carregado sob demanda via `link` dinâmico no componente `Pdi`.
- Dados estáticos em `pdi-data.ts` e servidos por `PdiService` sem backend.
- O deploy usará o mesmo bundle estático (`dist/frontend/browser`) servido no subdomínio `pdi.*`.

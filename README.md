# Kauã Berman Amorim — Portfolio

Portfolio pessoal construído com Next.js 15, TypeScript e Tailwind CSS. Integra com a API do GitHub para exibir repositórios em tempo real.

## Stack

- **Next.js 15** — App Router + Turbopack
- **TypeScript** — tipagem estática em todo o projeto
- **Tailwind CSS** — estilização utilitária
- **Framer Motion** — animações
- **GitHub API** — repositórios e dados de perfil em tempo real
- **Lucide React** — ícones

## Funcionalidades

- Hero com efeito typewriter nos títulos
- Seção de skills organizada por categoria
- Grid de projetos com filtro por linguagem, carregados via API do GitHub
- Formulário de contato
- Design dark com tema terminal/hacker
- Totalmente responsivo

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Variáveis de ambiente (opcional)

Crie um arquivo `.env.local` para aumentar o rate limit da API do GitHub:

```env
GITHUB_TOKEN=seu_token_aqui
```

## Deploy

O projeto é compatível com deploy na **Vercel**:

```bash
npm run build
```

## Estrutura

```
src/
├── app/
│   ├── api/github/     # API Route que busca dados do GitHub
│   ├── projects/       # Página de todos os projetos
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/       # HeroSection, SkillsSection, ProjectsSection, ContactSection
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── github.ts       # Funções para a GitHub API
│   └── utils.ts
└── types/
    └── index.ts
```

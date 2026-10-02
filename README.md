# Music Player

[![Version](https://img.shields.io/badge/version-1.1-6384b8.svg)](#version-11--versão-11)
[![Frontend](https://img.shields.io/badge/frontend-React%2019-61dafb.svg)](#technology--tecnologia)
[![Backend](https://img.shields.io/badge/backend-FastAPI-009688.svg)](#technology--tecnologia)

> A focused music library and player built with React, TypeScript and FastAPI.
>
> Biblioteca e player musical construídos com React, TypeScript e FastAPI.

## Table of contents / Índice

- [Overview / Visão geral](#overview--visão-geral)
- [Version 1.1 / Versão 1.1](#version-11--versão-11)
- [Features / Funcionalidades](#features--funcionalidades)
- [UX, accessibility and mobile / UX, acessibilidade e mobile](#ux-accessibility-and-mobile--ux-acessibilidade-e-mobile)
- [Technology / Tecnologia](#technology--tecnologia)
- [Architecture / Arquitetura](#architecture--arquitetura)
- [Development cycle / Ciclo de desenvolvimento](#development-cycle--ciclo-de-desenvolvimento)
- [Future roadmap / Roadmap futuro](#future-roadmap--roadmap-futuro)
- [Requirements / Pré-requisitos](#requirements--pré-requisitos)
- [Installation and usage / Instalação e uso](#installation-and-usage--instalação-e-uso)
- [Configuration / Configuração](#configuration--configuração)
- [API](#api)
- [Project structure / Estrutura do projeto](#project-structure--estrutura-do-projeto)
- [Scripts](#scripts)
- [Limitations and legal notes / Limitações e aviso legal](#limitations-and-legal-notes--limitações-e-aviso-legal)
- [Contributing / Contribuição](#contributing--contribuição)

## Overview / Visão geral

### English

Music Player is a local-first web application for organizing a personal song library and playing selected songs through a YouTube source. The application stores song metadata in the Python backend and resolves the playable video when the user opens a song.

The current interface has two main routes:

- `/`: searchable, sortable and paginated song library.
- `/player/:id`: individual player view with playback controls.

The product intentionally keeps the number of screens small. Filters, settings and create/edit/delete flows are handled through contextual controls and modals, so the user can keep their place instead of navigating through many separate pages. The goal is a continuous, clean experience inside the SPA. This two-route structure is the current baseline; it can be consolidated further in the future if that improves the flow without reducing clarity.

### Português (Brasil)

O Music Player é uma aplicação web local-first para organizar uma biblioteca pessoal e reproduzir músicas por meio de uma fonte do YouTube. O backend em Python armazena os metadados das músicas e resolve o vídeo reproduzível quando uma música é aberta.

As duas rotas principais são:

- `/`: biblioteca com busca, ordenação e paginação.
- `/player/:id`: tela individual do player com controles de reprodução.

O produto foi pensado para manter o mínimo de telas possível. Filtros, configurações e fluxos de criação, edição e exclusão são tratados por controles contextuais e modais, permitindo que o usuário mantenha seu contexto em vez de navegar por várias páginas separadas. A ideia é oferecer uma experiência contínua e limpa dentro do SPA. Essa estrutura com duas rotas é a base atual e pode ser ainda mais consolidada no futuro, caso isso melhore o fluxo sem reduzir a clareza.

## Version 1.1 / Versão 1.1

Version 1.1 is the current product baseline. It documents the implemented experience: a responsive library, persistent preferences, song metadata CRUD, YouTube resolution, accessibility options and an individual playback screen.

A versão 1.1 é a linha de referência atual do produto. Ela representa a experiência implementada: biblioteca responsiva, preferências persistidas, CRUD de metadados, resolução via YouTube, opções de acessibilidade e tela individual de reprodução.

## Product philosophy / Filosofia do produto

### English

The main purpose of this project is to learn and practice UX, user experience and product thinking in a real interface. The software is not only a bridge to another business operation: in this case, the software itself is the product, and the experience is the primary outcome.

That changes the design priorities. In a transactional product such as an online store, the main goal may be to reduce friction while maximizing security and speed. In Music Player, those qualities still matter, but they share the center with discoverability, continuity, clarity, accessibility, feedback, customization and the feeling of control. Every screen, modal, transition and interaction is part of what is being built and learned.

### Português (Brasil)

O principal objetivo deste projeto é aprender e praticar UX, experiência do usuário e pensamento de produto em uma interface real. O software não é apenas uma ponte para outra operação: neste caso, o próprio software é o produto, e a experiência é o resultado principal.

Isso muda as prioridades de design. Em um produto transacional, como uma loja online, o maior objetivo pode ser reduzir atrito enquanto maximiza segurança e velocidade. No Music Player, essas qualidades continuam importantes, mas dividem o centro com descoberta, continuidade, clareza, acessibilidade, feedback, personalização e sensação de controle. Cada tela, modal, transição e interação faz parte do que está sendo construído e aprendido.

## Features / Funcionalidades

### Library / Biblioteca

- Search songs by title, artist, album or the available backend query fields.
- Create, edit and delete song metadata through modal forms.
- Sort by default order, title, artist, album or duration.
- Toggle ascending and descending order when the selected field supports it.
- Paginate the library with configurable page sizes: 9, 12, 15 or 18 items.
- Open a song directly from its library card.
- Persist search, page, page size, grid columns and accessibility preferences in browser storage.

- Buscar músicas pelos campos de consulta disponíveis no backend.
- Criar, editar e excluir metadados por meio de formulários modais.
- Ordenar por ordem padrão, título, artista, álbum ou duração.
- Alternar a ordem crescente e decrescente quando aplicável.
- Paginar a biblioteca com 9, 12, 15 ou 18 itens por página.
- Abrir uma música diretamente pelo card da biblioteca.
- Persistir busca, página, tamanho da página, colunas e preferências de acessibilidade no armazenamento do navegador.

### Player / Reprodutor

- Resolve the music source through the backend's `/ytmusic/resolve` endpoint.
- Play and pause playback.
- Restart the current song.
- Adjust volume and mute or restore the previous volume.
- Display current playback time and duration.
- Show loading, unavailable-song and source-resolution error states.
- Link the playback provider attribution to YouTube.

- Resolver a fonte da música pelo endpoint `/ytmusic/resolve` do backend.
- Reproduzir e pausar.
- Reiniciar a música atual.
- Ajustar o volume e silenciar ou restaurar o volume anterior.
- Exibir o tempo atual e a duração.
- Exibir estados de carregamento, música inexistente e erro ao resolver a fonte.
- Identificar o provedor e apontar para o YouTube.

## UX, accessibility and mobile / UX, acessibilidade e mobile

### English

- Responsive library grid adapts its columns to the available viewport and performance constraints.
- Mobile toolbar collapses secondary controls to keep search and actions usable on small screens.
- Layout spacing, controls and player surfaces adapt across mobile, tablet and desktop breakpoints.
- Light and dark visual modes are supported by the shared design system.
- High-contrast mode improves text, border and focus visibility.
- Visible focus states and semantic labels support keyboard and assistive technology users.
- Optional keyboard controls support library navigation and player actions. They are marked experimental in the UI.
- Loading, updating, empty/error and unavailable-source states are represented in the interface.
- Motion-reduced transitions are respected by interactive animations.

### Português (Brasil)

- A grade responsiva adapta o número de colunas ao espaço disponível e aos limites de desempenho.
- No mobile, a barra de ferramentas recolhe controles secundários para preservar a usabilidade.
- Espaçamentos, controles e superfícies do player se adaptam a mobile, tablet e desktop.
- Os modos visual claro e escuro fazem parte do sistema de design compartilhado.
- O modo de alto contraste melhora a visibilidade de textos, bordas e focos.
- Focos visíveis e rótulos semânticos apoiam teclado e tecnologias assistivas.
- Controles opcionais por teclado permitem navegar pela biblioteca e controlar o player; o recurso é experimental.
- Estados de carregamento, atualização, vazio/erro e fonte indisponível são apresentados na interface.
- As transições interativas respeitam a redução de movimento do sistema.

### Keyboard controls / Atalhos de teclado

> **Experimental:** keyboard controls are opt-in and are identified by an **Experimental** badge in the frontend. Their shortcuts and behavior may change as the experience is refined.
>
> **Experimental:** os controles por teclado são opcionais e aparecem identificados com o badge **Experimental** no frontend. Os atalhos e comportamentos podem mudar conforme a experiência for aprimorada.

Keyboard controls are opt-in in **Library settings** / Os atalhos são opcionais em **Library settings**:

| Context / Contexto | Keys / Teclas | Action / Ação |
| --- | --- | --- |
| Library / Biblioteca | `W` / `S` | Move between rows / Mover entre linhas |
| Library / Biblioteca | `A` / `D` | Move between songs / Mover entre músicas |
| Library / Biblioteca | `Home` / `End` | First or last song / Primeira ou última música |
| Library / Biblioteca | `Enter` | Open focused song / Abrir música focada |
| Library / Biblioteca | `N` / `O` | Add song / Open settings |
| Library / Biblioteca | `Left` / `Right` | Previous or next page / Página anterior ou próxima |
| Player / Player | `Space` / `M` | Play or mute / Reproduzir ou silenciar |
| Player / Player | `R` / `Up` / `Down` | Restart or change volume / Reiniciar ou alterar volume |
| Player / Player | `Esc` | Return to the previous page / Voltar |

## Technology / Tecnologia

### Frontend

- React 19.2
- TypeScript 5.9
- Vite 7
- Tailwind CSS 4
- React Router 7
- Lucide React icons
- Sonner notifications
- YouTube IFrame player integration

### Backend

- Python 3.8 or newer
- FastAPI
- Uvicorn
- Pydantic
- `ytmusicapi`, `yt-dlp` and `requests` for music-source integration
- GZip and CORS middleware
- Local SQLite persistence through the application data layer

## Architecture / Arquitetura

### English

The frontend uses route-level pages, reusable UI components and custom hooks. API modules isolate HTTP requests, while hooks coordinate persisted state, song operations, responsive grid behavior and playback state.

The backend exposes a small REST API. The songs service owns metadata operations, and the YouTube Music service resolves a title and artist into a playable video identifier. The backend does not act as a music file host.

### Português (Brasil)

O frontend usa páginas por rota, componentes reutilizáveis e hooks customizados. Os módulos de API isolam as requisições HTTP, enquanto os hooks coordenam estado persistido, operações de músicas, grade responsiva e reprodução.

O backend expõe uma API REST pequena. O serviço de músicas cuida dos metadados, e o serviço YouTube Music resolve título e artista em um identificador de vídeo reproduzível. O backend não funciona como hospedagem de arquivos musicais.

## Development cycle / Ciclo de desenvolvimento

### English

Development follows short, feature-oriented cycles that move between backend and frontend as the product needs evolve. A cycle can start in either layer, but each feature is completed through implementation, improvement, integration and validation.

1. **Define the feature**: identify the user need, affected layer and expected behavior.
2. **Build the backend slice**: create or adjust the endpoint, service, validation and persistence behavior required by the feature.
3. **Improve the backend**: review the contract, error states, data shape, edge cases and maintainability before integration.
4. **Integrate in the frontend**: connect the API client, hooks, state and interface components to the backend behavior.
5. **Refine the experience**: improve UX, responsive behavior, accessibility, loading states and feedback across mobile and desktop.
6. **Validate the cycle**: run the relevant checks, exercise the complete feature and confirm that the backend and frontend agree on the contract.
7. **Return to the next layer**: after a frontend cycle is complete, return to the backend when the next API or domain improvement is needed, and move back to the frontend for its integration. This alternation continues feature by feature.

The current version 1.1 is one of these cycles: backend library and resolution capabilities were shaped first, then exposed through the responsive library and player experience. Future work continues the same loop instead of treating backend and frontend as isolated projects.

### Português (Brasil)

O desenvolvimento segue ciclos curtos orientados por features, alternando entre backend e frontend conforme a evolução do produto. Um ciclo pode começar em qualquer camada, mas cada feature passa por implementação, melhoria, integração e validação.

1. **Definir a feature**: identificar a necessidade do usuário, a camada afetada e o comportamento esperado.
2. **Construir a parte do backend**: criar ou ajustar endpoint, serviço, validação e persistência necessários para a feature.
3. **Melhorar o backend**: revisar contrato, erros, formato dos dados, casos extremos e manutenibilidade antes da integração.
4. **Integrar no frontend**: conectar cliente de API, hooks, estado e componentes de interface ao comportamento do backend.
5. **Refinar a experiência**: melhorar UX, responsividade, acessibilidade, estados de carregamento e feedback em mobile e desktop.
6. **Validar o ciclo**: executar as verificações relevantes, testar a feature completa e confirmar que backend e frontend respeitam o mesmo contrato.
7. **Voltar para a próxima camada**: após concluir um ciclo no frontend, voltar ao backend quando surgir a próxima melhoria de API ou domínio, retornando ao frontend para integrá-la. Essa alternância continua feature por feature.

A versão 1.1 é um desses ciclos: as capacidades de biblioteca e resolução foram estruturadas no backend e depois expostas pela biblioteca responsiva e pela experiência do player. O trabalho futuro continua o mesmo loop, mantendo backend e frontend conectados em vez de tratá-los como projetos isolados.

## Future roadmap / Roadmap futuro

The items below are future directions, not features included in version 1.1.

Os itens abaixo são direções futuras, não funcionalidades incluídas na versão 1.1.

### Personal library / Biblioteca pessoal

- **Favorites / Favoritos**: mark songs as favorites and filter the library by that status.
- **Playlists**: create, rename, reorder and manage custom collections of songs.
- **Richer library organization / Organização mais completa**: support additional views, saved filters and more flexible library groupings.

### Interface customization / Personalização da interface

- Give users more control over how their app appears, while preserving readable defaults and accessibility.
- Explore configurable themes, accent colors, density, typography scale, grid presentation and player layout.
- Persist interface preferences per user or local profile, with a quick reset to sensible defaults.
- Keep customization focused on clarity and usability instead of adding visual complexity for its own sake.

### Codebase simplification / Simplificação do código

- Reduce unnecessary coupling between pages, components, hooks and API modules.
- Consolidate repeated UI and state patterns behind small, well-defined abstractions.
- Keep frontend and backend contracts explicit and easier to evolve between development cycles.
- Improve naming, folder boundaries, validation and test coverage as each feature is revisited.
- Prefer incremental refactoring during feature work, preserving the current continuous SPA experience.

### Português (Brasil)

- **Favoritos**: marcar músicas como favoritas e filtrar a biblioteca por esse status.
- **Playlists**: criar, renomear, reordenar e gerenciar coleções personalizadas de músicas.
- **Organização mais completa da biblioteca**: adicionar novas visualizações, filtros salvos e agrupamentos mais flexíveis.
- **Mais personalização da interface**: dar ao usuário mais controle sobre a aparência do próprio app, com temas, cores de destaque, densidade, escala tipográfica, apresentação da grade e layout do player configuráveis.
- **Preferências persistentes**: manter as escolhas por usuário ou perfil local, com uma opção rápida para restaurar padrões coerentes.
- **Código mais simples**: reduzir acoplamento, consolidar padrões repetidos, explicitar contratos entre frontend e backend e melhorar nomes, limites de pastas, validações e cobertura de testes.

Essas melhorias continuarão sendo desenvolvidas em ciclos. Cada nova feature poderá começar no backend, ser aprimorada, integrada ao frontend e, depois, abrir espaço para uma nova rodada de melhorias ou simplificação no código existente.

## Requirements / Pré-requisitos

- Node.js 18 or newer / Node.js 18 ou superior
- npm
- Python 3.8 or newer / Python 3.8 ou superior
- pip
- Internet access for YouTube source resolution / acesso à internet para resolver fontes do YouTube

## Installation and usage / Instalação e uso

### 1. Frontend

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

O frontend inicia, por padrão, em `http://localhost:5173`.

### 2. Backend

From `src/providers/backend` / Em `src/providers/backend`:

```bash
python -m venv .venv

# Windows PowerShell
.\.venv\Scripts\Activate.ps1

# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The backend runs at `http://localhost:8000`. Its health check is available at `GET /`.

O backend inicia em `http://localhost:8000`. O health check está disponível em `GET /`.

When using the repository's VS Code tasks, the backend is started with the project's `.venv` and the frontend with `npm run dev`.

## Configuration / Configuração

The frontend accepts an optional `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

If `VITE_API_URL` is omitted, the frontend uses `http://localhost:8000` as the default.

Se `VITE_API_URL` não for informado, o frontend usa `http://localhost:8000` por padrão.

The backend enables CORS for the local Vite origin `http://localhost:5173`.

## API

| Method | Endpoint | Purpose / Finalidade |
| --- | --- | --- |
| `GET` | `/` | Backend health check / Health check do backend |
| `GET` | `/songs` | Paginated, filtered and sorted library / Biblioteca paginada, filtrada e ordenada |
| `GET` | `/songs/{song_id}` | Get one song / Buscar uma música |
| `POST` | `/songs` | Create song metadata / Criar metadados |
| `PUT` | `/songs/{song_id}` | Update song metadata / Atualizar metadados |
| `DELETE` | `/songs/{song_id}` | Delete a song / Excluir uma música |
| `GET` | `/ytmusic/resolve` | Resolve a title and artist to a video source / Resolver título e artista em uma fonte de vídeo |

`GET /songs` accepts `query`, `page`, `per_page`, `order_by` and `order_direction` query parameters.

## Project structure / Estrutura do projeto

```text
music-player/
├── public/                         # Static assets / Arquivos estáticos
├── src/
│   ├── api/                        # Frontend API clients and types
│   ├── components/                 # Reusable interface components
│   │   ├── Home/                   # Library toolbar, grid, pagination and modals
│   │   ├── Player/                 # Player composition and source
│   │   ├── Controler/              # Playback, time and volume controls
│   │   └── UI/                     # Shared UI primitives
│   ├── hooks/                      # State, persistence, operations and playback
│   ├── layouts/                    # Shared page layouts
│   ├── pages/                      # Home and player route pages
│   ├── providers/backend/          # FastAPI application and Python services
│   ├── routes/                     # React Router configuration
│   └── utils/                      # Formatting, storage and library helpers
├── package.json
├── vite.config.ts
└── README.md
```

## Scripts

Run these commands from the project root / Execute no diretório raiz:

| Command / Comando | Purpose / Finalidade |
| --- | --- |
| `npm run dev` | Start the Vite development server / Iniciar o servidor Vite |
| `npm run build` | Type-check and build for production / Verificar tipos e gerar build |
| `npm run preview` | Preview the production build / Visualizar o build |
| `npm run lint` | Run ESLint / Executar o ESLint |

Backend command / Comando do backend:

```bash
uvicorn app.main:app --reload --port 8000
```

## Limitations and legal notes / Limitações e aviso legal

### English

- The application stores and manages song metadata; it does not upload or distribute music files.
- Playback depends on the availability and response of the external YouTube source.
- Source resolution requires an internet connection.
- Authentication, user accounts and multi-user synchronization are not part of the current version.
- This project is intended for educational and personal use. Respect YouTube terms and the rights of content owners.

### Português (Brasil)

- A aplicação armazena e gerencia metadados; não faz upload nem distribui arquivos musicais.
- A reprodução depende da disponibilidade e da resposta da fonte externa do YouTube.
- A resolução da fonte exige conexão com a internet.
- Autenticação, contas de usuário e sincronização entre usuários não fazem parte da versão atual.
- O projeto é destinado a uso educacional e pessoal. Respeite os termos do YouTube e os direitos dos proprietários do conteúdo.

## Contributing / Contribuição

Issues and pull requests are welcome. Please describe the motivation, the affected area and how the change was validated.

Issues e pull requests são bem-vindos. Descreva a motivação, a área afetada e como a alteração foi validada.

## Author / Autor

**MatetoCoti** - development / desenvolvimento

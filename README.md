# 🎵 My Music App

[![Status](https://img.shields.io/badge/Status-0.9-green.svg)](https://github.com/your-username/music-player)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Aplicação web de player musical desenvolvida com **React + TypeScript (Frontend)** e **Backend simples em Python**.

> Projeto desenvolvido com fins educacionais, focado em arquitetura organizada, componentização e integração com APIs externas.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Responsividade](#-responsividade)
- [Aviso Legal](#-aviso-legal)
- [Como Contribuir](#-como-contribuir)
- [Licença](#-licença)
- [Autores](#-autores)

---

## 📌 Visão Geral

A aplicação permite aos usuários explorar e reproduzir músicas através de uma interface intuitiva. Utiliza a API do YouTube para streaming de áudio, garantindo uma experiência de reprodução de alta qualidade sem hospedar conteúdo diretamente.

---

## ✨ Funcionalidades

- 🎵 **Listagem de músicas**: Visualize todas as músicas disponíveis
- 🔍 **Busca avançada**: Busque por título ou artista
- 📄 **Paginação**: Navegue por 9 músicas por página
- ▶️ **Player individual**: Reproduza músicas selecionadas
- ⏯️ **Controles de reprodução**: Play/Pause, Restart
- 🔊 **Controle de volume**: Ajuste o volume e mute/unmute
- ⏱️ **Contador de tempo**: Sincronizado com a reprodução
- 📱 **Responsivo**: Funciona em desktop, tablet e mobile

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 18.x
- **TypeScript** 5.x
- **Vite** 5.x
- **CSS3** (estilos customizados)
- **YouTube Iframe API**

### Backend
- **Python** 3.8+
- **Flask** (para API REST)

### Banco de Dados
- **Supabase** (PostgreSQL)

### Outros
- **ESLint** para linting
- **Vite** para build e desenvolvimento

---

## 🏗️ Arquitetura

### 🔹 Frontend

Responsável por:
- Interface do usuário
- Controle do player YouTube
- Gerenciamento de estado
- Paginação e busca
- Componentização modular

Estrutura organizada por:
- **Components**: Componentes reutilizáveis
- **Hooks**: Lógica customizada
- **Domain**: Modelos de dados
- **Repositories**: Acesso a dados
- **Pages**: Páginas da aplicação

### 🔹 Backend (Python)

Backend simples que:
- Recebe consultas de título + artista
- Consulta metadados via YouTube API
- Retorna `videoId` para embed
- Serve dados das músicas armazenadas

**Nota**: O backend não hospeda músicas, apenas facilita o acesso aos metadados oficiais do YouTube.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18.x ou superior
- **npm** ou **yarn**
- **Python** 3.8 ou superior
- **pip** para gerenciar pacotes Python
- Conta no **Supabase** para banco de dados

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/your-username/music-player.git
cd music-player
```

### 2. Frontend

```bash
# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### 3. Backend

```bash
# Navegue para o diretório do backend
cd src/providers/ytmusic

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
python app/main.py
```

A aplicação estará disponível em:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000` (ou conforme configurado)

---

## 📁 Estrutura do Projeto

```
music-player/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── Controler/      # Controles do player
│   │   ├── SongBox/        # Card da música
│   │   └── ...
│   ├── data/               # Dados mock
│   ├── domain/             # Modelos de domínio
│   ├── hooks/              # Hooks customizados
│   ├── layouts/            # Layouts da aplicação
│   ├── lib/                # Configurações externas
│   ├── pages/              # Páginas da aplicação
│   ├── providers/          # Provedores de API
│   │   └── ytmusic/        # Backend Python
│   ├── repositories/       # Repositórios de dados
│   ├── routes/             # Configuração de rotas
│   └── services/           # Serviços da aplicação
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔐 Variáveis de Ambiente

### Frontend (.env)

Crie um arquivo `.env` na raiz do projeto frontend:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend

Configure as variáveis necessárias no arquivo de configuração do Flask.

---

## 📜 Scripts Disponíveis

### Frontend

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Executa o linter

### Backend

- `python app/main.py` - Inicia o servidor Flask

---

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:

- 🖥️ **Desktop**: Layout completo com grid
- 📱 **Tablet**: Ajustes para telas médias
- 📱 **Mobile**: Interface adaptada para telas pequenas (~400px)

---

## ⚠️ Aviso Legal

Este projeto:

- ✅ **Não hospeda músicas**
- ✅ **Utiliza exclusivamente a API oficial do YouTube**
- ✅ **Não redistribui conteúdo**
- ✅ **Não possui fins lucrativos**
- ✅ **Desenvolvido apenas para fins educacionais**

Todos os direitos pertencem aos seus respectivos proprietários.

---

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

- **MatetoCoti** - *Desenvolvimento* - [GitHub](https://github.com/your-username)

---

⭐ Se este projeto te ajudou, dê uma estrela!
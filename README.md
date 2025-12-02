# DetectaBB - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg)
![Material-UI](https://img.shields.io/badge/MUI-5+-007FFF.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**Interface Web para Detecção de Fraudes em Boletos Bancários**

Aplicação React moderna e responsiva para análise de boletos com Machine Learning

[Demo](#-demonstração) •
[Instalação](#-instalação) •
[Configuração](#️-configuração) •
[Deploy](#-deploy)

</div>

---

##  Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Características](#-características)
- [Instalação](#-instalação)
- [Configuração](#️-configuração)
- [Uso](#-uso)
- [Componentes](#-componentes)
- [Estilização](#-estilização)
- [Deploy](#-deploy)
- [Testes](#-testes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

##  Sobre o Projeto

O **DetectaBB Frontend** é uma aplicação web desenvolvida em React que oferece uma interface intuitiva e profissional para análise de boletos bancários. Com design inspirado no Banco do Brasil, o sistema permite:

-  Upload de boletos (PDF/Imagem)
-  Visualização de resultados de análise
-  Histórico completo de análises
-  Sistema de autenticação seguro
-  Design responsivo para mobile

### Por que DetectaBB Frontend?

Uma interface moderna e acessível que torna a verificação de boletos simples e rápida, com explicações claras que qualquer pessoa pode entender.

---

##  Tecnologias

### Core

- **[React 18](https://react.dev/)** - Biblioteca JavaScript para UI
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática (opcional)
- **[React Router](https://reactrouter.com/)** - Roteamento SPA

### UI/UX

- **[Material-UI (MUI)](https://mui.com/)** - Biblioteca de componentes
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Visualização de PDFs
- **[React Dropzone](https://react-dropzone.js.org/)** - Upload de arquivos
- **[Framer Motion](https://www.framer.com/motion/)** - Animações

### Estado e Dados

- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[React Context](https://react.dev/reference/react/useContext)** - Gerenciamento de estado
- **[JWT Decode](https://github.com/auth0/jwt-decode)** - Decodificação de tokens

### Dev Tools

- **[ESLint](https://eslint.org/)** - Linter
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[Vitest](https://vitest.dev/)** - Testes unitários

---

##  Características

### Interface do Usuário

-  Design institucional (cores do Banco do Brasil)
-  100% responsivo (mobile-first)
-  Acessibilidade (WCAG 2.1)
-  Suporte a tema claro/escuro
-  Carregamento rápido
-  Feedback visual em tempo real

### Funcionalidades

-  **Upload Inteligente**: Drag & drop ou seleção de arquivo
-  **Pré-visualização**: Veja o boleto antes de analisar
-  **Resultados Claros**: Explicações simples e avançadas
-  **Histórico**: Todas suas análises salvas
-  **Autenticação**: Login/Registro seguro
-  **Estatísticas**: Painel com suas métricas
-  **Download**: Salve relatórios em PDF

### Segurança

-  JWT Token armazenado de forma segura
-  Validação de arquivo no frontend
-  Sanitização de inputs
-  Proteção de rotas privadas
-  Auto-logout em inatividade

---

##  Instalação

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Backend do DetectaBB rodando

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/detectabb-frontend.git
cd detectabb-frontend
```

### 2. Instalar Dependências

**Com npm:**
```bash
npm install
```

**Com yarn:**
```bash
yarn install
```

---

## ⚙️ Configuração

### 1. Criar Arquivo .env

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `.env`:

```env
# API
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000

# Aplicação
VITE_APP_NAME=DetectaBB
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development

# Upload
VITE_MAX_FILE_SIZE=5242880  # 5MB em bytes
VITE_ALLOWED_FILE_TYPES=application/pdf,image/jpeg,image/jpg,image/png

# Features
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false

# Autenticação
VITE_TOKEN_KEY=detectabb_token
VITE_TOKEN_EXPIRY_HOURS=24
```

### 3. Configurar Cores do Tema

Edite `src/theme/theme.js` para personalizar as cores:

```javascript
export const theme = createTheme({
  palette: {
    primary: {
      main: '#465EFF',  // Azul Banco do Brasil
      light: '#7B89FF',
      dark: '#1E3FD6',
    },
    secondary: {
      main: '#FCFC30',  // Amarelo Banco do Brasil
      light: '#FFFF66',
      dark: '#C7C700',
    },
  },
});
```

---

##  Uso

### Iniciar o Servidor de Desenvolvimento

**Com npm:**
```bash
npm run dev
```

**Com yarn:**
```bash
yarn dev
```

Aplicação disponível em: http://localhost:5173

### Build para Produção

**Com npm:**
```bash
npm run build
```

**Com yarn:**
```bash
yarn build
```

### Preview da Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Formatação

```bash
npm run format
```

---

##  Componentes

### Componentes Principais

#### Landing Page
```jsx
<Landing />
```
- Página inicial com call-to-action
- Explicação do sistema
- Botões de Login/Registro

#### Upload
```jsx
<Upload />
```
- Área de drag & drop
- Validação de arquivo
- Pré-visualização

#### Result
```jsx
<Result analysis={data} />
```
- Exibição de resultados
- Explicações simples/avançadas
- Recomendações de ação

#### Dashboard
```jsx
<Dashboard />
```
- Histórico de análises
- Estatísticas do usuário
- Filtros e busca

#### Login/Register
```jsx
<Login />
<Register />
```
- Formulários de autenticação
- Validação de campos
- Feedback de erros

### Componentes Reutilizáveis

```
src/components/
├── common/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   └── Loader.jsx
├── layout/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Sidebar.jsx
└── analysis/
    ├── BoletoPreview.jsx
    ├── ValidationStatus.jsx
    └── ExplanationCard.jsx
```

---

##  Estilização

### Sistema de Design

O projeto segue um sistema de design baseado no Banco do Brasil:

#### Cores Principais

```css
--primary-blue: #465EFF;
--primary-yellow: #FCFC30;
--success-green: #4CAF50;
--error-red: #F44336;
--warning-orange: #FF9800;
--info-light-blue: #2196F3;
```

#### Tipografia

```css
--font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
```

#### Espaçamento

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

### Material-UI Theme

Personalize o tema em `src/theme/theme.js`:

```javascript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#465EFF',
    },
    secondary: {
      main: '#FCFC30',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});
```

---

##  Deploy

### Deploy na Vercel

1. **Instale a CLI da Vercel:**
```bash
npm i -g vercel
```

2. **Faça login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Deploy para produção:**
```bash
vercel --prod
```

### Deploy na Netlify

1. **Instale a CLI da Netlify:**
```bash
npm install -g netlify-cli
```

2. **Build o projeto:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

### Deploy Manual

1. **Build o projeto:**
```bash
npm run build
```

2. **Arquivos estáticos estarão em `dist/`**

3. **Faça upload para seu servidor**

### Variáveis de Ambiente em Produção

Não esqueça de configurar as variáveis de ambiente no painel da Vercel/Netlify:

- `VITE_API_URL` → URL da API em produção
- `VITE_ENVIRONMENT` → `production`

---

##  Testes

### Executar Testes

```bash
npm run test
```

### Testes com Cobertura

```bash
npm run test:coverage
```

### Testes E2E (Cypress)

```bash
npm run test:e2e
```

### Estrutura de Testes

```
tests/
├── unit/
│   ├── components/
│   │   ├── Button.test.jsx
│   │   └── Upload.test.jsx
│   ├── utils/
│   │   └── validators.test.js
│   └── services/
│       └── api.test.js
├── integration/
│   ├── auth-flow.test.jsx
│   └── analysis-flow.test.jsx
└── e2e/
    ├── upload-boleto.cy.js
    └── user-registration.cy.js
```

---

##  Estrutura do Projeto

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── robots.txt
├── src/
│   ├── assets/              # Imagens, ícones, fontes
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/          # Componentes React
│   │   ├── common/          # Componentes reutilizáveis
│   │   ├── layout/          # Layout (Header, Footer)
│   │   └── analysis/        # Componentes de análise
│   ├── pages/               # Páginas da aplicação
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Upload.jsx
│   │   ├── Result.jsx
│   │   ├── Dashboard.jsx
│   │   └── Help.jsx
│   ├── contexts/            # Context API
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/               # Custom Hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   └── useUpload.js
│   ├── services/            # Serviços (API calls)
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   └── analysis.service.js
│   ├── utils/               # Funções utilitárias
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   ├── theme/               # Configuração de tema
│   │   └── theme.js
│   ├── routes/              # Configuração de rotas
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globais
├── .env.example             # Exemplo de variáveis
├── .eslintrc.js             # Configuração ESLint
├── .prettierrc              # Configuração Prettier
├── index.html               # HTML base
├── package.json             # Dependências
├── vite.config.js           # Configuração Vite
└── README.md
```

---

## 🔌 Integração com Backend

### Configuração do Axios

`src/services/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Exemplo de Chamada API

```javascript
// src/services/analysis.service.js
import api from './api';

export const analyzeboleto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getHistory = async (page = 1, limit = 10) => {
  const response = await api.get('/history', {
    params: { page, limit },
  });

  return response.data;
};
```

---

##  Contribuindo

Contribuições são bem-vindas! Por favor, siga estas diretrizes:

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- **JavaScript/React**: Airbnb Style Guide
- **Componentes**: Functional components com hooks
- **PropTypes**: Sempre documentar props
- **Formatação**: Prettier
- **Linting**: ESLint
- **Commits**: Semantic Commits

### Estrutura de Componentes

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

/**
 * Componente de exemplo
 * @param {string} title - Título do componente
 * @param {ReactNode} children - Conteúdo filho
 */
const ExampleComponent = ({ title, children }) => {
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      {children}
    </Box>
  );
};

ExampleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ExampleComponent.defaultProps = {
  children: null,
};

export default ExampleComponent;
```

---

##  Licença

Este projeto está sob a licença educacional.

---

##  Contato

**Equipe DetectaBB**

- Email: suporte@detectabb.com
- Website: https://detectabb.com
- Documentação: https://docs.detectabb.com

---

##  Agradecimentos

- **Material-UI** - Pela excelente biblioteca de componentes
- **Vite** - Pelo build tool ultra-rápido
- **React Community** - Pelas ferramentas e bibliotecas incríveis
- **Banco do Brasil** - Pela inspiração visual
- **Você** - Por considerar usar o DetectaBB!

---

##  Histórico do Projeto

Este projeto é uma **continuação e evolução** de projetos anteriores desenvolvidos por **Matheus Croft**:

### Projetos Originais

- 🔗 **Backend Original**: [detectaBB_backend](https://github.com/Matheuscroft/detectaBB_backend)
- 🔗 **Frontend Original**: [detectaBB](https://github.com/Matheuscroft/detectaBB)

### Evolução

A versão atual representa uma refatoração completa com:
-  Design system profissional e consistente
-  Performance otimizada com Vite
-  Responsividade aprimorada
-  Melhorias de acessibilidade
-  Animações e transições suaves
-  Dashboard com métricas avançadas
-  Testes automatizados
-  Documentação completa

Agradecemos ao **Matheus Croft** pela concepção inicial e pelo trabalho fundamental que tornou este projeto possível.

---

## Recursos Úteis

- [Documentação React](https://react.dev/)
- [Documentação Vite](https://vitejs.dev/)
- [Material-UI Docs](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)

---



[⬆ Voltar ao topo](#detectabb---frontend)

</div>

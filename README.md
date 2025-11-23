# DetectaBB Frontend

Sistema de detecção do Banco do Brasil - Interface Web PWA

## Tecnologias

- **React** + **Vite** - Interface moderna e rápida
- **Material-UI** - Componentes de interface
- **PWA** - Progressive Web App com suporte offline
- **Axios** - Cliente HTTP
- **React Router** - Navegação

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como referência):

```env
VITE_API_URL=https://detectabb-backend-3-main.onrender.com
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`

### 4. Build para produção

```bash
npm run build
npm run preview
```

## Backend

O frontend está configurado para consumir a API do backend hospedado em:
**https://detectabb-backend-3-main.onrender.com**

## Funcionalidades PWA

✅ Instalável na tela inicial
✅ Funciona offline
✅ Cache automático de recursos
✅ Atualizações automáticas
✅ Ícone e splash screen personalizados
✅ Modo standalone

### Gerar ícones PWA

Consulte [INSTRUCOES_ICONES.md](INSTRUCOES_ICONES.md) para instruções sobre como gerar os ícones necessários.

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Context API (AuthContext)
├── hooks/          # Custom hooks
├── pages/          # Páginas da aplicação
├── services/       # Serviços (API)
├── theme/          # Tema Material-UI
└── utils/          # Utilitários e constantes
```

## Scripts disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Executar ESLint

## Licença

Projeto desenvolvido para o Banco do Brasil

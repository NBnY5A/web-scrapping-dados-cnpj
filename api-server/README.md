# API Server - CNPJ

API REST em Node.js/Express para gerenciar dados de CNPJs com PostgreSQL.

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar em produção
npm start
```

## 📡 Endpoints da API

### Empresas
- `GET /api/empresas` - Listar empresas (com paginação)
- `GET /api/empresas/:cnpj` - Buscar empresa por CNPJ
- `POST /api/empresas` - Criar nova empresa
- `PUT /api/empresas/:cnpj` - Atualizar empresa
- `DELETE /api/empresas/:cnpj` - Deletar empresa

### CNAEs
- `GET /api/cnaes` - Listar CNAEs
- `GET /api/cnaes/:codigo` - Buscar CNAE por código
- `POST /api/cnaes` - Criar novo CNAE
- `PUT /api/cnaes/:codigo` - Atualizar CNAE
- `DELETE /api/cnaes/:codigo` - Deletar CNAE

### Países
- `GET /api/paises` - Listar países
- `GET /api/paises/:id` - Buscar país por ID
- `POST /api/paises` - Criar novo país

## ⚙️ Configuração

Copie o arquivo `.env` e configure:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=cnpj_database
PORT=3001
```

## 📦 Tecnologias

- **Express** - Framework web
- **pg** - Cliente PostgreSQL
- **cors** - Permitir requisições cross-origin
- **dotenv** - Variáveis de ambiente

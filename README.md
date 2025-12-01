# 🚀 Guia de Inicialização da Aplicação

## Pré-requisitos
- Docker Desktop rodando
- Node.js instalado
- PostgreSQL container criado e rodando

## Verificar se o PostgreSQL está rodando

```bash
docker ps
```

Você deve ver o container `server-postgres-1` na lista. Se não estiver rodando:

```bash
cd server
docker-compose up -d
```

# Objetivo do Projeto

O projeto é uma solução completa para a ingestão, processamento, e visualização de dados governamentais abertos sobre empresas brasileiras (CNPJ), focando em criar um dashboard analítico para o usuário final. A aplicação adota uma arquitetura de microsserviços básica com três componentes distintos e um banco de dados.

# Explicações do Projeto

> A aplicação se divide em 3 serviços principais: **`api-server`**, **`backend`** e **`quoda-client`**. O serviço de **`api-server`** fornece uma API intermediária para se comunicar com o front-end e banco de dados, o front-end é o serviço nomeado como **`quoda-client`**. Já o serviço de **`backend`** é onde está contida toda a regra de negócio para a extração e inserção com o banco de dados.

> Cada serviço tem um **`README.md`** com instruções para executá-los e operá-los de formas independentes. O fluxo da aplicação funciona da seguinte forma:
> `**backend**` baixa os dados, converte em csv e extraí as informações desses csv's e as armazenam no banco de dados, o **`api-server`** consume os dados inseridos no banco de dados e os expoẽm através dos endpoints, o **`quoda-client`** consome os dados fornecidos pelo **`api-server`** e os mostram para o usuário.


## 1. Iniciar a API (Backend)

Abra um terminal e execute:

```bash
cd api-server
npm run dev
```

✅ A API estará rodando em: **http://localhost:3001**

Você deve ver a mensagem:
```
🚀 Servidor rodando na porta 3001
✅ Conectado ao PostgreSQL
```

## 2. Iniciar o React (Frontend)

Abra **outro terminal** (deixe o da API rodando) e execute:

```bash
cd quoda-client
npm run dev
```

✅ O React estará rodando em: **http://localhost:5173**

Acesse no navegador: http://localhost:5173

## 3. Testar a integração

### Verificar se há dados no banco:

No terminal do PostgreSQL (ou qualquer cliente SQL):

```bash
docker exec -it server-postgres-1 psql -U postgres -d cnpj_database
```

Depois execute:

```sql
SELECT COUNT(*) FROM empresas;
SELECT COUNT(*) FROM cnaes;
```

Se retornar 0, você precisa carregar os dados primeiro.

### Testar endpoints da API diretamente:

```bash
# Listar empresas
curl http://localhost:3001/api/empresas

# Listar CNAEs
curl http://localhost:3001/api/cnaes

# Buscar empresas de um estado específico
curl "http://localhost:3001/api/empresas?uf=SP"
```

## 4. Carregar dados (se necessário)

Se o banco estiver vazio, você precisa carregar os CSVs:

```bash
cd server
source venv/bin/activate  # ou venv\Scripts\activate no Windows
PYTHONPATH=. python app/database/load_data.py
```

## Estrutura de Portas

| Serviço        | Porta | URL                          |
|----------------|-------|------------------------------|
| PostgreSQL     | 5432  | localhost:5432               |
| API (Express)  | 3001  | http://localhost:3001/api    |
| React (Vite)   | 5173  | http://localhost:5173        |

## Troubleshooting

### API não conecta ao PostgreSQL
- Verifique se o container está rodando: `docker ps`
- Verifique as credenciais no arquivo `api-server/.env`
- Tente reiniciar o container: `docker restart server-postgres-1`

### React não carrega dados
- Verifique se a API está rodando em http://localhost:3001
- Abra o console do navegador (F12) e veja se há erros de CORS ou rede
- Verifique se o arquivo `quoda-client/.env` tem `VITE_API_URL=http://localhost:3001/api`

### Erro de CORS
- A API já está configurada com CORS habilitado
- Se ainda assim tiver erro, verifique o arquivo `api-server/server.js`

## Comandos Úteis

```bash
# Parar todos os containers
docker-compose down

# Ver logs do PostgreSQL
docker logs server-postgres-1

# Acessar o PostgreSQL diretamente
docker exec -it server-postgres-1 psql -U postgres -d cnpj_database

# Reinstalar dependências
npm install  # dentro de api-server ou quoda-client
```

## Próximos Passos

1. ✅ API criada e integrada com PostgreSQL
2. ✅ React conectado à API
3. ⏳ Carregar dados reais dos CSVs (se ainda não carregou)
4. ⏳ Testar CRUD operations no dashboard
5. ⏳ Adicionar paginação e filtros avançados

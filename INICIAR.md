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

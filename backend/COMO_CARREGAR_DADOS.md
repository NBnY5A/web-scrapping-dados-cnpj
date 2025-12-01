# 📊 Como Carregar os Dados no Banco PostgreSQL

## Passo a Passo Completo

### 1️⃣ Certifique-se que o PostgreSQL está rodando

```bash
docker ps
```

Se não estiver rodando:

```bash
cd /Users/marcosalbuquerque/Documents/web-scrapping-dados-cnpj/server
docker-compose up -d
```

### 2️⃣ Crie as tabelas no banco de dados

```bash
cd /Users/marcosalbuquerque/Documents/web-scrapping-dados-cnpj/server
source venv/bin/activate
PYTHONPATH=. python app/database/create_db.py
```

Você deve ver a mensagem:
```
✅ Tabelas criadas com sucesso!
```

### 3️⃣ Execute o carregamento dos dados

```bash
PYTHONPATH=. python app/database/load_data.py
```

## ⏱️ Tempo Estimado

- **Cnaes.csv** (86KB): ~1 segundo
- **Empresas1-9.csv** (~3GB total): **15-30 minutos**

## 📋 O que será carregado

### Arquivos disponíveis:
✅ `Cnaes.csv` - Códigos de atividade econômica  
✅ `Empresas1.csv` até `Empresas9.csv` - Dados das empresas  
❌ `Paises.csv` - **Não encontrado** (será pulado)

### Ordem de carregamento:
1. Países (será pulado - arquivo não existe)
2. **CNAEs** → Tabela `cnaes`
3. **Empresas** → Tabela `empresas` (9 arquivos)

## 🔍 Monitorar o progresso

Durante a execução, você verá mensagens como:

```
Iniciando carga de dados do Cnaes...
Carga de CNAEs concluída. Total de registros: 1350

Iniciando carga de dados de Empresas do arquivo: dados_cnpj/2025-11/Empresas1.csv...
✅ Carga de Empresas concluída. Total de registros: 500000
```

## ✅ Verificar se os dados foram carregados

Depois que terminar, conecte ao PostgreSQL:

```bash
docker exec -it server-postgres-1 psql -U postgres -d cnpj_database
```

Dentro do PostgreSQL, execute:

```sql
-- Ver quantas empresas foram carregadas
SELECT COUNT(*) FROM empresas;

-- Ver quantos CNAEs foram carregados
SELECT COUNT(*) FROM cnaes;

-- Ver alguns exemplos de empresas
SELECT cnpj, razao_social, porte FROM empresas LIMIT 5;

-- Sair do PostgreSQL
\q
```

## 🐛 Problemas Comuns

### Erro: "ModuleNotFoundError: No module named 'app'"
**Solução:** Use `PYTHONPATH=.` antes do comando:
```bash
PYTHONPATH=. python app/database/load_data.py
```

### Erro: "could not connect to server"
**Solução:** PostgreSQL não está rodando. Inicie o Docker:
```bash
docker-compose up -d
```

### Erro: "relation empresas does not exist"
**Solução:** Execute primeiro o `create_db.py`:
```bash
PYTHONPATH=. python app/database/create_db.py
```

### Processo muito lento
**Situação normal:** São 3GB de dados! Pode demorar 15-30 minutos.

### Erro de memória
**Solução:** O código já usa chunking. Se mesmo assim falhar, aumente a memória do Docker em Preferences > Resources.

## 🚀 Comando Único (tudo junto)

```bash
cd /Users/marcosalbuquerque/Documents/web-scrapping-dados-cnpj/server && \
source venv/bin/activate && \
PYTHONPATH=. python app/database/create_db.py && \
PYTHONPATH=. python app/database/load_data.py
```

## 📊 Depois de carregar

Com os dados carregados, você pode:

1. **Iniciar a API:**
   ```bash
   cd ../api-server
   npm run dev
   ```

2. **Iniciar o React:**
   ```bash
   cd ../quoda-client
   npm run dev
   ```

3. **Acessar o dashboard:** http://localhost:5173

Os gráficos agora mostrarão dados **reais** do banco PostgreSQL! 🎉

# Antes de executar o projeto...

Verifique se você possui o **Python** instalado em sua máquina, abra um terminal e digite o seguinte comando:

Para Windows: 
```bash
python --version
```

Para Linux: 
```bash
python3 --version
```

Se aparecer uma mensagem mostrando a versão do python, prossiga, caso contrário, baixe uma versão do Python 3.10+.

# Configurando o ambiente

Clone o projeto `git clone https://github.com/NBnY5A/web-scrapping-dados-cnpj.git`, abra a pasta do projeto clonado.

Após ter verificado que você possui o Python instalado, é **fortemente recomendado** que você crie um ambiente virtual Python para que você isole as dependências do projeto e não haja conflito com as bibliotecas instaladas na sua máquina.

Para criar um ambiente virtual Python siga esses passos:

## Para Windows:

1. Na pasta raiz do projeto clonado, abra um terminal e digite o seguinte comando:

```bash
python -m venv venv
``` 

_Obs_: _Venv significa Virtual Enviroment_

2. Após a finalização da criação do ambiente virtual, é necessário ativá-lo, digite o seguinte comando para entrar/ativar o ambiente virtual:

```bash
venv\Scripts\Activate
```
Se o comando estiver sido executado corretamente, você deverá ver no seu terminal a palavra (venv) antes do caminho do projeto.

3. Após isso, baixe as dependências do projeto dentro do venv:

```bash
pip install -r requirements.txt
```

Após isso será possível testar o projeto sem problemas.


## Para Linux/Mac:
1. Na pasta raiz do projeto clonado, abra um terminal e digite o seguinte comando:
```bash
python3 -m venv venv
```

_Obs_: No linux, por padrão, o python não vem com o ambiente virtual, caso você não o tenho, o terminal irá fornecer o comando para você instalá-lo.

2. Após a finalização da criação do ambiente virtual, é necessário ativá-lo, digite o seguinte comando para entrar/ativar o ambiente virtual:

```bash
source venv/bin/activate
```

3. Após isso, baixe as dependências do projeto dentro do venv:

```bash
pip install -r requirements.txt
```

# Executando o Projeto

Após ter instalado as dependências do projeto, execute o arquivo **`main.py`**, ele irá baixar e criar uma pasta contendo os arquivos do **Dados Abertos Cnpj** no formato CSV.

Aguarde até que todos os arquivos tenham sido baixados. Após isso, inicie uma instância do Postgres seja local ou via Docker e faca o seguinte:

1. Copie o arquivo .env.example e renomeie para .env:

```bash
cp .env.example .env
```

2. Defina os parâmetros no arquivo `.env`:

```bash
POSTGRES_DB=nome_do_banco
POSTGRES_USER=seu_usuario_do_banco
POSTGRES_PASSWORD=sua_senha
DATABASE_URL=a_string_de_conexao_com_o_banco #postgresql+psycopg2://seu_usuario_do_banco:sua_senha@instancia_do_banco:porta/nome_do_banco
```

Obs: Para executar o banco de dados via docker, na pasta raiz do projeto, onde possui o arquivo **`docker-compose.yml`**, no terminal digite o comando:
```bash
docker compose up -d
```

Ele irá automaticamente baixar uma imagem do Postgres caso não tenha e irá subir o banco de dados.

3. Após definir os parâmetros e verificar que você possui o banco ativo. Execute o arquivo **`create_db.py`**. Esse arquivo criará as entidades dentro do seu banco de dados.

4. Após a criacão das entidades no banco de dados, você precisará extrair os dados contidos nos CSV's e colocá-los dentro do seu banco.
Para isso, basta executar o arquivo **`load_data.py`**. Esse arquivo contém as funcões responsáveis para lidar com os CSV's e transformá-los em dados estruturados contidos no **`models.py`**.


# Estrutura do Projeto - Backend (Completa)

```bash
.
├── database  # Diretório referente ao banco de dados
│   ├── create_db.py  # Código responsável pela criacão das entidades no banco
│   ├── load_data.py  # Funcões que convertem o CSV em dados do models.py e insere-os dentro do banco
│   └── models.py  # Representacão das entidades em modelos Python
├── main.py  # Arquivo de inicializacão principal
├── scraper  # Diretório responsável pela extracão de dados do site
│   ├── downloader.py  # Arquivo onde contém a funcão para baixar os dados
│   └── parser.py  # Arquivo onde tem a funcão para definir os padrões dos dados a serem baixados
├── transformer  # Diretório responsável pela extracão dos arquivos CSV's
│   └── extract_info_csv.py  # Contém a funcão que usará uma estratégia de particionamento dos CSV's (chunks) para a extracão dos dados
└── utils  # Diretório com funcões úteis
    └── file_utils.py  # Contém algumas funcões úteis para lidar com arquivos
```
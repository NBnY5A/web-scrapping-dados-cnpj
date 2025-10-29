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


## Para Linux:
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

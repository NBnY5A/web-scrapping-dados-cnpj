from sqlalchemy import create_engine
import traceback
import os
from dotenv import load_dotenv
from models import Base, Empresas, Cnae, Estabelecimentos, Socios, Pais

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


def create_database_schema():
    print("Conectando ao banco de dados...")

    try:
        engine = create_engine(
            url=DATABASE_URL,
            echo=False
        )

        print("✅ Conexão realizada com sucesso!")
        print("Criando tabelas...")

        Base.metadata.create_all(engine)

        print("✅ Esquema do banco de dados (todas as tabelas) criado com sucesso!")
    
    except Exception as e:
        print("Houve um erro inesperado!", e)
        traceback.print_exc()


if __name__ == "__main__":
    create_database_schema()
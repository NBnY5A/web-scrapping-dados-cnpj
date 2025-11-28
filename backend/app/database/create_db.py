from sqlalchemy import create_engine
from sqlalchemy.engine.base import Engine
import traceback
import os
from dotenv import load_dotenv
from app.database.models import Base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
_ENGINE: Engine | None = None


def get_engine() -> Engine | None:
    global _ENGINE

    if _ENGINE is None:
        print("Criando nova Engine...")
        try:
            _ENGINE = create_engine(
                url=DATABASE_URL,
                echo=True
            )
            print("✅ Nova Engine criada com sucesso!")
        
        except Exception as e:
            print("Houve um erro inesperado ao criar a Engine!", e)
            traceback.print_exc()
            _ENGINE = None
            raise 

    return _ENGINE


def create_database_schema(engine: Engine):
    """Cria o esquema do banco de dados (todas as tabelas) se não existirem."""

    try:
        print("Criando tabelas...")

        Base.metadata.create_all(engine)

        print("✅ Esquema do banco de dados (todas as tabelas) criado com sucesso!")
    
    except Exception as e:
        print("Houve um erro inesperado!", e)
        traceback.print_exc()



if __name__ == "__main__":
    try:
        engine_instance = get_engine()
        create_database_schema(engine=engine_instance)

    except Exception as e:
        print("Falha ao cria banco de dados!", e)
        traceback.print_exc()
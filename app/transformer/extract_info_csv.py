import pandas as pd
from typing import List
from app.database.create_db import get_engine
from app.database.models import Cnae
from sqlalchemy.orm import Session

SEPARATOR = ";"
ENGINE = get_engine()

def read_csv_chuncked(file_path: str, chunk_size: int = 10000, columns_name: List[str] = None):
    """Lê um arquivo CSV em partes (chunks) para processamento em lotes."""
    return pd.read_csv(
        filepath_or_buffer=file_path,
        sep=SEPARATOR,
        encoding="latin-1",
        chunksize=chunk_size,
        header=None,
        names=columns_name,
        low_memory=False
    )


def load_cnaes(file_path, engine):
    column_names = ["codigo_cnae", "descricao"]
    total_loaded = 0

    try:
        chunks = read_csv_chuncked(file_path=file_path, columns_name=column_names)
        
        for chunk in chunks:
            chunk = chunk[["codigo_cnae", "descricao"]].copy() 

            chunk["codigo_cnae"] = chunk["codigo_cnae"].astype(str)
            chunk["descricao"] = chunk["descricao"].astype(str)

            with Session(engine) as session:
                chunk.to_sql(Cnae.__tablename__, engine, if_exists="append", index=False)
                session.commit()
            
            total_loaded += len(chunk)
        
        print(f"Carga de CNAEs concluída. Total de registros: {total_loaded}")

    except Exception as e:
        print("Falha ao salvar dados do Cnaes no banco de dados.", e)
        print("Abortando...")


if __name__ == "__main__":
    # Exemplo...
    load_cnaes(file_path="dados_cnpj/2025-11/Cnaes.csv", engine=ENGINE)
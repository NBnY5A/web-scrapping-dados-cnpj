import pandas as pd
from typing import List


SEPARATOR = ";"

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
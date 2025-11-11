import os
import requests


def download_files(file_url: str, file_path: str):
    directory = os.path.dirname(file_path)

    if not os.path.exists(file_path):
        print(f"Baixando arquivo...")

        if directory:
            os.makedirs(directory, exist_ok=True)

        try:
            with requests.get(file_url, stream=True, timeout=60) as r:
                r.raise_for_status()
                with open(file_path, "wb") as f:
                    for chunk in r.iter_content(chunk_size=16384):
                        f.write(chunk)
            print("Download concluído com sucesso.")
        except Exception as e:
            print(f"Erro durante o download de {file_url}: {e}")
        
    else:
        print("Arquivo já baixado, ignorando...")
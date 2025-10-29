import os
import requests


def download_files(file_url: str, file_path: str):
    if not os.path.exists(file_path):
        print(f"Baixando arquivo...")
        with requests.get(file_url, stream=True, timeout=60) as r:
            r.raise_for_status()
            with open(file_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=16384):
                    f.write(chunk)

    else:
        print("Arquivo já baixado, ignorando...")
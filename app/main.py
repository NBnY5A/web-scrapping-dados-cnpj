import requests
import os
import re
from downloader import download_files
from app.utils.file_utils import extract_zip, purge_zip_files, rename_files_to_csv
from parser import get_files_from_folder, get_folders


BASE_URL = "https://arquivos.receitafederal.gov.br/dados/cnpj/dados_abertos_cnpj/"

DEST_DIR = "dados_cnpj"

# TODO: Ajustar a lógica dessa função para baixar tudo antes e depois extrair.
def main():
    response = requests.get(BASE_URL)
    folders = get_folders(response.text)
    
    last_folder = sorted(folders)[-1] # Para fins de exemplo, peguei a pasta mais recente
    
    print(f"Última pasta encontrada: {last_folder}")

    print("Baixando conteúdo da pasta...")
    resp = requests.get(BASE_URL + last_folder)
    
    patterns = [
        re.compile(r"^Cnaes.*\.zip$"),
        re.compile(r"^Empresas.*\.zip$"),
        # re.compile(r"^Estabelecimentos.*\.zip$"),
        # re.compile(r"^Socios.*\.zip$")
    ]
    
    files = get_files_from_folder(resp.text, patterns)
    print(f"Arquivos encontrados: {files}")
    
    for file in files:
        file_url = BASE_URL + last_folder + file
        file_path = os.path.join(DEST_DIR, file)
        download_files(file_url, file_path)

        if file.endswith(".zip"):
            extract_zip(file_path, DEST_DIR)

    purge_zip_files(DEST_DIR)

    rename_files_to_csv(DEST_DIR)
    

if __name__ == "__main__":
    main()
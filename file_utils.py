import zipfile
import os
import re


def extract_zip(file_path, dest_dir):
    print(f"Extraindo {file_path}...")

    try:
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.testzip()
            print(f"{file_path} é um arquivo ZIP válido. Extraindo...")

            zip_ref.extractall(dest_dir)
            print(f"Arquivo extraído para {dest_dir}")
    
    except zipfile.BadZipFile:
        print(f"Erro: {file_path} não é um arquivo ZIP válido.")
    except Exception as e:
        print(f"Erro desconhecido ao tentar abrir o arquivo ZIP {file_path}: {e}")


def purge_zip_files(path: str):
    for file in os.listdir(path):
        if file.endswith(".zip"):
            file_path = os.path.join(path, file)
        
            print(file_path)
            os.remove(file_path)
            print(f"Arquivo excluído: {file_path}")
    
    print("Arquivos \".zip\" excluídos com sucesso.")


# TODO: Essa função ainda não está 100% funcional, corrigir depois.
def rename_files_to_csv(path: str):
    pattern = re.compile(r"^(.*)CSV$")

    for file in os.listdir(path):
        if file.endswith("CSV"):
            match = pattern.match(file)
            print(match)
            if match:
                new_name = match.group(1) + ".csv"

                old_file_path = os.path.join(path, file)
                new_file_path = os.path.join(path, new_name)

                os.rename(old_file_path, new_file_path)
                print(f"Arquivo \"{file}\" renomeado com sucesso para -> \"{new_name}\"")
    

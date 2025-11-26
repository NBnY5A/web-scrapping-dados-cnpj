import zipfile
import os
from typing import List


def extract_zip(file_path, dest_dir):
    print(f"Extraindo {file_path}...")

    file_name = os.path.splitext(os.path.basename(file_path))[0]

    csv_file_name = f"{file_name}.csv"

    csv_file_path = os.path.join(dest_dir, csv_file_name)

    try:
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.testzip()
            print(f"{file_path} é um arquivo ZIP válido. Extraindo...")

            internal_zip_file_name = zip_ref.namelist()[0]  # Se o arquivo Zip tiver mais de 1 arquivo, extrai o primeiro

            zip_file_path = os.path.join(dest_dir, internal_zip_file_name)

            zip_ref.extractall(dest_dir)

            if os.path.exists(zip_file_path):
                os.rename(zip_file_path, csv_file_path)
                print(f"Arquivo extraído e renomeado para -> \"{csv_file_path}\"")
            else:
                print(f"Erro: Arquivo extraído não encontrado em {zip_file_path}")
    
    except IndexError:
        print(f"Erro: O arquivo ZIP {file_path} está vazio.")

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


def get_all_files(path: str = "dados_cnpj/2025-11") -> List[str]:
    try:
        return (os.listdir(path))
    except Exception as e:
        print("Houve um erro ao retornar arquivos desse caminho!")
        print("Verifique se o diretório existe ou se o caminho passado está correto")
        print("Erro: ", e)
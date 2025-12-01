from app.transformer.extract_info_csv import read_csv_chuncked
import traceback
from sqlalchemy.orm import Session
from app.database.models import Cnae, Pais, Empresas
from app.database.create_db import get_engine
from app.utils.file_utils import get_all_files


FILES_TO_LOAD_DATA: list[str] | None = get_all_files()
LOAD_ORDER = [
    "Paises",
    "Cnaes",
    "Empresas",
    "Estabelecimentos",
    "Socios"
]
ENGINE = get_engine()


def handle_load(files_names: list[str]):

    file_map = {}

    for name in files_names:
        key = name.split(".")[0].rstrip("0123456789")
        file_map.setdefault(key, []).append(name)
    

    for table_name in LOAD_ORDER:

        files = file_map.get(table_name, [])

        if not files:
            print(f"⚠️  Nenhum arquivo encontrado para a tabela {table_name}")
            continue
    
        for file_name in files:
            file_path = "./dados_cnpj/2025-11/" + file_name
            if table_name == "Cnaes":
                load_cnaes(file_path=file_path, engine=ENGINE)

            elif table_name == "Socios":
                load_socios(file_path=file_path, engine=ENGINE)

            elif table_name == "Estabelecimentos":
                load_estabelecimentos(file_path=file_path, engine=ENGINE)

            elif table_name == "Empresas":
                load__empresas(file_path=file_path, engine=ENGINE)

            elif table_name == "Paises":
                load_paises(file_path=file_path, engine=ENGINE)

            else:
                print(f"Os arquivos {table_name} estão fora do escopo desse projeto!")
                raise ValueError


def load_paises(file_path, engine):
    import os
    
    if not os.path.exists(file_path):
        print(f"⚠️  Arquivo {file_path} não encontrado. Pulando carga de Países...")
        return
    
    column_names = ["id_pais", "nome"]
    total_loaded = 0

    print("Iniciando carga de dados de Países...")

    with Session(engine) as session:
        try:
            chunks = read_csv_chuncked(file_path=file_path, columns_name=column_names)

            for chunk in chunks:
                chunk = chunk[["id_pais", "nome"]].copy()

                chunk["id_pais"] = chunk["id_pais"].astype(int)
                chunk["nome"] = chunk["nome"].astype(str)

                chunk.to_sql(Pais.__tablename__, engine, if_exists="append", index=False)
                session.commit()

                total_loaded += len(chunk)
            
            print(f"✅ Carga de Países concluída. Total de registros: {total_loaded}")

        except Exception as e:
            session.rollback()
            print(f"❌ Falha ao salvar dados de Paises no banco de dados do arquivo {file_path}. Detalhes: {e}")
            traceback.print_exc()
            print("Abortando...")


def load_cnaes(file_path, engine):
    import os
    
    if not os.path.exists(file_path):
        print(f"⚠️  Arquivo {file_path} não encontrado. Pulando carga de CNAEs...")
        return
        
    column_names = ["codigo_cnae", "descricao"]
    total_loaded = 0
    LIMITE_TESTE = 100  # 🔥 APENAS 100 CNAEs PARA TESTE

    print(f"📥 Iniciando carga de dados do arquivo: {file_path}...")
    print(f"⚠️  MODO TESTE: Carregando apenas {LIMITE_TESTE} registros")

    with Session(engine) as session:
        try:
            chunks = read_csv_chuncked(file_path=file_path, columns_name=column_names)
            
            for chunk in chunks:
                chunk = chunk[["codigo_cnae", "descricao"]].copy() 

                chunk["codigo_cnae"] = chunk["codigo_cnae"].astype(str)
                chunk["descricao"] = chunk["descricao"].astype(str)

                chunk.to_sql(Cnae.__tablename__, engine, if_exists="append", index=False)
                session.commit()
                
                total_loaded += len(chunk)
                
                # 🔥 PARAR APÓS LIMITE DE TESTE
                if total_loaded >= LIMITE_TESTE:
                    print(f"⚠️  Limite de teste atingido ({LIMITE_TESTE} registros)")
                    break
            
            print(f"✅ Carga de CNAEs concluída. Total de registros: {total_loaded}")

        except Exception as e:
            session.rollback()
            print(f"❌ Falha ao salvar dados de Cnaes no banco de dados do arquivo {file_path}. Detalhes: {e}")
            traceback.print_exc()
            print("Abortando...")


def load__empresas(file_path, engine):
    column_names = [
        "cnpj",
        "razao_social",
        "natureza_juridica",
        "qualificacao_responsavel",
        "capital_social",
        "porte",
        "ente_federativo"
    ]

    total_loaded = 0
    LIMITE_TESTE = 1000  # 🔥 APENAS 1000 EMPRESAS PARA TESTE
    print(f"📥 Iniciando carga de dados de Empresas do arquivo: {file_path}...")
    print(f"⚠️  MODO TESTE: Carregando apenas {LIMITE_TESTE} registros")

    with Session(engine) as session:
            try:
                chunks = read_csv_chuncked(file_path=file_path, columns_name=column_names)
                
                for chunk in chunks:
                    final_cols = [
                        "cnpj", "razao_social", "natureza_juridica", 
                        "qualificacao_responsavel", "capital_social", 
                        "porte", "ente_federativo"
                    ]
                    chunk = chunk[final_cols].copy() 

                    chunk["cnpj"] = chunk["cnpj"].astype(str).str.zfill(8) 

                    chunk["razao_social"] = chunk["razao_social"].astype(str)

                    chunk["natureza_juridica"] = chunk["natureza_juridica"].astype(str)

                    chunk["qualificacao_responsavel"] = chunk["qualificacao_responsavel"].astype(str)

                    chunk["capital_social"] = (chunk["capital_social"]
                                               .astype(str)
                                               .str.replace(",", ".", regex=False)
                                               .astype(float))

                    chunk["porte"] = chunk["porte"].astype(str)

                    chunk["ente_federativo"] = chunk["ente_federativo"].astype(str)
                    
                    chunk.to_sql(Empresas.__tablename__, session.bind, if_exists="append", index=False)
                    
                    total_loaded += len(chunk)
                    
                    # 🔥 PARAR APÓS LIMITE DE TESTE
                    if total_loaded >= LIMITE_TESTE:
                        print(f"⚠️  Limite de teste atingido ({LIMITE_TESTE} registros)")
                        break
                
                session.commit()
                print(f"✅ Carga de Empresas concluída. Total de registros: {total_loaded}")

            except Exception as e:
                session.rollback()
                print(f"❌ Falha ao salvar dados de Empresas no banco de dados do arquivo {file_path}. Detalhes: {e}")
                traceback.print_exc()
                print("Abortando...")


def load_estabelecimentos(file_path, engine):
    columns_name = [

    ]
    pass


def load_socios(file_path, engine):
    pass




if __name__ == "__main__":
    handle_load(files_names=FILES_TO_LOAD_DATA)
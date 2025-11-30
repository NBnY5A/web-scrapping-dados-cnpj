"""
Módulo para download de arquivos da Receita Federal.
"""
import os
import requests
from tqdm import tqdm


def download_files(url: str, filepath: str):
    """
    Faz download de um arquivo da URL especificada.
    
    Args:
        url: URL do arquivo para download
        filepath: Caminho local onde salvar o arquivo
    """
    # Criar diretório se não existir
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    print(f"Baixando arquivo...")
    print(f"URL: {url}")
    print(f"Destino: {filepath}")
    
    try:
        # Fazer requisição com stream=True para arquivos grandes
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Obter tamanho total do arquivo
        total_size = int(response.headers.get('content-length', 0))
        
        # Baixar com barra de progresso
        with open(filepath, 'wb') as f:
            if total_size == 0:
                # Se não conseguir obter tamanho, baixar sem barra de progresso
                f.write(response.content)
            else:
                # Baixar com barra de progresso
                with tqdm(total=total_size, unit='B', unit_scale=True, desc=os.path.basename(filepath)) as pbar:
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                            pbar.update(len(chunk))
        
        print("Download concluído com sucesso.")
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro ao baixar arquivo: {e}")
        raise
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        raise

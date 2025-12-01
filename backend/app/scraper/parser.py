"""
Módulo para parsing de HTML e extração de links de arquivos.
"""
import re
from typing import List
from bs4 import BeautifulSoup


def get_folders(html_content: str) -> List[str]:
    """
    Extrai lista de pastas da página HTML da Receita Federal.
    
    Args:
        html_content: Conteúdo HTML da página
        
    Returns:
        Lista com nomes das pastas encontradas
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    folders = []
    
    # Procurar por links que representam pastas (terminam com /)
    for link in soup.find_all('a'):
        href = link.get('href', '')
        # Pastas geralmente têm formato YYYY-MM/
        if re.match(r'^\d{4}-\d{2}/$', href):
            folders.append(href)
    
    return folders


def get_files_from_folder(html_content: str, patterns: List[re.Pattern]) -> List[str]:
    """
    Extrai lista de arquivos da página HTML baseado em padrões regex.
    
    Args:
        html_content: Conteúdo HTML da página
        patterns: Lista de padrões regex para filtrar arquivos
        
    Returns:
        Lista com nomes dos arquivos que correspondem aos padrões
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    files = []
    
    # Procurar por links de arquivos
    for link in soup.find_all('a'):
        href = link.get('href', '')
        
        # Verificar se o arquivo corresponde a algum padrão
        for pattern in patterns:
            if pattern.match(href):
                files.append(href)
                break  # Evitar duplicatas se múltiplos padrões coincidirem
    
    return files

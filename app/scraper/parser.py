from typing import List
from bs4 import BeautifulSoup


def get_folders(response_text: str) -> List[str]:
    soup = BeautifulSoup(response_text, "html.parser")
    return [a["href"] for a in soup.find_all("a") if a["href"].endswith("/") and a["href"] not in ("../", "temp/", "/dados/cnpj/")]


def get_files_from_folder(folder: str, patterns: List[str]) -> List[str]:
    soup = BeautifulSoup(folder, "html.parser")
    return [a["href"] for a in soup.find_all("a", href=True) if any(pattern.match(a["href"]) for pattern in patterns)]

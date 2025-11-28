from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

# Tipos dos enums
class MatrizFilialEnumType(str, Enum):
    one = "Matriz"
    two = "Filial"

class PessoaTipo(str, Enum):
    one = "Física"
    two = "Jurídica"

# Schema dos sócios
class SocioSchema(BaseModel):
    id_socio: int
    nome: str
    tipo: PessoaTipo
    documento: str
    qualificacao: str
    cpf_representante_legal: Optional[str] = None

    class Config:
        orm_mode = True

# Schema de estabelecimentos
class EstabelecimentoSchema(BaseModel):
    cnpj: str
    nome_fantasia: str
    identificador_matriz_filial: MatrizFilialEnumType

    class Config:
        orm_mode = True

# Schema principal das empresas
class EmpresaSchema(BaseModel):
    cnpj: str
    razao_social: str
    natureza_juridica: str
    qualificacao_responsavel: str
    capital_social: float
    porte: str
    ente_federativo: str

    # relacionamentos (opcional, se quiser trazer junto)
    estabelecimentos: Optional[List[EstabelecimentoSchema]] = []
    socios: Optional[List[SocioSchema]] = []

    class Config:
        orm_mode = True

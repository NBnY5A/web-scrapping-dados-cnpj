import enum
from typing import List
from sqlalchemy import String, Float, ForeignKey, Enum
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.orm import DeclarativeBase, Mapped

"""
    References:
        - https://docs.sqlalchemy.org/en/20/orm/quickstart.html#declare-models
        - https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column
"""


# TODO: Implementar o restante das classes e verificar se os relacionamentos estão corretos.

class Base(DeclarativeBase):
    pass


class MatrizFilialEnumType(enum.Enum):
    one = "Matriz"
    two = "Filial"


class Empresas(Base):
    __tablename__ = "empresas"

    cnpj: Mapped[String] = mapped_column(String(8), primary_key= True)
    razao_social: Mapped[String] =  mapped_column(String(150))
    natureza_juridica: Mapped[String] = mapped_column(String(150))
    qualificacao_responsavel: Mapped[String] = mapped_column(String(150))
    capital_social: Mapped[Float] = mapped_column(Float(4))
    porte: Mapped[String] = mapped_column(String(40))
    ente_federativo: Mapped[String] = mapped_column(String(40))
    estabelecimento: Mapped[List["Estabelecimentos"]] = relationship()

    def __repr__(self) -> str:
        return (
            f"Empresa(cnpj={self.cnpj}, razao_social={self.razao_social}, "
            f"natureza_juridica={self.natureza_juridica}, qualificacao_responsavel={self.qualificacao_responsavel}, "
            f"capital_social={self.capital_social}, porte={self.porte}, ente_federativo={self.ente_federativo})"
        )
    

class Estabelecimentos(Base):
    __tablename__ = "estabelecimentos"

    cnpj: Mapped[String] = mapped_column(String(14), primary_key=True)
    cnpj_basico: Mapped[List["Empresas"]] = mapped_column(ForeignKey("empresas.cnpj"))
    identificador_matriz_filial: Mapped[Enum] = mapped_column(MatrizFilialEnumType)
    nome_fantasia: Mapped[String] = mapped_column(String(150))
    cnae_fiscal_principal: Mapped[List["Cnae"]] = relationship()
    id_pais: Mapped[List["Pais"]] = relationship()


class Cnae(Base):
    pass


class Pais(Base):
    pass
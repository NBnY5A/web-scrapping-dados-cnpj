import enum
from typing import List
from sqlalchemy import String, Float, Integer, Date, ForeignKey, Enum, Table, Column
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.orm import DeclarativeBase, Mapped

"""
    References:
        - https://docs.sqlalchemy.org/en/20/orm/quickstart.html#declare-models
        - https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column
"""

class Base(DeclarativeBase):
    pass


class MatrizFilialEnumType(enum.Enum):
    one = "Matriz"
    two = "Filial"

class PessoaTipo(enum.Enum):
    one = "Física"
    two = "Jurídica"


estabelecimento_cnaes_secundarios = Table(
    "estabelecimento_cnaes_secundarios",
    Base.metadata,
    Column("estabelecimento_cnpj", String(14), ForeignKey("estabelecimentos.cnpj"), primary_key=True),
    Column("cnae_codigo", String(15), ForeignKey("cnaes.codigo_cnae"), primary_key=True)
)

class Empresas(Base):
    __tablename__ = "empresas"

    cnpj: Mapped[str] = mapped_column(String(8), primary_key= True)
    razao_social: Mapped[str] =  mapped_column(String(150))
    natureza_juridica: Mapped[str] = mapped_column(String(150))
    qualificacao_responsavel: Mapped[str] = mapped_column(String(150))
    capital_social: Mapped[float] = mapped_column(Float(4))
    porte: Mapped[str] = mapped_column(String(40))
    ente_federativo: Mapped[str] = mapped_column(String(40))

    estabelecimentos: Mapped[List["Estabelecimentos"]] = relationship(
        back_populates="empresa"
    )

    socios: Mapped[List["Socios"]] = relationship(
        back_populates="empresa"
    )

    def __repr__(self) -> str:
        return (
            f"Empresa(cnpj={self.cnpj}, razao_social={self.razao_social}, "
            f"natureza_juridica={self.natureza_juridica}, qualificacao_responsavel={self.qualificacao_responsavel}, "
            f"capital_social={self.capital_social}, porte={self.porte}, ente_federativo={self.ente_federativo})"
        )
    

class Estabelecimentos(Base):
    __tablename__ = "estabelecimentos"

    cnpj: Mapped[str] = mapped_column(String(14), primary_key=True)

    cnpj_basico: Mapped[str] = mapped_column(ForeignKey("empresas.cnpj"))
    cnae_principal_codigo: Mapped[str] = mapped_column(ForeignKey("cnaes.codigo_cnae"))
    pais_id: Mapped[int] = mapped_column(ForeignKey("pais.id_pais"))

    identificador_matriz_filial: Mapped[MatrizFilialEnumType] = mapped_column(Enum(MatrizFilialEnumType))
    nome_fantasia: Mapped[str] = mapped_column(String(150))

    empresa: Mapped["Empresas"] = relationship(
        back_populates="estabelecimentos"
    )

    cnae_fiscal_principal: Mapped["Cnae"] = relationship(
        back_populates="estabelecimentos_principais"
    )

    cnaes_secundarios: Mapped[List["Cnae"]] = relationship(
        secondary=estabelecimento_cnaes_secundarios,
        back_populates="estabelecimentos_secundarios"
    )

    pais: Mapped["Pais"] = relationship(back_populates="estabelecimentos")
    


class Socios(Base):
    __tablename__ = "socios"

    id_socio: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    cnpj_basico: Mapped[str] = mapped_column(ForeignKey("empresas.cnpj"))
    nome: Mapped[str] = mapped_column(String(150))
    tipo: Mapped[PessoaTipo] = mapped_column(Enum(PessoaTipo))
    documento: Mapped[str] = mapped_column(String(20))
    qualificacao: Mapped[str] = mapped_column(String(100))
    id_pais: Mapped[int | None] = mapped_column(ForeignKey("pais.id_pais"), nullable=True)
    data_entrada_sociedade: Mapped[Date] = mapped_column(Date)
    cpf_representante_legal: Mapped[str | None] = mapped_column(String(14), nullable=True)

    empresa: Mapped["Empresas"] = relationship(back_populates="socios")
    pais: Mapped["Pais"] = relationship(back_populates="socios")

    def __repr__(self) -> str:
        return f"Sócio(id={self.id_socio}, nome={self.nome}, tipo={self.tipo})"



class Cnae(Base):
    __tablename__ = "cnaes"

    codigo_cnae: Mapped[str] = mapped_column(String(15), primary_key=True)
    descricao: Mapped[str] = mapped_column(String(255))

    estabelecimentos_principais: Mapped[List["Estabelecimentos"]] = relationship(back_populates="cnae_fiscal_principal")
    estabelecimentos_secundarios: Mapped[List["Estabelecimentos"]] = relationship(
        secondary=estabelecimento_cnaes_secundarios,
        back_populates="cnaes_secundarios"
    )

    def __repr__(self) -> str:
        return f"CNAE(codigo={self.codigo_cnae}, descricao={self.descricao})"


class Pais(Base):
    __tablename__ = "pais"

    id_pais: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(100))

    estabelecimentos: Mapped[List["Estabelecimentos"]] = relationship(back_populates="pais")
    socios: Mapped[List["Socios"]] = relationship(back_populates="pais")

    def __repr__(self) -> str:
        return f"Pais(id={self.id_pais}, nome={self.nome})"
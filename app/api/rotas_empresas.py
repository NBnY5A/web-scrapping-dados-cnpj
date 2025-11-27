from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import Empresa
from app.schemas.empresas import EmpresaSchema

router = APIRouter(prefix="/empresas", tags=["Empresas"])

@router.get("/", response_model=list[EmpresaSchema])
def listar_empresas(db: Session = Depends(get_db)):
    return db.query(Empresa).limit(20).all()

@router.get("/{cnpj}", response_model=EmpresaSchema)
def buscar_empresa(cnpj: str, db: Session = Depends(get_db)):
    return db.query(Empresa).filter(Empresa.cnpj_basico == cnpj).first()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import empresas

app = FastAPI()

app.include_router(empresas.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API funcionando!"}
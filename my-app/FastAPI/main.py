# uvicorn main:app --reload to start up JUST the FastAPI server
# run this file instead, otherwise cannot terminate process properly

# probably change directory to .\FastAPI\ to make the database appear in that folder instead 
# of in react-experimentation

from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models

from fastapi.middleware.cors import CORSMiddleware

import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProductBase(BaseModel):
    name: str
    description: str
    price: int
    source: str
    is_available: bool


class ProductModel(ProductBase):
    p_id: int

    class Config:
        orm_mode = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post("/products/create-product", response_model=ProductModel)
async def create_product(product: ProductBase, db: db_dependency):
    db_transaction = models.Product(**product.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@app.get("/products/create-product", response_model=List[ProductModel])
async def read_products(db: db_dependency, skip: int = 0, limit = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
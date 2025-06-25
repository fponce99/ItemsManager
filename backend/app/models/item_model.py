from pydantic import BaseModel
from typing import Optional

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float

class ItemUpdate(BaseModel):
    name: str
    description: str | None = None
    price: float

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
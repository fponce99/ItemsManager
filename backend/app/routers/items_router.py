from fastapi import APIRouter, HTTPException, Path
from typing import List
from ..models.item_model import Item, ItemUpdate, ItemCreate
from ..crud.items_crud import get_all_items, add_item, update_item, delete_item

router = APIRouter(prefix="/items")

@router.get("/", response_model=List[Item])
def get_items():
    return get_all_items()

@router.post("/", response_model=Item, status_code=201)
def create_item(item: ItemCreate):
    new_id = max([i.id for i in get_items()] or [0]) + 1
    new_item = Item(id=new_id, **item.model_dump())

    return add_item(new_item)

@router.put("/{item_id}", response_model=Item)
def update_item_endpoint(item_id: int = Path(..., description="ID of the item to update"), item: ItemUpdate = ...):
    updated = update_item(item_id, item)
    if updated is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated


@router.delete("/{item_id}", status_code=204)
def delete_item_endpoint(item_id: int):
    success = delete_item(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
    return None
from typing import List, Optional
from ..models.item_model import Item, ItemUpdate

items_db = [
    Item(id=1, name="Elegant Notebook", description="A sleek and minimal notebook perfect for professionals.", price=19.99),
    Item(id=2, name="Wireless Charger", description="Charge your devices with style and efficiency.", price=29.99),
    Item(id=3, name="Smart Pen", description="Digitally capture your handwritten notes.", price=49.99),
]

def get_all_items() -> List[Item]:
    return items_db

def add_item(item: Item) -> Item:
    items_db.append(item)
    return item

def update_item(item_id: int, item_update: ItemUpdate) -> Optional[Item]:
    for index, item in enumerate(items_db):
        if item.id == item_id:
            updated_item = Item(id=item_id, **item_update.model_dump())
            items_db[index] = updated_item
            return updated_item
    return None

def delete_item(item_id: int) -> bool:
    global items_db
    initial_length = len(items_db)
    items_db = [item for item in items_db if item.id != item_id]
    return len(items_db) < initial_length
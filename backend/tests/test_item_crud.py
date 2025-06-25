import pytest
from app.crud.items_crud import get_all_items, add_item, update_item, delete_item, items_db
from app.models.item_model import Item, ItemUpdate

@pytest.fixture(autouse=True)
def reset_items_db():
    global items_db
    items_db.clear()
    items_db.extend([
        Item(id=1, name="Item A", description="First item", price=10.99),
        Item(id=2, name="Item B", description="Second item", price=15.49),
    ])
    yield

def test_get_all_items():
    items = get_all_items()

    assert len(items) == 2
    assert items[0].name == "Item A"

def test_add_item():
    new_item = Item(id=3, name="Item C", description="Third item", price=7.99)
    add_item(new_item)

    items = get_all_items()

    assert len(items) == 3
    assert items[-1].name == "Item C"

def test_update_item():
    update_data = ItemUpdate(name="Updated A", description="Updated desc", price=11.99)
    updated_item = update_item(1, update_data)
    assert updated_item is not None
    assert updated_item.name == "Updated A"

    items = get_all_items()
    assert items[0].name == "Updated A"

def test_update_nonexistent_item():
    update_data = ItemUpdate(name="No Item", description="Does not exist", price=0)
    updated_item = update_item(999, update_data)
    assert updated_item is None

def test_delete_item():
    success = delete_item(1)
    assert success is True
    items = get_all_items()
    assert len(items) == 1
    assert all(item.id != 1 for item in items)

def test_delete_nonexistent_item():
    success = delete_item(999)
    assert success is False

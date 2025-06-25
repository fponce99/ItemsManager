import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from fastapi import FastAPI
from app.models.item_model import Item, ItemUpdate
from app.crud import items_crud
from app.routers.items_router import router as items_router

app = FastAPI()
app.include_router(items_router)

client = TestClient(app)

sample_item = Item(id=1, name="Test Item", description="Test desc", price=10.0)
sample_item_update = ItemUpdate(name="Updated Name", description="Updated desc", price=20.0)

@pytest.fixture
def mock_get_all_items():
    with patch("app.crud.items_crud.get_all_items") as mock:
        yield mock

@pytest.fixture
def mock_add_item():
    with patch("app.crud.items_crud.add_item") as mock:
        yield mock

@pytest.fixture
def mock_update_item():
    with patch("app.crud.items_crud.update_item") as mock:
        yield mock

@pytest.fixture
def mock_delete_item():
    with patch("app.crud.items_crud.delete_item") as mock:
        yield mock

initial_items = [
    Item(id=1, name="Item A", description="First item", price=10.99),
    Item(id=2, name="Item B", description="Second item", price=15.49),
]

@pytest.fixture(autouse=True)
def reset_items_db():
    items_crud.items_db.clear()
    items_crud.items_db.extend(initial_items)
    yield


def test_get_items():
    response = client.get("/items/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] == "Item A"

def test_create_item_success():
    new_item = {
        "id": 3,
        "name": "Item C",
        "description": "Third item",
        "price": 20.0,
    }
    response = client.post("/items/", json=new_item)
    assert response.status_code == 201
    response_get = client.get("/items/")
    assert len(response_get.json()) == 3

def test_update_existing_item():
    update_data = {
        "name": "Updated A",
        "description": "Updated description",
        "price": 99.99
    }
    response = client.put("/items/1", json=update_data)
    assert response.status_code == 200
    assert response.json()["name"] == "Updated A"

def test_update_item_not_found(mock_update_item):
    mock_update_item.return_value = None
    response = client.put("/items/999", json=sample_item_update.model_dump())
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"

def test_delete_item_success(mock_delete_item):
    mock_delete_item.return_value = True
    response = client.delete(f"/items/{sample_item.id}")
    assert response.status_code == 204
    assert response.content == b""

def test_delete_item_not_found(mock_delete_item):
    mock_delete_item.return_value = False
    response = client.delete("/items/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"

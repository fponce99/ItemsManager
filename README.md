# ItemsManager
Full stack application to manage items, with a backend in FastAPI and frontend in React.


---

Expected result:
![alt text](/assets/image.png)

---

## Tech Stack

- Frontend:
  - React 18+
  - Vite (fast dev server and build)
  - Material UI (MUI v5+)
  - React Router v7
  - TypeScript
  - Jest + React Testing Library

- Backend:
  - Python 3.11+
  - FastAPI
  - Pydantic v2
  - pytest
  
---

## 🛠️ Backend Setup (FastAPI)

### 📌 Requirements

- Python 3.13+
- `pyenv` (optional but recommended)
- `pip` & `virtualenv` (or `venv`)

### ⚙️ Installation

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   
2. **Set up a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate

3. **Install required dependencies**:
    ```bash
    pip install -r requirements.txt

3. **Run the development server**:
    ```bash
    uvicorn main:app --reload

4. **Access the API documentation**

- [Swagger UI](http://localhost:8000/docs)
- [ReDoc](http://localhost:8000/redoc)

### 🧪 Run Unit Tests

1. Export the Python path (so test modules can resolve imports):

    ```bash
    export PYTHONPATH=$(pwd)
    ```

2. Run pytest:

    ```bash
    pytest
    ```


---

## 🛠️ Frontend Setup (React)

1. Navigate to the frontend directory:

```bash
  cd frontend
 ```

2. Install dependencies:

```bash
  npm install
 ```
3. Start the development server:
```bash
  npm run dev
 ```

4. Open your browser at http://localhost:5173.

### Development Environment
This project uses a .env file to define environment variables for local development.

### Local Setup
Create a .env file in the root of the frontend directory and add the following variable:
```
VITE_API_URL=http://localhost:8000
```
Make sure to restart the development server after adding or updating the .env file.

### Run test:
 ```bash
    cd frontend
    npm test
 ```





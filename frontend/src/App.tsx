import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemsView from './views/ItemsView';
import HomeView from "./views/HomeView.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/items" element={<ItemsView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

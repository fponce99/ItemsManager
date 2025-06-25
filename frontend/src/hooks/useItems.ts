import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
}

const ITEMS_PATH = '/items';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ITEMS_API_URL = `${API_BASE_URL}${ITEMS_PATH}`;

function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) return error.message;
    if (error instanceof Error) return error.message;
    return 'Unknown error occurred';
}


export function useItems() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch items on mount
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Item[]>(`${ITEMS_API_URL}/`);
            setItems(response.data);
        } catch (error: unknown) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };


    const createItem = async (data: Omit<Item, 'id'>) => {
        try {
            setLoading(true);
            const response = await axios.post<Item>(`${ITEMS_API_URL}/`, data);
            setItems((prev) => [...prev, response.data]);
        } catch (error: unknown) {
            setError(getErrorMessage(error));
        }finally {
            setLoading(false);
        }
    };

    const updateItem = async (id: number, data: Omit<Item, 'id'>) => {
        try {
            setLoading(true);
            const response = await axios.put<Item>(`${ITEMS_API_URL}/${id}`, data);
            setItems((prev) =>
                prev.map((item) => (item.id === id ? response.data : item))
            );
        } catch (error: unknown) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            setLoading(true);
            await axios.delete(`${ITEMS_API_URL}/${id}`);
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error: unknown) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return { items, loading, error, fetchItems, createItem, updateItem, deleteItem };
}

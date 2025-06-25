import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ItemCard from "../components/ItemCard.tsx";
import ItemDialog from "../components/ItemDialog.tsx";
import AddFab from "../components/AddFab.tsx";

import { useItems, type Item } from '../hooks/useItems'; // Ajusta la ruta según tu estructura

const ItemsView: React.FC = () => {
    const { items, loading, error, createItem, updateItem, deleteItem } = useItems();

    // Modal and form state
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [formData, setFormData] = useState<Omit<Item, 'id'>>({
        name: '',
        description: '',
        price: 0,
    });
    const [open, setOpen] = useState(false);

    const handleOpenCreate = () => {
        setEditingItem(null);
        setFormData({ name: '', description: '', price: 0 });
        setOpen(true);
    };

    const handleOpenEdit = (item: Item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.description.trim() || formData.price <= 0) {
            alert('Please fill all fields and price must be positive.');
            return;
        }

        if (editingItem) {
            updateItem(editingItem.id, formData);
        } else {
            createItem(formData);
        }

        setOpen(false);
    };

    if (loading) return <Typography>Loading items...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box
            sx={{
                padding: 4,
                minHeight: '100vh',
                background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                color: '#eee',
                position: 'relative',
            }}
        >
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#fff' }}>
                    Items Manager
                </Typography>
                <Typography variant="h6" sx={{ color: '#ccc' }}>
                    Browse, create, and organize your items
                </Typography>
            </Box>


            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <ItemCard item={item} onEdit={handleOpenEdit} onDelete={deleteItem} />
                    </Grid>
                ))}
            </Grid>

            <AddFab onClick={handleOpenCreate} />

            <ItemDialog
                open={open}
                onClose={handleClose}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isEditing={!!editingItem}
            />
        </Box>
    );
};

export default ItemsView;

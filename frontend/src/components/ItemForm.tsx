import React, {type ChangeEvent} from 'react';
import { Box, TextField } from '@mui/material';

export interface ItemFormData {
    name: string;
    description: string;
    price: number;
}

interface ItemFormProps {
    formData: ItemFormData;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ formData, onChange }) => {
    return (
        <Box>
            <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{ style: { color: '#eee' } }}
                variant="filled"
                sx={{ backgroundColor: '#333', borderRadius: 1 }}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={formData.description}
                onChange={onChange}
                required
                multiline
                rows={3}
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{ style: { color: '#eee' } }}
                variant="filled"
                sx={{ backgroundColor: '#333', borderRadius: 1 }}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                value={formData.price === 0 ? '' : formData.price}
                onChange={onChange}
                required
                inputProps={{ min: 0, step: 0.01 }}
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{ style: { color: '#eee' } }}
                variant="filled"
                sx={{ backgroundColor: '#333', borderRadius: 1 }}
            />
        </Box>
    );
};

export default ItemForm;

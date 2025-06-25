import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface ItemCardProps {
    item: Item;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
    return (
        <Card
            elevation={4}
            sx={{
                borderRadius: 3,
                height: '100%',
                backgroundColor: '#1e1e1e',
                color: '#eee',
                position: 'relative',
                paddingTop: 1,
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="grey.400" gutterBottom>
                    {item.description}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                    <AttachMoneyIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight="bold">
                        {item.price.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>

            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                }}
            >
                <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => onEdit(item)}
                    sx={{ color: '#bbb' }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => onDelete(item.id)}
                    sx={{
                        color: '#f28b82', // soft coral red
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: '#ff5252', // stronger red on hover
                        },
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        </Card>
    );
};

export default ItemCard;

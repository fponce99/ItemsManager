import React, {type FormEvent} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ItemForm, {type ItemFormData } from './ItemForm';

interface ItemDialogProps {
    open: boolean;
    onClose: () => void;
    formData: ItemFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    isEditing: boolean;
}

const ItemDialog: React.FC<ItemDialogProps> = ({
   open,
   onClose,
   formData,
   onChange,
   onSubmit,
   isEditing,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: '#222',
                    color: '#eee',
                    borderRadius: 3,
                    minWidth: 320,
                },
            }}
        >
            <DialogTitle>
                {isEditing ? 'Edit Item' : 'Add New Item'}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#bbb',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={onSubmit}>
                <DialogContent dividers>
                    <ItemForm formData={formData} onChange={onChange} />
                </DialogContent>

                <DialogActions sx={{ padding: '1rem' }}>
                    <Button type="submit" variant="contained" fullWidth>
                        {isEditing ? 'Save Changes' : 'Add Item'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ItemDialog;

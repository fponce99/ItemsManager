import React from 'react';
import { Fab, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddFabProps {
    onClick: () => void;
    ariaLabel?: string;
    sx?: object;
}

const AddFab: React.FC<AddFabProps> = ({ onClick, ariaLabel = 'add', sx }) => {
    const theme = useTheme();

    return (
        <Fab
            color="primary"
            aria-label={ariaLabel}
            onClick={onClick}
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                boxShadow: theme.shadows[6],
                ...sx,
            }}
        >
            <AddIcon />
        </Fab>
    );
};

export default AddFab;

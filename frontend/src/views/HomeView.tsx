import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeView: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleGoToItems = () => {
        navigate('/items');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                px: 3,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    ItemsManager
                </Typography>

                <Typography variant="h6" sx={{ maxWidth: 600, mb: 5, color: '#ccc' }}>
                    Easily manage your product inventory with a sleek and modern interface.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleGoToItems}
                    sx={{
                        borderRadius: 10,
                        px: 5,
                        py: 1.5,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    View Items
                </Button>
            </motion.div>
        </Box>
    );
};

export default HomeView;

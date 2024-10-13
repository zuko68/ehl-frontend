import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Container, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Define primary and secondary colors
const primaryColor = '#B8A589';
const secondaryColor = '#FFD8AA';

const categories = [
    'Food and Beverages',
    'Clothing and Textiles',
    'Electronics',
    'Health and Beauty Products',
    'Household Goods',
    'Stationery and Office Supplies',
    'Agricultural Products',
    'Construction Materials',
    'Automotive Parts',
    'Furniture',
    'Cleaning Supplies',
    'Toys and Games',
];

const Categories: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;
    const theme = useTheme();

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, categories.length - itemsPerPage));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                Browse by Category
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {categories.slice(currentIndex, currentIndex + itemsPerPage).map((category, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                height: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                backgroundColor: primaryColor, // Use primary color for the card
                                boxShadow: theme.shadows[5],
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                overflow: 'visible',
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: '#2c2c2c', // Darker text color
                                    fontWeight: 'bold', 
                                    textAlign: 'center', 
                                    fontSize: { xs: '1rem', sm: '1rem', md: '1rem' },
                                }}
                            >
                                {category}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: secondaryColor, // Use secondary color for the button
                        color: '#2c2c2c', // Darker text color for contrast
                        mx: 1,
                        '&:disabled': { backgroundColor: theme.palette.grey[500], color: '#fff' },
                        '&:hover': {
                            backgroundColor: secondaryColor, // Maintain secondary color on hover
                        },
                    }}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    size="small"
                    startIcon={<ChevronLeftIcon />}
                >
                    Prev
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: secondaryColor, // Use secondary color for the button
                        color: '#2c2c2c', // Darker text color for contrast
                        mx: 1,
                        '&:disabled': { backgroundColor: theme.palette.grey[500], color: '#fff' },
                        '&:hover': {
                            backgroundColor: secondaryColor, // Maintain secondary color on hover
                        },
                    }}
                    onClick={handleNext}
                    disabled={currentIndex >= categories.length - itemsPerPage}
                    size="small"
                    endIcon={<ChevronRightIcon />}
                >
                    Next
                </Button>
            </Box>
        </Container>
    );
};

export default Categories;

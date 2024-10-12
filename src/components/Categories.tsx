import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, IconButton, Container } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 

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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, categories.length - itemsPerPage));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: '100%', py: 5 }}>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Browse by Category
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {categories.slice(currentIndex, currentIndex + itemsPerPage).map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper 
                sx={{ 
                  p: 2, 
                  textAlign: 'center', 
                  height: '50px', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center', 
                  overflow: 'hidden' 
                }} 
                elevation={3}
              >
                <Typography variant="h6" noWrap>{category}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <IconButton 
            color="primary" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton 
            color="primary" 
            onClick={handleNext} 
            disabled={currentIndex >= categories.length - itemsPerPage}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Categories;

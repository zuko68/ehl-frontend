import React from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';
import Img1 from '../assets/img1.jpg';
import Img2 from '../assets/img2.jfif';
import Img3 from '../assets/img3.jpg';

const products = [
  { name: 'Premium Teff Grain', price: '5999br', imgSrc: Img1 },
  { name: 'Organic Spices', price: '19999br', imgSrc: Img2 },
  { name: 'Durable Footwear', price: '4999br', imgSrc: Img3 },
  { name: 'Smartphone Accessories', price: '2999br', imgSrc: Img1 },
  { name: 'Eco-Friendly Cookware', price: '14999br', imgSrc: Img2 },
  { name: 'Wireless Mouse', price: '2999br', imgSrc: Img3 },
  { name: '4K Monitor', price: '34999br', imgSrc: Img1 },
  { name: 'USB-C Hub', price: '5999br', imgSrc: Img2 },
  { name: 'Mechanical Keyboard', price: '8999br', imgSrc: Img3 },
  { name: 'Laptop Stand', price: '1999br', imgSrc: Img1 },
  { name: 'Fitness Tracker', price: '7999br', imgSrc: Img2 },
  { name: 'VR Headset', price: '9999br', imgSrc: Img3 },
];

const ProductGrid: React.FC = () => {
  return (
    <Container maxWidth={false} 
      sx={{
        maxWidth: '100%' 
      }}> 
      <Typography variant="h4" align="center" gutterBottom>
        Explore Our Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
              <img
                src={product.imgSrc}
                alt={product.name}
                style={{ 
                  maxWidth: '100%', 
                  height: '290px',  
                  objectFit: 'cover' 
                }} 
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.price}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;

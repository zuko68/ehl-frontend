import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Container } from '@mui/material';
import Img1 from '../assets/img1.jpg';
import Img2 from '../assets/img2.jfif';
import Img3 from '../assets/img3.jpg';

const products = [
  { name: 'Premium Teff Grain', price: '5999 ETB', imgSrc: Img1 },
  { name: 'Organic Spices', price: '19999 ETB', imgSrc: Img2 },
  { name: 'Durable Footwear', price: '4999 ETB', imgSrc: Img3 },
  { name: 'Smartphone Accessories', price: '2999 ETB', imgSrc: Img1 },
  { name: 'Eco-Friendly Cookware', price: '14999 ETB', imgSrc: Img2 },
  { name: 'Wireless Mouse', price: '2999 ETB', imgSrc: Img3 },
  { name: '4K Monitor', price: '34999 ETB', imgSrc: Img1 },
  { name: 'USB-C Hub', price: '5999 ETB', imgSrc: Img2 },
  { name: 'Mechanical Keyboard', price: '8999 ETB', imgSrc: Img3 },
  { name: 'Laptop Stand', price: '1999 ETB', imgSrc: Img1 },
  { name: 'Fitness Tracker', price: '7999 ETB', imgSrc: Img2 },
  { name: 'VR Headset', price: '9999 ETB', imgSrc: Img3 },
];

const ProductGrid: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Explore Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                maxWidth: 345, 
                boxShadow: 4, 
                borderRadius: 3, 
                backgroundColor: '#FFFFFF', // Default background color
                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out', 
                '&:hover': { 
                  boxShadow: 6, 
                  transform: 'scale(1.02)', 
                  backgroundColor: '#B4A266', // Change to specified color on hover
                  color: '#FFFFFF', // Change text color to white on hover
                } 
              }}
            >
              <CardMedia
                sx={{ height: 200, borderRadius: '3px 3px 0 0' }}
                image={product.imgSrc}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.price}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                  High quality product
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button size="small" variant="contained" color="primary" sx={{ backgroundColor: '#A68A58', '&:hover': { backgroundColor: '#B4A266' } }}>
                  Buy
                </Button>
                <Button size="small" variant="outlined" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;

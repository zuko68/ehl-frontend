// src/components/ProductGrid.tsx

import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Img1 from '../assets/img1.jpg';
import Img2 from '../assets/img2.jfif';
import Img3 from '../assets/img3.jpg';

const products = [
  { id: 1, name: 'Premium Teff Grain', price: '5999 ETB', imgSrc: Img1, description: 'A premium quality teff grain, rich in nutrients and perfect for healthy meals.' },
  { id: 2, name: 'Organic Spices', price: '19999 ETB', imgSrc: Img2, description: 'A variety of organic spices sourced from the best farms, ideal for enhancing your dishes.' },
  { id: 3, name: 'Durable Footwear', price: '4999 ETB', imgSrc: Img3, description: 'Comfortable and durable footwear designed for daily wear and outdoor activities.' },
  { id: 4, name: 'Smartphone Accessories', price: '2999 ETB', imgSrc: Img1, description: 'Essential accessories for your smartphone to enhance functionality and protection.' },
  { id: 5, name: 'Eco-Friendly Cookware', price: '14999 ETB', imgSrc: Img2, description: 'Sustainable and non-toxic cookware, perfect for eco-conscious cooking.' },
  { id: 6, name: 'Wireless Mouse', price: '2999 ETB', imgSrc: Img3, description: 'Ergonomic wireless mouse with precision tracking and comfortable grip.' },
  { id: 7, name: '4K Monitor', price: '34999 ETB', imgSrc: Img1, description: 'High-resolution 4K monitor providing crystal-clear visuals for work and entertainment.' },
  { id: 8, name: 'USB-C Hub', price: '5999 ETB', imgSrc: Img2, description: 'Multi-port USB-C hub for expanding connectivity options with ease.' },
  { id: 9, name: 'Mechanical Keyboard', price: '8999 ETB', imgSrc: Img3, description: 'Durable mechanical keyboard offering a tactile feel and customizable features for gamers and typists.' },
  { id: 10, name: 'Laptop Stand', price: '1999 ETB', imgSrc: Img1, description: 'Adjustable laptop stand to promote better ergonomics and airflow.' },
  { id: 11, name: 'Fitness Tracker', price: '7999 ETB', imgSrc: Img2, description: 'Advanced fitness tracker to monitor your health and fitness goals accurately.' },
  { id: 12, name: 'VR Headset', price: '9999 ETB', imgSrc: Img3, description: 'Immersive VR headset for an incredible gaming and virtual experience.' },
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
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out', 
                '&:hover': { 
                  boxShadow: 6, 
                  transform: 'scale(1.02)', 
                  backgroundColor: '#B4A266', 
                  color: '#FFFFFF',
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
                <Button size="small" variant="outlined" color="primary" component={Link} to={`/product/${index}`}>
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

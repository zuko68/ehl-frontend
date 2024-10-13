import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Container, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../contexts/CartContext'; // Import useCart
import Img1 from '../assets/img1.jpg';
import Img2 from '../assets/img2.jfif';
import Img3 from '../assets/img3.jpg';

const products = [
    { id: 1, name: 'Premium Teff Grain', price: 5999, imgSrc: Img1, description: 'A premium quality teff grain, rich in nutrients and perfect for healthy meals.' },
    { id: 2, name: 'Organic Spices', price: 19999, imgSrc: Img2, description: 'A variety of organic spices sourced from the best farms, ideal for enhancing your dishes.' },
    { id: 3, name: 'Durable Footwear', price: 4999, imgSrc: Img3, description: 'Comfortable and durable footwear designed for daily wear and outdoor activities.' },
    { id: 4, name: 'Smartphone Accessories', price: 2999, imgSrc: Img1, description: 'Essential accessories for your smartphone to enhance functionality and protection.' },
    { id: 5, name: 'Eco-Friendly Cookware', price: 14999, imgSrc: Img2, description: 'Sustainable and non-toxic cookware, perfect for eco-conscious cooking.' },
    { id: 6, name: 'Wireless Mouse', price: 2999, imgSrc: Img3, description: 'Ergonomic wireless mouse with precision tracking and comfortable grip.' },
    { id: 7, name: '4K Monitor', price: 34999, imgSrc: Img1, description: 'High-resolution 4K monitor providing crystal-clear visuals for work and entertainment.' },
    { id: 8, name: 'USB-C Hub', price: 5999, imgSrc: Img2, description: 'Multi-port USB-C hub for expanding connectivity options with ease.' },
    { id: 9, name: 'Mechanical Keyboard', price: 8999, imgSrc: Img3, description: 'Durable mechanical keyboard offering a tactile feel and customizable features for gamers and typists.' },
    { id: 10, name: 'Laptop Stand', price: 1999, imgSrc: Img1, description: 'Adjustable laptop stand to promote better ergonomics and airflow.' },
    { id: 11, name: 'Fitness Tracker', price: 7999, imgSrc: Img2, description: 'Advanced fitness tracker to monitor your health and fitness goals accurately.' },
    { id: 12, name: 'VR Headset', price: 9999, imgSrc: Img3, description: 'Immersive VR headset for an incredible gaming and virtual experience.' },
  ];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products[Number(id)];
  const { dispatch } = useCart(); // Access cart items and dispatch from context

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM', // Use the correct action type
      item: {
        id: product.id,
        name: product.name,
        quantity: 1, // Set quantity to 1 when adding a new item
        price: product.price
      },
    });
  };

  return (
    <Container sx={{ backgroundColor: 'transparent', py: 4 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton component={Link} to="/products" edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {product.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h6">{product.price}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ 
          backgroundColor: '#A68A58', 
          '&:hover': { backgroundColor: '#B4A266' }, 
          display: 'block', 
          margin: '20px auto 0' 
        }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ 
          backgroundColor: '#A68A58', 
          '&:hover': { backgroundColor: '#B4A266' }, 
          display: 'block', 
          margin: '20px auto 0' 
        }}
        component={Link} 
        to="/products" 
      >
        Back to Products
      </Button>
    </Container>
  );
};

export default ProductDetail;
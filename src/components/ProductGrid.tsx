import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
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

const ProductGrid: React.FC = () => {
  const { dispatch } = useCart(); // Access dispatch from context
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    dispatch({ type: 'ADD_ITEM', item: {
      id: product.id, name: product.name, quantity: 1,
      price: product.price
    } });

    // Update snackbar state
    setSnackbarMessage(`${product.name} added to cart!`);
    setSnackbarOpen(true);
  };

  // Close snackbar
  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Explore Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                },
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
                  {product.price} ETB
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button sx={{ backgroundColor: '#FFD8AA', color: 'black' }} size="small" variant="contained" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
                <Button size="small" variant="outlined" sx={{ color: 'black', borderColor: '#FFD8AA' }} component={Link} to={`/product/${product.id}`}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar Component */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductGrid;

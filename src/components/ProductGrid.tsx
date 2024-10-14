import React, { useState, useEffect } from 'react';
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

interface Wholesaler {
  name: string;
  email: string;
  role: string; // Assuming this will be 'wholesaler' for wholesalers
  phone_number: string;
  address: string;
  profile_image: string;
  company_name: string;
  created_at: string; // Consider using Date if you plan to parse it
  updated_at: string; // Consider using Date if you plan to parse it
}

interface Product {
  id: string; // Assuming there's an id field
  wholesaler: Wholesaler;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image: string;
  created_at: string; // Consider using Date if you plan to parse it
  updated_at: string; // Consider using Date if you plan to parse it
}

const ProductGrid: React.FC = () => {
  const { dispatch } = useCart(); // Access dispatch from context
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [products, setProducts] = useState<Product[]>([]); // Products state with type safety
  const [error, setError] = useState(''); // Error state
  const [userRole, setUserRole] = useState<string | null>(null); // State to hold user role
  const token = sessionStorage.getItem('auth-token'); // Fetch token from local storage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const error = await response.json(); // Call json() to parse the response
          console.error(error.detail); // Log the error details
          throw new Error(error.detail.detail || 'Failed to fetch products'); // Use error details if available
        }

        const data = await response.json();
        console.log(data)
        setProducts(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        setError(error.message || 'Could not fetch products. Please log in or sign up.'); // Update error state with the error message
      }
    };

    const fetchUserRole = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }

        const userData = await response.json();
        setUserRole(userData.role); // Set user role (make sure it matches your API response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        setError('Could not fetch user role.');
      }
    };

    if (token) {
      fetchProducts(); // Fetch products only if token exists
      fetchUserRole(); // Fetch user role
    }
  }, [token]);

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: product.id, // Use the id as it is without converting it to a number
        name: product.name,
        quantity: 1,
        price: product.price,
      },
    });    

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
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, mb: 4, color: '#333' }}>
        Explore Our Products
      </Typography>

      {error && (
        <Typography variant="h6" align="center" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {!token && (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button sx={{ backgroundColor: '#B8A589', color: '#1F1F1F' }} variant="contained" component={Link} to="/login">
              Sign In
            </Button>
          </Grid>
          <Grid item>
            <Button sx={{ backgroundColor: '#B8A589', color: '#1F1F1F' }} variant="contained" component={Link} to="/signup">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      )}

      {token && (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 8,
                  borderRadius: 3,
                  backgroundColor: '#FFF',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: 12,
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 200, borderRadius: '3px 3px 0 0' }}
                  image={product.image || Img1} // Fallback image if image is not defined
                  title={product.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500, color: '#666' }}>
                    Seller: {product.wholesaler.name}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#333' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.price} ETB
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  {userRole !== 'wholesaler' && (
                    <Button sx={{ backgroundColor: '#FFD8AA', color: 'black' }} size="small" variant="contained" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  )}
                  <Button size="small" variant="outlined" sx={{ color: 'black', borderColor: '#FFD8AA' }} component={Link} to={`/product/${product.id}`}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Snackbar Component */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductGrid;

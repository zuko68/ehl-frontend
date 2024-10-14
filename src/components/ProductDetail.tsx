import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Avatar
} from '@mui/material';

interface Wholesaler {
  name: string;
  email: string;
  role: string;
  phone_number: string;
  address: string;
  profile_image: string;
  company_name: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  wholesaler: Wholesaler;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = sessionStorage.getItem('auth-token');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product detail');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error: any) {
        console.error(error);
        setError(error.message || 'Could not fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id, token]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <br />
      <Card sx={{ display: 'flex', p: 2 }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          sx={{ width: 300, height: 300, objectFit: 'contain' }}
          image={product?.image}
          alt={product?.name}
        />

        {/* Product Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product?.description}
            </Typography>
            <Typography variant="h6" color="primary">
              Price: {product?.price} ETB
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {product?.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock Quantity: {product?.stock_quantity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created At: {new Date(product?.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Updated At: {new Date(product?.updated_at).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Box>
      </Card>

      {/* Wholesaler Information */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
        <Typography variant="h4">Seller Info</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                src={product?.wholesaler.profile_image}
                alt={product?.wholesaler.name}
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{product?.wholesaler.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                {product?.wholesaler.company_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {product?.wholesaler.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {product?.wholesaler.phone_number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {product?.wholesaler.address}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;

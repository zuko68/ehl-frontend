import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Chat from './chat';

// Sample data for economy statistics
const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

interface Order {
  retailer: {
    name: string;
    email: string;
    role: string;
    phone_number: string;
    address: string;
    profile_image: string;
    company_name: string;
    created_at: string;
    updated_at: string;
  };
  products: string[];
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  id: string;
}

interface User {
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

export default function Dashboard() {
  const [isWholesaler, setIsWholesaler] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null); // Added user state to hold user details
  const token = sessionStorage.getItem("auth-token");
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category: '',
    image: '',
  });

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...product,
          wholesaler: user,  // Current wholesaler's info
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Optionally, reset the form after submission
      setProduct({
        name: '',
        description: '',
        price: 0,
        stock_quantity: 0,
        category: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    if (!token) return; // Don't proceed if token doesn't exist

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setIsWholesaler(userData.role === 'wholesaler');
        setUser(userData); // Set the fetched user data to the user state
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchUserData().then(() => {
      if (!isWholesaler) {
        fetchOrders();
      }
    });
  }, [isWholesaler, token]);

  if (!token) {
    return (
      <Container>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Please Sign In or Sign Up
        </Typography>
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
      </Container>
    );
  }

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container>
      <br />
      <Grid container spacing={2}>
        {/* User Profile Card */}
        {user && (
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                height: '350px',
                borderColor: '#D4B486',
                backgroundColor: '#FAFAFA',
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)', // On hover shadow
                  transform: 'scale(1.03)', // Subtle zoom on hover
                },
              }}
            >
              <CardContent sx={{ padding: '24px' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar
                      alt={user.name}
                      src={user.profile_image}
                      sx={{
                        width: 90,
                        height: 90,
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Avatar shadow
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B8A589', fontWeight: 500 }}>
                      {user.company_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', mt: 1 }}>
                      {user.email}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {user.phone_number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {user.address}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

        )}

        {/* Economy Statistics */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Current Economy Statistics
          </Typography>

          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="black" activeDot={{ r: 8 }} />
          </LineChart>
        </Grid>

        {/* Chat Component */}
        <Grid item xs={12} md={6}>
          <Card variant="none" sx={{ borderColor: 'black', backgroundColor: 'white' }}>
            <CardContent>
              <Chat />
            </CardContent>
          </Card>
        </Grid>

        {/* Product Adding Form for Wholesalers */}
        {isWholesaler && (
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ padding: '20px', borderColor: '#B8A589', borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add a New Product
              </Typography>
              <TextField
                label="Product Name"
                fullWidth
                name="name"
                value={product.name}
                onChange={handleProductChange}
                margin="normal"
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                name="description"
                value={product.description}
                onChange={handleProductChange}
                margin="normal"
              />
              <TextField
                label="Price"
                type="number"
                fullWidth
                name="price"
                value={product.price}
                onChange={handleProductChange}
                margin="normal"
              />
              <TextField
                label="Stock Quantity"
                type="number"
                fullWidth
                name="stock_quantity"
                value={product.stock_quantity}
                onChange={handleProductChange}
                margin="normal"
              />
              <TextField
                label="Category"
                fullWidth
                name="category"
                value={product.category}
                onChange={handleProductChange}
                margin="normal"
                select
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="home">Home</MenuItem>
                {/* Add more categories as needed */}
              </TextField>
              <TextField
                label="Image URL"
                fullWidth
                name="image"
                value={product.image}
                onChange={handleProductChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                sx={{ mt: 2, backgroundColor: '#B8A589', color: '#1F1F1F' }}
              >
                Add Product
              </Button>
            </Card>
          </Grid>
        )}

        {/* Pending Orders for Retailers */}
        {!isWholesaler && (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ borderColor: 'black', backgroundColor: 'transparent' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                  Pending Orders
                </Typography>
                <List>
                  {orders.map((order) => (
                    <ListItem key={order.id}>
                      <ListItemText
                        primary={`Order ID: ${order.id}`}
                        secondary={`Retailer: ${order.retailer.name}, Total Amount: $${order.total_amount}, Status: ${order.status}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

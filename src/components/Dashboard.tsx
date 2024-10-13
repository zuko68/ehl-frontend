import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

export default function Dashboard() {
  const [isWholesaler, setIsWholesaler] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [ auth_token, set_auth_token ] = useState<string>("")

  useEffect(() => {
    // Fetch user data from the /user-me endpoint
    const fetchUserData = async () => {
      set_auth_token(localStorage.getItem('auth-token')?.toString())
      try {
        const response = await fetch('http://localhost:3000/user-me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`, // Replace with your token retrieval method
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setIsWholesaler(userData.role === 'wholesaler'); // Adjust based on your actual user data structure
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>; // Loading state
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="h6" gutterBottom>
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
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>

      {isWholesaler && (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Add New Product
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Click the button below to add a new product to your inventory.
                </Typography>
                <Button variant="contained" color="primary">
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

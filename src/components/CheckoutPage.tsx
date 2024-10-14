import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import {
    Button,
    Grid,
    Typography,
    TextField,
    Divider,
    Box,
    Paper,
    CircularProgress,
} from '@mui/material';

const CheckoutPage: React.FC = () => {
    const { state, dispatch } = useCart();
    const [formValues, setFormValues] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
    });
    const [loading, setLoading] = useState(false); // State to show loading state
    const [authToken, setAuthToken] = useState<string | null>(null); // State for auth token

    useEffect(() => {
        // Retrieve the auth token from session storage
        const token = sessionStorage.getItem('auth-token');
        setAuthToken(token); // Set the token in state
    }, []);

    // Calculate the total price of the cart
    const getTotalPrice = () => {
        return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    // Function to initialize Chapa payment
    const handleOrderSubmit = async () => {
        setLoading(true);

        try {
            // Step 1: Fetch user data
            const userResponse = await fetch('http://127.0.0.1:8000/api/v1/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`, // Include your auth token
                    'Content-Type': 'application/json',
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }

            const retailerData = await userResponse.json();

            // Prepare products array from cart
            const products = state.cartItems.map(item => ({
                id: item.id, // Adjust if your item has a different identifier
                quantity: item.quantity
            }));

            const orderData = {
                retailer: {
                    name: retailerData.name,
                    email: retailerData.email,
                    role: retailerData.role,
                    phone_number: retailerData.phone_number,
                    address: formValues.address,
                    profile_image: retailerData.profile_image,
                    company_name: retailerData.company_name,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                products: products,
                total_amount: parseFloat(getTotalPrice()), // Convert to number
                status: "pending",
                payment_status: "pending",
                payment_method: "chapa", // Adjust if necessary
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Step 2: Create order
            const orderResponse = await fetch('http://127.0.0.1:8000/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const result = await orderResponse.json();

            setLoading(false);

            if (result.status === "pending") {
                // Display success message
                alert("Order has been successfully created and is pending payment.");

                // Clear the cart
                dispatch({ type: 'CLEAR_CART' }); // Adjust this line according to your cart state management
            } else {
                console.log(result.status);
                alert("Failed to initialize payment. Please try again.");
            }

        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            alert("An error occurred while processing your payment: " + error.message);
        }
    };



    return (
        <Grid container spacing={3} sx={{ padding: '40px', backgroundColor: 'transparent' }}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Checkout
                    </Typography>

                    <Divider sx={{ marginBottom: '20px' }} />

                    <Typography variant="h6">Your Cart Items</Typography>
                    {state.cartItems.length === 0 ? (
                        <Typography variant="body1" align="center">Your cart is empty.</Typography>
                    ) : (
                        <>
                            {state.cartItems.map(item => (
                                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Typography variant="body1">{item.name} (x{item.quantity})</Typography>
                                    <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
                                </Box>
                            ))}
                            <Divider sx={{ marginBottom: '10px' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6">${getTotalPrice()}</Typography>
                            </Box>
                        </>
                    )}
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h6" align="center">Shipping & Payment Information</Typography>
                    <form noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            sx={{ marginBottom: '15px' }}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            sx={{ marginBottom: '15px' }}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleInputChange}
                            sx={{ marginBottom: '15px' }}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Shipping Address"
                            name="address"
                            value={formValues.address}
                            onChange={handleInputChange}
                            sx={{ marginBottom: '15px' }}
                            variant="outlined"
                        />

                        <Button
                            variant="contained"
                            onClick={handleOrderSubmit}
                            disabled={state.cartItems.length === 0 || loading} // Disable button during loading or if cart is empty
                            sx={{ marginTop: '20px', width: '100%', backgroundColor: '#B8A589' }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Order'}
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CheckoutPage;

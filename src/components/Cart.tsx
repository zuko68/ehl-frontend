import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../contexts/CartContext'; // Import useCart

const Cart: React.FC = () => {
    const { state, dispatch } = useCart(); // Access cart state and dispatch from context
    const { cartItems } = state; // Destructure cartItems from state

    const handleRemoveFromCart = (id: number) => {
        dispatch({ type: 'REMOVE_ITEM', id }); // Dispatch action to remove item
    };

    // Updated function to handle quantity changes
    const handleUpdateQuantity = (id: number, increment: boolean) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            if (increment) {
                // Increment quantity
                dispatch({ type: 'ADD_ITEM', item: { ...item } }); // Reuse existing item; ADD_ITEM handles increasing quantity
            } else {
                // Decrement quantity
                dispatch({ type: 'MINUS_ITEM', id }); // Dispatch MINUS_ITEM action
            }
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Container sx={{ py: 4 }}>
            <AppBar sx={{ backgroundColor: '#B4A266' }} position="static">
                <Toolbar>
                    <IconButton component={Link} to="/products" edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Cart
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: 4 }}>
                {cartItems.length === 0 ? (
                    <Typography variant="h6" textAlign="center">
                        Your cart is empty.
                    </Typography>
                ) : (
                    <List>
                        {cartItems.map((item, index) => (
                            <ListItem
                                key={item.id || index} // Fallback to the index if id is invalid
                                sx={{ borderBottom: '1px solid #ddd', justifyContent: 'space-between' }}
                            >
                                <ListItemText
                                    primary={item.name}
                                    secondary={`Quantity: ${item.quantity}`}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>

                )}
                {cartItems.length > 0 && (
                    <Box textAlign="right" sx={{ mt: 2 }}>
                        <Typography variant="h6">Total: {calculateTotalPrice()} ETB</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                            component={Link}
                            to="/checkout"
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Cart;

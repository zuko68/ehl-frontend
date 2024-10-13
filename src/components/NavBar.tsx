import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Badge,
} from "@mui/material";
import { Restaurant, ShoppingCart } from "@mui/icons-material"; // Import ShoppingCart icon
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from '../contexts/CartContext'; // Import useCart

// Add the Products page to the pages array
const pages = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Products', path: '/products' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
];

export default function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const location = useLocation();
    const { state } = useCart(); // Access cart state from context
    const totalItems = state.getTotalItems(); // Calculate total items

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #B8A589 30%, #FFD8AA 70%, #B4A266 100%, #F4AF5E 100%)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            component={Link}
                            to="/" 
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} 
                        >
                            <Restaurant />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/" 
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            እህል
                        </Typography>

                        {/* Menu Icon for Mobile */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography 
                                            component={Link} 
                                            to={page.path} 
                                            sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }} 
                                        >
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Restaurant sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link} 
                            to="/" 
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            እህል
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center', // Align items vertically
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link} 
                                    to={page.path} 
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: location.pathname === page.path ? '#FFD700' : 'white', 
                                        backgroundColor: location.pathname === page.path ? '#B8A589' : 'transparent', 
                                        '&:hover': {
                                            backgroundColor: location.pathname === page.path ? '#FFD700' : 'rgba(255, 255, 255, 0.1)', 
                                        },
                                        display: 'block',
                                        textDecoration: 'none',
                                        borderRadius: 1, 
                                    }} 
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        {/* Cart Icon with Badge on Right Side */}
                        <IconButton
                            component={Link}
                            to="/cart" // Link to the cart page
                            color="inherit"
                            sx={{ position: 'relative', ml: 2 }} // Margin for spacing
                        >
                            <Badge 
                                badgeContent={totalItems} // Show the total items in the cart
                                color="primary"
                                showZero
                                max={100}
                            >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

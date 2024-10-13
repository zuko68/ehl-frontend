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
import { Restaurant, ShoppingCart, Logout, AccountCircle } from "@mui/icons-material"; // Import AccountCircle icon
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from '../contexts/CartContext';

const pages = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Products', path: '/products' },
];

export default function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElAccount, setAnchorElAccount] = React.useState<null | HTMLElement>(null); // Account menu anchor
    const location = useLocation();
    const { state } = useCart();
    const totalItems = state.getTotalItems();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = sessionStorage.getItem('auth-token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:3000/user-me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.name); // Assuming the response has a 'username' field
                        console.log(username);
                    } else {
                        console.error("Failed to fetch user details");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    console.log(token)
                }
            }
        };

        fetchUserDetails();
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorElAccount(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        setUsername(null); // Clear the username on logout
        window.location.href = '/'; // Redirect to home
    };

    const isLoggedIn = !!sessionStorage.getItem('auth-token');

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
                            alignItems: 'center',
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
                            to="/cart"
                            color="inherit"
                            sx={{ position: 'relative', ml: 2 }} 
                        >
                            <Badge
                                badgeContent={totalItems}
                                color="primary"
                                showZero
                                max={100}
                            >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {/* Account Icon with Menu for Login and Signup */}
                        {!isLoggedIn && ( // Render AccountCircle only if not logged in
                            <IconButton
                                onClick={handleOpenAccountMenu}
                                sx={{
                                    color: 'white',
                                    ml: 2,
                                }}
                            >
                                <AccountCircle />
                            </IconButton>
                        )}
                        <Menu
                            anchorEl={anchorElAccount}
                            open={Boolean(anchorElAccount)}
                            onClose={handleCloseAccountMenu}
                        >
                            {isLoggedIn ? (
                                <>
                                    <MenuItem disabled>
                                        {username}
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        component={Link}
                                        to="/login"
                                        onClick={handleCloseAccountMenu}
                                    >
                                        Login
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/signup"
                                        onClick={handleCloseAccountMenu}
                                    >
                                        Sign Up
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                        {/* Logout Icon */}
                        {isLoggedIn && (
                            <IconButton
                                onClick={handleLogout}
                                sx={{ color: 'white', ml: 2 }}
                            >
                                <Logout />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

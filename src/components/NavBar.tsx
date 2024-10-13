import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { Restaurant } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { Grain } from "@mui/icons-material";
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

const pages = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
];

export default function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const location = useLocation(); // Get the current location

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #B8A589 30%, #FFD8AA 70%, #B4A266 100%, #F4AF5E 100%)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        component={Link} // Make the icon clickable
                        to="/" // Link to home page
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} // Only display on medium screens and up
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
                    <Grain sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'flex-end', 
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
                                    color: location.pathname === page.path ? '#FFD700' : 'white', // Highlight the active page
                                    backgroundColor: location.pathname === page.path ? '#B8A589' : 'transparent', // Change background for active page
                                    '&:hover': {
                                        backgroundColor: location.pathname === page.path ? '#FFD700' : 'rgba(255, 255, 255, 0.1)', // Hover effect
                                    },
                                    display: 'block',
                                    textDecoration: 'none',
                                    borderRadius: 1, // Optional: Add border radius for rounded buttons
                                }} 
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

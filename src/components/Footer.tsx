import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Simple email validation (you can enhance this as needed)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      // Simulate an API call
      console.log('Email submitted:', email);
      setSnackbarOpen(true);
      setEmail(''); // Clear the input field after submission
    } else {
      alert('Please enter a valid email address');
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#B4A266', color: '#fff', py: 5, marginTop: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Contact Information */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Contact Information
          </Typography>
          <Typography variant="body2">Addis Ababa – Ethiopia</Typography>
          <Typography variant="body2">(+251) 822-4545-2882</Typography>
          <Box mt={2}>
            <IconButton href="#" sx={{ color: '#fff', '&:hover': { color: '#1da1f2' } }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff', '&:hover': { color: '#E1306C' } }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff', '&:hover': { color: '#FF0000' } }}>
              <YouTube />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff', '&:hover': { color: '#0077b5' } }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="#" color="#FFD8AA" underline="none" sx={{ '&:hover': { textDecoration: 'underline', color: '#fff' } }}>
              About
            </Link>
          </Box>
          <Box>
            <Link href="#" color="#FFD8AA" underline="none" sx={{ '&:hover': { textDecoration: 'underline', color: '#fff' } }}>
              Services
            </Link>
          </Box>
          <Box>
            <Link href="#" color="#FFD8AA" underline="none" sx={{ '&:hover': { textDecoration: 'underline', color: '#fff' } }}>
              Contact
            </Link>
          </Box>
          <Box>
            <Link href="#" color="#FFD8AA" underline="none" sx={{ '&:hover': { textDecoration: 'underline', color: '#fff' } }}>
              Team
            </Link>
          </Box>
        </Grid>

        {/* Our Services */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Our Services
          </Typography>
          <Box>
            <Typography variant="body2" color="#FFD8AA">Product Listings</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="#FFD8AA">Loan and Credit Options</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="#FFD8AA">Order Management</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="#FFD8AA">Market Insights</Typography>
          </Box>
        </Grid>

        {/* Get Latest Update */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Get Latest Update
          </Typography>
          <Typography variant="body2" gutterBottom>
            Subscribe to our newsletter for the latest updates and insights.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" mt={2}>
              <TextField
                variant="outlined"
                placeholder="Enter Your Email"
                size="small"
                value={email}
                onChange={handleEmailChange}
                sx={{ backgroundColor: '#fff', borderRadius: '4px', '& .MuiOutlinedInput-root': { borderColor: '#fff' } }}
                required
              />
              <Button variant="contained" type="submit" sx={{ ml: 1, bgcolor: '#FFD8AA', color: '#2c2c2c', '&:hover': { bgcolor: '#FFC107' } }}>
                Subscribe
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>

      {/* Snackbar for Success Message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Subscription successful!
        </Alert>
      </Snackbar>

      {/* Copyright */}
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} Ehil. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

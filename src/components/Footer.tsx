import React from 'react';
import { Box, Grid, Typography, TextField, Button, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#1b1b1b', color: '#fff', py: 5 ,marginTop:'4'}}>
      <Grid container spacing={4} justifyContent="center">
        {/* Contact Information */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body2"> Addis Ababa – Ethiopia</Typography>
          <Typography variant="body2">(+251)-822-4545-2882</Typography>
          <Box mt={2}>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <YouTube />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="none">
              About
            </Link>
          </Box>
          <Box>
            <Link href="#" color="inherit" underline="none">
              Services
            </Link>
          </Box>
          <Box>
            <Link href="#" color="inherit" underline="none">
              Contact
            </Link>
          </Box>
          <Box>
            <Link href="#" color="inherit" underline="none">
              Team
            </Link>
          </Box>
        </Grid>

        {/* Our Services */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Our Services
          </Typography>
          <Box>
            <Typography variant="body2">Product Listings</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Loan and Credit Options</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Order Management</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Market Insights</Typography>
          </Box>
        </Grid>

        {/* Get Latest Update */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Get Latest Update
          </Typography>
          <Typography variant="body2" gutterBottom>
            Lorem ipsum dolor sit amet elit tel, luisnal luctus nec ullamcorper mattis pulvinar lan.
          </Typography>
          <Box display="flex" mt={2}>
            <TextField
              variant="outlined"
              placeholder="Enter Your Email"
              size="small"
              sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
            />
            <Button variant="contained" color="primary" sx={{ ml: 1 }}>
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
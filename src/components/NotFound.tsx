// components/NotFound.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h2" color="primary">
        404
      </Typography>
      <Typography variant="h5">
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        sx={{
          color: 'rgba(184, 165, 137, 0.9)', // Set the text color
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: 'rgba(184, 165, 137, 0.9)', // Light transparent background on hover
          },
        }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;

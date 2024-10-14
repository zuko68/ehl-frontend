import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset error when user modifies the input
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {
      email: '',
      password: ''
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // If no errors, handle sign-in logic
    if (!newErrors.email && !newErrors.password) {
      try {
        // API call to sign in
        const response = await fetch('http://localhost:8000/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Invalid email or password');
        }

        const data = await response.json();

        // Save the auth token in session storage
        sessionStorage.setItem('auth-token', data.access_token);

        // On successful sign-in, navigate to the dashboard
        navigate('/dashboard'); // Redirect to the dashboard
      } catch (error) {
        // Handle error (show error message to user)
        console.error('Error during sign-in:', error);
        setErrors({ ...errors, email: 'Invalid email or password' });
      }
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to sign-up page
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: { xs: '90%', sm: 400 }, // Responsive max width
        margin: '0 auto', 
        mt: { xs: 3, sm: 5 }, // Adjust margin-top for smaller screens
        padding: { xs: 2, sm: 3 }, // Adjust padding for smaller screens
        borderRadius: 2, 
        boxShadow: 3, 
        backgroundColor: '#F5F5F5',
        transition: 'all 0.3s ease-in-out', // Smooth transitions
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: '#B8A589',
          fontSize: { xs: '1.8rem', sm: '2.125rem' }, // Responsive font size
          textAlign: 'center', // Center the text on all screens
        }}
      >
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#B8A589',
              },
              '&:hover fieldset': {
                borderColor: '#FFD8AA',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFD8AA',
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#B8A589',
              },
              '&:hover fieldset': {
                borderColor: '#FFD8AA',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFD8AA',
              },
            },
          }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: '#B8A589',
            '&:hover': {
              backgroundColor: '#FFD8AA',
            },
            color: '#1F1F1F',
          }}
        >
          Sign In
        </Button>
      </form>
      <Typography 
        variant="body2" 
        sx={{ textAlign: 'center', mt: 1 }} // Center align and margin-top for spacing
      >
        Don't have an account?{' '}
        <Button 
          onClick={handleSignUp} 
          sx={{ 
            color: '#B8A589', 
            '&:hover': { textDecoration: 'underline' }, 
            fontSize: { xs: '0.9rem', sm: '1rem' } // Responsive font size
          }} 
        >
          Sign Up
        </Button>
      </Typography>
    </Box>
  );
};

export default SignInForm;

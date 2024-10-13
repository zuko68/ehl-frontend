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

  const handleSubmit = (e: React.FormEvent) => {
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
      console.log(formData);
      // Handle Sign In Logic Here (e.g., API call)

      // On successful sign-in, navigate to a different route
      navigate('/'); // Redirect to the homepage or dashboard
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to sign-up page
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: 400, 
        margin: '0 auto', 
        mt: 5, 
        padding: 3, 
        borderRadius: 2, 
        boxShadow: 3, 
        backgroundColor: '#F5F5F5' 
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#B8A589' }}>
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
      <Typography variant="body2">
        Don't have an account?{' '}
        <Button 
          onClick={handleSignUp} 
          sx={{ color: '#B8A589', '&:hover': { textDecoration: 'underline' } }} 
        >
          Sign Up
        </Button>
      </Typography>
    </Box>
  );
};

export default SignInForm;

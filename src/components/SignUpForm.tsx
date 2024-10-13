import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      console.log(formData);
      // Handle Sign Up Logic Here
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: '0 auto', mt: 5, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#F5F5F5' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#B8A589' }}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
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
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
          Sign Up
        </Button>
      </form>
      <Typography variant="body2">
        Already have an account?{' '}
        <Link component={RouterLink} to="/signin" underline="none">
          Sign In
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpForm;

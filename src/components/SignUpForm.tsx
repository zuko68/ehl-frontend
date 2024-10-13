import React, { useState } from 'react';
import { Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'retailer', // Default user type
    companyName: '', // Field for wholesaler
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '', // Error for company name
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error'); // Snackbar severity

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
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
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
    if (formData.userType === 'wholesaler' && !formData.companyName) {
      newErrors.companyName = 'Company name is required for wholesalers';
    }

    setErrors(newErrors);

    // If no errors, handle sign-up logic
    if (!Object.values(newErrors).some(error => error)) {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Signup failed');
        }

        // If signup is successful, redirect or show a success message
        setSnackbarMessage('Signup successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate('/login'); // Optionally navigate to login after successful signup

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // Handle errors
        console.log(error.message || 'An unexpected error occurred');
        setSnackbarMessage(error.message || 'An unexpected error occurred');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSignIn = () => {
    navigate('/login'); // Navigate to sign-in page
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
        
        {/* User Type Selection */}
        <Typography variant="h6" gutterBottom sx={{ color: '#B8A589' }}>
          Select User Type
        </Typography>
        <RadioGroup
          row
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value="retailer" control={<Radio sx={{ color: '#B8A589', '&.Mui-checked': { color: '#FFD8AA' } }} />} label="Retailer" />
          <FormControlLabel value="wholesaler" control={<Radio sx={{ color: '#B8A589', '&.Mui-checked': { color: '#FFD8AA' } }} />} label="Wholesaler" />
        </RadioGroup>

        {/* Conditional Rendering for Company Name */}
        {formData.userType === 'wholesaler' && (
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            variant="outlined"
            margin="normal"
            value={formData.companyName}
            onChange={handleChange}
            error={!!errors.companyName}
            helperText={errors.companyName}
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
        )}

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
        <Button 
          onClick={handleSignIn} 
          sx={{ color: '#B8A589', '&:hover': { textDecoration: 'underline' } }} 
        >
          Sign In
        </Button>
      </Typography>

      {/* Snackbar for error/success messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;

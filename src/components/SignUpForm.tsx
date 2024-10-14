import React, { useState } from 'react';
import { Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio, Snackbar, Alert, InputAdornment, IconButton, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',          // Updated to "name"
    email: '',         // Email field
    password: '',      // Password field
    role: 'retailer',// Default user role
    phone_number: '',   // Phone number field
    address: '',       // Address field
    company_name: '',   // Field for wholesaler
  });

  const [errors, setErrors] = useState({
    name: '',          // Error for name
    email: '',         // Error for email
    password: '',      // Error for password
    confirmPassword: '', // Error for confirm password
    company_name: '',   // Error for company name
  });

  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error'); // Snackbar severity

  const navigate = useNavigate(); // Initialize useNavigate

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      company_name: '',
    };

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.role === 'wholesaler' && !formData.company_name) newErrors.company_name = 'Company name is required for wholesalers';

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      try {
        const response = await fetch('http://localhost:8000/api/v1/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Signup failed');
        }

        setSnackbarMessage('Signup successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate('/login'); // Optionally navigate to login after successful signup
      } catch (error: any) {
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
    <Box
      sx={{
        width: isSmallScreen ? '90%' : '100%', // Responsive width adjustment
        maxWidth: 400,
        margin: '0 auto',
        mt: 5,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#F5F5F5',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#B8A589', textAlign: 'center' }}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#B8A589' },
                  '&:hover fieldset': { borderColor: '#FFD8AA' },
                  '&.Mui-focused fieldset': { borderColor: '#FFD8AA' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#B8A589' },
                  '&:hover fieldset': { borderColor: '#FFD8AA' },
                  '&.Mui-focused fieldset': { borderColor: '#FFD8AA' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#B8A589' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#B8A589' },
                  '&:hover fieldset': { borderColor: '#FFD8AA' },
                  '&.Mui-focused fieldset': { borderColor: '#FFD8AA' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: '#B8A589' }}>
              Select User Role
            </Typography>
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <FormControlLabel
                value="retailer"
                control={<Radio sx={{ color: '#B8A589', '&.Mui-checked': { color: '#FFD8AA' } }} />}
                label="Retailer"
              />
              <FormControlLabel
                value="wholesaler"
                control={<Radio sx={{ color: '#B8A589', '&.Mui-checked': { color: '#FFD8AA' } }} />}
                label="Wholesaler"
              />
            </RadioGroup>
          </Grid>

          {formData.role === 'wholesaler' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="company_name"
                variant="outlined"
                value={formData.company_name}
                onChange={handleChange}
                error={!!errors.company_name}
                helperText={errors.company_name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#B8A589' },
                    '&:hover fieldset': { borderColor: '#FFD8AA' },
                    '&.Mui-focused fieldset': { borderColor: '#FFD8AA' },
                  },
                }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              variant="outlined"
              value={formData.phone_number}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#B8A589' },
                  '&:hover fieldset': { borderColor: '#FFD8AA' },
                  '&.Mui-focused fieldset': { borderColor: '#FFD8AA' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#B8A589' },
                  '&:hover fieldset': { borderColor: '#FFD8AA' },
                  '&.Mui-focused fieldset': { borderColor: '#FFD8AA' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#B8A589',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#FFD8AA' },
              }}
            >
              Sign Up
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', mt: 1 }} // Center align and margin-top for spacing
            >
              Don't have an account?{' '}
              <Button
                onClick={handleSignIn}
                sx={{
                  color: '#B8A589',
                  '&:hover': { textDecoration: 'underline' },
                  fontSize: { xs: '0.9rem', sm: '1rem' } // Responsive font size
                }}
              >
                Sign In
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;

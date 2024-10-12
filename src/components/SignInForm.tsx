import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle Sign In Logic Here
    console.log(formData);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: '0 auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
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
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Sign In
        </Button>
      </form>
      <Typography variant="body2">
        Don't have an account?{' '}
        <Link href="/signup" underline="none">
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default SignInForm;
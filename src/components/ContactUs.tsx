import React, { useState } from 'react';
import { Box, Button, Container, Snackbar, TextField, Typography, Alert } from '@mui/material';

const ContactUs: React.FC = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar control
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    const { name, email, subject, message } = formData;
    const newErrors = {
      name: name === '',
      email: !validateEmail(email),
      subject: subject === '',
      message: message === '',
    };
    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);
    if (!isValid) {
      setSnackbarMessage('Please fill out all fields correctly');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Simulate form submission (placeholder)
    setSnackbarMessage('Form submitted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    console.log('Form submitted', formData);

    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Basic email validation function
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle closing the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, background: 'rgba(240, 244, 248, 0)' }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          boxShadow: 6,
          padding: 6,
          borderRadius: 4,
          maxWidth: '1000px',
          margin: 'auto',
          border: '1px solid #e0e0e0', // Subtle border
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Connect with Our Team
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
          We would love to hear from you. Please fill out the form below and we will get back to you shortly.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
            Get in Touch with Us
          </Typography>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            error={errors.name}
            helperText={errors.name ? 'Name is required' : ''}
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: errors.name ? '#f44336' : '#ced4da' } } }}
          />
          <TextField
            fullWidth
            label="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            type="email"
            error={errors.email}
            helperText={errors.email ? 'Please enter a valid email address' : ''}
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: errors.email ? '#f44336' : '#ced4da' } } }}
          />
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            error={errors.subject}
            helperText={errors.subject ? 'Subject is required' : ''}
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: errors.subject ? '#f44336' : '#ced4da' } } }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            multiline
            rows={4}
            error={errors.message}
            helperText={errors.message ? 'Message cannot be empty' : ''}
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: errors.message ? '#f44336' : '#ced4da' } } }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            sx={{
              mt: 3,
              width: '100%',
              padding: '10px',
              backgroundColor: '#B4A266',
              '&:hover': { backgroundColor: '#FFD8AA' },
              transition: 'background-color 0.3s',
              
            }}
          >
            Send Message
          </Button>
        </form>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;

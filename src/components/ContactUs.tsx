import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';

const ContactUs: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: 'white', 
          boxShadow: 3, 
          padding: 4, 
          borderRadius: 2, 
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Connect with Our Team
        </Typography>
        <form onSubmit={handleSubmit}>
              <Typography variant="h6">Get in Touch with Us</Typography>
              <TextField
                fullWidth
                label="Input your name"
                margin="normal"
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Input your email"
                margin="normal"
                required
                variant="outlined"
                type="email"
              />
              <TextField
                fullWidth
                label="Subject"
                margin="normal"
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Submit your message request"
                margin="normal"
                required
                variant="outlined"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" type="submit">
                Send message
              </Button>
            
            
          
        </form>
      </Box>
    </Container>
  );
};

export default ContactUs;

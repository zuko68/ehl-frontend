import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container
      maxWidth={false} 
      sx={{
        maxWidth: '100%' 
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white', 
          boxShadow: 3, 
          padding: 4, 
          borderRadius: 2, 
          margin: 4, 
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" align="center" paragraph>
        At Ehil, we believe in the power of collaboration and innovation. Our mission is to bridge the gap between wholesalers and retailers, fostering a thriving marketplace that supports local businesses in Ethiopia. We leverage technology to provide a seamless experience, empowering our users to make informed decisions and access essential resources.
        </Typography>

        <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: 3 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" paragraph>
        To create a dynamic B2B platform that connects wholesalers and retailers in Ethiopia, facilitating trade, enhancing business growth, and providing valuable insights for sustainable development.
        </Typography>

        <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: 3 }}>
          Our Vision
        </Typography>
        <Typography variant="body1" align="center" paragraph>
        To be the leading B2B marketplace in Ethiopia, transforming the retail landscape by harnessing data-driven solutions, empowering businesses, and contributing to economic growth.
        </Typography>

        <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: 3 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Sample Team Members */}
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box textAlign="center">
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{ width: 80, height: 80, margin: 'auto' }}
                />
                <Typography variant="subtitle1" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.position}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};


const teamMembers = [
  {
    name: 'John Doe',
    position: 'CEO',
    image: 'https://via.placeholder.com/80',
  },
  {
    name: 'Jane Smith',
    position: 'CTO',
    image: 'https://via.placeholder.com/80',
  },
  {
    name: 'Emily Johnson',
    position: 'CMO',
    image: 'https://via.placeholder.com/80',
  },
  
];

export default AboutUs;

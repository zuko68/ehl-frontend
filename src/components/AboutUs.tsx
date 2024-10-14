import React from 'react';
import Male1PNG from '../assets/micky.png';
import MALE2PNG from '../assets/yared.png';
import FEMALE1PNG from '../assets/yordanos.png';

import { Box, Container, Typography, Grid, Avatar } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '100%',
        background: 'linear-gradient(rgba(233, 236, 239, 0.8))', // transparent gradient background
        py: 8, // padding for the top and bottom
      }}
    >
      <Box
        sx={{
          backgroundColor: '#FFFFFF', // solid white background
          boxShadow: 6,
          padding: { xs: 4, md: 6 }, // responsive padding
          borderRadius: 4,
          maxWidth: '1000px',
          margin: 'auto',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333333' }}> {/* Dark color for heading */}
          About Us
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ color: '#666666', fontSize: '1.1rem' }}> {/* Grey color for body text */}
          At Ehil, we believe in the power of collaboration and innovation. Our mission is to bridge the gap between wholesalers and retailers, fostering a thriving marketplace that supports local businesses in Ethiopia. We leverage technology to provide a seamless experience, empowering our users to make informed decisions and access essential resources.
        </Typography>

        <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: 3, fontWeight: 'bold', color: '#333333' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ color: '#666666', fontSize: '1.1rem' }}>
          To create a dynamic B2B platform that connects wholesalers and retailers in Ethiopia, facilitating trade, enhancing business growth, and providing valuable insights for sustainable development.
        </Typography>

        <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: 3, fontWeight: 'bold', color: '#333333' }}>
          Our Vision
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ color: '#666666', fontSize: '1.1rem' }}>
          To be the leading B2B marketplace in Ethiopia, transforming the retail landscape by harnessing data-driven solutions, empowering businesses, and contributing to economic growth.
        </Typography>

        <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: 5, fontWeight: 'bold', color: '#333333' }}>
          Meet Our Team
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box textAlign="center">
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{
                    width: 100,
                    height: 100,
                    margin: 'auto',
                    mb: 2,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: '#333333' }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="#666666">
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
    name: 'Mihret Tsegaye',
    position: 'Frontend Developer',
    image: FEMALE1PNG,
  },
  {
    name: 'Samuel TK',
    position: 'Backend Developer',
    image: MALE2PNG,
  },
  {
    name: 'Mickyas Tesfaye',
    position: 'Frontend Developer & Backend Developer',
    image: Male1PNG,
  },
  {
    name: 'Fira Fikadu',
    position: 'Backend Developer',
    image: MALE2PNG,
  }
];

export default AboutUs;

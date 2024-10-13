import { Button, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Categories from '../components/Categories';
import ProductGrid from '../components/ProductGrid';
import ContactUs from '../components/ContactUs';
import AboutUs from '../components/AboutUs';

// Static background image URL
const backgroundImageUrl = 'https://organicflourmills.nz/cdn/shop/products/ofm_wheat-grain.jpg?v=1661384618&width=1445';

export default function HeroSection() {
    const theme = useTheme();
    const navigate = useNavigate(); // Initialize navigate

    // Navigation functions
    const handleLogin = () => {
        navigate('/login'); // Replace with your login page route
    };

    const handleSignup = () => {
        navigate('/signup'); // Replace with your signup page route
    };

    return (
        <>
            <br />
            <Paper
                sx={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '40px',
                    color: 'white',
                    position: 'relative',
                    textAlign: 'left',
                    overflow: 'hidden'
                }}
            >
                <div className="text-content" style={{ marginRight: 'auto' }}>
                    <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                        Welcome to Our Service
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                        Experience the most seamless and integrated service you’ve ever had!
                    </Typography>
                </div>
                <br /><br /><br />
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                        position: 'absolute',
                        bottom: '40px',
                        right: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        width: { xs: '70%', sm: 'auto' }, // 70% width on small screens
                        margin: '0 auto', // Center the stack
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleLogin} // Add onClick handler
                        sx={{
                            backgroundColor: '#B8A589',
                            color: '#1F1F1F',
                            borderRadius: '15px',
                            padding: '12px 24px',
                            fontSize: { xs: '14px', sm: '16px' },
                            boxShadow: theme.shadows[3],
                            transition: 'transform 0.2s, background-color 0.2s',
                            width: { xs: '100%', sm: '200px' }, // 100% width on small screens
                            '&:hover': {
                                backgroundColor: '#FFD8AA',
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        LOGIN
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSignup} // Add onClick handler
                        sx={{
                            backgroundColor: '#B8A589',
                            color: '#1F1F1F',
                            borderRadius: '15px',
                            padding: '12px 24px',
                            fontSize: { xs: '14px', sm: '16px' },
                            boxShadow: theme.shadows[3],
                            transition: 'transform 0.2s, background-color 0.2s',
                            width: { xs: '100%', sm: '200px' }, // 100% width on small screens
                            '&:hover': {
                                backgroundColor: '#FFD8AA',
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        SIGNUP
                    </Button>
                </Stack>

            </Paper>
            <Categories />
            <ProductGrid />
            <AboutUs />
            <ContactUs />
        </>
    );
}

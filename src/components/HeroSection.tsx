import { Button, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Static background image URL
const backgroundImageUrl = 'https://organicflourmills.nz/cdn/shop/products/ofm_wheat-grain.jpg?v=1661384618&width=1445';

export default function HeroSection() {
    const theme = useTheme();

    return (
        <Paper
            sx={{
                backgroundImage: `url(${backgroundImageUrl})`, // Fixed the syntax for the background image URL
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
            <br /><br />
            <Stack
                direction={{ xs: 'column', sm: 'row' }} // Stack buttons on smaller screens
                spacing={2}
                sx={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: 'auto',
                    flexWrap: 'wrap', // Allow wrapping on smaller screens
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#B8A589', // Modern button color
                        color: '#1F1F1F', // Blackish text color
                        borderRadius: '15px',
                        padding: '12px 24px',
                        fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
                        boxShadow: theme.shadows[3],
                        transition: 'transform 0.2s, background-color 0.2s', // Smooth transition
                        width: { xs: '300px', sm: '200px' },  // Full width on extra small screens, fixed width on larger
                        '&:hover': {
                            backgroundColor: '#FFD8AA', // Color on hover
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    LOGIN
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#B8A589', // Modern button color
                        color: '#1F1F1F', // Blackish text color
                        borderRadius: '15px',
                        padding: '12px 24px',
                        fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
                        
                        boxShadow: theme.shadows[3],
                        transition: 'transform 0.2s, background-color 0.2s', // Smooth transition
                        width: { xs: '300px', sm: '200px' },  // Full width on extra small screens, fixed width on larger
                        '&:hover': {
                            backgroundColor: '#FFD8AA', // Color on hover
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    SIGNUP
                </Button>
            </Stack>
        </Paper>
    );
}

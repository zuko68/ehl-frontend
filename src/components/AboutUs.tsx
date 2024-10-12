import { useState, useEffect } from 'react';
import { Skeleton, Typography, Box } from "@mui/material";

export default function AboutUs() {
    const [loading, setLoading] = useState(true);

    // Simulate loading for 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 3 seconds
        return () => clearTimeout(timer); // Clean up timer
    }, []);

    return (
        <>
            <br />
            {loading ? (
                <Skeleton
                    sx={{ bgcolor: 'blue.300' }}
                    animation="wave"
                    variant="rounded"
                    width={'100%'}
                    height={300}
                />
            ) : (
                <Box sx={{ padding: 3, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main', marginBottom: 2 }}>
                        Discover Who We Are
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', marginBottom: 3 }}>
                        Elevating business connections, fostering growth, and simplifying commerce.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8 }}>
                        At our core, we believe in connecting wholesalers and retailers to create a seamless, 
                        efficient, and growth-driven marketplace. With a focus on fostering relationships and 
                        empowering businesses, we are here to bridge the gap between supply and demand, making 
                        the entire process smoother, more transparent, and ultimately, more rewarding.
                    </Typography>
                </Box>
            )}
        </>
    );
}

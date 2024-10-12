import './HeroSection.css';
import { Button, Paper, Stack } from '@mui/material';
import HeroImage from '../assets/heroimg.jpg';
import Carousel from 'react-material-ui-carousel';

const items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        image: HeroImage
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        image: HeroImage
    }
];

export default function HeroSection() {
    function Item(props: any) {
        return (
            <Paper
                className="carousel-item"
                style={{
                    backgroundImage: `url(${props.item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'flex-start',  
                    padding: '20px',               
                    color: 'white',
                    position: 'relative',           
                }}
            >
                <div className="text-content" style={{ marginRight: 'auto' }}>
                    <h2>{props.item.name}</h2>
                    <p>{props.item.description}</p>
                </div>

                <Stack direction="row" spacing={2} style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                    <Button variant="contained">Contained</Button>
                    <Button variant="contained">Contained</Button>
                </Stack>
            </Paper>
        );
    }

    return (
        <Carousel>
            {items.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
    );
}

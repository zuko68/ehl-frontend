import './App.css'

import HeroSection from './components/HeroSection'
import NavBar from './components/NavBar'
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import { Container } from '@mui/material';

function App() {

  return (
    <>
      <NavBar />
      <HeroSection />
      <Container>
        <Categories />
        <ProductGrid />
      </Container>
      <AboutUs/>
      <ContactUs />
      <Footer/>
      </>
  )
}

export default App

import './App.css'

import HeroSection from './components/HeroSection'
import NavBar from './components/NavBar'
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import { Container } from '@mui/material';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <NavBar />
      <HeroSection />
      <Router>
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/signupForm" element={<SignUpForm />} />
                <Route path="/signin" element={<SignInForm />} />
            </Routes>
        </Router>
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

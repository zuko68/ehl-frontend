// App.tsx
import './App.css';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import SignInForm from './components/SignInForm'; // Import your SignInForm
import SignUpForm from './components/SignUpForm'; // Import your SignUpForm
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<HeroSection />} /> {/* Home landing page */}
          <Route path="/login" element={<SignInForm />} /> {/* Login page */}
          <Route path="/signup" element={<SignUpForm />} /> {/* Signup page */}
          <Route path="/categories" element={<Categories />} /> {/* Categories page if needed */}
          <Route path="/products" element={<ProductGrid />} /> {/* Products page if needed */}
          <Route path="/about" element={<AboutUs />} /> {/* About Us page if needed */}
          <Route path="/contact" element={<ContactUs />} /> {/* Contact Us page if needed */}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;

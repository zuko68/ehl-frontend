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
import NotFound from './components/NotFound'; // Import NotFound component
import Dashboard from './components/Dashboard';
import CheckoutPage from './components/CheckoutPage';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart';
import EthiopiaMap from './components/EthiopiaMap';

function App() {
  return (
    <>
      <NavBar />
      <CartProvider>
        <Routes>
          <Route path="/" element={<HeroSection />} /> {/* Home landing page */}
          <Route path="/wholesalers-map" element={<EthiopiaMap />} /> {/* Home landing page */}
          <Route path="/checkout" element={<CheckoutPage />} /> {/* Home landing page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Home landing page */}
          <Route path="/cart" element={<Cart />} /> {/* Home landing page */}
          <Route path="/login" element={<SignInForm />} /> {/* Login page */}
          <Route path="/signup" element={<SignUpForm />} /> {/* Signup page */}
          <Route path="/categories" element={<Categories />} /> {/* Categories page if needed */}
          <Route path="/products" element={<ProductGrid />} /> {/* Products page if needed */}
          <Route path="/product/:id" element={<ProductDetail />} /> { /* Products Detail Page */ }
          <Route path="/about" element={<AboutUs />} /> {/* About Us page if needed */}
          <Route path="/contact" element={<ContactUs />} /> {/* Contact Us page if needed */}
          <Route path="*" element={<NotFound />} /> {/* Handle unknown paths */}
        </Routes>
      </CartProvider>
      <Footer />
    </>
  );
}

export default App;

import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import ProductDetail from './components/ProductDetail';
import NotFound from './components/NotFound';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <>
      <NavBar />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
      <Footer />
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Blog from './pages/Blog';
import CookiePolicy from './components/CookieConsent/CookiePolicy';
import Preloader from './components/Preloader/Preloader';
import CookieConsent from './components/CookieConsent/CookieConsent';

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Preloader runs once when the app is first mounted */}
      <Preloader />
      <div className="font-body text-text-light bg-bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cable" element={<Products key={location.key} />} />
            <Route path="/cable/:productId" element={<Products key={location.key} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


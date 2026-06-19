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

import BlogDetail from './pages/BlogDetail';
import useAnalytics from './hooks/useAnalytics';

function AppContent() {
  const location = useLocation();
  useAnalytics();

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
            <Route path="/blog/:slug" element={<BlogDetail />} />
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

import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <AppContent />
      </Router>
    </SettingsProvider>
  );
}

export default App;


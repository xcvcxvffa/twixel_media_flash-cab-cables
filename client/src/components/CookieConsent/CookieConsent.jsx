import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './CookieConsent.css';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('fc_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('fc_cookie_consent', 'true', { expires: 365, secure: true, sameSite: 'strict' });
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set('fc_cookie_consent', 'declined', { expires: 1 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-wrapper animate-fade-up glassmorphism">
      <div className="cookie-consent-content">
        <button onClick={handleDecline} className="cookie-close-btn" aria-label="Close">
          <X size={24} />
        </button>
        
        <div className="cookie-modern-icon-wrapper">
          <img src="/assets/images/icons/cookie_icon.png" alt="Cookie" className="cookie-image" />
        </div>
        
        <div className="cookie-text-content">
          <h4 className="cookie-title">Hi, we use cookies!</h4>
          <p className="cookie-desc">
            Our website uses cookies to improve your experience. By continuing, we assume your permission to deploy cookies as detailed in our <Link to="/cookie-policy" onClick={() => setIsVisible(false)} className="cookie-link">Cookie Policy</Link>.
          </p>
        </div>
        
        {/* Buttons in 1 Line */}
        <div className="cookie-actions-row">
          <button onClick={handleAccept} className="cookie-accept-btn">
            <span>Allow</span>
          </button>
          <button onClick={handleDecline} className="cookie-decline-btn">
            Decline
          </button>
        </div>  
      </div>
    </div>
  );
};

export default CookieConsent;

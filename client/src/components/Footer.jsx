import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const brandName = "FLASH CAB CABLES";

  return (
    <footer className="custom-footer">
      <div className="custom-footer-container">
        
        <div className="custom-footer-top">
          {/* 1. Logo, Text & Social Links */}
          <div className="footer-col-about">
            <Link to="/" className="logo mb-6" style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', height: '80px' }}>
                <img src="/assets/images/logo_colored.png" alt="Flash Cab Cables" style={{ height: '200px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p className="footer-text mb-8">
              Providing reliable electrical services with a focus on safety, efficiency, and advanced technology.
            </p>
            <div className="footer-social-wrapper">
              <a href="#" className="footer-social-icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="footer-social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="footer-social-icon"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="footer-social-icon"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="footer-col-links">
             <h4 className="footer-heading">Quick Links</h4>
             <div className="footer-quick-links">
                 <Link to="/" className="footer-qlink">Home</Link>
                 <Link to="/about" className="footer-qlink">About Us</Link>
                 <Link to="/services" className="footer-qlink">Services</Link>
                 <Link to="/blog" className="footer-qlink">News</Link>
                 <Link to="/contact" className="footer-qlink">Contact Us</Link>
             </div>
          </div>

          {/* 3. Our Products */}
          <div className="footer-col-links">
             <h4 className="footer-heading">Our Products</h4>
             <div className="footer-quick-links">
                 <Link to="/products" className="footer-qlink">Cables</Link>
                 <Link to="/products" className="footer-qlink">Conductors</Link>
                 <Link to="/products" className="footer-qlink">OPGW</Link>
             </div>
          </div>

          {/* 4. Contact Us */}
          <div className="footer-col-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-[#2fa084] mt-1"></i>
                <span className="text-gray-500 text-sm leading-relaxed">Plot No. 3, G.I.D.C-2, Jamwadi,<br/>Gondal, Rajkot, Gujarat - 360311</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-[#2fa084]"></i>
                <span className="text-gray-500 text-sm">+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-[#2fa084]"></i>
                <span className="text-gray-500 text-sm">flashcab12@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big Text (Full Width with Character Wave Effect) */}
      <div className="footer-mega-text-container">
         <div className="mega-text-wrapper">
           {brandName.split('').map((char, idx) => (
             <span key={idx} className="mega-char">
               {char === ' ' ? '\u00A0' : char}
             </span>
           ))}
         </div>
      </div>

      <div className="custom-footer-container">
        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
           <p>
             &copy; {new Date().getFullYear()} Flash Cab Cables. All Rights Reserved. Developed by{' '}
             <a href="https://twixel.media/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2fa084] transition-colors font-medium">Twixel Media Pvt Ltd</a>
           </p>
           <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Refund Policy</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

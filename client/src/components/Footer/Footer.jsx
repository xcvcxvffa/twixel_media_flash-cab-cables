import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const brandName = "FLASHCAB CABLES";

  return (
    <footer className="custom-footer">
      <div className="custom-footer-container">

        <div className="custom-footer-top">
          {/* 1. Logo, Text & Social Links */}
          <div className="footer-col-about">
            <Link to="/" className="logo mb-6" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/assets/images/logo_colored.png" alt="Flash Cab Cables" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p className="footer-text mb-8">
              Providing reliable electrical services with a focus on safety, efficiency, and advanced technology.
            </p>
            <div className="footer-social-wrapper">
              <a href="https://www.facebook.com/profile.php?id=61572152092842" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.linkedin.com/company/flashcab-cables-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/flashcab.cables/" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://wa.me/919093949599" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="footer-col-links">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-quick-links">
              <Link to="/" className="footer-qlink">Home</Link>
              <Link to="/about" className="footer-qlink">About Us</Link>
              {/* <Link to="/services" className="footer-qlink">EPC</Link> */}
              {/* <Link to="/blog" className="footer-qlink">News</Link> */}
              <Link to="/contact" className="footer-qlink">Contact Us</Link>
            </div>
          </div>

          {/* 3. Our Products */}
          <div className="footer-col-links">
            <h4 className="footer-heading">Our Products</h4>
            <div className="footer-quick-links">
              <Link to="/cable" className="footer-qlink">Cables</Link>
              {/* <a href="/#conductors" className="footer-qlink">Conductors</a> */}
            </div>
          </div>

          {/* 4. Contact Us */}
          <div className="footer-col-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#546e9d] flex items-center justify-center shrink-0 mt-1">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h5 className="text-[#405473] font-bold text-[15px] mb-1">Office & Manufacturing Address</h5>
                  <span className="text-gray-500 text-sm leading-relaxed">R S NO 9 P4/P1, Plot No 1 & 2, National Highway 27, Opp. BPCL Petrol Pump, Biliyala, Gondal, Rajkot, Gujarat-360005</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h5 className="text-[#405473] font-bold text-[15px] mb-1">Contact No.</h5>
                  <span className="text-gray-500 text-sm">+91 90 93 94 95 99</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-[#2fa084] flex items-center justify-center shrink-0">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div>
                  <h5 className="text-[#405473] font-bold text-[15px] mb-1">E-mail</h5>
                  <span className="text-gray-500 text-sm">info@flashcabcables.com</span>
                </div>
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
            <Link to="/cookie-policy">Cookie Policy</Link>
            <a href="#">Terms of Use</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-top">
                <div className="footer-widget">
                    <img src="/assets/images/logo.png" alt="Flash Cab Cables" style={{ height: '60px', marginBottom: '20px' }} />
                    <p style={{ color: '#A0A5B0', marginBottom: '20px' }}>Providing reliable electrical services with a focus on safety, efficiency, and advanced technology for both residential and commercial projects.</p>
                    <div className="social-icons social-icons-footer">
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#"><i className="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
                
                <div className="footer-widget">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/products">Our Products</Link></li>
                        <li><Link to="/blog">Latest News</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                
                <div className="footer-widget">
                    <h3>Our Services</h3>
                    <ul>
                        <li><a href="#">Electrical Installations</a></li>
                        <li><a href="#">Lighting Installation</a></li>
                        <li><a href="#">Electrical Panel Upgrades</a></li>
                        <li><a href="#">Electrical Repairs</a></li>
                        <li><a href="#">Emergency Repair Service</a></li>
                    </ul>
                </div>
                
                <div className="footer-widget">
                    <h3>Contact Info</h3>
                    <ul className="contact-info-list">
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Plot No. 3, G.I.D.C-2, Jamwadi,<br/>Gondal, Rajkot, Gujarat - 360311</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <span>+91 99999 99999</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <span>flashcab12@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-bottom-inner">
                    <p>&copy; {new Date().getFullYear()} Flash Cab Cables. All Rights Reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;

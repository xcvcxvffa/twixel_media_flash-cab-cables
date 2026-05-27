import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Header Scroll Animation
  useEffect(() => {
      if (!headerRef.current) return;
      if (isScrolled) {
          gsap.to(headerRef.current, {
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              duration: 0.4,
              ease: "power2.out"
          });
          gsap.to(logoRef.current, {
              height: '55px', // Shrink logo container
              duration: 0.4,
              ease: "power2.out"
          });
      } else {
          gsap.to(headerRef.current, {
              boxShadow: 'none',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              backdropFilter: 'none',
              duration: 0.4,
              ease: "power2.out"
          });
          gsap.to(logoRef.current, {
              height: '80px', // Original logo container height
              duration: 0.4,
              ease: "power2.out"
          });
      }
  }, [isScrolled]);

    const megaMenuRef = useRef(null);
    const mobileNavRef = useRef(null);
    const [activeMegaMenu, setActiveMegaMenu] = useState(null);

    // Stagger animation when Mobile Menu opens
    useEffect(() => {
        if (isMobileMenuOpen && mobileNavRef.current) {
            gsap.fromTo(mobileNavRef.current.querySelectorAll('li:not(.mobile-menu-header)'), 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 }
            );
        }
    }, [isMobileMenuOpen]);

    const toggleMegaMenu = (e, menuName) => {
        if (window.innerWidth <= 991) {
            e.preventDefault();
            
            if (activeMegaMenu === menuName) {
                // GSAP Smooth Close
                gsap.to(megaMenuRef.current, {
                    height: 0,
                    opacity: 0,
                    marginTop: 0,
                    duration: 0.4,
                    ease: "power3.inOut",
                    display: 'none',
                    onComplete: () => setActiveMegaMenu(null)
                });
            } else {
                // GSAP Smooth Open (Auto Height)
                setActiveMegaMenu(menuName);
                gsap.fromTo(megaMenuRef.current,
                    { height: 0, opacity: 0, marginTop: 0, display: 'none' },
                    { height: 'auto', opacity: 1, marginTop: 10, display: 'grid', duration: 0.5, ease: "power3.out" }
                );
            }
        }
    };

    return (
        <header ref={headerRef} className="header" style={{ position: 'sticky', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
            <div className="container header-inner" style={{ maxWidth: '100%', padding: '0 40px', justifyContent: 'space-between', gap: '40px' }}>
                <Link to="/" className="logo" ref={logoRef} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', overflow: 'hidden', height: '80px' }}>
                    <img src="/assets/images/logo_colored.png" alt="Flash Cab Cables" style={{ height: '200px', width: 'auto', objectFit: 'contain' }} />
                </Link>
                
                {/* Mobile Overlay */}
                <div className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

                <nav className="main-nav" style={{ marginLeft: 'auto' }}>
                    <ul ref={mobileNavRef} className={`nav-list ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`}>
                        <li className="mobile-menu-header">
                            <i className="fa-solid fa-xmark mobile-close" onClick={() => setIsMobileMenuOpen(false)}></i>
                        </li>
                        <li className={`has-mega-menu ${activeMegaMenu === 'products' ? 'active' : ''}`}>
                            <Link to="/products" className="nav-link" onClick={(e) => toggleMegaMenu(e, 'products')}>
                                Products <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', marginLeft: '4px', color: '#737373' }}></i>
                            </Link>
                            <div className="mega-menu" ref={megaMenuRef} style={window.innerWidth <= 991 ? { overflow: 'hidden', display: 'none' } : {}}>
                                <div className="mega-menu-column">
                                    <h4 className="mega-menu-title">Cables</h4>
                                    <Link to="/products" className="mega-menu-card">
                                        <img src="/assets/images/cables.png" alt="Cables" />
                                    </Link>
                                </div>
                                <div className="mega-menu-column">
                                    <h4 className="mega-menu-title">Conductors</h4>
                                    <Link to="/products" className="mega-menu-card">
                                        <img src="/assets/images/conductors.png" alt="Conductors" />
                                    </Link>
                                </div>
                                <div className="mega-menu-column">
                                    <h4 className="mega-menu-title">OPGW</h4>
                                    <Link to="/products" className="mega-menu-card">
                                        <img src="/assets/images/opgw.png" alt="OPGW" />
                                    </Link>
                                </div>
                            </div>
                        </li>
                    <li className="has-mega-menu">
                        <Link to="#" className="nav-link">Services <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', marginLeft: '4px', color: '#737373' }}></i></Link>
                    </li>
                    <li><Link to="/blog" className="nav-link">Blog & News</Link></li>
                    <li><Link to="/about" className="nav-link">About Us</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
                </ul>
            </nav>
            
            <div className="mobile-toggle" style={{ opacity: isMobileMenuOpen ? 0 : 1, pointerEvents: isMobileMenuOpen ? 'none' : 'auto', transition: 'opacity 0.2s' }} onClick={() => setIsMobileMenuOpen(true)}>
                <i className="fa-solid fa-bars"></i>
            </div>
        </div>
    </header>
  );
};

export default Header;

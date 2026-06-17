import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cookie, ShieldCheck, Settings, Eye } from 'lucide-react';
import './CookiePolicy.css';

gsap.registerPlugin(ScrollTrigger);

const CookiePolicy = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Elegant stagger fade-up animation for policy sections
    gsap.fromTo('.policy-section',
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.policy-content-wrapper',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="cookie-policy-page">
      {/* Modern Page Header */}
      <div className="breadcrumb-hero" style={{ backgroundImage: "url('/assets/images/industrial_mix_bg.png')" }}>
         <h1 className="breadcrumb-title">
           Cookie Policy
         </h1>
         <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Cookie Policy</span>
         </div>
      </div>

      <section className="policy-main-section">
        <div className="container mx-auto px-6 max-w-4xl policy-content-wrapper">
          
          <div className="policy-intro flex flex-col items-center justify-center text-center !mb-24 lg:mb-32">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2fa084] mb-6">How we use Cookies</h2>
            <p className="text-slate-500 text-[17px] leading-relaxed max-w-2xl text-center mx-auto">
              This Cookie Policy explains what cookies are, how Flash Cab Cables uses them on our website, and what your options are regarding their usage.
            </p>
          </div>

          <div className="policy-grid">
            
            <div className="policy-section glass-card">
              <div className="policy-icon-box">
                <Cookie size={28} className="text-[#D4A373]" />
              </div>
              <h3 className="policy-heading">1. What are Cookies?</h3>
              <p className="policy-text">
                Cookies are small text files that are placed on your computer or mobile device when you browse a website. They are widely used to make websites work more efficiently and provide a better, more personalized experience for the user by remembering your actions and preferences over time.
              </p>
            </div>

            <div className="policy-section glass-card">
              <div className="policy-icon-box">
                <ShieldCheck size={28} className="text-[#2fa084]" />
              </div>
              <h3 className="policy-heading">2. How We Use Cookies</h3>
              <p className="policy-text">
                We use cookies for a variety of reasons detailed below:
              </p>
              <ul className="policy-list">
                <li><strong>Essential Cookies:</strong> Required for the fundamental operation of our website, allowing you to navigate and use its features securely.</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously (e.g., Google Analytics).</li>
                <li><strong>Functionality Cookies:</strong> Allow our website to remember choices you make (such as your language or region) to provide enhanced features.</li>
              </ul>
            </div>

            <div className="policy-section glass-card">
              <div className="policy-icon-box">
                <Eye size={28} className="text-[#4F46E5]" />
              </div>
              <h3 className="policy-heading">3. Third-Party Cookies</h3>
              <p className="policy-text">
                In some special cases, we also use cookies provided by trusted third parties. For example, we use third-party analytics to help us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.
              </p>
            </div>

            <div className="policy-section glass-card">
              <div className="policy-icon-box">
                <Settings size={28} className="text-[#F59E0B]" />
              </div>
              <h3 className="policy-heading">4. Managing Your Cookies</h3>
              <p className="policy-text">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Banner when you first visit our site.
                <br/><br/>
                Additionally, you can configure your web browser settings to refuse cookies altogether. However, if you choose to reject cookies, you may still use our website, but your access to some functionality and areas may be restricted.
              </p>
            </div>

          </div>

          <div className="policy-footer text-center !mt-16 lg:mt-16 pt-10 border-t border-gray-200">
            <p className="text-slate-500 !mt-4">
              For any questions or concerns regarding our Cookie Policy, please reach out to us at <a href="mailto:info@flashcabcables.com" className="text-[#2fa084] font-semibold hover:underline">info@flashcabcables.com</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;

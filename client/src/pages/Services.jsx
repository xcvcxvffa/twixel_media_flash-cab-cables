import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight } from 'lucide-react';

const Services = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        {/* Animated Icon */}
        <div className="coming-soon-icon-wrapper">
          <Wrench size={48} strokeWidth={1.5} />
        </div>

        {/* Main Heading */}
        <h1 className="coming-soon-title">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="coming-soon-subtitle">
          We're crafting something amazing for you. Our <strong>EPC</strong> page is currently under construction and will be available shortly.
        </p>

        {/* Decorative Divider */}
        <div className="coming-soon-divider">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* CTA Buttons */}
        <div className="coming-soon-actions">
          <Link to="/" className="solax-btn-dark group">
            <div className="solax-btn-dot"></div>
            <span>Back to Home</span>
            <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/contact" className="coming-soon-secondary-btn">
            Contact Us
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;

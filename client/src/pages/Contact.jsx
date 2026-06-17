import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  useGSAP(() => {
    // ── Split Heading Animation (Same as About/Home pages) ──
    const splitHeadings = document.querySelectorAll('.contact-page-wrapper h1, .contact-page-wrapper h2, .contact-page-wrapper h3, .split-heading');
    
    splitHeadings.forEach(heading => {
        const isSplit = heading.querySelector('.anim-word') !== null;
        if (!isSplit) {
            heading.dataset.split = 'true';
            const lines = heading.innerHTML.split(/<br\s*\/?>/i);
            const wrappedLines = lines.map(line => {
                const words = line.split(/\s+/);
                return words.map(word => {
                    if (word.trim() === '') return '';
                    return `<span class="word-mask" style="display:inline-block; overflow:hidden; vertical-align:bottom; padding-bottom:5px; margin-bottom:-5px;"><span class="anim-word" style="display:inline-block; opacity:0; transform:translateY(120%);">${word}</span></span>`;
                }).join('&nbsp;');
            });
            heading.innerHTML = wrappedLines.join('<br>');
        }

        const words = heading.querySelectorAll('.anim-word');
        if (words.length > 0) {
            gsap.to(words, {
              opacity: 1,
              y: "0%",
              stagger: 0.15,
              ease: "power3.out",
              duration: 0.8,
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
              }
            });
        }
    });

    // ── Paragraph / Desc Fade-Up (Same as About/Home pages) ──
    const globalParagraphs = document.querySelectorAll('.gsap-stagger-text p, .split-desc');
    globalParagraphs.forEach(el => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    // ── Reveal Animations ──
    gsap.utils.toArray('.gsap-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, { scope: containerRef });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      // Assuming server runs on 5000 in dev
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Server error.');
    }
  };

  return (
    <div ref={containerRef} className="contact-page-wrapper">
      {/* Page Header */}
      <div className="breadcrumb-hero" style={{ backgroundImage: "url('/assets/images/industrial_mix_bg.png')" }}>
         <h1 className="breadcrumb-title split-heading">
           Get in Touch
         </h1>
         
         {/* Breadcrumb Navigation */}
         <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Contact</span>
         </div>
      </div>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            
            {/* Left: Info Cards */}
            <div className="contact-info-col gsap-stagger-text">
              <h2 className="contact-main-heading split-heading">
                Reach out to<br/>our experts.
              </h2>
              
              <div className="gsap-reveal contact-info-card contact-details-wrapper">
                
                {/* Location */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon-box">
                    <MapPin className="contact-icon" size={22} strokeWidth={2.5} />
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Corporate Office & Factory</span>
                    <p className="contact-detail-value">
                      R S NO 9 P4/P1, Plot No 1 & 2,<br/>
                      National Highway 27, Opp. BPCL Petrol Pump,
                      Biliyala, Gondal, <br/>Rajkot, Gujarat-360005
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon-box">
                    <Phone className="contact-icon" size={22} strokeWidth={2.5} />
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Sales & Inquiry</span>
                    <p className="contact-detail-phone">
                      +91 90 93 94 95 99
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon-box">
                    <Mail className="contact-icon" size={22} strokeWidth={2.5} />
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Email Us</span>
                    <p className="contact-detail-email">
                      info@flashcabcables.com
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Premium Form */}
            <div className="contact-form-col gsap-reveal">
              <div className="contact-form-container">
                <h3 className="contact-form-heading split-heading">Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="contact-input-group">
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                        className="contact-custom-input" 
                      />
                    </div>
                    <div className="contact-input-group">
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                        className="contact-custom-input" 
                      />
                    </div>
                  </div>
                  
                  <div className="contact-input-group">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="contact-custom-input" 
                    />
                  </div>
                  
                  <div className="contact-input-group">
                    <textarea 
                      rows="5" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your Message..."
                      className="contact-custom-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="contact-submit-btn group">
                    <div className="solax-btn-dot"></div>
                    <span>Send Message</span>
                    <ArrowRight size={18} className="contact-btn-arrow" />
                  </button>
                  {status && <p className="contact-status-msg">{status}</p>}
                </form>
              </div>
            </div>
          </div>

          {/* Google Map Section — Exact Biliyala, NH-27, Gondal Location */}
          <div className="gsap-reveal contact-map-wrapper">
            <iframe 
              className="contact-map-iframe"
              src="https://www.google.com/maps?q=Flashcab+Cables+Pvt+Ltd,+National+Highway+27,+Opp+BPCL+Petrol+Pump,+Biliyala,+Gondal,+Rajkot,+Gujarat+360311&output=embed&z=15" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

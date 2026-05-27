import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  useGSAP(() => {
    // Split Headings for GSAP
    const splitHeadings = document.querySelectorAll('.split-heading');
    
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
            gsap.fromTo(words, 
              { opacity: 0, y: "120%" },
              {
                opacity: 1,
                y: "0%",
                stagger: 0.1,
                ease: "power3.out", 
                duration: 0.8
              }
            );
        }
    });

    gsap.fromTo('.gsap-reveal', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

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
    <div className="min-h-screen bg-[#fafbfc] pt-24">
      {/* Page Header */}
      <div className="breadcrumb-hero">
         <h1 className="breadcrumb-title">
           <span key="contact-title" className="split-heading">Get in Touch</span>
         </h1>
         
         {/* Breadcrumb Navigation */}
         <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Contact</span>
         </div>
      </div>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 mb-20">
            
            {/* Left: Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="contact-main-heading">
                Reach out to our experts.
              </h2>
              
              <div className="gsap-reveal contact-info-card contact-details-wrapper">
                
                {/* Location */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon-box">
                    <MapPin className="text-[#2fa084]" size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest block mb-2">Corporate Office & Factory</span>
                    <p className="text-[#405473] text-[17px] leading-[1.8]">
                      R S NO 9 P4/P1, Plot No 1 & 2,<br/>
                      National Highway 27, Opp. BPCL Petrol Pump,
                      Biliyala, Gondal, <br/>Rajkot, Gujarat-360005
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon-box">
                    <Phone className="text-[#2fa084]" size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest block mb-2">Sales & Inquiry</span>
                    <p className="text-[#2fa084] text-[20px] font-medium mt-1">
                      +91 90 93 94 95 99
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon-box">
                    <Mail className="text-[#2fa084]" size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest block mb-2">Email Us</span>
                    <p className="text-[#405473] text-[18px] font-medium hover:text-[#2fa084] transition-colors cursor-pointer mt-1">
                      info@flashcabcables.com
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Premium Form */}
            <div className="lg:col-span-3 gsap-reveal">
              <div className="contact-form-container">
                <h3 className="contact-form-heading">Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="relative group">
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
                    <div className="relative group">
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
                  
                  <div className="relative group">
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
                  
                  <div className="relative group">
                    <textarea 
                      rows="4" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your Message..."
                      className="contact-custom-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="solax-btn-dark group">
                    <div className="solax-btn-dot"></div>
                    <span>Send Message</span>
                    <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  {status && <p className="mt-4 font-medium text-[#2fa084]">{status}</p>}
                </form>
              </div>
            </div>
          </div>

          {/* Google Map Section */}
          <div className="gsap-reveal contact-map-wrapper">
            <iframe 
              className="contact-map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118237.98926955042!2d70.67290022370776!3d21.94270417931326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39583a62854dd0a5%3A0xc3191fcd52c92330!2sGondal%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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

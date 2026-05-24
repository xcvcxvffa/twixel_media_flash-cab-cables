import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  });

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
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-bg-light py-24 text-center border-b border-border-color">
        <div className="container mx-auto">
          <h1 className="text-6xl font-heading font-extrabold text-secondary mb-5 tracking-tight">Get in Touch</h1>
          <div className="font-heading text-sm font-medium">
            <span className="text-text-light">Home</span>
            <span className="mx-4 text-border-color">/</span>
            <span className="text-primary">Contact</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-24 bg-bg-white">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
            
            {/* Left: Info */}
            <div className="lg:col-span-2 gsap-reveal">
              <h2 className="text-4xl font-heading font-bold text-secondary mb-10 tracking-tight">Reach out to our experts.</h2>
              
              <div className="mb-10">
                <span className="text-xs font-semibold text-text-light uppercase tracking-widest">Corporate Office & Factory</span>
                <p className="text-lg text-secondary mt-2 font-medium">Plot No. 3, G.I.D.C-2, Jamwadi,<br/>Gondal, Rajkot, Gujarat - 360311</p>
              </div>

              <div className="mb-10">
                <span className="text-xs font-semibold text-text-light uppercase tracking-widest">Sales & Inquiry</span>
                <p className="text-2xl text-primary mt-2 font-bold">+91 99999 99999</p>
                <p className="text-lg text-secondary font-medium">flashcab12@gmail.com</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 gsap-reveal bg-bg-light p-12 rounded-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-secondary">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border border-border-color rounded-xl bg-white font-body outline-none focus:border-primary transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-secondary">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border border-border-color rounded-xl bg-white font-body outline-none focus:border-primary transition-colors" 
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-2 text-secondary">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-border-color rounded-xl bg-white font-body outline-none focus:border-primary transition-colors" 
                  />
                </div>
                
                <div className="mb-10">
                  <label className="block text-sm font-semibold mb-2 text-secondary">Your Message</label>
                  <textarea 
                    rows="5" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-border-color rounded-xl bg-white font-body outline-none resize-none focus:border-primary transition-colors"
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-heading font-bold hover:bg-secondary transition-colors">
                  Send Inquiry
                </button>
                {status && <p className="mt-4 text-center font-medium text-secondary">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

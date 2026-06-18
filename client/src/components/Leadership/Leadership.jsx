import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import './Leadership.css';

gsap.registerPlugin(ScrollTrigger);

const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f1f5f9'/%3E%3Cg transform='translate(152, 202) scale(4)'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E%3C/g%3E%3C/svg%3E";

const leaders = [
  {
    id: 1,
    name: 'Name',
    role: 'Founder',
    image: placeholderSvg,
    linkedin: 'https://linkedin.com', // Icon added
    description: "Built on strong values and deep industry expertise, our founders laid the foundation of the company with a clear vision of quality, precision, and long-term growth. Their dedication, leadership, and commitment to excellence continue to drive our success and shape the future of our organization."
  },
  {
    id: 2,
    name: 'Name',
    role: 'Managing Director',
    image: placeholderSvg,
    linkedin: 'https://linkedin.com',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\\n\\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  }
];

const Leadership = () => {
  const containerRef = useRef(null);
  const [selectedLeader, setSelectedLeader] = useState(null);

  useGSAP(() => {
    // Reveal animation for cards
    gsap.fromTo('.leader-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.leadership-section',
          start: 'top 80%',
        }
      }
    );

    // Description animation
    gsap.fromTo('.leadership-desc',
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: '.leadership-desc',
          start: "top 85%",
        }
      }
    );

  }, { scope: containerRef });

  // Modal Animation Logic
  useGSAP(() => {
    if (selectedLeader) {
      gsap.fromTo('.leader-modal-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo('.leader-modal-content',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [selectedLeader]);

  const closeModal = () => {
    gsap.to('.leader-modal-content', { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
    gsap.to('.leader-modal-overlay', { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => setSelectedLeader(null) });
  };

  return (
    <section ref={containerRef} className="leadership-section">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        <div className="leadership-grid">
          
          {/* Left: Cards */}
          <div className="leadership-cards-wrapper">
            {leaders.map((leader) => (
              <div 
                key={leader.id} 
                className="leader-card" 
                onClick={() => setSelectedLeader(leader)}
              >
                <div className="leader-image-box">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className="leader-info">
                  <h4 className="leader-name">{leader.name}</h4>
                  <p className="leader-role">{leader.role}</p>
                  <div className="leader-social-placeholder">
                    {leader.linkedin && (
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <i className="fa-brands fa-linkedin-in linkedin-icon text-[18px]"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Text Content */}
          <div className="leadership-text-wrapper text-left">
            <span className="impact-eyebrow inline-block mb-6 md:mb-8">OUR LEADERSHIP</span>
            <h2 className="global-section-heading" style={{ margin: 0, textAlign: 'left' }}>
              Leadership That Built the Foundation
            </h2>
            <p className="leadership-desc text-slate-500 text-[16px] leading-relaxed max-w-xl mt-6">
              Built on strong values and deep industry expertise, our founders laid the foundation of the company with a clear vision of quality, precision, and long-term growth. Their dedication, leadership, and commitment to excellence continue to drive our success and shape the future of our organization.
            </p>
          </div>

        </div>
      </div>

      {/* Modal */}
      {selectedLeader && (
        <div className="leader-modal-overlay" onClick={closeModal}>
          <div className="leader-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="leader-modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="leader-modal-grid">
              <div className="leader-modal-image">
                <img src={selectedLeader.image} alt={selectedLeader.name} />
              </div>
              <div className="leader-modal-info">
                <h3 className="leader-modal-name">{selectedLeader.name}</h3>
                <p className="leader-modal-role">{selectedLeader.role}</p>
                
                <div className="leader-modal-desc">
                  {selectedLeader.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {selectedLeader.linkedin && (
                  <a href={selectedLeader.linkedin} target="_blank" rel="noopener noreferrer" className="leader-modal-social">
                    <i className="fa-brands fa-linkedin-in linkedin-icon text-[20px]"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Leadership;

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import anime from 'animejs';
import { ShieldCheck, Award, Lightbulb, PlayCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const clientsRef = useRef(null);

  // GSAP Animations (Headings and Fade-ins)
  useGSAP(() => {
    // Split Headings
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
            duration: 0.8,
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    });

    // Fade-in Up Elements
    const fadeElements = document.querySelectorAll('.animate-fade-in-up');
    fadeElements.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
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

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      gsap.fromTo(counter,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2.5,
          snap: { innerHTML: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          onUpdate: function () {
            counter.innerHTML = Math.round(counter.innerHTML).toLocaleString() + (counter.getAttribute('data-suffix') || '');
          }
        }
      );
    });

    // Image Scroll Scale Animation
    gsap.to('.hero-image-container', {
      scale: 1.5,
      scrollTrigger: {
        trigger: '.hero-image-container',
        start: 'top center',
        end: 'bottom top',
        scrub: 1
      }
    });
  }, []);

  // AnimeJS Animation for Client Logos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.anime-client-logo',
              scale: [0.8, 1],
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(100),
              easing: 'easeOutElastic(1, .8)',
              duration: 1200,
            });
            observer.disconnect(); // Only animate once
          }
        });
      },
      { threshold: 0.2 }
    );

    if (clientsRef.current) {
      observer.observe(clientsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <ShieldCheck size={32} className="text-[#3b82f6]" />,
      iconBg: "bg-[#eff6ff]",
      title: "Reliability",
      description: "Our products are engineered for consistent performance, offering dependable results and exceptional durability across all applications, ensuring peace of mind for our customers."
    },
    {
      icon: <Award size={32} className="text-[#f59e0b]" />,
      iconBg: "bg-[#fffbeb]",
      title: "Quality",
      description: "We prioritize superior quality through rigorous testing, precise manufacturing, and attention to detail, guaranteeing that every product meets the highest industry standards for safety and performance."
    },
    {
      icon: <Lightbulb size={32} className="text-[#10b981]" />,
      iconBg: "bg-[#ecfdf5]",
      title: "Innovation",
      description: "Driven by innovation, we constantly advance our designs and technologies to provide cutting-edge solutions, addressing the evolving needs of our customers and setting new industry benchmarks."
    }
  ];

  // Placeholder names for the logos to match the screenshot vibe
  const clients = [
    { name: "RAJESH POWER", color: "#e11d48" },
    { name: "INDIAN RAILWAYS", color: "#b91c1c" },
    { name: "APCPDCL", color: "#1d4ed8" },
    { name: "BSNL", color: "#0369a1" },
    { name: "DB Padhiyar", color: "#475569" },
    { name: "DGVCL", color: "#be185d" }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Page Header (Consistent across subpages) */}
      <div className="breadcrumb-hero">
        <h1 className="breadcrumb-title">
          <span key="about-title" className="split-heading">About Us</span>
        </h1>

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <span className="current">About Us</span>
        </div>
      </div>

      {/* SolaX Style Hero Section */}
      <section className="bg-white w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Title and Subtitle - Acts like the 85vh header */}
        <div className="w-full min-h-[50vh] md:h-[85vh] flex flex-col justify-center items-center text-center animate-fade-in-up px-4 md:px-8 mb-8">
          <h1 className="text-[36px] md:text-[48px] font-[500] text-[#333333] mb-6 split-heading tracking-tight">
            Flashcab Cables Pvt. Ltd.
          </h1>
          <p className="text-[#8c8c8c] text-[15px] md:text-[16px] leading-relaxed max-w-[700px] mx-auto">
            Discover our commitment to excellence in cable and wire manufacturing. With years of industry experience, we deliver innovative, reliable, and high-quality solutions tailored to your needs.
          </p>
        </div>

        {/* Hero Image - 100vh and 70% width */}
        <div className="w-full animate-fade-in-up flex justify-center mb-32">
          <div className="w-[90%] md:w-[70%] h-[50vh] md:h-[100vh] mx-auto rounded-[40px] overflow-hidden relative hero-image-container shadow-2xl border border-gray-100">
            <img 
              src="/assets/images/hero_bg.png" 
              alt="About Flash Cab" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="animate-fade-in-up mb-4">
            <span className="pill-badge pill-badge-blue">Why Choose Us</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-bold text-[#203a70] mb-6 tracking-tight split-heading">
            Partner for Quality & Innovation
          </h2>
          <p className="text-[#64748b] text-[18px] max-w-2xl mx-auto mb-16 animate-fade-in-up">
            Choose us as your trusted cable and wire manufacturing partner for our commitment to quality, innovation, and reliability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card animate-fade-in-up">
                <div className={`feature-icon-wrapper ${feature.iconBg}`}>
                  {feature.icon}
                </div>
                <h3 className="text-[22px] font-bold text-[#203a70] mb-4">{feature.title}</h3>
                <p className="text-[#64748b] text-[16px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Valuable Clients Section */}
      <section className="py-24 bg-white" ref={clientsRef}>
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-[36px] md:text-[42px] font-bold text-[#203a70] mb-4 tracking-tight split-heading">
            Our Valuable Clients
          </h2>
          <p className="text-[#64748b] text-[18px] mb-16 animate-fade-in-up">
            Trusted by leading companies across industries throughout India.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clients.map((client, idx) => (
              <div key={idx} className="client-logo-card anime-client-logo opacity-0">
                <div
                  className="font-extrabold text-[18px] md:text-[20px] text-center uppercase tracking-tighter"
                  style={{ color: client.color }}
                >
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

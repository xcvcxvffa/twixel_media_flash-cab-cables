import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight, ShieldCheck, Target, Eye, Gem, Shield, Award, Lightbulb,
  Settings, CheckCircle2, Factory, Search, FileCheck, Building2,
  Home, Power, Radio, Sprout, Building, Download, ShieldAlert, Zap,
  Calendar, MapPin, Network, FlaskConical, ClipboardCheck, Timer, Headset
} from 'lucide-react';
import SideRays from '../components/SideRays/SideRays';
import '../stars.css';

gsap.registerPlugin(ScrollTrigger);

// Custom Colors
const colors = {
  pink: '#E6008D',
  blue: '#5A78B8',
  lime: '#C4CC00',
  dark: '#111111',
  light: '#F8F9FB'
};

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now();
          const duration = 1500; // 1.5 seconds

          const updateCount = (now) => {
            if (!active) return;
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentVal = easeProgress * target;

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(updateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [target]);

  const formatNumber = (val) => {
    if (target % 1 !== 0) {
      return val.toFixed(1);
    }
    return Math.floor(val).toLocaleString('en-IN');
  };

  return (
    <span ref={ref} className="inline-flex items-baseline justify-center whitespace-nowrap">
      <span className="font-extrabold tracking-tight tabular-nums">{formatNumber(count)}</span>
      {suffix && <span className="ml-1 text-2xl md:text-3xl font-extrabold text-slate-400">{suffix}</span>}
    </span>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const [hoveredIndustry, setHoveredIndustry] = useState(null);

  const R_nodes = 270;
  const R_ring = 120;
  const center = 350;

  const getCoords = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    const x = center + radius * Math.cos(rad);
    const y = center + radius * Math.sin(rad);
    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  };

  const industries = [
    { icon: Radio, title: 'Telecom & Communication', desc: 'Data transmission and communication networks.', angle: -120, color: '#E6008D', colorAlpha: 'rgba(230,0,141,0.15)', align: 'left' },
    { icon: Home, title: 'Residential & Housing', desc: 'Home wiring and electrical infrastructure.', angle: -60, color: '#B4CC00', colorAlpha: 'rgba(180,204,0,0.15)', align: 'right' },
    { icon: Building, title: 'Commercial Buildings', desc: 'Offices, malls, hotels and business spaces.', angle: -20, color: '#8FA838', colorAlpha: 'rgba(143,168,56,0.15)', align: 'right' },
    { icon: Factory, title: 'Industrial Manufacturing', desc: 'Factories, plants and industrial operations.', angle: 20, color: '#789880', colorAlpha: 'rgba(120,152,128,0.15)', align: 'right' },
    { icon: Power, title: 'Power & Utilities', desc: 'Power distribution and electrical networks.', angle: 60, color: '#4A607A', colorAlpha: 'rgba(74,96,122,0.15)', align: 'right' },
    { icon: Building2, title: 'Infrastructure Projects', desc: 'Roads, bridges, airports and public projects.', angle: 120, color: '#3A60A0', colorAlpha: 'rgba(58,96,160,0.15)', align: 'left' },
    { icon: Zap, title: 'Residential & Housing', desc: 'Solar and sustainable energy applications.', angle: 160, color: '#8A4F9F', colorAlpha: 'rgba(138,79,159,0.15)', align: 'left' },
    { icon: Sprout, title: 'Agriculture', desc: 'Pumps, irrigation systems and rural electrification.', angle: -160, color: '#D82C8A', colorAlpha: 'rgba(216,44,138,0.15)', align: 'left' },
  ];

  useGSAP(() => {
    // Split Headings for GSAP
    const splitHeadings = document.querySelectorAll('.about-page-wrapper h1, .about-page-wrapper h2, .about-page-wrapper h3, .about-page-wrapper h4, .about-page-wrapper h5, .about-page-wrapper h6, .split-heading');
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

    // Reveal Animations
    gsap.utils.toArray('.gsap-reveal-up').forEach((el) => {
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

    // Stagger Animations
    gsap.utils.toArray('.gsap-stagger-parent').forEach((parent) => {
      const children = parent.querySelectorAll('.gsap-stagger-child');
      gsap.fromTo(children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Parallax Images
    gsap.utils.toArray('.gsap-parallax').forEach((el) => {
      gsap.to(el, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // --- NEW ANIMATIONS COPIED FROM HOME.JSX SECTION 2 ---
    const globalParagraphs = document.querySelectorAll('.gsap-stagger-text p, .about-box-text, .split-desc');
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

    // Industries Diagram Smooth Entrance Animation
    const diagTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".industries-diagram-container",
        start: "top 75%",
        toggleActions: "play reverse play reverse"
      }
    });

    diagTl.from(".industries-center-logo-wrap", {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.5)"
    })
      .from(".industries-diagram-container svg path, .industries-diagram-container svg line", {
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4")
      // Safe animation: target the inner elements so their absolute coordinates are preserved
      .fromTo(".industries-node-icon",
        { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 },
        { scale: 1, opacity: 1, xPercent: -50, yPercent: -50, stagger: 0.02, duration: 0.2, ease: "back.out(1.2)" }
        , "-=0.2")
      .from(".industries-node-text", {
        x: (index, target) => target.classList.contains("left") ? 20 : -20,
        opacity: 0,
        stagger: 0.02,
        duration: 0.2,
        ease: "power3.out"
      }, "<0.02");

    let mm = gsap.matchMedia();
    const polaroidStack = document.querySelector('.polaroid-stack');
    let handleMouseMove, handleMouseLeave;

    gsap.fromTo('.polaroid-stack',
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: '.polaroid-stack', start: "top 80%" } }
    );

    mm.add("(min-width: 769px)", () => {
      gsap.set('.polaroid-front', { rotate: 8, x: 40, y: 20 });
      gsap.set('.polaroid-back', { rotate: 0, x: -20, y: 0 });

      handleMouseMove = (e) => {
        if (!polaroidStack) return;
        const rect = polaroidStack.getBoundingClientRect();
        const xCenter = rect.left + rect.width / 2;
        const yCenter = rect.top + rect.height / 2;
        const xAxis = (xCenter - e.clientX) / 25;
        const yAxis = (yCenter - e.clientY) / 25;
        gsap.to('.polaroid-front', { x: 40 + xAxis * 1.5, y: 20 + yAxis * 1.5, rotate: 8 + (xAxis * 0.05), duration: 0.6, ease: "power2.out" });
        gsap.to('.polaroid-back', { x: -20 - xAxis, y: -yAxis, duration: 0.6, ease: "power2.out" });
      };

      handleMouseLeave = () => {
        gsap.to('.polaroid-front', { x: 40, y: 20, rotate: 8, duration: 1, ease: "elastic.out(1, 0.5)" });
        gsap.to('.polaroid-back', { x: -20, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
      };

      if (polaroidStack) {
        polaroidStack.addEventListener('mousemove', handleMouseMove);
        polaroidStack.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    mm.add("(max-width: 768px)", () => {
      gsap.set('.polaroid-front', { rotate: 5, x: 15, y: 10 });
      gsap.set('.polaroid-back', { rotate: -2, x: -10, y: 0 });
    });


    // --- END NEW ANIMATIONS ---

    // ==========================================
    // PREMIUM MISSION, VISION, VALUES ANIMATIONS
    // ==========================================

    // 1. Reveal header
    gsap.fromTo('.gsap-reveal-up-mvv',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.premium-mvv-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Cards stagger fade-up
    gsap.fromTo('.premium-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.mvv-cards-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Floating background particles
    const particles = document.querySelectorAll('.gsap-particle');
    particles.forEach(p => {
      gsap.to(p, {
        x: "random(-80, 80)",
        y: "random(-80, 80)",
        opacity: "random(0.1, 0.5)",
        duration: "random(6, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // 4. Floating badges continuous move
    gsap.to('.card-floating-badge', {
      y: -8,
      rotation: 2,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.6,
        from: "random"
      }
    });

    // 5. Background blobs continuous pulsing/floating
    gsap.to('.mvv-blob-pink', {
      x: "random(-40, 40)",
      y: "random(-40, 40)",
      scale: "random(0.95, 1.05)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to('.mvv-blob-blue', {
      x: "random(-40, 40)",
      y: "random(-40, 40)",
      scale: "random(0.95, 1.05)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to('.mvv-blob-lime', {
      x: "random(-30, 30)",
      y: "random(-30, 30)",
      scale: "random(0.95, 1.05)",
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      mm.revert();
      if (polaroidStack && handleMouseMove && handleMouseLeave) {
        polaroidStack.removeEventListener('mousemove', handleMouseMove);
        polaroidStack.removeEventListener('mouseleave', handleMouseLeave);
      }
    };


  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="about-page-wrapper bg-[#F8F9FB] text-[#111111] overflow-hidden font-sans">

      {/* Page Header (Theme Breadcrumb) */}
      <div className="breadcrumb-hero pt-24" style={{ backgroundImage: "url('/assets/images/team_working.png')" }}>
        <h1 className="breadcrumb-title split-heading">
          About Us
        </h1>
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <span className="current">About Us</span>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: HERO ABOUT US
          ===================================================================== */}
      <section id="premium-about" className="about-hero-section">
        <div className="container mx-auto">
          <div className="premium-about-wrapper">

            {/* Left: Polaroid Stack Layout */}
            <div className="premium-about-col" style={{ flex: '1 1 45%', minWidth: '300px' }}>
              <div className="polaroid-stack" style={{ cursor: 'pointer' }}>
                <div className="polaroid-card polaroid-back">
                  <img src="/assets/images/about_polaroid_2.jpg" alt="Quality Assurance" />
                </div>
                <div className="polaroid-card polaroid-front">
                  <img src="/assets/images/about_polaroid_1.jpg" alt="Flash Cab Cables" />
                </div>
              </div>
            </div>

            {/* Right: Premium Content & Bento Stats */}
            <div className="premium-about-col premium-about-content gsap-stagger-text" style={{ flex: '1 1 45%', minWidth: '300px' }}>
              <span className="premium-eyebrow">WHO WE ARE</span>
              <h2 className="premium-about-title">
                Engineering the Next Era of Connectivity
              </h2>
              <p className="premium-about-desc">
                Flashcab Cables Pvt. Ltd. is a leading manufacturer of high-quality cables and wires, dedicated to powering industries, infrastructure, and communities through reliable electrical solutions.
              </p>
              <p className="premium-about-desc">
                With a strong commitment to innovation, engineering excellence, and customer satisfaction, we develop durable cable products that meet the evolving demands of residential, commercial, industrial, and utility applications. Our focus on quality and performance ensures dependable connectivity across every project we serve.
              </p>
              <p className="premium-about-desc">
                Driven by advanced manufacturing technology, experienced professionals, and rigorous quality control standards, we deliver products that prioritize safety, efficiency, and long-term reliability. At Flashcab Cables, every cable is designed to support progress, build trust, and create lasting value for our customers.
              </p>

              {/* Highlights Row */}
              {/* <div className="premium-highlights-row gsap-stagger-child">
                          <div className="highlight-pill">
                              <Zap size={16} className="text-[#E6008D]" />
                              <span>11KV HT Manufacturer</span>
                          </div>
                          <div className="highlight-pill">
                              <ShieldCheck size={16} className="text-[#5A78B8]" />
                              <span>BIS Certified</span>
                          </div>
                          <div className="highlight-pill">
                              <Award size={16} className="text-[#C4CC00]" />
                              <span>18+ Years Exp</span>
                          </div>
                      </div> */}
            </div>

          </div>
        </div>
      </section>
      {/* =====================================================================
          SECTION 2: MISSION • VISION • CORE VALUES (Premium Redesign)
          ===================================================================== */}
      <section className="premium-mvv-section">
        {/* Animated Background Mesh Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E6008D]/10 blur-[120px] mvv-blob-pink" />
          <div className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[#5A78B8]/10 blur-[130px] mvv-blob-blue" />
          <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#C4CC00]/8 blur-[120px] mvv-blob-lime" />
        </div>

        {/* Noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

        {/* Floating background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white opacity-25 gsap-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          {/* Section Header */}
          <div className="premium-mvv-header gsap-reveal-up-mvv">
            <span className="premium-eyebrow">OUR FOUNDATION</span>
            <h2 className="premium-mvv-title">
              Powering Progress With Purpose
            </h2>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 mvv-cards-container">

              {/* Card 1: Mission */}
              <div className="premium-card accent-pink group">
                <div className="card-glow" />
                <div className="card-floating-badge text-[#E6008D]">
                  <Target size={32} strokeWidth={1.5} className="transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="premium-card-title">Our Mission</h3>
                <p className="premium-card-desc">
                  To manufacture innovative, safe, and high-performance cable solutions that empower industries, infrastructure, businesses, and communities.
                </p>
              </div>

              {/* Card 2: Vision */}
              <div className="premium-card accent-blue group">
                <div className="card-glow" />
                <div className="card-floating-badge text-[#5A78B8]">
                  <Eye size={32} strokeWidth={1.5} className="transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="premium-card-title">Our Vision</h3>
                <p className="premium-card-desc">
                  To become one of India's most trusted cable manufacturing brands through quality excellence, technological advancement, and customer-focused innovation.
                </p>
              </div>

              {/* Card 3: Values */}
              <div className="premium-card accent-lime group">
                <div className="card-glow" />
                <div className="card-floating-badge text-[#C4CC00]">
                  <Shield size={32} strokeWidth={1.5} className="transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="premium-card-title">Our Core Values</h3>
                <p className="premium-card-desc">
                  Integrity, Innovation, Reliability, Quality Excellence, Customer Commitment, and Sustainable Growth.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>



      {/* =====================================================================
          SECTION 3: OUR JOURNEY & MILESTONES
          ===================================================================== */}
      {(() => {
        const journeyMilestones = [
          { year: '2006', title: 'Flash Cab Cables Pvt. Ltd.', desc: 'Founded with a vision to manufacture high-quality cables, setting the foundation for innovation and reliability in the electrical industry.', img: '/assets/images/journey_factory.png' },
          { year: '2010', title: 'Manufacturing Expansion', desc: 'Expanded production capacity with state-of-the-art machinery and modern infrastructure to meet growing demand across the region.', img: '/assets/images/industrial_cable.png' },
          { year: '2015', title: 'Regional Market Leadership', desc: 'Achieved market leadership in the Saurashtra region by delivering consistent quality and building trusted partnerships with distributors.', img: '/assets/images/industrial_mix_bg.png' },
          { year: '2018', title: 'Advanced Testing Facility', desc: 'Launched a cutting-edge testing laboratory to ensure every product meets international quality and safety standards.', img: '/assets/images/team_working.png' },
          { year: '2021', title: 'Multi-State Expansion', desc: 'Expanded distribution network across multiple states, strengthening the brand presence and serving a wider customer base.', img: '/assets/images/about_polaroid_2.jpg' },
          { year: '2024', title: "11KV HT Cable Manufacturer", desc: "Became Saurashtra's first 11KV HT cable manufacturer, marking a milestone in high-voltage cable production capabilities.", img: '/assets/images/about_polaroid_1.jpg' },
        ];

        const [activeIndex, setActiveIndex] = React.useState(0);
        const [slideDirection, setSlideDirection] = React.useState(1); // 1 = forward, -1 = backward
        const activeItem = journeyMilestones[activeIndex];
        const isDragging = React.useRef(false);
        const dragStartX = React.useRef(0);
        const hasMoved = React.useRef(false);
        const contentRef = React.useRef(null);

        const SWIPE_THRESHOLD = 80; // px needed to trigger slide change

        const goToSlide = (newIndex) => {
          if (newIndex < 0 || newIndex >= journeyMilestones.length || newIndex === activeIndex) return;
          setSlideDirection(newIndex > activeIndex ? 1 : -1);
          setActiveIndex(newIndex);
        };

        const handleDragStart = (e) => {
          isDragging.current = true;
          hasMoved.current = false;
          dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        };

        const handleDragMove = (e) => {
          if (!isDragging.current) return;
          const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
          const diff = clientX - dragStartX.current;
          if (Math.abs(diff) > 10) hasMoved.current = true;
        };

        const handleDragEnd = (e) => {
          if (!isDragging.current) return;
          isDragging.current = false;
          const clientX = e.type === 'touchend'
            ? (e.changedTouches ? e.changedTouches[0].clientX : dragStartX.current)
            : e.clientX;
          const diff = clientX - dragStartX.current;

          if (Math.abs(diff) >= SWIPE_THRESHOLD) {
            if (diff < 0) {
              // Dragged left → go to next slide
              goToSlide(activeIndex + 1);
            } else {
              // Dragged right → go to previous slide
              goToSlide(activeIndex - 1);
            }
          }
        };

        React.useEffect(() => {
          const onMove = (e) => handleDragMove(e);
          const onEnd = (e) => handleDragEnd(e);
          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onEnd);
          window.addEventListener('touchmove', onMove, { passive: false });
          window.addEventListener('touchend', onEnd);
          return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
          };
        }, [activeIndex]);

        // Slide animation variants
        const slideVariants = {
          enter: (dir) => ({ opacity: 0, x: dir > 0 ? 120 : -120 }),
          center: { opacity: 1, x: 0 },
          exit: (dir) => ({ opacity: 0, x: dir > 0 ? -120 : 120 }),
        };

        const imageVariants = {
          enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.95 }),
          center: { opacity: 1, x: 0, scale: 1 },
          exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.95 }),
        };

        return (
          <section id="journey" className="journey-section">
            <div className="journey-container">

              {/* Top: Separator line + Header */}
              <div className="journey-top-line"></div>
              <div className="journey-header">
                <h2 className="journey-title split-heading">Our journey</h2>
              </div>

              {/* Middle: Content area — FULLY DRAGGABLE */}
              <div
                className="journey-content journey-draggable"
                ref={contentRef}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
              >
                {/* Left: Year + Description */}
                <div className="journey-left">
                  <span className="journey-company-name">Flash Cab Cables Pvt. Ltd.</span>
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={activeIndex}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="journey-year">{activeItem.year}</div>
                      <p className="journey-desc">{activeItem.desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Right: Single image that changes per year */}
                <div className="journey-right">
                  <div className="journey-image-single">
                    <AnimatePresence mode="wait" custom={slideDirection}>
                      <motion.img
                        key={activeItem.img}
                        custom={slideDirection}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                        src={activeItem.img}
                        alt={activeItem.title}
                        draggable={false}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Bottom: Horizontal Timeline */}
              <div className="journey-timeline">
                <div className="journey-timeline-track">
                  {journeyMilestones.map((item, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && (
                        <div className={`journey-timeline-segment ${i <= activeIndex ? 'active' : 'inactive'}`}></div>
                      )}
                      <div
                        className={`journey-timeline-node ${i === activeIndex ? 'current' : ''} ${i < activeIndex ? 'passed' : ''} ${i > activeIndex ? 'future' : ''}`}
                        onClick={() => goToSlide(i)}
                      >
                        <span className="journey-dot-year">{item.year}</span>
                        <div className="journey-dot"></div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

            </div>
          </section>
        );
      })()}


      {/* =====================================================================
          SECTION 4: QUALITY ASSURANCE (Redesigned)
          ===================================================================== */}
      <section className="about-section bg-[#F8F9FB] py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          {/* Top Row: Content & Image */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">

            {/* Left Content */}
            <div className="w-full lg:w-1/2 premium-about-content gsap-stagger-text">
              <span className="premium-eyebrow inline-block mb-4">QUALITY ASSURANCE</span>
              <h2 className="premium-about-title split-heading mb-6">
                Excellence in Every Connection
              </h2>

              <p className="premium-about-desc">
                At <strong>Flashcab Cables Pvt. Ltd.</strong>, quality is at the core of everything we do. Every product undergoes stringent quality checks, advanced testing procedures, and continuous monitoring throughout the manufacturing process to ensure superior performance, safety, and reliability.
              </p>

              {/* Key Quality Commitments Box matching the image */}
              <div
                className="mt-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-white shadow-sm"
                style={{
                  padding: '30px 32px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  alignItems: 'center',
                }}
              >
                <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1F6F5F' }}>
                  <ShieldCheck size={40} color="white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[20px] font-bold tracking-tight mb-[20px]" style={{ color: '#1F6F5F', marginBottom: '10px' }}>
                    Key Quality Commitments
                  </h4>
                  <ul style={{ marginBottom: '0' }}>
                    {[
                      "Premium Grade Raw Materials",
                      "Precision Manufacturing Process",
                      "Comprehensive Product Testing",
                      "Consistent Performance & Reliability"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-slate-700 font-medium text-[15px] mb-[12px] last:mb-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                          <circle cx="12" cy="12" r="10" fill="#1F6F5F" />
                          <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative gsap-reveal-up" style={{ transitionDelay: '0.2s' }}>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white border-8 border-white group">
                <img
                  src="/assets/images/about_polaroid_2.jpg"
                  alt="Quality Testing Machine"
                  className="w-full h-auto object-cover aspect-[4/3] transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* Bottom Row: 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-[40px] gap-[30px] Quality-Commitments">
            {[
              {
                title: 'Raw Material\nTesting',
                desc: 'Careful inspection and testing of raw materials to ensure highest quality and reliability.',
                color: '#34A853', // Green
                icon: Search
              },
              {
                title: 'Process\nControl',
                desc: 'Advanced manufacturing processes with strict quality control at every stage.',
                color: '#E6008D', // Pink
                icon: Settings
              },
              {
                title: 'Quality\nInspection',
                desc: 'Multiple inspection checkpoints and rigorous testing to maintain consistent quality.',
                color: '#205493', // Blue
                icon: FileCheck
              },
              {
                title: 'Final Product\nTesting',
                desc: '100% testing of finished products to ensure safety, performance and compliance.',
                color: '#F5A623', // Orange
                icon: ShieldCheck
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[24px] flex flex-col transition-transform duration-300 hover:-translate-y-2 relative group min-h-[220px]"
                style={{
                  padding: '32px 28px',
                  border: `1px solid #f1f5f9`,
                  borderBottom: `4px solid ${card.color}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                }}
              >
                {/* Icon and Title Container */}
                <div className="flex items-center gap-[20px] mb-[16px]">
                  {/* Circular Icon with outer ring */}
                  <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center flex-shrink-0 relative">
                    {/* Outer lighter ring */}
                    <div className="absolute inset-0 rounded-full opacity-[0.15]" style={{ backgroundColor: card.color, transform: 'scale(1.25)' }}></div>
                    {/* Inner solid circle */}
                    <div className="absolute inset-0 rounded-full" style={{ backgroundColor: card.color }}></div>
                    <card.icon size={26} color="white" strokeWidth={2} className="relative z-10" />
                  </div>

                  {/* Title */}
                  <h4 className="font-bold leading-tight whitespace-pre-line text-[17px] tracking-tight" style={{ color: card.color, margin: 0 }}>
                    {card.title}
                  </h4>
                </div>

                {/* Description */}
                <div className="flex-1 relative z-10 pt-5">
                  <p className="text-[14px] text-slate-600 leading-relaxed font-medium" style={{ paddingTop: '20px' }}>
                    {card.desc}
                  </p>
                </div>

                {/* Number at bottom right */}
                <div className="absolute bottom-5 right-6 font-bold text-lg" style={{ color: card.color, opacity: 0.5 }}>
                  0{idx + 1}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 5: WHY FLASHCAB CABLES?
          ===================================================================== */}
      <section className="about-section py-24 relative bg-[#F8F9FB] why-flashcab-section">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-[100px] gsap-stagger-text">
            <span className="premium-eyebrow inline-block mb-4">OUR ADVANTAGE</span>
            <h2 className="premium-about-title split-heading mb-6">
              Why Flashcab Cables?
            </h2>
            <p className="premium-about-desc text-center mx-auto max-w-2xl">
              The advantages that make us the preferred partner across industries, delivering unmatched quality and reliable solutions.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-[75px] max-w-6xl mx-auto gsap-stagger-parent">
            {[
              { color: '#B4CC00', icon: Award, title: 'Premium\nQuality', desc: 'Manufactured using high-grade\nraw materials.' },
              { color: '#E6008D', icon: Factory, title: 'Advanced\nManufacturing', desc: 'Modern machinery and\nprecision processes.' },
              { color: '#5A78B8', icon: FlaskConical, title: 'Rigorous\nTesting', desc: 'Multiple quality checks for\nreliable performance.' },
              { color: '#5A78B8', icon: ClipboardCheck, title: 'Certified\nStandards', desc: 'Products comply with industry\nrequirements.' },
              { color: '#E6008D', icon: Timer, title: 'Timely\nDelivery', desc: 'Efficient supply chain and\ndistribution network.' },
              { color: '#B4CC00', icon: Headset, title: 'Customer\nSupport', desc: 'Dedicated support and long-\nterm partnerships.' },
            ].map((item, i) => (
              <div
                key={i}
                className="gsap-stagger-child bg-white border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] group why-flashcab-card flex flex-col items-center"
              >
                {/* Overlapping Icon */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-[60%]"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon size={32} color="white" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h4 className="why-flashcab-heading">
                  {item.title}
                </h4>

                {/* Underline */}
                <div className="why-flashcab-underline" style={{ backgroundColor: item.color }}></div>

                {/* Description */}
                <p className="why-flashcab-desc">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: INDUSTRIES WE SERVE
          ===================================================================== */}
      <section className="industries-section bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-6 gsap-reveal-up">
            <span className="premium-eyebrow">SECTORS WE POWER</span>
            <h2 className="split-heading premium-about-title">Industries We Serve</h2>
            <p className="premium-about-desc">Delivering robust power solutions across diverse sectors.</p>
          </div>

          {/* Desktop Circular Diagram Layout */}
          <div className="industries-diagram-container">
            <div className="industries-center-glow"></div>

            {/* SVG Connector Lines and Ring Segments */}
            <svg width="700" height="700" viewBox="0 0 700 700" className="absolute inset-0 z-0">
              {industries.map((ind, i) => {
                // Line connector points
                const pNode = getCoords(ind.angle, 218);
                const pRing = getCoords(ind.angle, 125);
                const isHovered = hoveredIndustry === i;

                // Arc segments for the outer ring
                const startAngle = ind.angle - 15;
                const endAngle = ind.angle + 15;
                const start = getCoords(startAngle, R_ring);
                const end = getCoords(endAngle, R_ring);
                const arcPath = `M ${start.x} ${start.y} A ${R_ring} ${R_ring} 0 0 1 ${end.x} ${end.y}`;

                return (
                  <g key={i}>
                    {/* Ring segment */}
                    <path
                      d={arcPath}
                      stroke={ind.color}
                      strokeWidth={isHovered ? 7 : 4}
                      strokeOpacity={isHovered ? 1.0 : 0.8}
                      fill="none"
                      strokeLinecap="round"
                      style={{ transition: 'stroke-width 0.3s ease, stroke-opacity 0.3s ease' }}
                    />
                    {/* Dashed connector line */}
                    <line
                      x1={pNode.x}
                      y1={pNode.y}
                      x2={pRing.x}
                      y2={pRing.y}
                      stroke={ind.color}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      strokeDasharray={isHovered ? 'none' : '4,4'}
                      strokeOpacity={isHovered ? 1.0 : 0.4}
                      style={{ transition: 'stroke-width 0.3s ease, stroke-opacity 0.3s ease' }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Central Brand Logo (Image 2) */}
            <div className="industries-center-logo-wrap">
              <img src="/assets/images/icons/flashcab_logo_new.png" alt="Flash Cab Logo" className="w-full h-full object-contain rounded-full" />
            </div>

            {/* Circular Nodes */}
            {industries.map((ind, i) => {
              const { x, y } = getCoords(ind.angle, R_nodes);
              const isHovered = hoveredIndustry === i;
              return (
                <div
                  key={i}
                  className="industries-node group/node"
                  style={{
                    '--node-color': ind.color,
                    '--node-color-alpha': ind.colorAlpha,
                    '--shadow-hover': `0 8px 24px ${ind.colorAlpha}`
                  }}
                  onMouseEnter={() => setHoveredIndustry(i)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                >
                  {/* Icon Circle */}
                  <div
                    className="industries-node-icon"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      backgroundColor: ind.color,
                    }}
                  >
                    <ind.icon size={24} className="text-white" />
                  </div>

                  {/* Text Label Block */}
                  <div
                    className="industries-node-text"
                    style={{
                      left: ind.align === 'right' ? `${x + 44}px` : 'auto',
                      right: ind.align === 'left' ? `${700 - x + 44}px` : 'auto',
                      top: `${y}px`,
                      textAlign: 'left',
                      alignItems: 'flex-start',
                      opacity: hoveredIndustry === null || isHovered ? 1 : 0.4,
                      transform: `translateY(-50%) scale(${isHovered ? 1.02 : 1})`,
                    }}
                  >
                    <h4 className="industries-node-title">{ind.title}</h4>
                    <p className="industries-node-desc">{ind.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Grid Layout (Visible on < 1024px) */}
          <div className="industries-mobile-grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="industries-mobile-card animate-fade-in"
                style={{
                  '--node-color': ind.color,
                  '--node-color-alpha': ind.colorAlpha,
                  borderTop: `4px solid ${ind.color}`,
                }}
              >
                <div className="industries-mobile-icon-wrap" style={{ backgroundColor: ind.color }}>
                  <ind.icon size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="industries-mobile-title">{ind.title}</h4>
                  <p className="industries-mobile-desc">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 7: CTA
          ===================================================================== */}
      <section className="about-section-dark py-24 md:py-32 relative overflow-hidden">
        {/* Starry Background Container */}
        <div className="stars-container">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl flex flex-col items-center justify-center gap-6 text-center">

          <h2 className="split-heading about-title-margin !mb-0 text-white-heading !font-[500]">
            Let's Build Powerful Connections Together
          </h2>

          <p className="max-w-2xl mx-auto text-center text-lg md:text-xl text-slate-300">
            Partner with Flashcab Cables Pvt. Ltd. for reliable, safe, and high-performance cable solutions.
          </p>

          <div className="flex items-center justify-center w-full">
            <Link to="/contact" className="btn-uiverse group">
              <span className="flex items-center gap-2.5">
                Partner With Us
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 self-center">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M15 16l4 -4" />
                  <path d="M15 8l4 4" />
                </svg>
              </span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;

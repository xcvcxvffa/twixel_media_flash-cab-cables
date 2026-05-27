import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { Zap, Star, Globe, ArrowRight } from 'lucide-react';
import ProductUsage from '../components/ProductUsage';

gsap.registerPlugin(ScrollTrigger);

const AnimatedNumber = ({ target }) => {
    const [phase, setPhase] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const timer1 = setTimeout(() => setPhase(1), 200);
            const timer2 = setTimeout(() => setPhase(2), 600);
            return () => { clearTimeout(timer1); clearTimeout(timer2); };
        }
    }, [isInView]);

    const half = Math.floor(target / 2);

    return (
        <span ref={ref} className="text-white text-5xl md:text-6xl font-bold tracking-tight font-heading inline-flex items-center">
            <span style={{ height: '1.2em', overflow: 'hidden', display: 'inline-block' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(-${phase * 33.333}%)`,
                    transition: 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)'
                }}>
                    <span style={{ height: '1.2em', lineHeight: '1.2em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</span>
                    <span style={{ height: '1.2em', lineHeight: '1.2em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{half}</span>
                    <span style={{ height: '1.2em', lineHeight: '1.2em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{target}</span>
                </div>
            </span>
            <span className="ml-1">+</span>
        </span>
    );
};

const Home = () => {
  const container = useRef(null);
  const glanceSliderRef = useRef(null);
  const swipeCursorRef = useRef(null);
  const productsSliderRef = useRef(null);
  const productsCursorRef = useRef(null);
  const conductorsSliderRef = useRef(null);
  const conductorsCursorRef = useRef(null);
  const opgwSliderRef = useRef(null);
  const opgwCursorRef = useRef(null);

  // Blog Slider Drag State
  const blogSliderRef = useRef(null);
  const isBlogDragging = useRef(false);
  const startXBlog = useRef(0);
  const scrollLeftBlog = useRef(0);

  const handleBlogMouseDown = (e) => {
    isBlogDragging.current = true;
    blogSliderRef.current.classList.remove('snap-x', 'snap-mandatory');
    startXBlog.current = e.pageX - blogSliderRef.current.offsetLeft;
    scrollLeftBlog.current = blogSliderRef.current.scrollLeft;
  };
  const handleBlogMouseLeave = () => {
    isBlogDragging.current = false;
    blogSliderRef.current.classList.add('snap-x', 'snap-mandatory');
  };
  const handleBlogMouseUp = () => {
    isBlogDragging.current = false;
    blogSliderRef.current.classList.add('snap-x', 'snap-mandatory');
  };
  const handleBlogMouseMove = (e) => {
    if (!isBlogDragging.current) return;
    e.preventDefault();
    const x = e.pageX - blogSliderRef.current.offsetLeft;
    const walk = (x - startXBlog.current) * 1.5;
    blogSliderRef.current.scrollLeft = scrollLeftBlog.current - walk;
  };

  useGSAP(() => {
    // 0. Hero Animation (Plays on load, not on scroll - exactly like PHP playHeroAnimation)
    const heroAnimate = document.querySelector('.hero-animate');
    if (heroAnimate) {
        const heroHeading = heroAnimate.querySelector('h1');
        if (heroHeading) {
            if (heroHeading.dataset.split !== 'true') {
                heroHeading.dataset.split = 'true';
                const lines = heroHeading.innerHTML.split(/<br\s*\/?>/i);
                const wrappedLines = lines.map(line => {
                    const words = line.split(/\s+/);
                    return words.map(word => {
                        if (word.trim() === '') return '';
                        return `<span class="word-mask" style="display:inline-block; overflow:hidden; vertical-align:bottom; padding-bottom:5px; margin-bottom:-5px;"><span class="anim-word" style="display:inline-block; opacity:0; transform:translateY(120%);">${word}</span></span>`;
                    }).join('&nbsp;');
                });
                heroHeading.innerHTML = wrappedLines.join('<br>');
            }

            // ALWAYS animate, even on hot-reload
            gsap.to(heroHeading.querySelectorAll('.anim-word'), {
                opacity: 1,
                y: "0%",
                stagger: 0.15,
                ease: "power4.out",
                duration: 1.2,
                delay: 0.2
            });
        }

        const heroText = heroAnimate.querySelector('p');
        if (heroText) {
            gsap.fromTo(heroText, 
                { autoAlpha: 0, y: 40 }, 
                { autoAlpha: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.8 }
            );
        }
    }

    // 1. Exact Global Heading Animation for ALL headings on the page (excluding footer)
    const globalHeadings = document.querySelectorAll('main h1:not(.hero-animate h1), main h2:not(.hero-animate h2), main h3, main h4, main h5, main h6, .split-heading, .split-subheading, .about-box-heading');
    
    globalHeadings.forEach(heading => {
        if (heading.dataset.split !== 'true') {
            heading.dataset.split = 'true';
            // Split by <br> to preserve line breaks, then split by space
            const lines = heading.innerHTML.split(/<br\s*\/?>/i);
            const wrappedLines = lines.map(line => {
                const words = line.split(/\s+/);
                return words.map(word => {
                    if (word.trim() === '') return '';
                    // Wrap each word in an overflow:hidden mask, then the word itself
                    return `<span class="word-mask" style="display:inline-block; overflow:hidden; vertical-align:bottom; padding-bottom:5px; margin-bottom:-5px;"><span class="anim-word" style="display:inline-block; opacity:0; transform:translateY(120%);">${word}</span></span>`;
                }).join('&nbsp;');
            });
            heading.innerHTML = wrappedLines.join('<br>');
        }

        // Animate the generated word spans rising out of their masks
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
                    toggleActions: "play reverse play reverse" // Reverses when scrolling up
                }
            });
        }
    });

    // 2. Exact Paragraph Animation
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
                    toggleActions: "play reverse play reverse" // Reverses when scrolling up
                }
            }
        );
    });

    // 3. Editorial Polaroid Animations & Responsive Mouse Parallax
    let mm = gsap.matchMedia();
    const polaroidStack = document.querySelector('.polaroid-stack');
    let handleMouseMove, handleMouseLeave;

    // Apply fade up animation to both mobile and desktop
    gsap.fromTo('.polaroid-stack', 
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: '.polaroid-stack', start: "top 80%" } }
    );

    mm.add("(min-width: 769px)", () => {
        // Desktop: Large offsets and mouse parallax
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
        // Mobile/Tablet: Smaller static offsets, no mouse move
        gsap.set('.polaroid-front', { rotate: 5, x: 15, y: 10 });
        gsap.set('.polaroid-back', { rotate: -2, x: -10, y: 0 });
    });
    gsap.fromTo('.bento-stat-card', 
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: '.premium-stats-grid', start: "top 85%" } }
    );

    // 3.5. Our Impact Section ScrollTrigger Animations
    gsap.fromTo('.impact-card', 
        { y: 50, autoAlpha: 0 },
        { 
            y: 0, 
            autoAlpha: 1, 
            duration: 1, 
            stagger: 0.2, 
            ease: "power3.out", 
            scrollTrigger: { 
                trigger: '.impact-grid', 
                start: "top 85%" 
            } 
        }
    );

    gsap.utils.toArray('.impact-stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        gsap.fromTo(stat, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: "power3.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                onUpdate: function() {
                    stat.innerHTML = Math.floor(stat.textContent) + "+";
                }
            }
        );
    });

    // 4. Fade Up Reveal for Cards/Content
    gsap.from('main .gsap-reveal, main .gsap-stagger-text h4, main .gsap-stagger-text h5, .product-band-item', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gsap-reveal, .product-band-items',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // --- Reusable Infinite Drag Slider Logic ---
    let animIds = [];
    let moveListeners = [];
    
    const initInfiniteSlider = (sliderRef, trackSelector, cursorRef) => {
        const slider = sliderRef.current;
        const track = slider ? slider.querySelector(trackSelector) : null;
        const cursor = cursorRef.current;
        
        if (!slider || !track || !cursor) return;

        // Duplicate the cards for infinite loop if not already duplicated
        if (!track.dataset.cloned) {
            const cards = Array.from(track.children);
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                track.appendChild(clone);
            });
            track.dataset.cloned = 'true';
        }

        let xPos = 0;
        let scrollSpeed = 0.5; // Reduced from 1
        let isDown = false;
        let startX;
        let currentX = 0;

        const moveCursor = (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
        };

        slider.addEventListener('mouseenter', () => {
            scrollSpeed = 0.15; // Reduced from 0.3
            gsap.to(cursor, { scale: 1, autoAlpha: 1, duration: 0.3 });
            window.addEventListener('mousemove', moveCursor);
            moveListeners.push(moveCursor);
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            scrollSpeed = 0.5; // Normal speed
            gsap.to(cursor, { scale: 0, autoAlpha: 0, duration: 0.3 });
            window.removeEventListener('mousemove', moveCursor);
        });

        // Dragging events
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX;
            currentX = xPos;
            gsap.to(cursor, { scale: 0.8, duration: 0.2 }); // Click effect
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
        
        slider.addEventListener('mouseleave', () => { isDown = false; }); // Ensure drag stops

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const walk = (e.pageX - startX) * 1.5; // Drag speed multiplier
            xPos = currentX + walk;
        });

        // Touch events for mobile dragging
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX;
            currentX = xPos;
        });
        slider.addEventListener('touchend', () => { isDown = false; });
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const walk = (e.touches[0].pageX - startX) * 1.5;
            xPos = currentX + walk;
        });

        // Infinite Auto-Scroll Loop using GSAP X translation
        const scrollLoop = () => {
            if (!isDown) {
                xPos -= scrollSpeed;
            }
            
            const singleSetWidth = track.scrollWidth / 2;
            
            // Loop logic
            if (xPos <= -singleSetWidth) {
                xPos += singleSetWidth;
            } else if (xPos > 0) {
                xPos -= singleSetWidth;
            }
            
            gsap.set(track, { x: xPos });
            animIds.push(requestAnimationFrame(scrollLoop));
        };
        scrollLoop();
    };

    // Initialize both sliders
    initInfiniteSlider(glanceSliderRef, '.glance-slider-track', swipeCursorRef);
    initInfiniteSlider(productsSliderRef, '.products-slider-track', productsCursorRef);
    initInfiniteSlider(conductorsSliderRef, '.conductors-slider-track', conductorsCursorRef);
    initInfiniteSlider(opgwSliderRef, '.opgw-slider-track', opgwCursorRef);

    return () => {
      mm.revert(); // Automatically cleans up matchMedia and event listeners if handled by GSAP
      if (polaroidStack && handleMouseMove && handleMouseLeave) {
          polaroidStack.removeEventListener('mousemove', handleMouseMove);
          polaroidStack.removeEventListener('mouseleave', handleMouseLeave);
      }
      animIds.forEach(id => cancelAnimationFrame(id));
      moveListeners.forEach(listener => window.removeEventListener('mousemove', listener));
    };
  }, { scope: container });

  return (
    <div ref={container}>
      {/* 1. Dark Hero Section */}
      <section className="dark-hero">
          <div className="hero-content-wrapper hero-animate" style={{ textAlign: 'left', padding: '0 0 15px 25px', width: '100%' }}>
              <h1 className="hero-title" style={{ fontSize: '6vw', lineHeight: 0.9, letterSpacing: '-0.04em', color: 'white', marginBottom: '5px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  EMPOWERING<br/>CONNECTIVITY
              </h1>
              <p className="hero-desc" style={{ fontSize: '20px', color: '#fff', maxWidth: '700px', fontWeight: 500, fontFamily: 'var(--font-body)', letterSpacing: '-0.02em' }}>Next-generation electrical and optical solutions built for the world's most demanding environments.</p>
          </div>
      </section>

      {/* 2. Editorial About Us Section */}
      <section id="premium-about" className="section-padding" style={{ background: 'var(--bg-white)', position: 'relative', overflow: 'hidden' }}>
          <div className="container mx-auto">
              <div className="premium-about-wrapper">
                  
                  {/* Left: Polaroid Stack Layout */}
                  <div className="premium-about-col" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                      <div className="polaroid-stack" style={{ cursor: 'pointer' }}>
                          <img src="/assets/images/about_polaroid_2.jpg" alt="Flash Cab Main" className="polaroid-back" />
                          <img src="/assets/images/about_polaroid_1.jpg" alt="Flash Cab Secondary" className="polaroid-front" />
                      </div>
                  </div>

                  {/* Right: Premium Content & Bento Stats */}
                  <div className="premium-about-col gsap-stagger-text" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                      <span className="premium-eyebrow">ABOUT FLASH CAB CABLES</span>
                      <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontFamily: 'var(--font-heading)', fontWeight: 500, color: 'var(--secondary-color)', marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                          Engineering the Next Era of Connectivity
                      </h2>
                      <p style={{ fontSize: '18px', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
                          For over two decades, Flash Cab Cables has been at the forefront of manufacturing advanced electrical and optical solutions, driven by an unwavering commitment to quality and innovation.
                      </p>
                      
                      {/* Premium Bento Stats Grid */}
                      <div className="premium-stats-grid">
                          <div className="bento-stat-card">
                              <div className="bento-stat-icon">
                                  <i className="fa-regular fa-calendar-check"></i>
                              </div>
                              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--secondary-color)', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '8px' }}>25+</div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Years of Excellence</div>
                          </div>
                          
                          <div className="bento-stat-card">
                              <div className="bento-stat-icon">
                                  <i className="fa-solid fa-globe"></i>
                              </div>
                              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--secondary-color)', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '8px' }}>15K+</div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Projects Delivered</div>
                          </div>
                          
                          <div className="bento-stat-card">
                              <div className="bento-stat-icon">
                                  <i className="fa-solid fa-map-location-dot"></i>
                              </div>
                              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--secondary-color)', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '8px' }}>40+</div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Countries Served</div>
                          </div>
                      </div>
                      
                      <a href="/about" className="btn-uiverse group" style={{ marginTop: '40px' }}>
                          <span className="flex items-center gap-2.5">
                              Discover Our Story
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 self-center">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M5 12l14 0" />
                                  <path d="M15 16l4 -4" />
                                  <path d="M15 8l4 4" />
                              </svg>
                          </span>
                      </a>
                  </div>
                  
              </div>
          </div>
      </section>

      {/* 2.5 At a Glance Slider Section */}
      <section className="glance-section" style={{ position: 'relative' }}>
          {/* Custom Cursor */}
          <div className="swipe-cursor" ref={swipeCursorRef}>SWIPE</div>

          <div className="container mx-auto">
              <div className="glance-header">
                  <span className="premium-eyebrow">
                      AT A GLANCE
                  </span>
                  <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-heading)', fontWeight: 500, color: 'var(--secondary-color)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      Why choose Flash Cab Cables
                  </h2>
              </div>
          </div>
              
          {/* Full width container, extracted from mx-auto */}
          <div className="glance-slider-container" ref={glanceSliderRef}>
            <div className="glance-slider-track">
              
              {/* ====== CARD SET 1 ====== */}
              {/* Image Card 1 */}
              <div className="glance-card glance-image-card" style={{ backgroundImage: `url('/assets/images/about_polaroid_1.jpg')` }}>
                  <div className="glance-image-card-content">
                      <h3>25%</h3>
                      <p>SHOPFLOOR DIVERSITY</p>
                  </div>
              </div>
              
              {/* Image Card 2 */}
              <div className="glance-card glance-image-card" style={{ backgroundImage: `url('/assets/images/about_polaroid_2.jpg')` }}>
                  <div className="glance-image-card-content">
                      <h3>ZERO</h3>
                      <p>WASTE TO LANDFILL</p>
                  </div>
              </div>
              
              {/* Text Card 1 */}
              <div className="glance-card glance-text-card">
                  <div className="gptw-logo">
                      Great<br/>Place<br/>To<br/>Work®
                  </div>
                  <p>Certified for four years in a row</p>
              </div>
              
              {/* Text Card 2 */}
              <div className="glance-card glance-text-card">
                  <div className="icon"><i className="fa-solid fa-bullseye"></i></div>
                  <h3>110+</h3>
                  <p>innovative cable and conductor designs</p>
              </div>
              
              {/* Image Card 3 */}
              <div className="glance-card glance-image-card" style={{ backgroundImage: `url('/assets/images/hero_sharp.png')` }}>
                  <div className="glance-image-card-content">
                      <p style={{fontSize: '14px', marginBottom: '4px'}}>PIONEERED</p>
                      <h3>ACCC</h3>
                      <p>TECHNOLOGY IN INDIA</p>
                  </div>
              </div>
              
              {/* Text Card 3 */}
              <div className="glance-card glance-text-card">
                  <div className="icon"><i className="fa-solid fa-globe"></i></div>
                  <h3>70+</h3>
                  <p>Countries exported to</p>
              </div>

              {/* ====== CARD SET 2 (DUPLICATE FOR INFINITE LOOP) ====== */}
              {/* Image Card 1 */}
              <div className="glance-card glance-image-card" style={{ backgroundImage: `url('/assets/images/about_polaroid_1.jpg')` }}>
                  <div className="glance-image-card-content">
                      <h3>25%</h3>
                      <p>SHOPFLOOR DIVERSITY</p>
                  </div>
              </div>
              
              {/* Image Card 2 */}
              <div className="glance-card glance-image-card" style={{ backgroundImage: `url('/assets/images/about_polaroid_2.jpg')` }}>
                  <div className="glance-image-card-content">
                      <h3>ZERO</h3>
                      <p>WASTE TO LANDFILL</p>
                  </div>
              </div>
              
              {/* Text Card 1 */}
              <div className="glance-card glance-text-card">
                  <div className="gptw-logo">
                      Great<br/>Place<br/>To<br/>Work®
                  </div>
                  <p>Certified for four years in a row</p>
              </div>
              
              {/* Text Card 2 */}
              <div className="glance-card glance-text-card">
                  <div className="icon"><i className="fa-solid fa-bullseye"></i></div>
                  <h3>110+</h3>
                  <p>innovative cable and conductor designs</p>
              </div>
              
              {/* Image Card 3 */}
              <div className="glance-card glance-image-card" style={{ backgroundImage: `url('/assets/images/hero_sharp.png')` }}>
                  <div className="glance-image-card-content">
                      <p style={{fontSize: '14px', marginBottom: '4px'}}>PIONEERED</p>
                      <h3>ACCC</h3>
                      <p>TECHNOLOGY IN INDIA</p>
                  </div>
              </div>
              
              {/* Text Card 3 */}
              <div className="glance-card glance-text-card">
                  <div className="icon"><i className="fa-solid fa-globe"></i></div>
                  <h3>70+</h3>
                  <p>Countries exported to</p>
              </div>
            </div>
          </div>
      </section>

      {/* 2.6 Intelligent Infrastructure (Section 4) */}
      <section className="intellisense-wrapper">
          <div className="intellisense-section">
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-heading)', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px' }}>
                  Next-Generation Smart Cable Technology
              </h2>
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontFamily: 'var(--font-body)', color: '#a0a0a0', marginBottom: '80px' }}>
                  Engineered with integrated continuous monitoring for unparalleled grid reliability and zero downtime.
              </p>

              {/* CSS Animated Cable Graphic */}
              <div className="smart-cable-wrapper">
                  <div className="cable-sheath sheath-left"></div>
                  
                  <div className="cable-connector"></div>
                  
                  <div className="cable-core">
                      <div className="core-wire"></div>
                      <div className="core-wire"></div>
                      <div className="core-wire"></div>
                      <div className="core-wire"></div>
                      <div className="core-wire"></div>
                      
                      <div className="cable-pulse"></div>
                  </div>
                  
                  <div className="cable-connector"></div>
                  
                  <div className="cable-sheath sheath-right"></div>
              </div>

              {/* Pure CSS 3D Cube Rotating text */}
              <div style={{ height: '30px', perspective: '1000px', margin: '50px auto 0', width: '300px' }}>
                  <div className="cube-rotator">
                      <div className="cube-face cube-front">EARLY FAULT DETECTION</div>
                      <div className="cube-face cube-bottom">REAL-TIME MONITORING</div>
                      <div className="cube-face cube-back">PREDICTIVE ANALYTICS</div>
                      <div className="cube-face cube-top">AI-POWERED INSIGHTS</div>
                  </div>
              </div>
          </div>
      </section>

      {/* 2.7 Products and Solutions (Section 5) */}
      <section className="products-wrapper">
          <h2>Explore All Products and Solutions</h2>
          
          <div className="products-inner-box">
              <div className="products-number">01</div>
              <h3 className="products-massive-title">CABLES</h3>
              
              <p className="products-desc">
                  We build our medium voltage, extra-high voltage, and solar cables to stand up to the toughest environments. Designed for real-world reliability, they ensure your power keeps flowing smoothly and safely, day in and day out.
              </p>
              
              <div className="products-stats">
                  <div className="stat-item">
                      <span className="stat-label">VOLTAGE RANGE (KV)</span>
                      <span className="stat-value">6.6 - 220</span>
                  </div>
                  <div className="stat-item">
                      <span className="stat-label">MAX CABLE SIZE (SQMM)</span>
                      <span className="stat-value">2500</span>
                  </div>
                  <div className="stat-item">
                      <span className="stat-label">DESIGN OPTIONS</span>
                      <span className="stat-value">110+</span>
                  </div>
              </div>
              
              <div className="products-slider-container" ref={productsSliderRef}>
                  <div className="products-slider-track">
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/IyQH9MtcvbBLXgTtcAB3Xhy0v0.webp?width=1000&height=1000" alt="Cable 1" draggable="false" /></div>
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/z8oZtVanXyOkr9L2z8xmyae6aY.webp?width=1000&height=1000" alt="Cable 2" draggable="false" /></div>
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/m0iwaJ8OHkrvh65j1Vw6hlKEZk.webp?width=1000&height=1000" alt="Cable 3" draggable="false" /></div>
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/lt8kgVWUxdpG36sM5l195cGbAA.webp?width=1000&height=1000" alt="Cable 4" draggable="false" /></div>
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/GlW5Albb8kCLa8CaoV2zJ6m1lc.webp?width=1000&height=1000" alt="Cable 5" draggable="false" /></div>
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/dUEuY3AxgR7C9PzEBCN9u60PjU.webp?width=1000&height=1000" alt="Cable 6" draggable="false" /></div>
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/cgOFtABRcCWewWtiI4UXgFaawo.webp?width=1000&height=1000" alt="Cable 7" draggable="false" /></div>
                      <div className="cable-circle-card"><img src="https://framerusercontent.com/images/TjfrpC5yDxJRNaoudvzE00CAZsk.webp?width=1000&height=1000" alt="Cable 8" draggable="false" /></div>
                  </div>
                  <div className="swipe-cursor" ref={productsCursorRef}>
                      <span>SWIPE</span>
                  </div>
              </div>
              
              <a href="#" className="btn-uiverse group" style={{ marginTop: '40px', background: '#000', color: '#fff' }}>
                  <span className="flex items-center gap-2.5" style={{ color: '#fff' }}>
                      Explore Cables
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 self-center">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M5 12l14 0" />
                          <path d="M15 16l4 -4" />
                          <path d="M15 8l4 4" />
                      </svg>
                  </span>
              </a>
          </div>
      </section>

      {/* 2.8 Conductors (Section 6) */}
      <section className="products-wrapper" style={{ paddingTop: '0px' }}>
          <div className="products-inner-box">
              <div className="products-number">02</div>
              <h3 className="products-massive-title">CONDUCTORS</h3>
              
              <p className="products-desc">
                  Specialized electrical conductors designed to carry maximum current at various voltage levels, typically ranging from 11 kV to 1200 kV, across tough terrains. Increasingly adopted for improved efficiency, reduced power losses, and better integration of renewable energy sources.
              </p>
              
              <div className="products-stats">
                  <div className="stat-item">
                      <span className="stat-label">VOLTAGE RANGE (KV)</span>
                      <span className="stat-value">11 - 1200</span>
                  </div>
                  <div className="stat-item">
                      <span className="stat-label">MAXIMUM SPAN</span>
                      <span className="stat-value">1300m</span>
                  </div>
              </div>
              
              <div className="products-slider-container" ref={conductorsSliderRef}>
                  <div className="products-slider-track conductors-slider-track">
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/RdGVPlEyaGV4vIEJbmGt0vMLcz0.webp?width=1104&height=1806" alt="Conductor 1" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/9kKjFCRg3cZzpZaaXQRIIKk.webp?width=1104&height=1812" alt="Conductor 2" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/Cn3RGUTlkKmtKvmH7GWrnFNulx4.webp?width=1104&height=1812" alt="Conductor 3" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/afjEDANEaysqU56Q8tKJfKGHcOQ.webp?width=1104&height=1806" alt="Conductor 4" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/u3Fj9jkTsanFC5jRrJj0eZYboc.webp?width=1104&height=1806" alt="Conductor 5" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/GxYLJM7peUXDse9cIiUWhPWLE.webp?width=1104&height=1806" alt="Conductor 6" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/cjmUY3X5WDUAdUBEgxZ1Bxdf0T8.webp?width=1104&height=1806" alt="Conductor 7" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/0RM0MxB0AIPPMg9Gqob9qF4OBD4.webp?width=1104&height=1806" alt="Conductor 8" draggable="false" /></div>
                  </div>
                  <div className="swipe-cursor" ref={conductorsCursorRef}>
                      <span>SWIPE</span>
                  </div>
              </div>
              
              <a href="#" className="btn-uiverse group" style={{ marginTop: '40px', background: '#000', color: '#fff' }}>
                  <span className="flex items-center gap-2.5" style={{ color: '#fff' }}>
                      Explore Conductors
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 self-center">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M5 12l14 0" />
                          <path d="M15 16l4 -4" />
                          <path d="M15 8l4 4" />
                      </svg>
                  </span>
              </a>
          </div>
      </section>

      {/* 2.9 OPGW (Section 7) */}
      <section className="products-wrapper" style={{ paddingTop: '0px' }}>
          <div className="products-inner-box">
              <div className="products-number">03</div>
              <h3 className="products-massive-title">OPGW</h3>
              
              <p className="products-desc">
                  Combining grounding and high-speed data transmission in a single cable. Ideal for modern smart grids and utility networks demanding reliability and connectivity.
              </p>
              
              <div className="products-stats">
                  <div className="stat-item" style={{ alignItems: 'center' }}>
                      <span className="stat-label">FIBER DESIGN OPTIONS</span>
                      <span className="stat-value">24 | 48 | 96 | 144</span>
                  </div>
              </div>
              
              <div className="products-slider-container" ref={opgwSliderRef}>
                  <div className="products-slider-track opgw-slider-track">
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/dkilwae1EHnjX1cWO6Z2fi72fV0.webp?width=1200&height=1978" alt="OPGW 1" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/lwH8MrNP3n7yhfMU7FlKB5IL0E.webp?width=1200&height=1978" alt="OPGW 2" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/rxx4jjoGUeBdCRsa5IUNEJTGg.webp?width=1200&height=1978" alt="OPGW 3" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/XuWwoZKUB6b7PhJ8mo5hCyf86NQ.webp?width=1200&height=1978" alt="OPGW 4" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/dkilwae1EHnjX1cWO6Z2fi72fV0.webp?width=1200&height=1978" alt="OPGW 5" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/lwH8MrNP3n7yhfMU7FlKB5IL0E.webp?width=1200&height=1978" alt="OPGW 6" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/rxx4jjoGUeBdCRsa5IUNEJTGg.webp?width=1200&height=1978" alt="OPGW 7" draggable="false" /></div>
                      <div className="conductor-image-card"><img src="https://framerusercontent.com/images/XuWwoZKUB6b7PhJ8mo5hCyf86NQ.webp?width=1200&height=1978" alt="OPGW 8" draggable="false" /></div>
                  </div>
                  <div className="swipe-cursor" ref={opgwCursorRef}>
                      <span>SWIPE</span>
                  </div>
              </div>
              
              <a href="#" className="btn-uiverse group" style={{ marginTop: '40px', background: '#000', color: '#fff' }}>
                  <span className="flex items-center gap-2.5" style={{ color: '#fff' }}>
                      Explore OPGW
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 self-center">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M5 12l14 0" />
                          <path d="M15 16l4 -4" />
                          <path d="M15 8l4 4" />
                      </svg>
                  </span>
              </a>
          </div>
      </section>

      {/* 2.10 Clients Section */}
      {/* 2.10 Clients Section - Side-by-Side Marquee */}
      <section className="bg-white overflow-hidden gsap-reveal products-wrapper" style={{ paddingTop: '0px', paddingBottom: '80px' }}>
          <div className="products-inner-box bg-[#e0e0e0] rounded-[2rem] flex flex-col lg:flex-row items-center gap-4 lg:gap-8 relative mx-auto clients-inner-box">
              
              {/* Left Side: Static Text */}
              <div className="w-full lg:w-1/4 shrink-0 z-10 flex items-center justify-start text-left" style={{ paddingLeft: '30px' }}>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight m-0" style={{ fontFamily: 'var(--font-heading)', color: 'var(--secondary-color)' }}>
                      Trusted by<br/>Industry Leaders
                  </h2>
              </div>

              {/* Vertical Divider Line */}
              <div className="hidden lg:block w-[1px] h-16 bg-[#1F6F5F]/20 shrink-0 z-10"></div>

              {/* Right Side: Slider */}
              <div className="w-full lg:flex-1 relative flex items-center overflow-hidden z-10 h-16 lg:h-20 slider-mask">
                  
                  <div className="flex animate-marquee-left whitespace-nowrap items-center hover:[animation-play-state:paused]">
                      {[...Array(4)].map((_, setIdx) => (
                          <React.Fragment key={`r1-${setIdx}`}>
                              <div className="flex items-center justify-center w-32 md:w-48 mx-6 bg-transparent rounded-xl transition-transform hover:-translate-y-1">
                                  <span className="font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-light)', opacity: 0.6 }}>Logo</span>
                              </div>
                              <div className="flex items-center justify-center w-32 md:w-48 mx-6 bg-transparent rounded-xl transition-transform hover:-translate-y-1">
                                  <span className="font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-light)', opacity: 0.6 }}>logo</span>
                              </div>
                              <div className="flex items-center justify-center w-32 md:w-48 mx-6 bg-transparent rounded-xl transition-transform hover:-translate-y-1">
                                  <span className="font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-light)', opacity: 0.6 }}>Logo</span>
                              </div>
                              <div className="flex items-center justify-center w-32 md:w-48 mx-6 bg-transparent rounded-xl transition-transform hover:-translate-y-1">
                                  <span className="font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-light)', opacity: 0.6 }}>logo</span>
                              </div>
                          </React.Fragment>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* 2.11 Our Impact Section */}
      <section className="bg-black overflow-hidden gsap-reveal products-wrapper" style={{ paddingTop: '30px', paddingBottom: '30px', background: '#000000' }}>
          <div className="products-inner-box rounded-[2.5rem] relative mx-auto w-[98%] max-w-[1700px] impact-inner-box overflow-hidden">
              {/* Removed decorative background blur elements for pure black bg */}

              <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center w-full mb-12">
                      <div className="text-center max-w-3xl w-full flex flex-col items-center">
                          <span className="impact-eyebrow">
                              OUR IMPACT
                          </span>
                          <h2 className="impact-title">
                              Empowering Infrastructure<br/>Across the Nation
                          </h2>
                          <p className="impact-desc" style={{ margin: '0 auto' }}>
                              Driven by engineering excellence, trusted by industry leaders, and committed to electrifying the future.
                          </p>
                      </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex justify-center w-full">
                      <div className="impact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-[1550px] w-full"
                           onMouseMove={(e) => {
                               for(const card of document.querySelectorAll('.spotlight-card')) {
                                   const rect = card.getBoundingClientRect();
                                   const x = e.clientX - rect.left;
                                   const y = e.clientY - rect.top;
                                   card.style.setProperty("--mouse-x", `${x}px`);
                                   card.style.setProperty("--mouse-y", `${y}px`);
                               }
                           }}>
                          
                          {/* Card 1: Cable Supplied */}
                          <div className="impact-card spotlight-card relative w-full rounded-[2rem] bg-white/5 border border-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-[#080808] hover:border-transparent group flex flex-col justify-between items-start" style={{ "--mouse-x": "50%", "--mouse-y": "50%" }}>
                              <div className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-0" 
                                   style={{ 
                                       background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(47,160,132,0.8), transparent 40%)',
                                       padding: '1px',
                                       WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                       WebkitMaskComposite: 'xor',
                                       maskComposite: 'exclude',
                                       margin: '-1px'
                                   }}>
                              </div>
                              <div className="flex justify-between items-start w-full gap-4 relative z-10">
                                  <p className="text-gray-300 font-medium text-base text-left leading-relaxed max-w-[200px]" style={{ fontFamily: 'var(--font-body)' }}>
                                      Km of extra-high voltage & optical cables supplied nationwide.
                                  </p>
                                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                      {/* Animated Bolt Icon */}
                                      <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                                          <Zap size={24} color="#2fa084" />
                                      </motion.div>
                                  </div>
                              </div>
                              <div className="flex items-center justify-start w-full mt-4">
                                  <AnimatedNumber target={500} />
                                  <span className="text-2xl md:text-3xl font-bold text-[#2fa084] ml-1">Km</span>
                                  {/* Green Upward Arrow */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2fa084" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-3 self-center transition-transform duration-300 group-hover:-translate-y-1">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path d="M12 5l0 14" />
                                      <path d="M18 11l-6 -6" />
                                      <path d="M6 11l6 -6" />
                                  </svg>
                              </div>
                          </div>

                          {/* Card 2: Industry Experience */}
                          <div className="impact-card spotlight-card relative w-full rounded-[2rem] bg-white/5 border border-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-[#080808] hover:border-transparent group flex flex-col justify-between items-start" style={{ "--mouse-x": "50%", "--mouse-y": "50%" }}>
                              <div className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-0" 
                                   style={{ 
                                       background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(252,185,0,0.8), transparent 40%)',
                                       padding: '1px',
                                       WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                       WebkitMaskComposite: 'xor',
                                       maskComposite: 'exclude',
                                       margin: '-1px'
                                   }}>
                              </div>
                              <div className="flex justify-between items-start w-full gap-4 relative z-10">
                                  <p className="text-gray-300 font-medium text-base text-left leading-relaxed max-w-[200px]" style={{ fontFamily: 'var(--font-body)' }}>
                                      Years of unmatched heritage & innovative engineering experience.
                                  </p>
                                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                      {/* Animated Star Icon */}
                                      <motion.div animate={{ rotate: [0, 15, 0], scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                                          <Star size={24} color="#fcb900" />
                                      </motion.div>
                                  </div>
                              </div>
                              <div className="flex items-center justify-start w-full mt-4">
                                  <AnimatedNumber target={18} />
                                  <span className="text-2xl md:text-3xl font-bold text-[#fcb900] ml-1">Yrs</span>
                                  {/* Green Upward Arrow */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2fa084" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-3 self-center transition-transform duration-300 group-hover:-translate-y-1">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path d="M12 5l0 14" />
                                      <path d="M18 11l-6 -6" />
                                      <path d="M6 11l6 -6" />
                                  </svg>
                              </div>
                          </div>

                          {/* Card 3: States Available In */}
                          <div className="impact-card spotlight-card relative w-full rounded-[2rem] bg-white/5 border border-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-[#080808] hover:border-transparent group flex flex-col justify-between items-start" style={{ "--mouse-x": "50%", "--mouse-y": "50%" }}>
                              <div className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-0" 
                                   style={{ 
                                       background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0,115,192,0.8), transparent 40%)',
                                       padding: '1px',
                                       WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                       WebkitMaskComposite: 'xor',
                                       maskComposite: 'exclude',
                                       margin: '-1px'
                                   }}>
                              </div>
                              <div className="flex justify-between items-start w-full gap-4 relative z-10">
                                  <p className="text-gray-300 font-medium text-base text-left leading-relaxed max-w-[200px]" style={{ fontFamily: 'var(--font-body)' }}>
                                      Major Indian states & active industrial territories served.
                                  </p>
                                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                      {/* Animated Globe Icon */}
                                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                                          <Globe size={24} color="#0073c0" />
                                      </motion.div>
                                  </div>
                              </div>
                              <div className="flex items-center justify-start w-full mt-4">
                                  <AnimatedNumber target={20} />
                                  <span className="text-2xl md:text-3xl font-bold text-[#0073c0] ml-1">States</span>
                                  {/* Green Upward Arrow */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2fa084" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-3 self-center transition-transform duration-300 group-hover:-translate-y-1">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path d="M12 5l0 14" />
                                      <path d="M18 11l-6 -6" />
                                      <path d="M6 11l6 -6" />
                                  </svg>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      </section>

      <ProductUsage />

      {/* 3. What We Do (Cards) */}
      <section className="section-padding gsap-stagger-text" style={{ background: 'var(--bg-white)' }}>
          <div className="container text-center mx-auto px-4 sm:px-6 lg:px-8">
              <span className="impact-eyebrow inline-block mb-6 md:mb-8">WHAT WE DO</span>
              <h2 className="global-section-heading">
                  Empowering Infrastructure & Homes
              </h2>
              <p className="global-section-desc">
                  Driven by advanced engineering, our cables deliver highly reliable electrical currents across all application layers.
              </p>
              
              <div className="what-we-do-grid gsap-reveal">
                  
                  {/* Card 1: Power Transmission */}
                  <div className="what-we-do-card power-card group">
                      <div className="what-we-do-icon-wrapper bg-[#2fa084]/10">
                          <i className="fa-solid fa-bolt text-3xl text-[#2fa084]"></i>
                      </div>
                      <div className="flex-grow w-full">
                          <h4 className="what-we-do-title">
                              Power Transmission
                          </h4>
                          <p className="what-we-do-desc">
                              High voltage cables designed for massive infrastructural loads.
                          </p>
                      </div>
                  </div>
                  
                  {/* Card 2: Domestic Wiring */}
                  <div className="what-we-do-card domestic-card group">
                      <div className="what-we-do-icon-wrapper bg-[#fcb900]/10">
                          <i className="fa-solid fa-house-signal text-3xl text-[#fcb900]"></i>
                      </div>
                      <div className="flex-grow w-full">
                          <h4 className="what-we-do-title">
                              Domestic Wiring
                          </h4>
                          <p className="what-we-do-desc">
                              Flame retardant solutions ensuring safety in every home.
                          </p>
                      </div>
                  </div>

                  {/* Card 3: Industrial Cables */}
                  <div className="what-we-do-card industrial-card group">
                      <div className="what-we-do-icon-wrapper bg-[#0073c0]/10">
                          <i className="fa-solid fa-shield-halved text-3xl text-[#0073c0]"></i>
                      </div>
                      <div className="flex-grow w-full">
                          <h4 className="what-we-do-title">
                              Industrial Cables
                          </h4>
                          <p className="what-we-do-desc">
                              Heavy-duty flexible cables for machinery and automation.
                          </p>
                      </div>
                  </div>

              </div>
          </div>
      </section>
      {/* Blog & News Section */}
      <section className="section-padding py-24 bg-[#f8fafc] overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" style={{ marginBottom: '80px' }}>
                  <div className="text-left">
                      <h2 className="global-section-heading" style={{ margin: 0, textAlign: 'left' }}>
                          Insights & Articles
                      </h2>
                  </div>
                  {/* Slider Arrows */}
                  <div className="flex gap-4">
                      <button 
                          onClick={() => blogSliderRef.current?.scrollBy({left: -380, behavior: 'smooth'})}
                          className="w-10 h-10 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm cursor-pointer border border-gray-100"
                      >
                          <i className="fa-solid fa-chevron-left text-gray-600"></i>
                      </button>
                      <button 
                          onClick={() => blogSliderRef.current?.scrollBy({left: 380, behavior: 'smooth'})}
                          className="w-10 h-10 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm cursor-pointer border border-gray-100"
                      >
                          <i className="fa-solid fa-chevron-right text-gray-600"></i>
                      </button>
                  </div>
              </div>

              {/* Slider Wrapper with Right Bleed */}
              <div className="-mr-[50vw] pr-[50vw]">
                  <div 
                      id="blog-slider" 
                      ref={blogSliderRef}
                      onMouseDown={handleBlogMouseDown}
                      onMouseLeave={handleBlogMouseLeave}
                      onMouseUp={handleBlogMouseUp}
                      onMouseMove={handleBlogMouseMove}
                      className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-8 pr-12 cursor-grab active:cursor-grabbing select-none" 
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                      {/* Blog Card 1 */}
                      <div className="blog-card group snap-start w-[280px] md:w-[380px] flex-shrink-0">
                          <div className="blog-image-wrapper">
                              <img src="/assets/images/industrial_mix_bg.png" alt="Blog 1" />
                          </div>
                          <div className="blog-content">
                              <span className="blog-date">Media</span>
                              <h3 className="blog-title">All our videos, interviews, podcasts and articles</h3>
                              <p className="blog-desc">The leading media outlet for everything you need to know about sustainability.</p>
                              <a href="/blog" className="blog-link flex items-center gap-2 group-hover:text-[#2fa084] transition-colors">
                                  Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                              </a>
                          </div>
                      </div>
                      {/* Blog Card 2 */}
                      <div className="blog-card group snap-start w-[280px] md:w-[380px] flex-shrink-0">
                          <div className="blog-image-wrapper">
                              <img src="/assets/images/industrial_cable.png" alt="Blog 2" />
                          </div>
                          <div className="blog-content">
                              <span className="blog-date">Newsletter</span>
                              <h3 className="blog-title">Become an expert on sustainable development</h3>
                              <p className="blog-desc">Your monthly update on sustainability and climate. Stay informed with us.</p>
                              <a href="/blog" className="blog-link flex items-center gap-2 group-hover:text-[#2fa084] transition-colors">
                                  Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                              </a>
                          </div>
                      </div>
                      {/* Blog Card 3 */}
                      <div className="blog-card group snap-start w-[280px] md:w-[380px] flex-shrink-0">
                          <div className="blog-image-wrapper">
                              <img src="/assets/images/team_working.png" alt="Blog 3" />
                          </div>
                          <div className="blog-content">
                              <span className="blog-date">Event</span>
                              <h3 className="blog-title">Webinar: The art of communicating on CSR</h3>
                              <p className="blog-desc">An engaging webinar to strengthen your company's CSR strategy successfully.</p>
                              <a href="/blog" className="blog-link flex items-center gap-2 group-hover:text-[#2fa084] transition-colors">
                                  Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                              </a>
                          </div>
                      </div>
                      {/* Blog Card 4 */}
                      <div className="blog-card group snap-start w-[280px] md:w-[380px] flex-shrink-0">
                          <div className="blog-image-wrapper">
                              <img src="/assets/images/repair_service.png" alt="Blog 4" />
                          </div>
                          <div className="blog-content">
                              <span className="blog-date">Resource</span>
                              <h3 className="blog-title">Guide: LCA, a major asset for businesses</h3>
                              <p className="blog-desc">Discover our exclusive guide to mastering LCA, from methodology to concrete steps.</p>
                              <a href="/blog" className="blog-link flex items-center gap-2">
                                  Read more <i className="fa-solid fa-arrow-right-long"></i>
                              </a>
                          </div>
                      </div>
                      {/* Fake Card 5 for Slider Peeking */}
                      <div className="blog-card group snap-start w-[280px] md:w-[380px] flex-shrink-0">
                          <div className="blog-image-wrapper">
                              <img src="/assets/images/house_wiring.png" alt="Blog 5" />
                          </div>
                          <div className="blog-content">
                              <span className="blog-date">Resource</span>
                              <h3 className="blog-title">Behind the Manufacturing: Reducing Emissions</h3>
                              <p className="blog-desc">A comprehensive look at our commitment to green manufacturing technologies.</p>
                              <a href="/blog" className="blog-link flex items-center gap-2">
                                  Read more <i className="fa-solid fa-arrow-right-long"></i>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Bottom See All Button */}
              <div className="flex justify-center" style={{ marginTop: '80px' }}>
                  <a href="/blog" className="btn-uiverse">
                      <span className="relative z-10 flex items-center gap-2">See all resources <i className="fa-solid fa-arrow-right"></i></span>
                  </a>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;

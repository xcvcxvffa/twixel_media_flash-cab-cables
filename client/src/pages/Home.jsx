import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    // 1. Exact Global Heading Animation for ALL headings on the page
    const globalHeadings = document.querySelectorAll('h1:not(.hero-animate h1), h2:not(.hero-animate h2), h3, h4, h5, h6, .split-heading, .split-subheading, .about-box-heading');
    
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

    // 4. Fade Up Reveal for Cards/Content
    gsap.from('.gsap-reveal, .gsap-stagger-text h4, .gsap-stagger-text h5, .product-band-item', {
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
                      
                      <a href="/about" className="btn-uiverse" style={{ marginTop: '40px' }}>
                          <span>Discover Our Story &rarr;</span>
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
              
              <a href="#" className="btn-uiverse" style={{ marginTop: '40px', background: '#000', color: '#fff' }}>
                  <span style={{ color: '#fff' }}>Explore Cables &rarr;</span>
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
              
              <a href="#" className="btn-uiverse" style={{ marginTop: '40px', background: '#000', color: '#fff' }}>
                  <span style={{ color: '#fff' }}>Explore Conductors &rarr;</span>
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
              
              <a href="#" className="btn-uiverse" style={{ marginTop: '40px', background: '#000', color: '#fff' }}>
                  <span style={{ color: '#fff' }}>Explore OPGW &rarr;</span>
              </a>
          </div>
      </section>

      {/* 2.10 Clients Section */}
      {/* 2.10 Clients Section - Side-by-Side Marquee */}
      {/* 2.10 Clients Section - Side-by-Side Marquee */}
      <section className="py-16 bg-white overflow-hidden gsap-reveal products-wrapper">
          <div className="products-inner-box bg-[#e0e0e0] rounded-[2rem] flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative mx-auto" style={{ padding: '10px 20px' }}>
              
              {/* Left Side: Static Text */}
              <div className="w-full lg:w-1/4 shrink-0 z-10 flex items-center justify-start text-left" style={{ paddingLeft: '30px' }}>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-0" style={{ fontFamily: 'var(--font-heading)', color: 'var(--secondary-color)' }}>
                      Trusted by<br/>Industry Leaders
                  </h2>
              </div>

              {/* Vertical Divider Line */}
              <div className="hidden lg:block w-[1px] h-24 bg-[#1F6F5F]/20 shrink-0 z-10"></div>

              {/* Right Side: Slider */}
              <div className="w-full lg:flex-1 relative flex items-center overflow-hidden z-10 h-32 md:h-40 slider-mask">
                  
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

          <style>{`
              @keyframes marqueeLeft {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); } 
              }
              .animate-marquee-left {
                  animation: marqueeLeft 40s linear infinite;
                  width: max-content;
              }
              .slider-mask {
                  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              }
          `}</style>
      </section>

      {/* 3. What We Do (Cards) */}
      <section className="section-padding gsap-stagger-text" style={{ background: 'var(--bg-white)' }}>
          <div className="container text-center mx-auto">
              <h2 style={{ fontSize: '42px', marginBottom: '60px' }}>What We Do</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }} className="gsap-reveal">
                  
                  <div style={{ background: 'var(--bg-light)', padding: '40px', borderRadius: '20px', flex: 1, minWidth: '250px', textAlign: 'left' }}>
                      <i className="fa-solid fa-bolt" style={{ fontSize: '32px', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
                      <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>Power Transmission</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>High voltage cables designed for massive infrastructural loads.</p>
                  </div>
                  
                  <div style={{ background: 'var(--bg-light)', padding: '40px', borderRadius: '20px', flex: 1, minWidth: '250px', textAlign: 'left' }}>
                      <i className="fa-solid fa-house-signal" style={{ fontSize: '32px', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
                      <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>Domestic Wiring</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>Flame retardant solutions ensuring safety in every home.</p>
                  </div>

                  <div style={{ background: 'var(--bg-light)', padding: '40px', borderRadius: '20px', flex: 1, minWidth: '250px', textAlign: 'left' }}>
                      <i className="fa-solid fa-shield-halved" style={{ fontSize: '32px', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
                      <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>Industrial Cables</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>Heavy-duty flexible cables for machinery and automation.</p>
                  </div>

              </div>
          </div>
      </section>

      {/* 4. A Decade of Excellence (Dark) */}
      <section className="dark-section gsap-stagger-text" style={{ textAlign: 'center' }}>
          <div className="container mx-auto">
              <span style={{ color: 'var(--primary-color)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Since 1999</span>
              <h2 style={{ fontSize: '64px', marginTop: '20px', marginBottom: '40px', letterSpacing: '-0.04em' }}>A Legacy of Excellence</h2>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                  <div style={{ height: '2px', width: '100px', background: '#333' }}></div>
                  <a href="/about" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Our Journey</a>
                  <div style={{ height: '2px', width: '100px', background: '#333' }}></div>
              </div>
          </div>
      </section>

      {/* 5. Product Bands */}
      <section className="product-band gsap-stagger-text">
          <div className="container mx-auto">
              <h2 style={{ fontSize: '54px', letterSpacing: '-0.04em', color: '#ccc' }}>CABLES</h2>
              <p style={{ marginTop: '10px', fontWeight: 500 }}>Low Tension | High Tension | Extra High Voltage</p>
              <div className="product-band-items">
                  <div className="product-band-item">
                      <img src="/assets/images/house_wiring.png" alt="FR Wires" />
                      <h5>FR Wires</h5>
                  </div>
                  <div className="product-band-item">
                      <img src="/assets/images/repair_service.png" alt="Submersible" />
                      <h5>Submersible</h5>
                  </div>
                  <div className="product-band-item">
                      <img src="/assets/images/industrial_cable.png" alt="Flexible" />
                      <h5>Flexible Multicore</h5>
                  </div>
                  <div className="product-band-item">
                      <img src="/assets/images/house_wiring.png" alt="Armoured" />
                      <h5>Armoured</h5>
                  </div>
              </div>
              <a href="/product" className="btn btn-primary anime-btn" style={{ marginTop: '40px' }}>View All Cables</a>
          </div>
      </section>

      <section className="product-band gsap-stagger-text" style={{ background: 'var(--bg-white)' }}>
          <div className="container mx-auto">
              <h2 style={{ fontSize: '54px', letterSpacing: '-0.04em', color: '#ccc' }}>CONDUCTORS</h2>
              <p style={{ marginTop: '10px', fontWeight: 500 }}>AAC | AAAC | ACSR | HTLS Conductors</p>
              <div className="product-band-items">
                  <div className="product-band-item">
                      <img src="/assets/images/industrial_cable.png" alt="AAC" />
                      <h5>AAC</h5>
                  </div>
                  <div className="product-band-item">
                      <img src="/assets/images/industrial_cable.png" alt="AAAC" />
                      <h5>AAAC</h5>
                  </div>
                  <div className="product-band-item">
                      <img src="/assets/images/industrial_cable.png" alt="ACSR" />
                      <h5>ACSR</h5>
                  </div>
              </div>
              <a href="/product" className="btn btn-outline anime-btn" style={{ marginTop: '40px' }}>Explore Conductors</a>
          </div>
      </section>

      <section className="product-band gsap-stagger-text">
          <div className="container mx-auto">
              <h2 style={{ fontSize: '54px', letterSpacing: '-0.04em', color: '#ccc' }}>OPGW</h2>
              <p style={{ marginTop: '10px', fontWeight: 500 }}>Optical Ground Wires for Telecommunication</p>
              <div className="product-band-items">
                  <div className="product-band-item">
                      <img src="/assets/images/repair_service.png" alt="OPGW 24F" />
                      <h5>OPGW 24F</h5>
                  </div>
                  <div className="product-band-item">
                      <img src="/assets/images/repair_service.png" alt="OPGW 48F" />
                      <h5>OPGW 48F</h5>
                  </div>
              </div>
              <a href="/contact" className="btn btn-primary anime-btn" style={{ marginTop: '40px' }}>Inquire Now</a>
          </div>
      </section>

      {/* 6. Split News Section */}
      <section className="section-padding" style={{ background: 'var(--bg-white)' }}>
          <div className="container mx-auto">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="gsap-reveal">
                  
                  <div style={{ background: "url('/assets/images/team_working.png') center/cover", height: '400px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}></div>
                      <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: 'white' }}>
                          <span style={{ background: 'var(--primary-color)', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>INNOVATION</span>
                          <h3 style={{ color: 'white', marginTop: '15px', fontSize: '28px' }}>Smart City Solutions</h3>
                          <a href="/blog" style={{ color: 'white', fontWeight: 600, textDecoration: 'underline', marginTop: '15px', display: 'block' }}>Read Article</a>
                      </div>
                  </div>

                  <div style={{ background: "url('/assets/images/industrial_cable.png') center/cover", height: '400px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}></div>
                      <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: 'white' }}>
                          <span style={{ background: 'var(--primary-color)', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>SUSTAINABILITY</span>
                          <h3 style={{ color: 'white', marginTop: '15px', fontSize: '28px' }}>Green Manufacturing Process</h3>
                          <a href="/about" style={{ color: 'white', fontWeight: 600, textDecoration: 'underline', marginTop: '15px', display: 'block' }}>Learn More</a>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* 8. Vertical Integration (Dark Circular) */}
      <section className="dark-section circular-graphic-section gsap-stagger-text">
          <div className="container mx-auto">
              <h2 style={{ fontSize: '48px', letterSpacing: '-0.03em', marginBottom: '20px' }}>FULLY INTEGRATED,<br/>VERTICALLY BACKWARDS</h2>
              <p style={{ color: '#999', maxWidth: '600px', margin: '0 auto 60px' }}>From raw materials to finished products, our entire supply chain is optimized for unparalleled quality control.</p>
              
              <div className="circular-graphic">
                  <img src="/assets/images/team_working.png" alt="Integrated Facility" style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                  <div>
                      <i className="fa-solid fa-industry" style={{ fontSize: '32px', color: '#fff', marginBottom: '15px' }}></i>
                      <h5 style={{ color: '#fff', fontSize: '18px' }}>Manufacturing</h5>
                  </div>
                  <div>
                      <i className="fa-solid fa-microscope" style={{ fontSize: '32px', color: '#fff', marginBottom: '15px' }}></i>
                      <h5 style={{ color: '#fff', fontSize: '18px' }}>R&D Center</h5>
                  </div>
                  <div>
                      <i className="fa-solid fa-truck-fast" style={{ fontSize: '32px', color: '#fff', marginBottom: '15px' }}></i>
                      <h5 style={{ color: '#fff', fontSize: '18px' }}>Global Logistics</h5>
                  </div>
              </div>
          </div>
      </section>

      {/* 9. Global Presence */}
      <section className="dark-section gsap-stagger-text" style={{ paddingTop: 0, paddingBottom: '150px' }}>
          <div className="container mx-auto text-center">
              <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '40px', border: '1px dashed #333', borderRadius: '50%' }}>
                  <i className="fa-solid fa-globe" style={{ fontSize: '120px', color: 'var(--primary-color)' }}></i>
              </div>
              <h2 style={{ fontSize: '42px', marginTop: '60px', marginBottom: '20px' }}>Electrifying The World</h2>
              <p style={{ color: '#999' }}>Exporting to 50+ countries with uncompromising standards.</p>
          </div>
      </section>
    </div>
  );
};

export default Home;

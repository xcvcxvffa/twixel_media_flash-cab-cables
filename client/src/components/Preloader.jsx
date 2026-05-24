import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    // Simulate loading progress
    let currentProgress = 0;
    const duration = 2000; // 2 seconds total simulation
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setProgress(100);

        // Run GSAP Reveal Animation
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = ''; // Re-enable scroll
            if (onComplete) onComplete();
          }
        });

        // 1. Fade out the center line and text
        tl.to([lineRef.current, textRef.current], {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });

        // 2. Slide the halves apart (opening the shutter from the center)
        tl.to(topHalfRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.2");

        tl.to(bottomHalfRef.current, {
          y: "100%",
          duration: 1.2,
          ease: "power4.inOut"
        }, "<");

        // 3. Hide container completely
        tl.set(containerRef.current, { display: "none" });

      } else {
        // Smooth fast-scrolling number
        setProgress(Math.floor(currentProgress));
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} style={styles.container}>
      <div ref={topHalfRef} style={styles.topHalf}></div>
      <div ref={bottomHalfRef} style={styles.bottomHalf}></div>

      <div ref={lineRef} style={styles.line}>
        {/* Active Progress Line */}
        <div style={{ ...styles.progressLine, width: `${progress}%` }}></div>
      </div>

      <div ref={textRef} style={styles.textContainer}>
        <span style={styles.text}>{progress}%</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 99999, // Ensure it's above everything
    pointerEvents: 'none',
  },
  topHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50vh',
    backgroundColor: '#1a1a1a', // Dark aesthetic from screenshot
    zIndex: 1
  },
  bottomHalf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50vh',
    backgroundColor: '#1a1a1a',
    zIndex: 1
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    transform: 'translateY(-50%)',
    zIndex: 2
  },
  textContainer: {
    position: 'absolute',
    bottom: 'clamp(20px, 5vh, 40px)',
    right: 'clamp(20px, 5vw, 50px)',
    zIndex: 3
  },
  text: {
    color: '#ffffff',
    fontSize: 'clamp(40px, 10vw, 64px)',
    fontFamily: 'var(--font-heading)',
    fontWeight: '300',
    letterSpacing: '-0.02em',
    lineHeight: 1
  },
  progressLine: {
    height: '100%',
    backgroundColor: '#ffffff', // Solid white line like screenshot
    transition: 'width 0.1s linear' // Smooth forward movement
  }
};

export default Preloader;

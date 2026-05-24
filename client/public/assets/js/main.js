// Initialize GSAP and Anime.js after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0);

    // Function to play hero animation
    function playHeroAnimation() {
        const heroAnimate = document.querySelector('.hero-animate');
        if (heroAnimate) {
            const heroHeading = heroAnimate.querySelector('h1');
            if (heroHeading) {
                const lines = heroHeading.innerHTML.split(/<br\s*\/?>/i);
                const wrappedLines = lines.map(line => {
                    const words = line.split(/\s+/);
                    return words.map(word => {
                        if (word.trim() === '') return '';
                        return `<span class="word-mask" style="display:inline-block; overflow:hidden; vertical-align:bottom; padding-bottom:5px; margin-bottom:-5px;"><span class="anim-word" style="display:inline-block; opacity:0; transform:translateY(120%);">${word}</span></span>`;
                    }).join('&nbsp;');
                });
                heroHeading.innerHTML = wrappedLines.join('<br>');

                gsap.to(heroHeading.querySelectorAll('.anim-word'), {
                    opacity: 1,
                    y: "0%",
                    stagger: 0.15,
                    ease: "power4.out",
                    duration: 1.2,
                    delay: 0.2 // Slight delay on load
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
    }

    // --- Preloader Logic ---
    const preloader = document.getElementById('custom-preloader');
    if (preloader) {
        let progress = 0;
        const progressLine = document.getElementById('preloader-progress');
        const counter = document.getElementById('preloader-counter');
        
        // Stop lenis scrolling while loading
        lenis.stop();

        const fakeLoader = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 2; // Random jumps
            if (progress >= 100) {
                progress = 100;
                clearInterval(fakeLoader);
                
                progressLine.style.width = '100%';
                counter.innerText = '100%';
                
                // Fade out & slide up preloader
                gsap.to(preloader, {
                    y: "-100%", // Slide up out of view
                    duration: 1.2,
                    ease: "power4.inOut",
                    delay: 0.4,
                    onComplete: () => {
                        document.body.classList.remove('loading');
                        lenis.start(); // Resume scrolling
                        preloader.style.display = 'none';
                        
                        // Start Hero animation AFTER preloader is gone
                        playHeroAnimation();
                    }
                });
            } else {
                progressLine.style.width = progress + '%';
                counter.innerText = progress + '%';
            }
        }, 40);
    } else {
        // Fallback if no preloader
        playHeroAnimation();
    }

    // --- About Section: Scroll-Expand Box ---
    const aboutBox = document.getElementById('about-box');
    const aboutWrapper = document.getElementById('about-scroll-wrapper');
    if (aboutBox && aboutWrapper) {
        const aboutContent = document.getElementById('about-box-content');
        const aboutStats = document.getElementById('about-stats');

        // Timeline scrubbed to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutWrapper,
                start: 'top 75%',
                end: 'bottom 30%',
                scrub: 1.2,
            }
        });

        // 1. Expand box: width 70% → 100%, border-radius 30px → 0
        tl.to(aboutBox, {
            width: '100%',
            borderRadius: '0px',
            ease: 'none',
            duration: 1
        }, 0);

        // 2. Fade in content
        tl.to(aboutContent, {
            opacity: 1,
            ease: 'none',
            duration: 0.6
        }, 0.3);

        // 3. Fade in stats bar
        tl.to(aboutStats, {
            opacity: 1,
            ease: 'none',
            duration: 0.6
        }, 0.5);

        // 4. Slight image parallax inside the box
        const boxImg = document.getElementById('about-box-img');
        if (boxImg) {
            gsap.to(boxImg, {
                y: '10%',
                ease: 'none',
                scrollTrigger: {
                    trigger: aboutWrapper,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
    }

    // Global Text Reveal (Word-by-word for Headings AND Paragraphs on Scroll)
    const staggerGroups = document.querySelectorAll('.gsap-stagger-text');
    staggerGroups.forEach(group => {
        
        // 1. Target only headings for word-by-word split
        const headings = group.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            // Split by <br> to preserve line breaks, then split by space
            const lines = heading.innerHTML.split(/<br\s*\/?>/i);
            const wrappedLines = lines.map(line => {
                const words = line.split(/\s+/); // Split by any whitespace
                return words.map(word => {
                    if (word.trim() === '') return '';
                    // Wrap each word in an overflow:hidden mask, then the word itself
                    return `<span class="word-mask" style="display:inline-block; overflow:hidden; vertical-align:bottom; padding-bottom:5px; margin-bottom:-5px;"><span class="anim-word" style="display:inline-block; opacity:0; transform:translateY(120%);">${word}</span></span>`;
                }).join('&nbsp;'); // Use &nbsp; to maintain spacing
            });
            heading.innerHTML = wrappedLines.join('<br>');

            // Animate the generated word spans rising out of their masks
            const words = heading.querySelectorAll('.anim-word');
            if (words.length > 0) {
                gsap.to(words, {
                    opacity: 1,
                    y: "0%",
                    stagger: 0.15, // Increased stagger for very obvious word-by-word separation
                    ease: "none", 
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 90%",
                        end: "top 60%", // Compress the scroll distance to make the animation feel tighter
                        scrub: 1
                    }
                });
            }
        });

        // 2. Other elements (paragraphs, spans, buttons) animate as full blocks
        const otherElements = group.querySelectorAll('p, span:not(.anim-word):not(.word-mask), a.btn');
        otherElements.forEach(el => {
            gsap.fromTo(el, 
                { autoAlpha: 0, y: 40 }, 
                { 
                    autoAlpha: 1, 
                    y: 0, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 70%",
                        scrub: 1
                    }
                }
            );
        });
    });

    // 1. Reveal Elements (Fade Up)
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { autoAlpha: 0, y: 50 }, 
            { 
                duration: 1, 
                autoAlpha: 1, 
                y: 0, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%", 
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 2. Staggered Grid Elements (Services, Products)
    const grids = document.querySelectorAll('.services-grid');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.gsap-stagger');
        if(items.length > 0) {
            gsap.fromTo(items,
                { autoAlpha: 0, y: 40 },
                {
                    duration: 0.8,
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // --- Unique About Us Section Animations ---
    const aboutSection = document.querySelector('.about-unique-section');
    if (aboutSection) {
        // 1. Massive Background Text Parallax (Slides horizontally as you scroll down)
        const bgText = aboutSection.querySelector('.about-bg-text');
        gsap.to(bgText, {
            x: "-20%", // Slide left
            ease: "none",
            scrollTrigger: {
                trigger: aboutSection,
                start: "top bottom", // Start when section enters screen
                end: "bottom top", // End when section leaves screen
                scrub: 1
            }
        });

        // 2. Image Inner Parallax (Image moves slightly inside its mask)
        const parallaxImg = aboutSection.querySelector('.about-img-parallax');
        gsap.to(parallaxImg, {
            y: "15%", // Move down inside wrapper
            ease: "none",
            scrollTrigger: {
                trigger: aboutSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        // 3. Spinning 25+ Badge (Rotates as you scroll)
        const badge = aboutSection.querySelector('.about-badge');
        gsap.to(badge, {
            rotation: 180,
            y: -50, // Float up slightly
            ease: "none",
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 80%",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    // --- Anime.js Interactions (Minimalist Sterlite style) ---

    // 1. Button Physics/Hover Effect (No shadow scaling)
    const animeBtns = document.querySelectorAll('.anime-btn');
    animeBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // --- Product Filtering Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
                filterBtns.forEach(b => b.classList.add('btn-outline'));
                
                // Add active class to clicked
                btn.classList.add('active', 'btn-primary');
                btn.classList.remove('btn-outline');

                const filterValue = btn.getAttribute('data-filter');

                productItems.forEach(item => {
                    if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide-product');
                        // Optional: small fade in
                        gsap.fromTo(item, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.5});
                    } else {
                        item.classList.add('hide-product');
                    }
                });
                
                // Refresh ScrollTrigger since layout changed
                ScrollTrigger.refresh();
            });
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

});

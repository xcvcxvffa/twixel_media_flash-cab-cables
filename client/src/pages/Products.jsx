import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ArrowLeft, ArrowRight, ShieldCheck, Settings2, Package, Palette, Zap, CheckCircle2 } from 'lucide-react';
import { productCategories } from '../data/productData';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  // Helper to find initial category and product based on productId param
  const getInitialState = () => {
    if (!productId) return { category: null, product: null };
    
    // Search in top-level categories
    const foundCat = productCategories.find(c => c.id === productId);
    if (foundCat) {
      return { category: foundCat, product: foundCat };
    }
    // Search in subCategories
    for (const cat of productCategories) {
      if (cat.subCategories) {
        const sub = cat.subCategories.find(s => s.id === productId);
        if (sub) {
          return { category: cat, product: sub };
        }
      }
    }
    return { category: null, product: null };
  };

  const initialState = getInitialState();
  const [activeCategory, setActiveCategory] = useState(initialState.category);
  const [activeProduct, setActiveProduct] = useState(initialState.product);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sync URL productId with activeProduct on mount/refresh/parameter change
  useEffect(() => {
    if (productId) {
      // Search in top-level categories
      let found = productCategories.find(c => c.id === productId);
      if (found) {
        setActiveCategory(found);
        setActiveProduct(found);
        return;
      }
      // Search in subCategories
      for (const cat of productCategories) {
        if (cat.subCategories) {
          const sub = cat.subCategories.find(s => s.id === productId);
          if (sub) {
            setActiveCategory(cat);
            setActiveProduct(sub);
            return;
          }
        }
      }
    } else {
      setActiveCategory(null);
      setActiveProduct(null);
    }
  }, [productId]);

  const handleProductClick = (product) => {
    setActiveProduct(product);
    setCurrentSlide(0);
    navigate(`/cable/${product.id}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const detailRef = useRef(null);
  const imageRef = useRef(null);

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProduct]);

  // General entrance animations handled by CSS classes (.animate-fade-in-up) now for better reliability

  // Split Heading Animation
  useGSAP(() => {
    const splitHeadings = document.querySelectorAll('.split-heading');

    splitHeadings.forEach(heading => {
      if (heading.dataset.split !== 'true') {
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
  }, [activeCategory, activeProduct]);

  // Sidebar entry animation
  useGSAP(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  // Detail View Animations
  useGSAP(() => {
    if (activeProduct && detailRef.current) {
      // Hero Elements
      gsap.fromTo('.detail-hero-text',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );


      // Image animations removed as requested

      // Bento Boxes Stagger
      gsap.fromTo('.bento-box',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.bento-grid',
            start: "top 85%"
          }
        }
      );

      // Table Fade Up
      gsap.fromTo('.spec-table',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.spec-table',
            start: "top 90%"
          }
        }
      );
    }
  }, [activeProduct, activeCategory]);

  const handleCategoryClick = (category) => {
    if (activeCategory?.id !== category.id) {
      setActiveCategory(category);
      if (!category.subCategories || category.subCategories.length === 0) {
        setActiveProduct(category);
        navigate(`/cable/${category.id}`);
      } else {
        setActiveProduct(null);
      }
    }
  };

  const renderProductDetails = (product) => {
    const specs = product.specs;
    if (!specs) return (
      <div className="flex flex-col items-center justify-center py-32 text-center" ref={detailRef}>
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Zap className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-3xl font-bold text-[#203a70] mb-4">Detailed specifications coming soon</h3>
        <p className="text-gray-500 max-w-md">We are currently curating the technical data and high-resolution imagery for this product variant. Please check back later.</p>
        <button
          onClick={() => {
            if (!activeCategory?.subCategories || activeCategory.subCategories.length === 0) {
              setActiveCategory(null);
              setActiveProduct(null);
              navigate('/cable');
            } else {
              setActiveProduct(null);
              navigate('/cable');
            }
          }}
          className="btn-uiverse group" style={{ marginTop: '40px' }}
        >
          <span className="flex items-center gap-2.5">
            {(!activeCategory?.subCategories || activeCategory.subCategories.length === 0) ? 'Explore All Products' : 'Explore Other Variants'}
            <ArrowRight size={18} className="transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 self-center" />
          </span>
        </button>
      </div>
    );
    // Build image list for this product (using filters to make them look distinct)
    const productImages = [
      { src: product.image, style: {} },
      { src: product.image, style: { filter: 'hue-rotate(45deg)' } },
      { src: product.image, style: { filter: 'hue-rotate(-45deg)' } }
    ];

    return (
      <div className="product-details w-full animate-fade-in" ref={detailRef}>

        {/* Section 1 (2-col): Left = Product Info & Download, Right = Floating Product Image */}
        {/* Section 1 (2-col): Left = Product Info & Download, Right = Floating Product Image */}
        <div className="cable-detail-banner">
          {/* Left Column: Content */}
          <div className="cable-detail-banner-left">
            <h2 className="cable-banner-title">
              {product.name}
            </h2>
            <p className="cable-banner-desc">
              {specs.application}
            </p>
            <a href="#" className="cable-download-btn">
              <span>Download Catalogue</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="download-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
          {/* Right Column: Image */}
          <div className="cable-detail-banner-right" ref={imageRef}>
            <img src={product.image2 || product.image} alt={product.name} className="cable-banner-img" />
          </div>
        </div>

        <div className="cable-detail-content-wrap">
          {/* Applications Section */}
          {(product.id === '11kv-ht-cable' || product.id === '11kv-medium-voltage-cable' || product.id === 'welding-cable' || product.id === 'single-multi-flexible-cables' || product.id === 'industrial-power-control-cables' || product.id === 'submersible-flat-cables' || product.id === 'ariel-bunched-cables' || product.id === 'house-wires' || product.id === 'round-flexible-cable' || product.id === 'auto-cable' || product.id === 'battery-cable') && (
            <div className="detail-section-card animate-fade-in">
              <h3 className="section-primary-heading relative z-10 mb-8 md:mb-10">
                <span className="accent-pill"></span>
                <span className="split-heading">Applications</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {product.id === '11kv-ht-cable' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#84cc16] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-industry"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Industrial Plants</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ec4899] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-gears"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Infrastructure Projects</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-solar-panel"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Renewable & Commercial</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-tower-broadcast"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Power Distribution</span>
                    </div>
                  </>
                ) : product.id === '11kv-medium-voltage-cable' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#f59e0b] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-industry"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Industrial Facilities</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ec4899] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-robot"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Automation Systems</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-gears"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Heavy Machinery & Equipment</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-bolt"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Power Distribution Panels</span>
                    </div>
                  </>
                ) : product.id === 'single-multi-flexible-cables' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-house"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Residential Wiring</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-building"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Commercial Installations</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-industry"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Industrial Machinery</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-gears"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Automation & Control Systems</span>
                    </div>
                  </>
                ) : product.id === 'industrial-power-control-cables' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-industry"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Industrial Plants</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-gears"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Automation Systems</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-industry"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Heavy Machinery</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-sliders"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Control Panels</span>
                    </div>
                  </>
                ) : product.id === 'submersible-flat-cables' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-droplet"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Borewells</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-faucet"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Submersible Pumps</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-water"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Underwater Equipment</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-filter"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Water Treatment Plants</span>
                    </div>
                  </>
                ) : product.id === 'ariel-bunched-cables' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-share-nodes"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Power Distribution</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-city"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Urban Networks</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-tower-broadcast"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Rural Electrification</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-house"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Residential Projects</span>
                    </div>
                  </>
                ) : product.id === 'house-wires' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-house"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Residential Wiring</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-lightbulb"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Lighting Systems</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-plug"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Power to Outlets</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-kitchen-set"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Home Appliances</span>
                    </div>
                  </>
                ) : product.id === 'round-flexible-cable' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Power Tools</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-industry"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Industrial Equipment</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-plug"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Electrical Machinery</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-mobile-screen"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Portable Devices</span>
                    </div>
                  </>
                ) : product.id === 'auto-cable' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-plug"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Wiring Harnesses</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-car"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Vehicle Wiring</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-gears"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Engine Circuits</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-bolt"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Electrical Connections</span>
                    </div>
                  </>
                ) : product.id === 'battery-cable' ? (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#B5CC2B] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-car-battery"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Battery Connections</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#E5267F] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-car"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Automotive Wiring</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#5B7BBE] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-motorcycle"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Motor Cycles</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-bolt"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Low Voltage Circuits</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#84cc16] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-fire"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Manual Arc Welding</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ec4899] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-robot"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Automatic / Spot Welding</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-industry"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Assembly & Conveyors</span>
                    </div>
                    <div className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110 duration-300">
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                      </div>
                      <span className="text-slate-800 font-bold text-sm">Machine Connections</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Technical Details Grid (dynamic based on specs) */}
          <div className="detail-section-card">
              <h3 className="section-primary-heading relative z-10 mb-6 md:mb-8">
                <span className="accent-pill"></span>
                <span className="split-heading">Technical Details</span>
              </h3>

            <div className="tech-detail-grid">
              {(() => {
                const details = [];
                const labelMap = {
                  'Operating Temp': 'Operating Temperature',
                  'Short Circuit Temp': 'Short Circuit Temperature',
                  'Min. Bending Radius': 'Minimum Bending Radius'
                };

                // Add Standard if present
                if (specs.cableStandard && product.id !== 'single-multi-flexible-cables' && product.id !== 'industrial-power-control-cables' && product.id !== 'submersible-flat-cables' && product.id !== 'ariel-bunched-cables' && product.id !== 'house-wires' && product.id !== 'round-flexible-cable' && product.id !== 'auto-cable' && product.id !== 'battery-cable') {
                  details.push({ label: 'Standard', value: specs.cableStandard });
                }

                // Add values from technicalData
                if (specs.technicalData) {
                  Object.entries(specs.technicalData).forEach(([key, val]) => {
                    details.push({ label: labelMap[key] || key, value: val });
                  });
                }

                // Add values from standardPacking if not already added by label
                if (specs.standardPacking && product.id !== 'single-multi-flexible-cables' && product.id !== 'industrial-power-control-cables' && product.id !== 'submersible-flat-cables' && product.id !== 'ariel-bunched-cables' && product.id !== 'house-wires' && product.id !== 'round-flexible-cable' && product.id !== 'auto-cable' && product.id !== 'battery-cable') {
                  Object.entries(specs.standardPacking).forEach(([key, val]) => {
                    const mappedLabel = labelMap[key] || key;
                    if (!details.some(d => d.label.toLowerCase() === mappedLabel.toLowerCase())) {
                      details.push({ label: mappedLabel, value: val });
                    }
                  });
                }

                // Fallback details if empty
                if (details.length === 0) {
                  return (
                    <>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Voltage Grade</span>
                        <span className="tech-detail-value">11 KV</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Standard</span>
                        <span className="tech-detail-value">IS 7098 (Part 2) / IEC 60502-2</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Conductor</span>
                        <span className="tech-detail-value">Aluminium / Copper (Class 2 Stranded)</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Insulation</span>
                        <span className="tech-detail-value">XLPE (Cross Linked Polyethylene)</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Core Identification</span>
                        <span className="tech-detail-value">By Color Coding</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Installation</span>
                        <span className="tech-detail-value">Indoor, Outdoor, Underground & Duct</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Armour</span>
                        <span className="tech-detail-value">Galvanized Steel Wire / Steel Strip Armour</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Operating Temperature</span>
                        <span className="tech-detail-value">-15°C to +90°C</span>
                      </div>
                      <div className="tech-detail-card">
                        <span className="tech-detail-label">Short Circuit Temperature</span>
                        <span className="tech-detail-value">Up to 250°C</span>
                      </div>
                    </>
                  );
                }

                return details.map((item, index) => (
                  <div key={index} className="tech-detail-card">
                    <span className="tech-detail-label">{item.label}</span>
                    <span className="tech-detail-value">{item.value}</span>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Product Information — Card Grid Layout */}
          {product.id === 'welding-cable' && (
            <div className="product-info-wrapper animate-fade-in">
              <h3 className="section-primary-heading relative z-10 mb-8 md:mb-10">
                <span className="accent-pill"></span>
                <span className="split-heading">Product Information</span>
              </h3>

              {/* Row 1: Cable Standard | Salient Features | Technical Data */}
              <div className="product-info-grid">

                {/* Cable Standard Card */}
                <div className="info-premium-card">
                  <div className="info-card-header">
                    <div className="info-card-icon-wrapper bg-[#e0f2fe]">
                      <ShieldCheck size={24} className="text-[#3b82f6]" />
                    </div>
                    <h4 className="info-card-title">Cable Standard</h4>
                  </div>
                  <p className="info-card-text">{specs.cableStandard}</p>
                </div>

                {/* Salient Features Card */}
                <div className="info-premium-card">
                  <div className="info-card-header">
                    <div className="info-card-icon-wrapper bg-[#fef3c7]">
                      <Settings2 size={24} className="text-[#f59e0b]" />
                    </div>
                    <h4 className="info-card-title">Salient Features</h4>
                  </div>
                  <ul className="info-card-list">
                    {specs.salientFeatures?.map((feature, i) => (
                      <li key={i} className="info-card-list-item">
                        <span className="flex-shrink-0">
                          <CheckCircle2 size={17} className={`${i % 3 === 0 ? 'text-[#f59e0b]' : i % 3 === 1 ? 'text-[#2fa084]' : 'text-[#8b5cf6]'}`} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Data Card */}
                <div className="info-premium-card">
                  <div className="info-card-header">
                    <div className="info-card-icon-wrapper bg-[#ede9fe]">
                      <Zap size={24} className="text-[#8b5cf6]" />
                    </div>
                    <h4 className="info-card-title">Technical Data</h4>
                  </div>
                  <div className="info-card-list">
                    {specs.technicalData && Object.entries(specs.technicalData).map(([key, val], i) => (
                      <div key={i} className="info-card-tech-group">
                        <span className="info-card-tech-label">{key}</span>
                        <span className="info-card-tech-value">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Standard Packing | Current Rating | Voltage Drop */}
              <div className="product-info-grid">

                {/* Standard Packing Card */}
                <div className="info-premium-card">
                  <div className="info-card-header">
                    <div className="info-card-icon-wrapper bg-[#d1fae5]">
                      <Package size={24} className="text-[#10b981]" />
                    </div>
                    <h4 className="info-card-title">Standard Packing</h4>
                  </div>
                  <div className="info-card-list">
                    {specs.standardPacking && Object.entries(specs.standardPacking).map(([key, val], i) => (
                      <div key={i} className="info-card-packing-item">
                        <strong className="text-[#1e293b]">{key} : </strong>
                        <span className="text-gray-500">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Rating Card */}
                {specs.currentRatingText && (
                  <div className="info-premium-card">
                    <div className="info-card-header">
                      <div className="info-card-icon-wrapper bg-[#fee2e2]">
                        <Zap size={24} className="text-[#ea580c]" />
                      </div>
                      <h4 className="info-card-title">Current Rating</h4>
                    </div>
                    <p className="info-card-text">{specs.currentRatingText}</p>
                    <ul className="info-card-list">
                      {specs.dutyCycles?.map((dc, i) => (
                        <li key={i} className="info-card-list-item items-center">
                          <span className="w-2 h-2 rounded-full bg-[#ea580c] flex-shrink-0"></span>
                          <span>{dc.label}: <strong className="text-[#ea580c]">{dc.value}</strong></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Voltage Drop Card */}
                {specs.voltageDropText && (
                  <div className="info-premium-card">
                    <div className="info-card-header">
                      <div className="info-card-icon-wrapper bg-[#fef3c7]">
                        <Zap size={24} className="text-[#f59e0b]" />
                      </div>
                      <h4 className="info-card-title">Voltage Drop</h4>
                    </div>
                    <p className="info-card-text">{specs.voltageDropText}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Technical Data Table */}
          {product.id !== '11kv-ht-cable' && product.id !== '11kv-medium-voltage-cable' && specs.tableData && specs.tableData.length > 0 && (
            <div className="detail-section-card">
              <h3 className="section-primary-heading relative z-10 mb-6 md:mb-8">
                <span className="accent-pill"></span>
                <span className="split-heading">Complete Specification Data</span>
              </h3>

              {product.id === 'welding-cable' ? (
                // CUSTOM LAYOUT FOR WELDING CABLE
                <div className="flex flex-col gap-10">
                  {/* Sizing Table */}
                  <div className="overflow-x-auto">
                    <table className="premium-spec-table min-w-[1000px]">
                      <thead>
                        <tr>
                          <th rowSpan="2">Cable Size<br/><span className="text-xs font-normal opacity-85">(Sq.mm)</span></th>
                          <th rowSpan="2">Nominal Inner<br/>Insulation Thickness<br/><span className="text-xs font-normal opacity-85">(mm)</span></th>
                          <th rowSpan="2">Nominal Sheath<br/>Thickness<br/><span className="text-xs font-normal opacity-85">(mm)</span></th>
                          <th colSpan="2">Overall Cable Diameter<br/><span className="text-xs font-normal opacity-85">(mm)</span></th>
                          <th rowSpan="2">Max. Conductor<br/>Resistance at 20°C<br/><span className="text-xs font-normal opacity-85">(Ω/km)</span></th>
                          <th colSpan="5">Current Rating<br/>Welding Applications<br/><span className="text-xs font-normal opacity-85">(amp)</span></th>
                          <th rowSpan="2">Non Welding<br/>Applications<br/><span className="text-xs font-normal opacity-85">(amp)</span></th>
                        </tr>
                        <tr className="sub-header-row">
                          <th style={{ backgroundColor: '#24427e' }}>Single Insulation</th>
                          <th style={{ backgroundColor: '#24427e' }}>Double Insulation</th>
                          <th>100%</th>
                          <th>85%</th>
                          <th>60%</th>
                          <th>30%</th>
                          <th>20%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {specs.tableData.map((row, idx) => (
                          <tr key={idx}>
                            <td className="primary-cell">{row.size}</td>
                            <td>{row.innerIns}</td>
                            <td>{row.sheath}</td>
                            <td>{row.diaSingle}</td>
                            <td>{row.diaDouble}</td>
                            <td className="mono-cell">{row.res}</td>
                            <td>{row.cur100}</td>
                            <td>{row.cur85}</td>
                            <td>{row.cur60}</td>
                            <td>{row.cur30}</td>
                            <td>{row.cur20}</td>
                            <td className="highlight-cell">{row.nonWelding}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Temperature Correction Factors Table */}
                  {specs.tempFactors && (
                    <div className="flex flex-col gap-5 mt-12 md:mt-16">
                      <h4 className="font-bold text-[#203a70] text-base text-left tracking-tight">Rating factors for variation in ambient temperature</h4>
                      <div className="overflow-x-auto">
                        <table className="premium-spec-table ambient-table min-w-[700px]">
                          <thead>
                            <tr>
                              <th>Ambient Temperature °C</th>
                              {specs.tempFactors.map((item, idx) => (
                                <th key={idx}>{item.temp}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="label-cell">Rating Factor</td>
                              {specs.tempFactors.map((item, idx) => (
                                <td key={idx} className="mono-cell">{item.factor}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // STANDARD LAYOUT FOR OTHER PRODUCTS
                <div className="overflow-x-auto">
                  <table className="premium-spec-table min-w-[1000px]">
                    <thead>
                      {/* Top Header Row */}
                      <tr>
                        <th colSpan="2">Conductor</th>
                        <th colSpan="2">Insulation</th>
                        <th colSpan="3">Total Thickness & Diameter</th>
                        <th rowSpan="2">Resistance<br /><span className="text-xs font-normal opacity-80">at 20°C (max)</span></th>
                        <th rowSpan="2">Current Rating<br /><span className="text-xs font-normal opacity-80">40°C</span></th>
                      </tr>
                      {/* Sub Header Row */}
                      <tr className="sub-header-row">
                        <th>Size (Sq.mm)</th>
                        <th>Wires (Nos.mm)</th>
                        <th>Thickness (mm)</th>
                        <th>Core OD (mm)</th>
                        <th>Thickness (mm)</th>
                        <th style={{ backgroundColor: '#3b5998' }}>3 Core (mm)</th>
                        <th style={{ backgroundColor: '#3b5998' }}>4 Core (mm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specs.tableData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="primary-cell">{row.size}</td>
                          <td>{row.wires}</td>
                          <td>{row.insThick}</td>
                          <td>{row.coreOD}</td>
                          <td>{row.sheathThick}</td>
                          <td>{row.over3Core}</td>
                          <td>{row.over4Core}</td>
                          <td className="mono-cell">{row.res}</td>
                          <td className="highlight-cell">{row.rating}A</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) }



          {/* Related Products Section */}
          {activeCategory && activeCategory.subCategories && activeCategory.subCategories.length > 1 && (
            <div className="related-products-section mt-16 md:mt-24">
              <h3 className="section-primary-heading">
                <span className="accent-pill"></span>
                <span className="split-heading">Related Products</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 product-grid-wrapper">
                {activeCategory.subCategories
                  .filter(item => item.id !== product.id)
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleProductClick(item)}
                      className="group cursor-pointer flex flex-col items-start text-left transition-all duration-300"
                    >
                      <div
                        className="rounded-2xl overflow-hidden relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl w-full mb-5 border border-gray-100"
                        style={{ backgroundColor: '#EFEFEF', padding: '24px' }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="transition-transform duration-500 group-hover:scale-105"
                          style={{ width: '85%', margin: '0 auto', height: '200px', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block', transformOrigin: 'bottom center', backfaceVisibility: 'hidden', willChange: 'transform' }}
                        />
                        <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '60px', background: 'linear-gradient(to bottom, rgba(239,239,239,0) 0%, rgba(239,239,239,1) 100%)' }}></div>
                      </div>
                      <h3 className="product-card-title !mt-2">{item.name}</h3>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Dynamic Breadcrumb Section */}
      <div className="breadcrumb-hero">
        <h1 className="breadcrumb-title">
          <span key={activeProduct ? activeProduct.id : activeCategory ? activeCategory.id : 'cable'} className="split-heading">
            {activeProduct ? activeProduct.name : activeCategory ? activeCategory.name : 'Cable'}
          </span>
        </h1>

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <a href="/">Home</a>
          <span className="separator">/</span>

          {!activeCategory && !activeProduct ? (
            <span className="active-crumb">Cable</span>
          ) : (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(null); setActiveProduct(null); navigate('/cable'); }}>Cable</a>
              <span className="separator">/</span>

              {!activeProduct || !activeCategory ? (
                <span className="active-crumb">{activeCategory?.name}</span>
              ) : (
                <>
                  {(!activeCategory.subCategories || activeCategory.subCategories.length === 0) ? (
                    <span className="active-crumb">{activeProduct.name}</span>
                  ) : (
                    <>
                      <a href="#" onClick={(e) => { e.preventDefault(); setActiveProduct(null); navigate('/cable'); }}>{activeCategory.name}</a>
                      <span className="separator">/</span>
                      <span className="active-crumb">{activeProduct.name}</span>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Layout Container */}
      <div className={`${activeProduct ? 'cable-detail-page-container' : 'cable-page-container'} flex flex-col gap-12 transition-all duration-500`}>

        {/* Main Content Area */}
        <main className="w-full min-w-0" ref={contentRef}>

          {activeProduct ? (
            // LEVEL 3: Detailed Specifications
            renderProductDetails(activeProduct)
          ) : (
            // LEVEL 1 & 2: Main Grid
            <div>
              <div className="products-header-section flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6 gap-6">
                <div>
                  <h2 key={activeCategory ? activeCategory.id : 'all'} className="all-products-title section-title split-heading text-3xl lg:text-4xl mb-0 !text-[#203a70]">
                    {activeCategory ? activeCategory.name : 'All Cables'}
                  </h2>
                </div>

                {/* Premium Search Bar */}
                <div className="custom-search-container relative mt-2 md:mt-0 w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Search cables..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="custom-search-input w-full"
                  />
                  <svg className="custom-search-icon absolute top-1/2 transform -translate-y-1/2 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {activeCategory && (
                <button
                  onClick={() => { setActiveCategory(null); navigate('/cable'); }}
                  className="btn-uiverse group mb-8 products-back-btn"
                >
                  <span className="flex items-center gap-2.5">
                    Back to All Cables
                    <ArrowRight size={18} className="transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 self-center" />
                  </span>
                </button>
              )}

              {/* Product Grid with real-time filtering */}
              {(() => {
                const items = (activeCategory ? activeCategory.subCategories : productCategories).filter(item =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (items.length === 0) {
                  return (
                    <div className="no-products-section">
                      <p className="text-[#203a70] text-xl font-semibold mb-2">No cables found matching "{searchQuery}"</p>
                      <p className="text-gray-500 text-sm">Try checking your spelling or searching for another query.</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 product-grid-wrapper">
                    {items.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => activeCategory ? handleProductClick(item) : handleCategoryClick(item)}
                        className="stagger-card group cursor-pointer flex flex-col items-start text-left animate-fade-in-up opacity-0"
                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
                      >
                        {/* Gray Image Box — premium card layout */}
                        <div
                          className="rounded-2xl overflow-hidden relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl w-full mb-5 border border-gray-100"
                          style={{ backgroundColor: '#EFEFEF', paddingTop: '24px', paddingRight: '24px', paddingLeft: '24px'  }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="transition-transform duration-500 group-hover:scale-105"
                            style={{ width: '85%', margin: '0 auto', height: '200px', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block', transformOrigin: 'bottom center', backfaceVisibility: 'hidden', willChange: 'transform' }}
                          />
                          {/* Bottom fade — same as mega-menu-card::after */}
                          <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '60px', background: 'linear-gradient(to bottom, rgba(239,239,239,0) 0%, rgba(239,239,239,1) 100%)' }}></div>
                        </div>

                        {/* Product Name Below the Box */}
                        <h3 className="product-card-title">{item.name}</h3>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;

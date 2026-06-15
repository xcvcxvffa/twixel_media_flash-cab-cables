import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ArrowLeft, ArrowRight, ShieldCheck, Settings2, Package, Palette, Zap, CheckCircle2 } from 'lucide-react';
import { productCategories } from '../data/productData';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleProductClick = (product) => {
    setActiveProduct(product);
    setCurrentSlide(0);
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
            } else {
              setActiveProduct(null);
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
        <div className="cable-detail-banner">
          {/* Left Column: Content */}
          <div className="cable-detail-banner-left">
            <span className="cable-banner-eyebrow">
              {activeCategory.name}
            </span>
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
            <img src={product.image} alt={product.name} className="cable-banner-img" />
          </div>
        </div>

        <div className="cable-detail-content-wrap">
          {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 bento-grid">
           
           {/* Box 1: Cable Standard */}
           <div className="bento-box bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <h3 className="bento-heading relative z-10">
                <ShieldCheck className="w-8 h-8 text-[#3b5998]" />
                <span className="split-heading">Cable Standard</span>
              </h3>
              <p className="text-gray-600 font-medium relative z-10">{specs.cableStandard}</p>
           </div>

           {/* Box 2: Salient Features */}
           <div className="bento-box bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group row-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <h3 className="bento-heading relative z-10">
                <Settings2 className="w-8 h-8 text-[#2fa084]" />
                <span className="split-heading">Salient Features</span>
              </h3>
              <ul className="feature-list relative z-10">
                 {specs.salientFeatures.map((feature, idx) => (
                   <li key={idx} className="feature-list-item">
                      <CheckCircle2 className="feature-icon" />
                      <span className="feature-text">{feature}</span>
                   </li>
                 ))}
              </ul>
           </div>

           {/* Box 3: Technical Data */}
           <div className="bento-box bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group row-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <h3 className="bento-heading relative z-10">
                <Zap className="w-8 h-8 text-[#6b46c1]" />
                <span className="split-heading">Technical Data</span>
              </h3>
              <div className="space-y-4 relative z-10">
                {Object.entries(specs.technicalData).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                     <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{key}</span>
                     <span className="text-gray-800 font-medium">{val}</span>
                  </div>
                ))}
              </div>
           </div>

           {/* Box 4: Standard Packing */}
           <div className="bento-box bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <h3 className="bento-heading relative z-10">
                <Package className="w-8 h-8 text-[#ed8936]" />
                <span className="split-heading">Standard Packing</span>
              </h3>
              <div className="space-y-3 relative z-10">
                {Object.entries(specs.standardPacking).map(([key, val]) => (
                  <p key={key} className="text-sm text-gray-600">
                    {key !== 'Coils' && <strong className="text-gray-800">{key}: </strong>}{val}
                  </p>
                ))}
              </div>
           </div>

           {/* Box 5: Core Colour (Spans full width on tablet/desktop) */}
           <div className="bento-box md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#203a70] to-[#2a4d94] p-8 rounded-3xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10">
                 <h3 className="bento-heading white-text">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20">
                       <Palette className="w-6 h-6 text-white" />
                    </div>
                    <span className="split-heading">Core Colour Coding</span>
                 </h3>
                 <p className="text-blue-100 leading-relaxed max-w-4xl">{specs.coreColour}</p>
              </div>
           </div>
        </div>

        {/* Technical Data Table */}
        {specs.tableData && specs.tableData.length > 0 && (
          <div className="spec-table w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-12">
             <h3 className="section-primary-heading relative z-10">
                <span className="accent-pill"></span>
                <span className="split-heading">Complete Specification Data</span>
             </h3>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
                   <thead className="text-white">
                     {/* Top Header Row */}
                     <tr className="bg-[#203a70]">
                       <th colSpan="2" className="border-r border-white/20 px-4 py-4 text-center font-bold tracking-wide rounded-tl-xl">Conductor</th>
                       <th colSpan="2" className="border-r border-white/20 px-4 py-4 text-center font-bold tracking-wide">Insulation</th>
                       <th colSpan="3" className="border-r border-white/20 px-4 py-4 text-center font-bold tracking-wide">Total Thickness & Diameter</th>
                       <th rowSpan="2" className="border-r border-white/20 px-4 py-4 text-center align-middle whitespace-nowrap font-bold">Resistance<br/><span className="text-xs font-normal opacity-80">at 20°C (max)</span></th>
                       <th rowSpan="2" className="px-4 py-4 text-center align-middle whitespace-nowrap font-bold rounded-tr-xl">Current Rating<br/><span className="text-xs font-normal opacity-80">40°C</span></th>
                     </tr>
                     {/* Sub Header Row */}
                     <tr className="bg-[#2a4d94]">
                       <th className="border-r border-t border-white/20 px-3 py-3 text-center text-xs font-medium">Size (Sq.mm)</th>
                       <th className="border-r border-t border-white/20 px-3 py-3 text-center text-xs font-medium">Wires (Nos.mm)</th>
                       <th className="border-r border-t border-white/20 px-3 py-3 text-center text-xs font-medium">Thickness (mm)</th>
                       <th className="border-r border-t border-white/20 px-3 py-3 text-center text-xs font-medium">Core OD (mm)</th>
                       <th className="border-r border-t border-white/20 px-3 py-3 text-center text-xs font-medium">Thickness (mm)</th>
                       <th className="border-r border-t border-white/20 px-3 py-3 text-center text-xs font-medium bg-[#3b5998]">3 Core (mm)</th>
                       <th className="border-r border-t border-white/20 px-3 py-3 text-center text-xs font-medium bg-[#3b5998]">4 Core (mm)</th>
                     </tr>
                   </thead>
                   <tbody>
                     {specs.tableData.map((row, idx) => (
                       <tr key={idx} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0 group">
                         <td className="px-4 py-4 text-center text-gray-800 font-semibold">{row.size}</td>
                         <td className="px-4 py-4 text-center text-gray-600">{row.wires}</td>
                         <td className="px-4 py-4 text-center text-gray-600">{row.insThick}</td>
                         <td className="px-4 py-4 text-center text-gray-600">{row.coreOD}</td>
                         <td className="px-4 py-4 text-center text-gray-600">{row.sheathThick}</td>
                         <td className="px-4 py-4 text-center text-gray-600 bg-gray-50 group-hover:bg-blue-50/50 transition-colors">{row.over3Core}</td>
                         <td className="px-4 py-4 text-center text-gray-600 bg-gray-50 group-hover:bg-blue-50/50 transition-colors">{row.over4Core}</td>
                         <td className="px-4 py-4 text-center font-mono text-[#203a70]">{row.res}</td>
                         <td className="px-4 py-4 text-center font-bold text-[#2fa084]">{row.rating}A</td>
                       </tr>
                     ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Related Products Section */}
        {activeCategory && activeCategory.subCategories && activeCategory.subCategories.length > 1 && (
          <div className="related-products-section">
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
                          style={{ width: '85%', margin: '0 auto', height: '200px', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block' }}
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
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(null); setActiveProduct(null); }}>Cable</a>
                <span className="separator">/</span>
                
                {!activeProduct || !activeCategory ? (
                  <span className="active-crumb">{activeCategory?.name}</span>
                ) : (
                  <>
                    {(!activeCategory.subCategories || activeCategory.subCategories.length === 0) ? (
                      <span className="active-crumb">{activeProduct.name}</span>
                    ) : (
                      <>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveProduct(null); }}>{activeCategory.name}</a>
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
                  onClick={() => setActiveCategory(null)} 
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
                          style={{ backgroundColor: '#EFEFEF', padding: '24px' }}
                        >
                           <img 
                             src={item.image} 
                             alt={item.name} 
                             className="transition-transform duration-500 group-hover:scale-105"
                             style={{ width: '85%', margin: '0 auto', height: '200px', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block' }}
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

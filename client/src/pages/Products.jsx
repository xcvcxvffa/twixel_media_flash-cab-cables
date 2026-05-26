import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ArrowLeft, ArrowRight, ShieldCheck, Settings2, Package, Palette, Zap, CheckCircle2 } from 'lucide-react';
import { productCategories } from '../data/productData';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductClick = (product) => {
    setActiveProduct(product);
  };
  
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const detailRef = useRef(null);
  const imageRef = useRef(null);

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProduct]);

  // General entrance animations
  useGSAP(() => {
    if (!activeProduct && contentRef.current) {
      gsap.fromTo(
        '.stagger-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: "back.out(1.2)", clearProps: 'all' }
      );
    }
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
      
      // Floating Image Animation
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { opacity: 0, scale: 0.8, rotation: -5 }, 
          { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.7)" }
        );
        gsap.to(imageRef.current, {
          y: -15,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

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
  }, [activeProduct]);

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

    return (
      <div className="product-details w-full animate-fade-in" ref={detailRef}>

        {/* Section 1: Product Info + Image Gallery Below */}
        <div className="product-detail-hero">
          {/* Product Info */}
          <div className="detail-hero-text">
            <div className="inline-flex items-center space-x-2 bg-[#2fa084]/10 text-[#2fa084] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 w-max impact-eyebrow split-subheading">
              <span className="w-2 h-2 rounded-full bg-[#2fa084] animate-pulse"></span>
              <span>{activeCategory.name}</span>
            </div>
            <h2 className="section-title split-heading text-4xl lg:text-5xl leading-tight mb-6 tracking-tight">
              {product.name}
            </h2>
            <p className="section-description split-desc text-lg leading-relaxed max-w-3xl">
              {specs.application}
            </p>
          </div>

          {/* Image Gallery - Below the text */}
          <div className="product-detail-gallery">
            <div className="product-detail-main-image">
              <img
                ref={imageRef}
                src={product.image}
                alt={product.name}
                className="detail-main-img"
              />
            </div>
            {/* Thumbnail strip */}
            <div className="product-detail-thumbs">
              <div className="product-thumb active">
                <img src={product.image} alt={product.name + ' view 1'} />
              </div>
              <div className="product-thumb">
                <img src={product.image} alt={product.name + ' view 2'} />
              </div>
              <div className="product-thumb">
                <img src={product.image} alt={product.name + ' view 3'} />
              </div>
            </div>
          </div>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 bento-grid">
           
           {/* Box 1: Cable Standard */}
           <div className="bento-box bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <ShieldCheck className="w-10 h-10 text-[#3b5998] mb-6 relative z-10" />
              <h3 className="text-xl font-bold text-[#203a70] mb-3 relative z-10">Cable Standard</h3>
              <p className="text-gray-600 font-medium relative z-10">{specs.cableStandard}</p>
           </div>

           {/* Box 2: Salient Features */}
           <div className="bento-box bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group row-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <Settings2 className="w-10 h-10 text-[#2fa084] mb-6 relative z-10" />
              <h3 className="text-xl font-bold text-[#203a70] mb-5 relative z-10">Salient Features</h3>
              <ul className="space-y-4 relative z-10">
                 {specs.salientFeatures.map((feature, idx) => (
                   <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#2fa084] mr-3 shrink-0 mt-0.5" />
                      <span className="text-gray-600 leading-relaxed">{feature}</span>
                   </li>
                 ))}
              </ul>
           </div>

           {/* Box 3: Technical Data */}
           <div className="bento-box bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group row-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <Zap className="w-10 h-10 text-[#6b46c1] mb-6 relative z-10" />
              <h3 className="text-xl font-bold text-[#203a70] mb-5 relative z-10">Technical Data</h3>
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
              <Package className="w-10 h-10 text-[#ed8936] mb-6 relative z-10" />
              <h3 className="text-xl font-bold text-[#203a70] mb-4 relative z-10">Standard Packing</h3>
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
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20">
                    <Palette className="w-8 h-8 text-white" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">Core Colour Coding</h3>
                    <p className="text-blue-100 leading-relaxed max-w-4xl">{specs.coreColour}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Technical Data Table */}
        {specs.tableData && specs.tableData.length > 0 && (
          <div className="spec-table w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-12">
             <h3 className="text-2xl font-bold text-[#203a70] mb-8 flex items-center">
                <span className="w-2 h-8 bg-[#2fa084] rounded-full mr-4 inline-block"></span>
                Complete Specification Data
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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Dynamic Breadcrumb Section */}
      <div className="bg-[#f5f5f5] h-[20vh] min-h-[160px] mb-16 relative flex flex-col items-center justify-center text-center">
        <div className="container mx-auto relative z-10 flex flex-col items-center justify-center">
           <h1 className="text-3xl md:text-4xl font-bold text-[#203a70] mb-3 tracking-wide">
             {activeProduct ? activeProduct.name : activeCategory ? activeCategory.name : 'Products'}
           </h1>
           {/* Breadcrumb */}
           <div className="flex items-center space-x-3 text-sm text-gray-500 font-medium tracking-widest uppercase">
              <a href="/" className="hover:text-[#2fa084] transition-colors">Home</a>
              <span className="opacity-50 text-gray-400">/</span>
              
              {!activeCategory && !activeProduct ? (
                <span className="text-[#203a70] font-bold">Products</span>
              ) : (
                <>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(null); setActiveProduct(null); }} className="hover:text-[#2fa084] transition-colors">Products</a>
                  <span className="opacity-50 text-gray-400">/</span>
                  
                  {!activeProduct || !activeCategory ? (
                    <span className="text-[#203a70] font-bold">{activeCategory?.name}</span>
                  ) : (
                    <>
                      {(!activeCategory.subCategories || activeCategory.subCategories.length === 0) ? (
                        <span className="text-[#203a70] font-bold">{activeProduct.name}</span>
                      ) : (
                        <>
                          <a href="#" onClick={(e) => { e.preventDefault(); setActiveProduct(null); }} className="hover:text-[#2fa084] transition-colors">{activeCategory.name}</a>
                          <span className="opacity-50 text-gray-400">/</span>
                          <span className="text-[#203a70] font-bold">{activeProduct.name}</span>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
           </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className={`container mx-auto px-4 max-w-7xl flex flex-col gap-12 transition-all duration-500`}>
         
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
                    <h2 className="all-products-title section-title split-heading text-3xl lg:text-4xl mb-0 !text-[#203a70]">
                      {activeCategory ? activeCategory.name : 'All Products'}
                    </h2>
                 </div>
                 
                 {/* Premium Search Bar */}
                 <div className="custom-search-container relative mt-2 md:mt-0 w-full md:w-96">
                   <input 
                     type="text" 
                     placeholder="Search products..." 
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
                    Back to All Products
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
                      <p className="text-[#203a70] text-xl font-semibold mb-2">No products found matching "{searchQuery}"</p>
                      <p className="text-gray-500 text-sm">Try checking your spelling or searching for another query.</p>
                    </div>
                  );
                }
                
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {items.map((item, idx) => (
                      <div 
                        key={item.id} 
                        onClick={() => activeCategory ? handleProductClick(item) : handleCategoryClick(item)}
                        className="stagger-card group cursor-pointer flex flex-col items-start text-left"
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

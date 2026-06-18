import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, Zap, CheckCircle2, ShieldCheck, Settings2, Package } from 'lucide-react';
import Preloader from '../components/Preloader/Preloader';
import { productCategories } from '../data/productData';

const mapStaticProduct = (prod) => {
  const technicalDetails = Object.entries(prod.specs?.technicalData || {}).map(([key, value]) => ({ label: key, value: String(value) }));
  
  const features = [];
  if (prod.specs?.salientFeatures && prod.specs.salientFeatures.length > 0) {
    features.push({ title: 'Salient Features', description: `<ul class="list-disc pl-5">` + prod.specs.salientFeatures.map(f => `<li>${f}</li>`).join('') + `</ul>` });
  }
  if (prod.specs?.standardPacking) {
    const pkStr = Object.entries(prod.specs.standardPacking).map(([k, v]) => `<li><b>${k}:</b> ${v}</li>`).join('');
    features.push({ title: 'Standard Packing', description: `<ul class="list-disc pl-5">${pkStr}</ul>` });
  }

  let tableHtml = "";
  if (prod.specs?.tableData && prod.specs.tableData.length > 0) {
     const headers = Object.keys(prod.specs.tableData[0]);
     tableHtml = `<table style="border-collapse: collapse; width: 100%;" border="1"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>` + 
                 prod.specs.tableData.map(row => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`).join('') +
                 `</tbody></table>`;
  }

  return {
    _id: `static_${prod.id}`,
    id: prod.id,
    slug: prod.id,
    name: prod.name,
    description: prod.specs?.application || '',
    imgList: [
      { img: prod.image },
      ...(prod.image2 ? [{ img: prod.image2 }] : [])
    ],
    technicalDetails: technicalDetails,
    features: features,
    specificationHtml: tableHtml
  };
};

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const detailRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const fetchedProducts = data.data || [];
        const fetchedSlugs = fetchedProducts.map(p => p.slug || p.id);
        
        // Find static products that haven't been added to DB yet
        const staticFallbackProducts = productCategories
          .filter(p => !fetchedSlugs.includes(p.id))
          .map(mapStaticProduct);
          
        const combinedProducts = [...fetchedProducts, ...staticFallbackProducts];
        
        setProducts(combinedProducts);
        
        if (productId) {
          const found = combinedProducts.find(p => p.id === productId || p.slug === productId);
          setActiveProduct(found || null);
        } else {
          setActiveProduct(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        
        // On completely failed API, load all static products
        const allStatic = productCategories.map(mapStaticProduct);
        setProducts(allStatic);
        if (productId) {
          const found = allStatic.find(p => p.id === productId || p.slug === productId);
          setActiveProduct(found || null);
        } else {
          setActiveProduct(null);
        }
        setLoading(false);
      });
  }, [productId]);

  const handleProductClick = (product) => {
    setActiveProduct(product);
    navigate(`/cable/${product.slug || product.id}`);
  };

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProduct]);

  // Sidebar entry animation
  useGSAP(() => {
    if (activeProduct && sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeProduct]);

  // Detail View Animations
  useGSAP(() => {
    if (activeProduct && detailRef.current) {
      gsap.fromTo('.detail-hero-text',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );

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



  const renderProductDetails = (product) => {
    const mainImg = product.imgList && product.imgList.length > 0 ? product.imgList[0].img : '';

    return (
      <div className="product-details w-full animate-fade-in" ref={detailRef}>
        <div className="cable-detail-banner">
                <div className="cable-detail-banner-left detail-hero-text">
                  <h2 className="cable-banner-title">{product.name}</h2>
                  <div className="cable-banner-desc" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                </div>
                <div className="cable-detail-banner-right">
                  {product.imgList && product.imgList.length > 0 && (
                    <img src={product.imgList.length > 1 ? product.imgList[1].img : product.imgList[0].img} alt={product.name} className="cable-banner-img" />
                  )}
                </div>
              </div>

              <div className="cable-detail-content-wrap">
                {/* Applications Section */}
                {product.applications && product.applications.length > 0 && (
                  <div className="detail-section-card animate-fade-in">
                    <h3 className="section-primary-heading relative z-10 mb-8 md:mb-10">
                      <span className="accent-pill"></span>
                      <span className="split-heading">Applications</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {product.applications.map((app, idx) => {
                        const colors = ['bg-[#84cc16]', 'bg-[#ec4899]', 'bg-[#3b82f6]', 'bg-[#ea580c]', 'bg-[#f59e0b]', 'bg-[#B5CC2B]', 'bg-[#E5267F]', 'bg-[#5B7BBE]'];
                        const bgColor = colors[idx % colors.length];
                        const isFontAwesome = app.icon && app.icon.startsWith('fa-');
                        
                        return (
                          <div key={idx} className="application-card flex flex-col items-center text-center py-10 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md hover:bg-white hover:border-blue-100/50 transition-all duration-300 group">
                            <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center text-2xl text-white shadow-md transition-transform group-hover:scale-110 duration-300 ${isFontAwesome ? bgColor : 'bg-white'}`}>
                              {isFontAwesome ? (
                                <i className={app.icon}></i>
                              ) : app.icon ? (
                                <img src={app.icon} alt={app.title} className="w-full h-full object-cover" />
                              ) : (
                                <Zap className="text-white w-8 h-8" />
                              )}
                            </div>
                            <span className="text-slate-800 font-bold text-sm mt-4">{app.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Technical Details Grid */}
                {product.technicalDetails && product.technicalDetails.length > 0 && (
                  <div className="detail-section-card">
                    <h3 className="section-primary-heading relative z-10 mb-6 md:mb-8">
                      <span className="accent-pill"></span>
                      <span className="split-heading">Technical Details</span>
                    </h3>

                    <div className="tech-detail-grid">
                      {product.technicalDetails.map((detail, idx) => (
                        <div key={idx} className="tech-detail-card">
                          <span className="tech-detail-label">{detail.label}</span>
                          <span className="tech-detail-value">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Information */}
                {product.features && product.features.length > 0 && (
                  <div className="product-info-wrapper animate-fade-in mt-12">
                    <h3 className="section-primary-heading relative z-10 mb-8 md:mb-10">
                      <span className="accent-pill"></span>
                      <span className="split-heading">Product Information</span>
                    </h3>
                    
                    <div className="product-info-grid">
                      {product.features.map((feature, idx) => {
                        let bgClass = "bg-[#f3f4f6]";
                        let textClass = "text-[#6b7280]";
                        let iconName = "CheckCircle2";
                        
                        const titleLower = (feature.title || '').toLowerCase();
                        if (titleLower.includes('standard packing') || titleLower.includes('packing')) {
                          bgClass = "bg-[#d1fae5]"; textClass = "text-[#10b981]"; iconName = "Package";
                        } else if (titleLower.includes('salient') || titleLower.includes('features')) {
                          bgClass = "bg-[#fef3c7]"; textClass = "text-[#f59e0b]"; iconName = "Settings2";
                        } else if (titleLower.includes('technical') || titleLower.includes('data')) {
                          bgClass = "bg-[#ede9fe]"; textClass = "text-[#8b5cf6]"; iconName = "Zap";
                        } else if (titleLower.includes('standard')) {
                          bgClass = "bg-[#e0f2fe]"; textClass = "text-[#3b82f6]"; iconName = "ShieldCheck";
                        } else if (titleLower.includes('current')) {
                          bgClass = "bg-[#fee2e2]"; textClass = "text-[#ea580c]"; iconName = "Zap";
                        } else if (titleLower.includes('voltage')) {
                          bgClass = "bg-[#fef3c7]"; textClass = "text-[#f59e0b]"; iconName = "Zap";
                        }

                        const IconComponent = {
                          CheckCircle2: <CheckCircle2 size={24} className={textClass} />,
                          ShieldCheck: <ShieldCheck size={24} className={textClass} />,
                          Settings2: <Settings2 size={24} className={textClass} />,
                          Zap: <Zap size={24} className={textClass} />,
                          Package: <Package size={24} className={textClass} />
                        }[iconName];

                        return (
                          <div key={idx} className="info-premium-card">
                            <div className="info-card-header">
                              <div className={`info-card-icon-wrapper ${bgClass}`}>
                                {IconComponent}
                              </div>
                              <h4 className="info-card-title">{feature.title}</h4>
                            </div>
                            <div className="info-card-text info-card-list" dangerouslySetInnerHTML={{ __html: feature.description }}></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}


                {/* Dynamic Table Grid */}
                {product.specificationHtml ? (
                  <div className="detail-section-card spec-table mt-12 overflow-x-auto">
                    <h3 className="section-primary-heading relative z-10 mb-8">
                      <span className="accent-pill"></span>
                      <span className="split-heading">Complete Specification Data</span>
                    </h3>
                    <div className="overflow-x-auto spec-html-container">
                      <div dangerouslySetInnerHTML={{ __html: product.specificationHtml }} />
                    </div>
                  </div>
                ) : product.specificationTable && product.specificationTable.headers && product.specificationTable.headers.length > 0 && (
                  <div className="detail-section-card spec-table mt-12 overflow-x-auto">
                    <h3 className="section-primary-heading relative z-10 mb-8">
                      <span className="accent-pill"></span>
                      <span className="split-heading">Complete Specification Data</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="premium-spec-table min-w-[1000px]">
                        <thead>
                          <tr>
                            {product.specificationTable.headers.map((header, idx) => (
                              <th key={idx}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {product.specificationTable.rows && product.specificationTable.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={cIdx === 0 ? "primary-cell" : cIdx === row.length - 2 ? "mono-cell" : cIdx === row.length - 1 ? "highlight-cell" : ""}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
    );
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Dynamic Breadcrumb Section */}
      <div className="breadcrumb-hero" style={{ backgroundImage: "url('/assets/images/mega_cables.png')" }}>
        <h1 className="breadcrumb-title">
          <span key={activeProduct ? activeProduct.id : 'cable'} className="split-heading">
            {activeProduct ? activeProduct.name : 'Cable'}
          </span>
        </h1>

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <a href="/">Home</a>
          <span className="separator">/</span>

          {!activeProduct ? (
            <span className="active-crumb">Cable</span>
          ) : (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveProduct(null); navigate('/cable'); }}>Cable</a>
              <span className="separator">/</span>
              <span className="active-crumb">{activeProduct.name}</span>
            </>
          )}
        </div>
      </div>

      <div className={`${activeProduct ? 'cable-detail-page-container' : 'cable-page-container'} flex flex-col gap-12 transition-all duration-500`}>
        <main className="w-full min-w-0" ref={contentRef}>
          {activeProduct ? (
            renderProductDetails(activeProduct)
          ) : (
            <div>
              <div className="products-header-section flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6 gap-6">
                <div>
                  <h2 className="all-products-title section-title split-heading text-3xl lg:text-4xl mb-0 !text-[#203a70]">
                    All Cables
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

              {(() => {
                const items = products.filter(item =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (items.length === 0) {
                  return (
                    <div className="no-products-section text-center py-20">
                      <p className="text-[#203a70] text-xl font-semibold mb-2">No cables found matching "{searchQuery}"</p>
                      <p className="text-gray-500 text-sm">Try checking your spelling or searching for another query.</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 product-grid-wrapper max-w-7xl mx-auto px-4 md:px-8 pb-20">
                    {items.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => handleProductClick(item)}
                        className="stagger-card group cursor-pointer flex flex-col items-start text-left animate-fade-in-up opacity-0"
                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
                      >
                        <div
                          className="rounded-2xl overflow-hidden relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl w-full mb-5 border border-gray-100"
                          style={{ backgroundColor: '#EFEFEF', paddingTop: '24px', paddingRight: '24px', paddingLeft: '24px'  }}
                        >
                          {item.imgList && item.imgList.length > 0 ? (
                            <img
                              src={item.imgList[0].img}
                              alt={item.name}
                              className="transition-transform duration-500 group-hover:scale-105"
                              style={{ width: '85%', margin: '0 auto', height: '200px', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block', transformOrigin: 'bottom center', backfaceVisibility: 'hidden', willChange: 'transform' }}
                            />
                          ) : (
                            <Zap className="text-gray-300 w-16 h-16" />
                          )}
                          <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '60px', background: 'linear-gradient(to bottom, rgba(239,239,239,0) 0%, rgba(239,239,239,1) 100%)' }}></div>
                        </div>

                        <h3 className="product-card-title text-[15px] font-bold text-[#203a70] tracking-wide leading-snug">{item.name}</h3>
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
    </>
  );
};

export default Products;

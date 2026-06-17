import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const POSTS_PER_PAGE = 6;
  const loaderRef = useRef(null);

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initialize and handle search changes
  useEffect(() => {
    setPage(1);
    setDisplayedPosts(filteredPosts.slice(0, POSTS_PER_PAGE));
    setHasMore(filteredPosts.length > POSTS_PER_PAGE);
  }, [searchQuery]);

  // Load more posts
  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const nextPage = page + 1;
      const nextPosts = filteredPosts.slice(0, nextPage * POSTS_PER_PAGE);
      
      setDisplayedPosts(nextPosts);
      setPage(nextPage);
      setHasMore(nextPosts.length < filteredPosts.length);
      setLoading(false);
    }, 1200); // 1.2 second simulated loading
  };

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadMorePosts();
      }
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading, page, searchQuery]);

  // Split Heading Animation (same as Products page)
  useGSAP(() => {
    // 1. Split Headings for GSAP
    const splitHeadings = document.querySelectorAll('.split-heading');
    
    splitHeadings.forEach(heading => {
        // Split-type logic
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

  }, [activeCategory]); 

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Dynamic Breadcrumb Section */}
      <div className="breadcrumb-hero" style={{ backgroundImage: "url('/assets/images/impact_bg.png')" }}>
         <h1 className="breadcrumb-title">
           <span key={activeCategory} className="split-heading">
             {activeCategory === 'All' ? 'Blog & News' : activeCategory}
           </span>
         </h1>
         
         {/* Breadcrumb Navigation */}
         <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            {activeCategory === 'All' ? (
              <span className="current">Blog & News</span>
            ) : (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('All'); }}>Blog & News</a>
                <span className="separator">/</span>
                <span className="current">{activeCategory}</span>
              </>
            )}
         </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl flex flex-col gap-12 transition-all duration-500">
        
        {/* Header and Search Bar */}
        <div className="products-header-section flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6 gap-6">
           <div>
              <h2 className="all-products-title section-title split-heading text-3xl lg:text-4xl mb-0 !text-[#203a70]">
                Latest Updates
              </h2>
           </div>
           
           {/* Premium Search Bar */}
           <div className="custom-search-container relative mt-2 md:mt-0 w-full md:w-96">
             <input 
               type="text" 
               placeholder="Search articles..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="custom-search-input w-full"
             />
             <svg className="custom-search-icon absolute top-1/2 transform -translate-y-1/2 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
             </svg>
           </div>
        </div>

        {/* Blog Grid */}
        {displayedPosts.length === 0 ? (
          <div className="no-products-section">
            <p className="text-[#203a70] text-xl font-semibold mb-2">No articles found matching "{searchQuery}"</p>
            <p className="text-gray-500 text-sm">Try checking your spelling or searching for another topic.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 product-grid-wrapper">
            {displayedPosts.map((post, idx) => (
              <div 
                key={post.id} 
                className="blog-card animate-fade-in-up opacity-0"
                style={{ animationDelay: `${(idx % POSTS_PER_PAGE) * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {/* Full Width Image */}
                <div className="blog-card-img-container">
                   <img 
                     src={post.image} 
                     alt={post.title} 
                   />
                </div>

                {/* Content Container */}
                <div className="blog-card-content">
                  {/* Category Tag */}
                  <div>
                    <span className="blog-card-category">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="blog-card-title">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="blog-card-excerpt">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <button className="blog-card-btn group">
                    Read more
                    <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Infinite Scroll Loader */}
        {hasMore && (
          <div ref={loaderRef} className="infinite-scroll-loader-container">
            {loading && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2fa084] rounded-full animate-spin"></div>
                <p className="text-[#203a70] font-medium animate-pulse tracking-wide uppercase text-sm">Loading More Articles...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

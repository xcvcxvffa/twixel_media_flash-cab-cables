import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch single post and all published posts concurrently
    Promise.all([
      fetch(`http://localhost:8000/api/blogs/${slug}?t=${new Date().getTime()}`).then(res => res.json()),
      fetch(`http://localhost:8000/api/blogs?status=published&t=${new Date().getTime()}`).then(res => res.json())
    ])
      .then(([singleData, allData]) => {
        // Set single post
        if (singleData.data) {
          setPost(singleData.data);
        } else if (singleData && typeof singleData === 'object') {
          setPost(singleData);
        }

        // Set all posts (for sidebar and recommended)
        if (allData.data && Array.isArray(allData.data)) {
          setAllBlogs(allData.data);
        } else if (Array.isArray(allData)) {
          setAllBlogs(allData);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog detail:', err);
        setLoading(false);
      });
  }, [slug]);

  // Entrance Animation
  useGSAP(() => {
    if (!loading && post) {
      gsap.fromTo('.blog-detail-content > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [loading, post]);

  // SEO Injection
  useEffect(() => {
    if (post) {
      document.title = post.meta_title || `${post.title} | Flash Cab Cables`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = post.meta_description || post.excerpt || '';

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = post.meta_keywords || '';
    }
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#2fa084] rounded-full animate-spin"></div>
          <p className="text-[#203a70] font-medium tracking-wide">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[#203a70] text-2xl font-bold mb-4">Article Not Found</h2>
          <Link to="/blog" className="text-[#2fa084] hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20">
      {/* SEO Meta Tags handled via DOM in useEffect */}

      {/* Page Header (Breadcrumb Hero) */}
      <div
        className="breadcrumb-hero"
        style={{ backgroundImage: `url('${post?.feature_image || '/assets/images/industrial_mix_bg.png'}')` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="breadcrumb-title mb-6">
            {post.title}
          </h1>

          {/* Breadcrumb Navigation */}
          <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <Link to="/blog">Blog</Link>
            <span className="separator">/</span>
            <span className="current">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px] mt-12">

        {/* Title & Meta Row */}
        <div className="blog-detail-header mt-8 mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-[54px] blog-main-title" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
            {post.title}
          </h1>
        </div>

        {/* 2-Column Grid */}
        <div className="blog-layout-grid">

          {/* Main Content (Left) */}
          <div className="blog-main-column">
            {post.image && (
              <img
                src={post.image?.startsWith('http') ? post.image : `http://localhost:8000${post.image}`}
                alt={post.title}
                className="w-full h-auto object-cover rounded-2xl mb-12"
              />
            )}

            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

          </div>

          {/* Sidebar (Right) */}
          <div className="blog-sidebar-column">

            {/* Author Card */}
            <div className="sidebar-widget text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-5">
                <div className="w-full h-full bg-gradient-to-tr from-[#5B7BBE] to-[#1f6f5f] flex items-center justify-center text-white font-bold text-3xl">FC</div>
              </div>
              <h3 className="author-meta-name text-xl !mt-2 !mb-2">Flash Cab Editorial</h3>
              <p className="text-gray-500 text-[15px] mb-6 leading-relaxed">
                Expert insights and news from the Flash Cab manufacturing team. We write about industry trends, technical advancements, and company updates.
              </p>

            </div>

            {/* Other Blogs */}
            <div className="sidebar-widget mt-8 mb-10">
              <h3 className="sidebar-widget-title">
                <span className="text-lg">✦</span> Other Blogs
              </h3>
              <div className="space-y-6">
                {allBlogs.filter(b => b.id !== post.id).slice(0, 5).map(b => (
                  <Link to={`/blog/${b.slug}`} key={b.id} className="flex gap-4 group items-center">
                    <div className="w-[84px] h-[84px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={b.image?.startsWith('http') ? b.image : `http://localhost:8000${b.image}`} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[15px] text-gray-900 group-hover:text-[#4f46e5] transition line-clamp-2 mb-1.5 leading-snug">{b.title}</h4>
                      <p className="text-[13px] text-gray-500">{new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default BlogDetail;

/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Renders a public section of the corporate advisory portal.
 * - Helmet-async enabled for custom SEO metadata rendering.
 * - Tailored responsive layout for mobile and desktop screens.
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useBlog, useBlogs } from '../hooks/useBlogs';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LazyImage from '../components/common/LazyImage';
import Skeleton from '../components/common/Skeleton';
import { CalendarIcon, UserIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function BlogPost() {
  // Unpacks route slug identifiers from the router parameters
  const { slug } = useParams();
  const { data, isLoading, error } = useBlog(slug);
  const post = data?.data?.blog || data?.blog;

  // Fetch recent posts for recommendation sidebar
  const { data: recentData } = useBlogs({ limit: 4 });
  const recentPosts = (recentData?.data?.blogs || [])
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const formattedDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Copies the current article's URL to the user's clipboard and triggers a toast notification
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Article link copied to clipboard!');
  };

  // Encodes the post title and current URL for direct WhatsApp messaging sharing
  const handleShareWhatsApp = () => {
    const text = `Check out this article: ${post?.title} - ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <Skeleton className="h-10 w-2/3 rounded-lg" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The blog post you are trying to view does not exist or has been deleted by the admin.
        </p>
        <Link to="/blog">
          <Button variant="primary">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} | CARD Insights`}</title>
        <meta name="description" content={post.excerpt || 'Read this informative article from CARD Technocrats.'} />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          
          {/* Back button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <div className="space-y-4">
            {post.category && (
              <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {post.category}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-4xl">
              {post.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex items-center gap-6 text-xs text-gray-400 font-semibold border-b border-white/10 pb-6">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4.5 h-4.5 text-blue-500" />
                {formattedDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <UserIcon className="w-4.5 h-4.5 text-blue-500" />
                By {post.author || 'CARD Admin'}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-xl">
            <LazyImage
              src={post.coverImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200'}
              alt={post.title}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Layout: Article + Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            
            {/* Left: Article rich text content */}
            <div className="lg:col-span-3 space-y-8">
              <article
                className="prose prose-invert prose-blue max-w-none text-gray-300 leading-relaxed text-base space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags Cloud */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/5 text-gray-400 px-3 py-1.5 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Actions sidebar & recommendations */}
            <aside className="space-y-8">
              
              {/* Share Panel */}
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShareIcon className="w-5 h-5 text-blue-500" />
                  Share Article
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" onClick={handleCopyLink} className="justify-center text-xs py-2 border-white/20 hover:bg-white/5 text-gray-300">
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShareWhatsApp} className="justify-center text-xs py-2 border-green-500/20 hover:bg-green-500/10 text-green-400">
                    WhatsApp
                  </Button>
                </div>
              </div>

              {/* Recommended Blogs */}
              {recentPosts.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-500">Related Articles</h4>
                  <div className="space-y-4">
                    {recentPosts.map((rp) => (
                      <Link key={rp._id} to={`/blog/${rp.slug}`} className="block">
                        <Card className="p-4 bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all duration-300">
                          <h5 className="text-xs font-bold text-white hover:text-blue-400 transition-colors line-clamp-2 mb-1.5 leading-snug">
                            {rp.title}
                          </h5>
                          <span className="text-[9px] text-gray-500 font-mono font-bold uppercase">{formattedDate(rp.createdAt)}</span>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

          </div>

        </div>
      </main>
    </>
  );
}

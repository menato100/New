"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, BookmarkCheck, Facebook, Twitter, Linkedin } from 'lucide-react';
import { articles } from '@/lib/data';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState(articles.find(a => a.slug === slug));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  useEffect(() => {
    // Check if article is bookmarked in localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.some((id: number) => id === article?.id));
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [article?.id]);
  
  const toggleBookmark = () => {
    if (!article) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((id: number) => id !== article.id);
    } else {
      newBookmarks = [...bookmarks, article.id];
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };
  
  const shareArticle = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    
    setShowShareMenu(false);
  };
  
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <header className="relative h-96 w-full bg-slate-900">
        {/* Featured Image */}
        <div className="absolute inset-0 opacity-60">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/60 to-slate-900/90"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative h-full flex flex-col justify-end pb-12">
          <Link href="/" className="absolute top-8 left-6 text-white flex items-center hover:underline">
            <ArrowLeft size={18} className="mr-2" /> Back to Articles
          </Link>
          
          <div className="flex items-center mb-4 text-sm text-slate-300">
            <span className="bg-indigo-500 text-white px-2.5 py-0.5 rounded-full">{article.category}</span>
            <div className="flex items-center ml-4">
              <Calendar size={14} className="mr-1" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center ml-4">
              <Clock size={14} className="mr-1" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl"
          >
            {article.title}
          </motion.h1>
        </div>
      </header>
      
      {/* Article Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 font-bold text-lg">
              {article.author.split(' ').map(name => name[0]).join('')}
            </div>
            <div className="ml-3">
              <p className="font-medium">{article.author}</p>
              <p className="text-sm text-slate-500">Technology Writer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <Share2 size={20} />
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  <button 
                    onClick={() => shareArticle('facebook')}
                    className="flex items-center w-full px-4 py-2 hover:bg-slate-100"
                  >
                    <Facebook size={16} className="mr-3 text-indigo-600" /> Facebook
                  </button>
                  <button 
                    onClick={() => shareArticle('twitter')}
                    className="flex items-center w-full px-4 py-2 hover:bg-slate-100"
                  >
                    <Twitter size={16} className="mr-3 text-indigo-400" /> Twitter
                  </button>
                  <button 
                    onClick={() => shareArticle('linkedin')}
                    className="flex items-center w-full px-4 py-2 hover:bg-slate-100"
                  >
                    <Linkedin size={16} className="mr-3 text-indigo-700" /> LinkedIn
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleBookmark}
              className="p-2 rounded-full hover:bg-slate-100"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {isBookmarked ? 
                <BookmarkCheck size={20} className="text-indigo-600" /> : 
                <Bookmark size={20} />
              }
            </button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.filter(a => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <div key={relatedArticle.id} className="flex space-x-4">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={relatedArticle.coverImage}
                        alt={relatedArticle.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <Link 
                        href={`/${relatedArticle.slug}`}
                        className="font-medium hover:text-indigo-600 line-clamp-2"
                      >
                        {relatedArticle.title}
                      </Link>
                      <p className="text-sm text-slate-500 mt-1">{relatedArticle.date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

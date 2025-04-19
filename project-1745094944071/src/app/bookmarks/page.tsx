"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bookmark, Calendar, Clock, Trash2, ArrowLeft } from "lucide-react";
import { articles } from "@/lib/data";
import { Article } from "@/lib/data";

export default function BookmarksPage() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // Get bookmarked article IDs from localStorage
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setIsEmpty(bookmarks.length === 0);
    
    // Filter articles based on bookmarked IDs
    const savedArticles = articles.filter(article => 
      bookmarks.includes(article.id)
    );
    
    setBookmarkedArticles(savedArticles);
  }, []);

  const removeBookmark = (id: number) => {
    // Update localStorage
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const updatedBookmarks = bookmarks.filter((bookmarkId: number) => bookmarkId !== id);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    
    // Update state
    setBookmarkedArticles(prev => prev.filter(article => article.id !== id));
    setIsEmpty(updatedBookmarks.length === 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <Bookmark className="mr-3 text-indigo-600" /> My Bookmarks
          </h1>
        </div>

        {isEmpty ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-12 text-center">
            <div className="flex justify-center mb-6">
              <Bookmark size={64} className="text-slate-300 dark:text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">No Bookmarks Yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">You haven't saved any articles to your bookmarks yet.</p>
            <Link 
              href="/" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg inline-flex items-center"
            >
              Browse Articles <ArrowLeft size={16} className="ml-2 rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarkedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md relative"
              >
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => removeBookmark(article.id)}
                    className="p-2 bg-white/80 dark:bg-slate-800/80 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 transition-colors"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="relative h-48 w-full">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 font-medium px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="ml-3 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {article.date}
                    </span>
                    <span className="ml-3 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {article.readTime} min
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 text-slate-800 dark:text-white">
                    <Link href={`/${article.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <Link
                    href={`/${article.slug}`}
                    className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Continue Reading <ArrowLeft size={14} className="ml-1 rotate-180" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

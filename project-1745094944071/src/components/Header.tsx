"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check for dark mode preference in localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Listen for scroll to add background to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || isMenuOpen ? "bg-white shadow-md dark:bg-slate-900" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Futur<span className="text-slate-800 dark:text-white">Forge</span></span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Home</Link>
              <Link href="#" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Hardware</Link>
              <Link href="#" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Cybersecurity</Link>
              <Link href="#" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Cloud</Link>
              <Link href="#" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">AI</Link>
            </nav>
            
            {/* Actions */}
            <div className="flex items-center">
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="p-2 text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
              >
                <Search size={20} />
              </button>
              
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 ml-2 text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-2 p-2 md:hidden text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 space-y-4 border-t border-slate-200 dark:border-slate-700">
                <Link href="/" className="block py-2 text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Home</Link>
                <Link href="#" className="block py-2 text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Hardware</Link>
                <Link href="#" className="block py-2 text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Cybersecurity</Link>
                <Link href="#" className="block py-2 text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">Cloud</Link>
                <Link href="#" className="block py-2 text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-medium">AI</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-6 pr-12 text-slate-800 dark:text-white bg-white dark:bg-slate-800 text-xl focus:outline-none"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Search size={24} />
                </button>
              </form>
              <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Press ESC to close</p>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20"></div>
    </>
  );
}

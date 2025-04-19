"use client";

import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      // In a real implementation, you would send this to your API
      console.log(`Subscribing email: ${email}`);
      
      // For demo purposes, we'll just simulate success
      setSubscribed(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Futur<span className="text-indigo-500">Forge</span></h3>
            <p className="text-slate-300 mb-4">
              Forging the future with cutting-edge technology news, insights and analysis on emerging tech, innovation, and digital transformation.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-slate-300 hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-slate-300 hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-slate-300 hover:text-blue-400">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-slate-300 hover:text-blue-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Hardware
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Cloud Computing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-indigo-400 flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Productivity
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-slate-300 mb-4">Subscribe to our newsletter to receive the latest updates and news.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-indigo-500"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg flex items-center"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} />
              </button>
            </form>
            
            {/* Subscription success message */}
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 mt-2 text-sm"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 md:mb-0">
              <div className="flex items-center text-slate-300">
                <Mail size={16} className="mr-2" />
                <span>contact@futurforge.io</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin size={16} className="mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} FuturForge.io. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

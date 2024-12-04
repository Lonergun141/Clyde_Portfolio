'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-mono text-lg font-semibold text-brand-primary hover:text-brand-secondary transition-all duration-300 transform hover:scale-105"
        >
          cg/
        </Link>

        <button 
          className="sm:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-brand-primary transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-brand-primary my-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-brand-primary transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>

        {/* Mobile menu overlay */}
        <div className={`sm:hidden fixed inset-0 bg-white/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link 
              href="/projects"
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium text-brand-secondary hover:text-brand-primary transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium text-brand-secondary hover:text-brand-primary transition-colors"
            >
              About
            </Link>
            <a 
              href="https://github.com/Lonergun141"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 rounded-full
                       bg-brand-primary text-white font-medium
                       hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center space-x-8">
          <Link 
            href="/projects"
            className="relative font-medium text-brand-secondary/80 hover:text-brand-primary transition-colors group"
          >
            Projects
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link 
            href="/profile"
            className="relative font-medium text-brand-secondary/80 hover:text-brand-primary transition-colors group"
          >
            About
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <a 
            href="https://github.com/Lonergun141"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full
                     bg-brand-primary text-white font-medium
                     hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105
                     shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 
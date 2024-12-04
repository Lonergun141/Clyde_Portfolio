'use client'

import { useState } from "react";

interface FeaturedProject {
  title: string;
  category: string;
  url: string;
  year: string;
  description?: string;
  link?: string;
}

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-32 bg-background-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light text-brand-primary">
                Featured
                <span className="block font-medium">Projects</span>
              </h2>
              <p className="text-brand-secondary max-w-md">
                Showcase of selected works and collaborations
              </p>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handlePrevious}
                className="group p-4 rounded-full hover:bg-brand-primary/5 transition-all"
                aria-label="Previous project"
              >
                <svg className="w-6 h-6 text-brand-primary transition-transform group-hover:-translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="group p-4 rounded-full hover:bg-brand-primary/5 transition-all"
                aria-label="Next project"
              >
                <svg className="w-6 h-6 text-brand-primary transition-transform group-hover:translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Project Showcase */}
          <div className="relative overflow-hidden rounded-3xl bg-white">
            <div className="w-full">
              <div className="aspect-[16/9] relative bg-gray-50 overflow-hidden">
                <iframe 
                  src={projects[currentIndex].url}
                  className="w-full h-full border-0 transform scale-75 origin-top-left"
                  style={{ 
                    width: '133.33%', 
                    height: '133.33%',
                    pointerEvents: 'none' 
                  }}
                />
                <div className="absolute inset-0" style={{ pointerEvents: 'auto' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="max-w-2xl space-y-4">
                  <p className="text-sm tracking-wider uppercase text-white/80">
                    {projects[currentIndex].category}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-medium text-white">
                    {projects[currentIndex].title}
                  </h3>
                  {projects[currentIndex].description && (
                    <p className="text-white/90 text-lg">
                      {projects[currentIndex].description}
                    </p>
                  )}
                  <div className="flex items-center gap-6 pt-4">
                    <span className="text-white/60">{projects[currentIndex].year}</span>
                    {projects[currentIndex].link && (
                      <a 
                        href={projects[currentIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                      >
                        View Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
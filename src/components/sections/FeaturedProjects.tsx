'use client'

import { motion } from "framer-motion";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-32 bg-brand-primary text-background-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light">
                Featured
                <span className="block font-medium">Projects</span>
              </h2>
              <p className="text-background-accent max-w-md">
                Showcase of selected works and collaborations
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={prevProject}
                className="group p-4 rounded-full border border-background-accent hover:bg-background-light hover:text-brand-primary transition-all"
              >
                <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextProject}
                className="group p-4 rounded-full border border-background-accent hover:bg-background-light hover:text-brand-primary transition-all"
              >
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="w-full flex-shrink-0 relative group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="aspect-[16/9] relative bg-background-light rounded-lg overflow-hidden">
                    <iframe 
                      src={project.url}
                      className="w-full h-full border-0 transform scale-75 origin-top-left"
                      style={{ 
                        width: '133.33%', 
                        height: '133.33%',
                        pointerEvents: 'none' 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="max-w-2xl space-y-4">
                      <p className="text-background-accent text-sm tracking-wider uppercase">
                        {project.category}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-medium">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-background-light/80">
                          {project.description}
                        </p>
                      )}
                      <div className="flex items-center gap-6 pt-4">
                        <span className="text-background-accent">{project.year}</span>
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-background-light hover:text-background-accent transition-colors"
                          >
                            View Live Site
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
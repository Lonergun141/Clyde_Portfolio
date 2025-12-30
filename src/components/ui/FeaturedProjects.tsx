'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { FeaturedProjectsProps } from '@/lib/types/types';

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="bg-background py-32 relative z-10 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-7xl md:text-9xl font-light tracking-tighter text-foreground leading-[0.9]">
            Selected
            <br />
            <span className="text-muted-foreground ml-16 md:ml-32">Works</span>
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-x-12">
          {projects.map((project, index) => {
            // Asymmetric Grid Logic
            // Pattern: 4-step cycle
            // 0: Large Left (col-span-7)
            // 1: Small Right (col-span-5, pushed down)
            // 2: Small Left (col-span-5)
            // 3: Large Right (col-span-7, pushed down)
            const patternIndex = index % 4;

            let gridClass = '';
            if (patternIndex === 0) gridClass = 'md:col-span-7';
            else if (patternIndex === 1) gridClass = 'md:col-span-5 md:mt-32';
            else if (patternIndex === 2) gridClass = 'md:col-span-5'; // Vertical image often fits well here
            else if (patternIndex === 3) gridClass = 'md:col-span-7 md:mt-32 md:col-start-6';

            // Aspect Ratio logic based on size
            // Large cards get landscape, smaller cards get portrait/square-ish
            const aspectRatio = (patternIndex === 0 || patternIndex === 3) ? 'aspect-[16/10]' : 'aspect-[4/5]';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true, margin: '-10%' }}
                className={`${gridClass} group relative flex flex-col`}
              >
                {project.isConfidential ? (
                  // Confidential Project - No Link
                  <div className="block w-full cursor-not-allowed">
                    {/* Image Container */}
                    <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-md bg-muted mb-8`}>
                      <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-black/40 z-10" />

                        {/* Project Image or Fallback - Blurred */}
                        <div className="w-full h-full relative">
                          <Image
                            src={project.image || '/images/project-fallback.png'}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover blur-sm grayscale opacity-40"
                          />
                        </div>
                      </div>

                      {/* Confidential Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <div className="flex flex-col items-center gap-4">
                          {/* Lock Icon */}
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8 text-white/80"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>

                          {/* Confidential Badge */}
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full">
                            <span className="uppercase text-xs tracking-[0.2em] font-medium">Confidential</span>
                          </div>

                          {/* Under NDA Text */}
                          <p className="text-white/60 text-xs uppercase tracking-wider">Under NDA</p>
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex justify-between items-start border-t border-border/40 pt-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
                          <h3 className="text-3xl font-light text-foreground">
                            {project.title}
                          </h3>
                          <span className="px-2 py-1 text-[10px] uppercase tracking-wider bg-muted-foreground/10 text-muted-foreground rounded-md">
                            NDA
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-sm line-clamp-2 pl-7">
                          {project.description}
                        </p>
                      </div>

                      <div className="hidden md:flex flex-col items-end gap-2 text-xs uppercase tracking-widest text-muted-foreground/60">
                        <span>{project.year}</span>
                        <span>{project.category}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Project - With Link
                  <Link href={project.link || '#'} target="_blank" className="block w-full">
                    {/* Image Container */}
                    <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-md bg-muted mb-8`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full h-full relative"
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />

                        {/* Project Image or Fallback */}
                        <div className="w-full h-full relative">
                          <Image
                            src={project.image || '/images/project-fallback.png'}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
                          />
                        </div>
                      </motion.div>

                      {/* Floating View Button */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full uppercase text-xs tracking-[0.2em]">
                          View Project
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex justify-between items-start border-t border-border/40 pt-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
                          <h3 className="text-3xl font-light text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-sm line-clamp-2 pl-7">
                          {project.description}
                        </p>
                      </div>

                      <div className="hidden md:flex flex-col items-end gap-2 text-xs uppercase tracking-widest text-muted-foreground/60">
                        <span>{project.year}</span>
                        <span>{project.category}</span>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-48 flex justify-center">
          <Link href="/projects">
            <button className="group relative px-8 py-4 overflow-hidden rounded-full border border-foreground/20 hover:border-foreground transition-colors duration-300">
              <span className="relative z-10 text-sm uppercase tracking-[0.2em] group-hover:text-background transition-colors duration-300">
                All Projects
              </span>
              <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22,1,0.36,1]" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

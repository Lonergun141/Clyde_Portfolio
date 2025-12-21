'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { FeaturedProjectsProps } from '@/lib/types/types';

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="bg-background py-32 relative z-10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-foreground leading-[0.9]">
            Selected
            <br />
            <span className="text-muted-foreground/30 ml-12">Works</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-8 md:gap-x-16">
          {projects.map((project, index) => {
            // Create an asymmetric grid pattern
            const isLarge = index % 3 === 0;
            const isMedium = index % 3 === 1;
            const widthClass = isLarge
              ? 'md:col-span-8'
              : isMedium
                ? 'md:col-span-5 md:translate-y-24'
                : 'md:col-span-6 md:col-start-7';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-10%' }}
                className={`${widthClass} group relative`}>
                <Link href={project.link || '#'} target="_blank" className="block cursor-none">
                  <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-muted mb-6 rounded-sm">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                      className="w-full h-full relative">
                      <div className="absolute inset-0 bg-secondary/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      {project.url ? (
                        <iframe
                          src={project.url}
                          className="w-[150%] h-[150%] border-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                          tabIndex={-1}
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No Preview</div>
                      )}
                    </motion.div>

                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-t border-border pt-6">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light max-w-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.1em] text-muted-foreground/60">
                      <span>{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-32 text-center">
          <Link href="/projects">
            <button className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1">
              View All Projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { FeaturedProjectsProps } from "@/lib/types/types"

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1))
  }, [projects.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1))
  }, [projects.length])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(handleNext, 10000)
    return () => clearInterval(interval)
  }, [handleNext, isAutoPlaying])

  const currentProject = projects[currentIndex]

  return (
    <section className="relative min-h-screen bg-white pb-16 lg:pb-32">
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-2"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light">Selected Work</p>
            <div className="flex items-baseline justify-between">
              <h2 className="text-6xl lg:text-7xl font-extralight text-black leading-[0.9] tracking-[-0.02em]">
                Projects
              </h2>
              <div className="text-sm font-light text-gray-400 tabular-nums">
                {String(currentIndex + 1).padStart(2, "0")}—{String(projects.length).padStart(2, "0")}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
            >
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-light">
                    ({String(currentIndex + 1).padStart(2, "0")})
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-extralight text-black leading-tight tracking-[-0.01em]">
                    {currentProject.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-8 text-xs uppercase tracking-[0.1em] text-gray-500 font-light">
                    <span>{currentProject.category}</span>
                    <span>{currentProject.year}</span>
                  </div>

                  <p className="text-sm font-light text-gray-600 leading-relaxed max-w-sm">
                    {currentProject.description}
                  </p>
                </div>

                {currentProject.link && (
                  <motion.a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-black 
                             hover:text-gray-500 transition-colors duration-300 font-light group"
                  >
                    View Project
                    <svg
                      className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.a>
                )}
              </div>

              <div className="lg:col-span-8">
                <div className="relative aspect-[16/10] bg-gray-50 border border-gray-100">
                  <iframe
                    src={currentProject.url}
                    className="w-[200%] h-[200%] border-0 absolute 
                             top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                             scale-50 origin-center"
                    style={{
                      pointerEvents: "none",
                      transform: "translate(-50%, -50%) scale(0.5)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button
              onClick={() => {
                setIsAutoPlaying(false)
                handlePrev()
              }}
              className="text-black hover:text-gray-400 transition-colors duration-300 p-2 -m-2"
              aria-label="Previous project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className="group p-1"
                  aria-label={`Go to project ${index + 1}`}
                >
                  <div
                    className={`h-px transition-all duration-400 ${
                      index === currentIndex
                        ? "w-8 bg-black"
                        : "w-4 bg-gray-200 group-hover:bg-gray-400 group-hover:w-6"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsAutoPlaying(false)
                handleNext()
              }}
              className="text-black hover:text-gray-400 transition-colors duration-300 p-2 -m-2"
              aria-label="Next project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

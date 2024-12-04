'use client'

import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Lonergun141',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/clyde-gevero-5a593229a/',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
  ];

  const contactDetails = [
    { label: "Email", value: "clydegevero14@gmail.com" },
    { label: "Location", value: "Manolo Foritch, Bukidnon, Philippines" },
    { label: "Phone", value: "+63 929 579 8093" }
  ];

  const education = [
    {
      school: "University of Science and Technology of Southern Philippines",
      degree: "Bachelor of Science in Information Technology",
      year: "2020 - 2024"
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Grid Pattern */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-950 to-neutral-900 text-white">
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative px-8 py-16 md:py-20 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-light">
                  Let&apos;s create something
                  <span className="block font-medium">amazing together</span>
                </h2>
                <p className="text-neutral-400 max-w-md">
                  Open for collaborations and interesting projects.
                  Feel free to reach out!
                </p>
              </div>
              <motion.a
                href="mailto:clydegevero14@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* New Middle Section */}
        <div className="mt-16 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-neutral-900">Contact</h3>
              <div className="space-y-3">
                {contactDetails.map((detail) => (
                  <p key={detail.label} className="text-sm">
                    <span className="text-neutral-500">{detail.label}: </span>
                    <span className="text-neutral-800">{detail.value}</span>
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-neutral-900">Education</h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.school} className="space-y-1">
                    <p className="text-sm font-medium text-neutral-800">{edu.school}</p>
                    <p className="text-sm text-neutral-600">{edu.degree}</p>
                    <p className="text-sm text-neutral-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-neutral-900">Connect</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-16 px-8 pb-8 border-t border-neutral-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-sm">
              © {new Date().getFullYear()} Clyde Gevero
            </p>
            <p className="text-neutral-500 text-sm">
              Built with Next.js & TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 
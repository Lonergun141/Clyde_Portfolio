'use client'

import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Lonergun141',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/clyde-gevero-5a593229a/',
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
      className="py-20 bg-background-light text-brand-primary border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Contact Column */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-brand-secondary mb-4">Contact</p>
              <motion.a
                href={`mailto:${contactDetails[0].value}`}
                className="text-lg font-light hover:opacity-70 transition-opacity"
                whileHover={{ x: 10 }}
              >
                {contactDetails[0].value}
              </motion.a>
            </div>
            <div>
              <p className="text-sm text-brand-secondary mb-4">Based in</p>
              <p className="text-lg font-light">{contactDetails[1].value}</p>
            </div>
            <div>
              <p className="text-sm text-brand-secondary mb-4">Phone</p>
              <p className="text-lg font-light">{contactDetails[2].value}</p>
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-brand-secondary mb-4">Education</p>
              {education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-lg font-light">{edu.school}</p>
                  <p className="text-sm text-brand-secondary">{edu.degree}</p>
                  <p className="text-sm text-brand-secondary">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Column */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-brand-secondary mb-4">Social</p>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-light hover:opacity-70 transition-opacity"
                    whileHover={{ x: 10 }}
                  >
                    {link.name} →
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-24 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-secondary text-xs tracking-wide">
              © {new Date().getFullYear()} Clyde Gevero
            </p>
            <p className="text-brand-secondary text-xs tracking-wide">
              Built with Next.js & TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 
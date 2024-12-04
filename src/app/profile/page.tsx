'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';


const Profile = () => {
  const mainTechnologies = [
    'React', 'Next.js', 'TypeScript', 'TailwindCSS', 'React Native'
  ];

  const creativeTools = [
    'Adobe Lightroom', 'Adobe Premiere Pro', 'Canon Photography', 'UI/UX Design', 
    'Video Editing'
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <Image
          src="/IMG_6221.jpg"
          alt="Profile Image"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl sm:text-8xl font-light tracking-tight text-center"
          >
            THE
            <br />
            <span className="font-medium">DEVELOPER</span>
          </motion.h1>
        </div>
      </div>

      {/* About Section */}
      <section className="py-32 px-4 sm:px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-light leading-relaxed text-white/90 mb-24"
          >
            I&apos;m a versatile creator specializing in frontend development and digital media. 
            Combining my passion for code with videography and design, I create engaging 
            digital experiences across web, mobile, and video platforms.
          </motion.p>

          {/* Skills Section */}
          <div className="space-y-24">
            {/* Development Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-sm uppercase tracking-widest text-white/60">Development Stack</h2>
              <div className="flex flex-wrap gap-3">
                {mainTechnologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 border border-white/20 rounded-full 
                             text-sm text-white/80 hover:border-white/40 
                             transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Creative Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-sm uppercase tracking-widest text-white/60">Creative Tools</h2>
              <div className="flex flex-wrap gap-3">
                {creativeTools.map((tool) => (
                  <span 
                    key={tool} 
                    className="px-4 py-2 border border-white/20 rounded-full 
                             text-sm text-white/80 hover:border-white/40 
                             transition-colors duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-4 sm:px-6 bg-black border-t border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-3xl sm:text-4xl font-light leading-relaxed text-white/90">
            &ldquo;Creating digital experiences that merge technical precision with artistic vision&rdquo;
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Profile;

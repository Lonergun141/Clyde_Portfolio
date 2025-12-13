'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { mainTechnologies, creativeTools } from '@/lib/constants/constants';

const Profile = () => {
	return (
		<main className="min-h-screen bg-background text-foreground overflow-hidden relative pt-32 pb-24">

			{/* Header / Intro */}
			<section className="relative px-6 md:px-12 mb-32">
				<div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
						className="col-span-12 lg:col-span-7">
						<h1 className="text-[12vw] font-bold tracking-tighter leading-[0.8] mb-12 mix-blend-difference">
							CLYDE
							<br />
							<span className="text-muted-foreground/30 ml-[10vw]">GEVERO</span>
						</h1>

						<div className="flex flex-col gap-8 max-w-xl ml-auto mr-[5vw]">
							<p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
								&quot;Versatile creator specializing in frontend development and digital media.&quot;
							</p>
							<div className="w-full h-px bg-border" />
							<div className="flex justify-between text-xs tracking-[0.3em] uppercase text-muted-foreground/60">
								<span>Information Technology</span>
								<span>Cum Laude</span>
							</div>
						</div>
					</motion.div>


					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
						className="col-span-12 lg:col-span-5 relative">
						<div className="aspect-[3/4] relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
							<Image
								src="/fullscreen_grad.jpeg"
								alt="Profile Image"
								fill
								className="object-cover"
								priority
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Skills Section */}
			<section className="px-6 md:px-12 py-24 border-t border-border/30">
				<div className="max-w-[1920px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">

						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}>
							<h3 className="text-5xl md:text-7xl font-light tracking-tight mb-16 text-foreground/20">
								Development
							</h3>

							<div className="space-y-6">
								{mainTechnologies.map((tech, index) => (
									<motion.div
										key={tech}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: index * 0.05 }}
										viewport={{ once: true }}
										className="group cursor-default">
										<div className="flex items-center justify-between py-6 border-b border-border group-hover:border-foreground/40 transition-all duration-500">
											<span className="text-2xl md:text-3xl font-light tracking-tight group-hover:translate-x-4 transition-transform duration-300">
												{tech}
											</span>
											<div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300 opacity-0 group-hover:opacity-100" />
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>


						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}>
							<h3 className="text-5xl md:text-7xl font-light tracking-tight mb-16 text-foreground/20">
								Creative
							</h3>

							<div className="space-y-6">
								{creativeTools.map((tool, index) => (
									<motion.div
										key={tool}
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: index * 0.05 }}
										viewport={{ once: true }}
										className="group cursor-default">
										<div className="flex items-center justify-between py-6 border-b border-border group-hover:border-foreground/40 transition-all duration-500">
											<span className="text-2xl md:text-3xl font-light tracking-tight group-hover:translate-x-4 transition-transform duration-300">
												{tool}
											</span>
											<div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300 opacity-0 group-hover:opacity-100" />
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Profile;

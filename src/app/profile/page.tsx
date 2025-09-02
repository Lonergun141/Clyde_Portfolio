'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { mainTechnologies, creativeTools } from '@/lib/constants/constants';

const Profile = () => {
	return (
		<main className="min-h-screen bg-black text-white overflow-hidden relative">
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-0 left-0 w-full h-px bg-white transform rotate-12 origin-left"></div>
				<div className="absolute top-20 left-0 w-full h-px bg-white transform -rotate-6 origin-left"></div>
				<div className="absolute top-40 left-0 w-full h-px bg-white transform rotate-3 origin-left"></div>
				<div className="absolute bottom-40 left-0 w-full h-px bg-white transform -rotate-12 origin-left"></div>
				<div className="absolute bottom-20 left-0 w-full h-px bg-white transform rotate-6 origin-left"></div>
			</div>

			<section className="relative min-h-screen flex items-center">
				{/* Main Content Grid */}
				<div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8 items-center">
					{/* Large Typography */}
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, ease: 'easeOut' }}
						className="col-span-12 lg:col-span-6 lg:col-start-1">
						<h1 className="text-[clamp(4rem,12vw,12rem)] font-black tracking-[-0.08em] leading-[0.75] mb-8">
							CLYDE
							<br />
							<span className="font-thin opacity-60">GEVERO</span>
						</h1>

						<div className="w-32 h-px bg-white mb-8"></div>

						<p className="text-sm font-light tracking-[0.4em] uppercase leading-loose opacity-80 max-w-xs">
							INFORMATION TECHNOLOGY
							<br />
							<span className="opacity-60">CUM LAUDE</span>
						</p>
					</motion.div>

					{/* Image Section */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.5, delay: 0.3 }}
						className="col-span-12 lg:col-span-5 lg:col-start-8 relative">
						<div className="aspect-[3/4] relative overflow-hidden">
							<Image
								src="/fullscreen_grad.jpeg"
								alt="Profile Image"
								fill
								className="object-cover transition-all duration-700"
								priority
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<div className="absolute inset-0 bg-black/20"></div>
						</div>

						{/* Image Caption */}
						<div className="absolute -bottom-8 -right-8 bg-white text-black px-6 py-3 text-xs tracking-[0.3em] uppercase font-medium">
							DEVELOPER & CREATOR
						</div>
					</motion.div>
				</div>

				{/* Vertical Text */}
				<div className="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-90 origin-center">
					<p className="text-xs tracking-[0.6em] uppercase font-light opacity-60">PORTFOLIO</p>
				</div>

				{/* Bottom Quote */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.8 }}
					className="absolute bottom-16 left-8 max-w-md">
					<p className="text-lg font-light leading-relaxed opacity-80">
						&quot;Versatile creator specializing in frontend development and digital
						media&quot;
					</p>
				</motion.div>
			</section>

			<section className="py-32 px-8 relative">
				<div className="max-w-7xl mx-auto">
					{/* Section Number */}
					<div className="absolute top-8 right-8 text-xs tracking-[0.4em] uppercase opacity-40">
						01 / SKILLS
					</div>

					<div className="grid grid-cols-12 gap-16 items-start">
						{/* Development Skills */}
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="col-span-12 lg:col-span-5">
							<h3 className="text-2xl font-light tracking-[0.1em] uppercase mb-16 opacity-60">
								Development Stack
							</h3>

							<div className="space-y-8">
								{mainTechnologies.map((tech, index) => (
									<motion.div
										key={tech}
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										viewport={{ once: true }}
										className="group cursor-pointer">
										<div className="flex items-center justify-between py-4 border-b border-white/10 group-hover:border-white/30 transition-all duration-500">
											<span className="text-xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300">
												{tech}
											</span>
											<div className="w-2 h-2 border border-white/40 group-hover:bg-white transition-all duration-300"></div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Creative Tools */}
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
							className="col-span-12 lg:col-span-5 lg:col-start-8">
							<h3 className="text-2xl font-light tracking-[0.1em] uppercase mb-16 opacity-60">
								Creative Tools
							</h3>

							<div className="space-y-8">
								{creativeTools.map((tool, index) => (
									<motion.div
										key={tool}
										initial={{ opacity: 0, x: 30 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										viewport={{ once: true }}
										className="group cursor-pointer">
										<div className="flex items-center justify-between py-4 border-b border-white/10 group-hover:border-white/30 transition-all duration-500">
											<span className="text-xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300">
												{tool}
											</span>
											<div className="w-2 h-2 border border-white/40 group-hover:bg-white transition-all duration-300"></div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<section className="py-32 px-8 relative border-t border-white/10">
				<div className="max-w-7xl mx-auto">
					{/* Bottom Info */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1, delay: 0.6 }}
						viewport={{ once: true }}
						className="mt-32 flex justify-between items-end text-xs tracking-[0.3em] uppercase opacity-40">
						<div>AVAILABLE FOR PROJECTS</div>
						<div>2025</div>
					</motion.div>
				</div>
			</section>
		</main>
	);
};

export default Profile;

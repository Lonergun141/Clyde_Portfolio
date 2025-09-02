'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { mainTechnologies, creativeTools } from '@/lib/constants/constants';

const Profile = () => {


	return (
		<main className="min-h-screen bg-white text-black">
			{/* Hero Section */}
			<div className="relative h-screen bg-black">
				<Image
					src="/fullscreen_grad.jpeg"
					alt="Profile Image"
					fill
					className="object-contain"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

				<div className="absolute inset-0 flex flex-col justify-end pb-32 px-8">
					<div className="max-w-6xl mx-auto w-full">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.5 }}
							className="space-y-6">
						
							<h1 className="text-[clamp(2rem,8vw,4.5rem)] font-extralight tracking-[-0.02em] leading-[0.9] text-white">
								CLYDE
								<br />
								<span className="font-light">GEVERO</span>
							</h1>
								<p className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-light">
								Bachelor of Science in Information Technology{' '}
								<p className="text-[10px] tracking-[0.4em] uppercase text-amber-600 font-light">
									Cum Laude Top 20
								</p>
							</p>

						</motion.div>
					</div>
				</div>
			</div>

			{/* About Section */}
			<section className="py-32 px-8 bg-black text-white">
				<div className="max-w-3xl mx-auto">
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
						className="text-base font-extralight leading-relaxed text-white/70 tracking-wide mb-32">
						I&apos;m a versatile creator specializing in frontend development and digital
						media. Combining my skills for code with videography and design, I create engaging
						digital experiences across web, mobile, and video platforms.
					</motion.p>

					{/* Skills Section */}
					<div className="space-y-32">
						{/* Development Stack */}
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="space-y-8">
							<h2 className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-light">
								Development Stack
							</h2>
							<div className="flex flex-wrap gap-4">
								{mainTechnologies.map((tech) => (
									<span
										key={tech}
										className="text-[10px] tracking-[0.2em] uppercase font-extralight text-white/60">
										{tech}
									</span>
								))}
							</div>
						</motion.div>

						{/* Creative Tools */}
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="space-y-8">
							<h2 className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-light">
								Creative Tools
							</h2>
							<div className="flex flex-wrap gap-4">
								{creativeTools.map((tool) => (
									<span
										key={tool}
										className="text-[10px] tracking-[0.2em] uppercase font-extralight text-white/60">
										{tool}
									</span>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Quote Section */}
			<section className="py-32 px-8 bg-white border-t border-white/5">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="max-w-2xl mx-auto text-center">
					<p className="text-xl font-extralight leading-relaxed tracking-wide text-black/80">
						&ldquo;Creating digital experiences that merge technical precision with artistic
						vision&rdquo;
					</p>
				</motion.div>
			</section>
		</main>
	);
};

export default Profile;

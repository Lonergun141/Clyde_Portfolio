import { motion } from 'framer-motion';
import Image from 'next/image';

const PhilosophySection: React.FC = () => {
	return (
		<section className="relative bg-background">
			<div className="py-24 md:py-32 max-w-6xl mx-auto px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="space-y-8">
						<div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-black/40 text-xs font-light tracking-[0.3em] uppercase mb-6">
								Philosophy
							</motion.p>
							<motion.h2
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.3 }}
								className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-tight">
								Crafting Digital
								<br />
								<span className="text-black">Experiences</span>
							</motion.h2>
						</div>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="text-lg md:text-xl text-black/70 leading-relaxed font-light">
							As a results-driven IT professional with a B.S. in Information Technology (Cum
							Laude), I specialize in creating user-focused web and mobile applications. I
							believe in the power of purposeful design—where every interaction streamlines
							processes, enhances user experience, and solves real-world problems through
							innovative digital solutions.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.7 }}
							className="space-y-6 pt-6">
							{[
								{ number: '05', label: 'Academic Years Journey' },
								{ number: '03+', label: 'Freelance Years Journey' },
								{ number: 'CUM LAUDE', label: 'Academic Honor' },
							].map((stat, index) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
									className="flex items-baseline gap-6">
									<span className="text-2xl md:text-3xl font-light text-black">
										{stat.number}
									</span>
									<span className="text-sm text-black/50 tracking-wide uppercase">
										{stat.label}
									</span>
								</motion.div>
							))}
						</motion.div>
					</motion.div>

			
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="relative">
						<motion.div
							className="relative aspect-[4/5] overflow-hidden rounded-lg"
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
							<Image
								src="/fullscreen_grad.jpeg"
								alt="Professional portrait"
								fill
								className="object-cover object-center"
								priority
								quality={100}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>

							<motion.div
								className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10"
								animate={{
									opacity: [0.1, 0.3, 0.1],
								}}
								transition={{
									duration: 4,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
							/>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default PhilosophySection;

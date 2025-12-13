import { motion } from 'framer-motion';
import Image from 'next/image';

const PhilosophySection: React.FC = () => {
	return (
		<section className="relative bg-background pt-32 pb-48 overflow-hidden">
			<div className="max-w-[1920px] mx-auto px-6 md:px-12">
				{/* Massive Typography Header */}
				<div className="mb-32 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
						viewport={{ once: true }}
						className="flex flex-col">
						<h2 className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-foreground mix-blend-difference">
							DIGITAL
						</h2>
						<div className="flex items-center gap-8 md:gap-16">
							<motion.div
								initial={{ width: 0 }}
								whileInView={{ width: 'auto' }}
								transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
								className="h-[8vw] aspect-video relative overflow-hidden rounded-full hidden md:block">
								<Image
									src="/fullscreen_grad.jpeg"
									alt="Philosophy"
									fill
									className="object-cover"
								/>
							</motion.div>
							<h2 className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-muted-foreground/30">
								CRAFT
							</h2>
						</div>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-7xl mx-auto items-end">
					<div className="relative">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="aspect-[4/5] relative overflow-hidden rounded-sm">
							<Image
								src="/fullscreen_grad.jpeg"
								alt="Professional portrait"
								fill
								className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</motion.div>
					</div>

					<div className="space-y-12">
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-foreground">
							An analytical <span className="text-muted-foreground">Information Technology</span> graduate focused on creating intuitive, human-centric digital interfaces.
						</motion.p>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
							className="text-muted-foreground font-light text-lg leading-relaxed space-y-8">
							<p>
								I blend technical expertise in front-end development with a deep appreciation for UI/UX principles. My goal is to solve complex problems through clean automation and accessible design.
							</p>
						</motion.div>

						<div className="pt-8 border-t border-border">
							<div className="grid grid-cols-3 gap-8">
								{[
									{ value: '05', label: 'Academic Years' },
									{ value: '03+', label: 'Freelance' },
									{ value: '100%', label: 'Commitment' },
								].map((stat, i) => (
									<div key={i}>
										<div className="text-3xl font-light text-foreground mb-2">{stat.value}</div>
										<div className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PhilosophySection;

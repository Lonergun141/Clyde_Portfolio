'use client';

import { motion } from 'framer-motion';
import { socialLinks, contactDetails, education } from '@/lib/constants/constants';

export default function Footer() {
	return (
		<motion.footer
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
			className="relative overflow-hidden bg-foreground text-background">
			<div className="relative py-32 px-6">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 1, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-center mb-20">
						<h2 className=" text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none tracking-tight mb-8">
							Let&apos;s
						</h2>
						<h2 className=" text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none tracking-tight text-primary">
							Connect
						</h2>
					</motion.div>

					{/* Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
						<motion.div
							initial={{ x: -50, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
							className="lg:col-span-5 space-y-12">
							<div className="space-y-8">
								<div>
									<p className="text-sm uppercase tracking-[0.2em] text-primary-foreground mb-6">
										Get in Touch
									</p>
									<motion.a
										href={`mailto:${contactDetails[0].value}`}
										className="text-3xl md:text-4xl font-light hover:text-primary transition-colors duration-300 block"
										whileHover={{ x: 20 }}>
										{contactDetails[0].value}
									</motion.a>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div>
										<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
											Location
										</p>
										<p className="text-xl font-light">{contactDetails[1].value}</p>
									</div>
									{/* <div>
										<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
											Phone
										</p>
										<p className="text-xl font-light">{contactDetails[2].value}</p>
									</div> */}
								</div>
							</div>
						</motion.div>

						<div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-16">
							{/* Social Links */}
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								viewport={{ once: true }}
								className="space-y-8">
								<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
									Follow
								</p>

								<div className="space-y-6">
									{socialLinks.map((link, index) => (
										<motion.a
											key={link.name}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex items-center justify-between text-xl font-light hover:text-primary transition-colors duration-300"
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
											viewport={{ once: true }}
											whileHover={{ x: 10 }}>
											<span>{link.name}</span>
											<motion.span
												className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												whileHover={{ x: 5 }}>
												→
											</motion.span>
										</motion.a>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 1.2 }}
				viewport={{ once: true }}
				className="border-t border-border/20 py-8">
				<div className="max-w-7xl mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="flex items-center gap-8">
							<p className="text-sm font-mono tracking-wide">
								© {new Date().getFullYear()} Clyde Gevero
							</p>
							<p className="text-sm text-muted-foreground font-mono">
								Built with Next.js & TailwindCSS
							</p>
						</div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="text-sm font-mono tracking-wide text-primary">
							Available for new projects
						</motion.div>
					</div>
				</div>
			</motion.div>
		</motion.footer>
	);
}

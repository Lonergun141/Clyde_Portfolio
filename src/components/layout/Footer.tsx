'use client';

import { motion } from 'framer-motion';
import { socialLinks, contactDetails } from '@/lib/constants/constants';

export default function Footer() {
	return (
		<motion.footer
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
			className="relative overflow-hidden bg-background text-foreground border-t border-border/10 pb-12 pt-32">
			<div className="relative px-6 md:px-12">
				<div className="max-w-[1920px] mx-auto">
					<motion.div
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
						viewport={{ once: true }}
						className="mb-32">
						<h2 className="text-[14vw] font-bold leading-[0.8] tracking-tighter mix-blend-difference">
							LET&apos;S
						</h2>
						<h2 className="text-[14vw] font-bold leading-[0.8] tracking-tighter text-muted-foreground/30 pl-[10vw]">
							CONNECT
						</h2>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-end">
						<motion.div
							initial={{ x: -20, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="lg:col-span-5 space-y-12">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
									Email Me
								</p>
								<motion.a
									href={`mailto:${contactDetails[0].value}`}
									className="text-2xl md:text-3xl font-light hover:text-primary transition-colors duration-300 block border-b border-transparent hover:border-foreground inline-block pb-1"
									whileHover={{ x: 10 }}>
									{contactDetails[0].value}
								</motion.a>
							</div>

							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
									Based In
								</p>
								<p className="text-xl font-light">{contactDetails[1].value}</p>
							</div>
						</motion.div>

						<div className="lg:col-span-7">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.8, delay: 0.4 }}
									viewport={{ once: true }}
									className="space-y-8">
									<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
										Socials
									</p>

									<div className="space-y-4">
										{socialLinks.map((link, index) => (
											<motion.a
												key={link.name}
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="group flex items-center gap-4 text-xl font-light hover:text-primary transition-colors duration-300"
												initial={{ opacity: 0, x: 20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
												viewport={{ once: true }}>
												<span className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300" />
												<span>{link.name}</span>
											</motion.a>
										))}
									</div>
								</motion.div>
							</div>
						</div>
					</div>

					<div className="mt-32 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
						<p>© {new Date().getFullYear()} Clyde Gevero</p>
						<p>Code by Clyde</p>
					</div>
				</div>
			</div>
		</motion.footer>
	);
}
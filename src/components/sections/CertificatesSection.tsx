'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { certificates } from '@/lib/constants/constants';

export default function CertificatesSection() {
	return (
		<section className="bg-white py-24 md:py-32 relative overflow-hidden">
			<div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
		
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mb-12 md:mb-16">
					<div className="flex items-center gap-4 mb-6">
						<div className="w-8 h-px bg-neutral-300" />
						<p className="text-neutral-500 text-xs font-light tracking-[0.3em] uppercase">
							Credentials
						</p>
					</div>
					<h2 className="text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
						Certificates & Learning
					</h2>
				</motion.div>

				<div className="relative">
		
					<div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
					<div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />


					<div className="overflow-hidden py-8">
						<motion.div
							animate={{
								x: [0, -1920],
							}}
							transition={{
								x: {
									repeat: Infinity,
									repeatType: 'loop',
									duration: 40,
									ease: 'linear',
								},
							}}
							className="flex gap-6">
							{[...certificates, ...certificates, ...certificates].map((cert, index) => (
								<motion.a
									key={index}
									href={cert.link}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.02 }}
									className="group flex-shrink-0 w-[380px] bg-neutral-50 border border-neutral-200 p-6 hover:border-neutral-900 hover:bg-white transition-all duration-300">
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 w-16 h-16 bg-white border border-neutral-200 rounded-lg flex items-center justify-center p-3 group-hover:border-neutral-900 transition-colors duration-300">
											<img
												src={cert.logo}
												alt={cert.issuer}
												className="w-full h-full object-contain"
											/>
										</div>

										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between gap-2 mb-2">
												<h3 className="text-base font-light text-neutral-900 leading-tight line-clamp-2">
													{cert.title}
												</h3>
												<ExternalLink className="flex-shrink-0 w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300" />
											</div>

											<div className="space-y-1">
												<p className="text-sm text-neutral-600 font-light">
													{cert.issuer}
												</p>
												<div className="flex items-center gap-2 text-xs text-neutral-400">
													<span>{cert.platform}</span>
													<span className="w-1 h-1 rounded-full bg-neutral-300" />
													<span>{cert.date}</span>
												</div>
											</div>
										</div>
									</div>

									
									<div className="mt-4 pt-4 border-t border-neutral-200">
										<span className="text-[10px] tracking-wider text-neutral-400 group-hover:text-neutral-900 transition-colors uppercase">
											View Credential →
										</span>
									</div>
								</motion.a>
							))}
						</motion.div>
					</div>
				</div>

			
				
			</div>
		</section>
	);
}

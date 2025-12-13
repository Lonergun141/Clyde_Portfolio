'use client';
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { certificates } from '@/lib/constants/constants';

export default function CertificatesSection() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visibleItems, setVisibleItems] = useState(1);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setVisibleItems(3);
			} else if (window.innerWidth >= 768) {
				setVisibleItems(2);
			} else {
				setVisibleItems(1);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % certificates.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
	};

	const getVisibleCertificates = () => {
		const items = [];
		for (let i = 0; i < visibleItems; i++) {
			const index = (currentIndex + i) % certificates.length;
			items.push(certificates[index]);
		}
		return items;
	};

	return (
		<section className="bg-background py-24 md:py-32 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
					<div>
						<div className="flex items-center gap-4 mb-6">
							<div className="w-8 h-px bg-foreground/20" />
							<p className="text-muted-foreground text-xs font-light tracking-[0.3em] uppercase">
								Credentials
							</p>
						</div>
						<h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
							Certificates & Learning
						</h2>
					</div>

					<div className="flex items-center gap-4">
						<button
							onClick={prevSlide}
							className="p-3 border border-border hover:border-foreground rounded-full transition-colors duration-300 text-muted-foreground hover:text-foreground group"
							aria-label="Previous certificate">
							<ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
						</button>
						<button
							onClick={nextSlide}
							className="p-3 border border-border hover:border-foreground rounded-full transition-colors duration-300 text-muted-foreground hover:text-foreground group"
							aria-label="Next certificate">
							<ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
						</button>
					</div>
				</motion.div>

				<div className="relative overflow-hidden min-h-[250px]">
					<div className="flex gap-6 md:gap-8">
						<AnimatePresence mode="popLayout">
							{getVisibleCertificates().map((cert, idx) => (
								<motion.a
									key={`${currentIndex}-${idx}`}
									href={cert.link}
									target="_blank"
									rel="noopener noreferrer"
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -50 }}
									transition={{ duration: 0.5, ease: 'easeOut' }}
									className="flex-1 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group bg-card border border-border p-6 md:p-8 hover:border-foreground/20 transition-all duration-300 flex flex-col justify-between h-[280px]">
									<div>
										<div className="flex items-start justify-between gap-4 mb-6">
											<div className="w-12 h-12 md:w-14 md:h-14 bg-muted border border-border rounded-lg flex items-center justify-center p-2 group-hover:border-foreground/20 transition-colors">
												<img
													src={cert.logo}
													alt={cert.issuer}
													className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
												/>
											</div>
											<ExternalLink
												size={16}
												className="text-muted-foreground/50 group-hover:text-foreground transition-colors"
											/>
										</div>

										<h3 className="text-lg font-light text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors h-[3.5rem]">
											{cert.title}
										</h3>
										<p className="text-sm text-muted-foreground font-light mb-4 truncate">
											{cert.issuer}
										</p>
									</div>

									<div className="pt-4 border-t border-border/50 flex items-center gap-3 text-xs text-muted-foreground/60">
										<span>{cert.date}</span>
										<span className="w-1 h-1 rounded-full bg-border" />
										<span>{cert.platform}</span>
									</div>
								</motion.a>
							))}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}

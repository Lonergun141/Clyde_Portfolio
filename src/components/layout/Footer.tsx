'use client';

import { motion } from 'framer-motion';
import { socialLinks, contactDetails } from '@/lib/constants/constants';
import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="relative bg-background text-foreground pt-24 pb-0 overflow-hidden">
			<div className="px-6 md:px-12 max-w-[1920px] mx-auto mb-32">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

					{/* Column 1: Brand / Info */}
					<div className="md:col-span-4 space-y-8">
						<div>
							<div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-xl mb-6">
								C
							</div>
							<h3 className="text-sm font-medium uppercase tracking-widest mb-1 text-muted-foreground">
								Unique Digital Experiences
							</h3>
							<h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                                // Immersive Web Design
							</h3>
						</div>

						<div className="space-y-4 pt-8">
							<p className="text-muted-foreground">
								{contactDetails[1].value}
							</p>
							<a href={`mailto:${contactDetails[0].value}`} className="block text-xl hover:text-muted-foreground transition-colors">
								{contactDetails[0].value}
							</a>
							<div className="flex gap-4 pt-2">
								{socialLinks.map((link) => (
									<a
										key={link.name}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-2xl hover:text-muted-foreground transition-colors"
									>
										{link.name === 'GitHub' && <Github className="w-5 h-5" />}
										{link.name === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
										{link.name !== 'GitHub' && link.name !== 'LinkedIn' && <ArrowUpRight className="w-5 h-5" />}
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Column 2: Navigation */}
					<div className="md:col-span-4 flex flex-col gap-4 border-l border-border/20 md:pl-12">
						{[
							{ name: 'HOME', href: '/' },
							{ name: 'PROJECTS', href: '/projects' },
							{ name: 'ABOUT', href: '#' }, // Assuming these exist or placeholders
							{ name: 'CONTACT', href: '#' }
						].map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="group flex items-center justify-between border-b border-border/10 py-4 text-sm font-medium tracking-widest hover:pl-4 transition-all duration-300"
							>
								{item.name}
								<ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
							</Link>
						))}
					</div>

					{/* Column 3: CTA */}
					<div className="md:col-span-4 md:pl-12 border-l border-border/20">
						<h2 className="text-3xl md:text-4xl font-light leading-tight mb-8">
							Ready to start a project?
						</h2>
						<p className="text-muted-foreground mb-8 text-sm leading-relaxed">
							Share your ideas with me, and let's begin turning your vision into reality today.
						</p>
						<a
							href={`mailto:${contactDetails[0].value}`}
							className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border border-foreground/20 px-6 py-3 rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
						>
							Get In Touch <ArrowUpRight className="w-4 h-4" />
						</a>
					</div>
				</div>
			</div>

			{/* Massive Bottom Text */}
			<div className="w-full overflow-hidden leading-none select-none">
				<motion.h1
					initial={{ y: 100 }}
					whileInView={{ y: 0 }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: true }}
					className="text-[18vw] font-bold tracking-tighter text-center whitespace-nowrap text-foreground mix-blend-difference"
				>
					CLYDE GEVERO
				</motion.h1>
			</div>

			<div className="border-t border-border/10">
				<div className="px-6 md:px-12 py-4 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground/40">
					<p>© 2025 Clyde Gevero</p>
					<p>Portfolio v2.0</p>
				</div>
			</div>
		</footer>
	);
}
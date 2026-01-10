import Image from 'next/image';
import Link from 'next/link';
import { Github, Globe, Lock, ArrowUpRight } from 'lucide-react';
import { ProjectCardProps } from '@/lib/types/types';
import { useState } from 'react';

const ProjectCard = ({ title, description, tags, categories = [], image, year, links, isNDA = false }: ProjectCardProps) => {

	const primaryLink = links.live || links.github || links.figma || links.other || '#';
	const hasLivePreview = links.live && !isNDA;
	const [iframeError, setIframeError] = useState(false);

	return (
		<div className="group relative w-full h-full bg-card border border-border overflow-hidden hover:border-accent/50 transition-colors duration-300 flex flex-col">

			{/* Header: ID & Meta */}
			<div className="flex items-center justify-between p-4 border-b border-border bg-secondary/10">
				<div className="flex items-center gap-2">
					<span className="w-1.5 h-1.5 bg-foreground/20 group-hover:bg-accent transition-colors duration-300" />
					<span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{categories?.[0] || 'System'}</span>
				</div>
				<div className="flex items-center gap-2">
					{hasLivePreview && !iframeError && (
						<span className="text-[8px] font-mono uppercase tracking-widest text-accent bg-accent/10 px-1.5 py-0.5">Live</span>
					)}
					<span className="text-[10px] font-mono text-muted-foreground/50">{year}</span>
				</div>
			</div>

			{/* Visual: Iframe Preview or Image */}
			<div className="relative w-full h-48 overflow-hidden bg-muted border-b border-border">
				{hasLivePreview && !iframeError ? (
					<div className="relative w-full h-full">
						<iframe
							src={links.live}
							title={title}
							className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
							loading="lazy"
							onError={() => setIframeError(true)}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
				) : image ? (
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover object-center grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center bg-muted/20">
						<span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">No Visual Signal</span>
					</div>
				)}

				{/* NDA Overlay */}
				{isNDA && (
					<div className="absolute inset-0 bg-background/80 backdrop-blur-[1px] flex items-center justify-center z-10 border-l border-r border-background">
						<div className="flex items-center gap-2 px-3 py-1 border border-primary/20 bg-background">
							<Lock size={12} className="text-primary" />
							<span className="text-[10px] font-mono uppercase tracking-widest text-primary">Classified</span>
						</div>
					</div>
				)}
			</div>

			{/* Content Body */}
			<div className="flex flex-col flex-grow p-6">
				<div className="flex justify-between items-start mb-4">
					<h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors duration-300 max-w-[80%]">
						{title}
					</h3>
					<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0">
						{links.github && <Link href={links.github} target="_blank"><Github size={14} className="hover:text-accent" /></Link>}
						{links.live && <Link href={links.live} target="_blank"><Globe size={14} className="hover:text-accent" /></Link>}
					</div>
				</div>

				<p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6 font-mono">
					{description}
				</p>

				<div className="mt-auto pt-4 border-t border-dashed border-border flex flex-wrap gap-2">
					{tags.slice(0, 4).map((tag, i) => (
						<span key={i} className="text-[10px] uppercase tracking-wider text-muted-foreground/70 bg-secondary/30 px-1.5 py-0.5">
							{tag}
						</span>
					))}
				</div>
			</div>

			{/* Action Footer */}
			<Link href={primaryLink} target="_blank" className="block p-3 border-t border-border bg-background group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 text-center">
				<div className="flex items-center justify-center gap-2">
					<span className="text-[10px] font-bold uppercase tracking-[0.2em]">{isNDA ? 'Restricted Access' : 'View System'}</span>
					{!isNDA && <ArrowUpRight size={12} />}
				</div>
			</Link>
		</div>
	);
};

export default ProjectCard;

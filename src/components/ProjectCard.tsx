import Image from 'next/image';
import Link from 'next/link';
import { Github, Figma, ExternalLink, Globe, Lock } from 'lucide-react';
import { ProjectCardProps } from '@/lib/types/types';
import { Button } from '@/components/ui/button';

const PlaceholderSVG = () => (
	<svg className="w-full h-full bg-muted" viewBox="0 0 16 9" preserveAspectRatio="none">
		<rect width="100%" height="100%" fill="currentColor" />
		<text
			x="50%"
			y="50%"
			dominantBaseline="middle"
			textAnchor="middle"
			className="fill-muted-foreground/30 text-[0.8px] uppercase tracking-wider">
			No Image Available
		</text>
	</svg>
);

const ProjectCard = ({ title, description, tags, image, year, links, variant = 'default', isNDA = false }: ProjectCardProps) => {

	if (variant === 'minimal') {
		const primaryLink = links.live || links.github || links.figma || links.other || '#';

		return (
			<Link href={primaryLink} target="_blank" className="block h-full group outline-none">
				<div className="flex flex-col h-full space-y-4">
					{/* Image Section - Minimal */}
					<div className={`relative aspect-[16/10] overflow-hidden bg-muted/20 ${isNDA ? 'border border-primary/50 rounded-xl' : ''}`}>
						{image ? (
							<>
								<div className={`absolute inset-0 z-10 transition-colors duration-500
									${isNDA ? 'bg-background/20 backdrop-blur-[2px]' : 'bg-black/0 group-hover:bg-black/20'}`} />

								{/* NDA Overlay */}
								{isNDA && (
									<div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center">
										<div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center mb-3 shadow-lg border border-primary/20">
											<Lock size={20} className="text-primary" />
										</div>
										<span className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 shadow-sm">
											Confidential
										</span>
									</div>
								)}

								<Image
									src={image}
									alt={title}
									fill
									className={`object-cover transition-all duration-700 ease-[0.22,1,0.36,1]
                         				${isNDA ? 'scale-105 blur-[3px] grayscale opacity-60' : 'group-hover:scale-105 group-hover:opacity-90 grayscale group-hover:grayscale-0'}`}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</>
						) : (
							<PlaceholderSVG />
						)}
					</div>

					{/* Minimal Info */}
					<div className="flex flex-col gap-3 mt-3">
						<div className="flex items-start justify-between">
							<div className="flex flex-col gap-1">
								<h3 className="text-lg font-light tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
									{title}
								</h3>
								<div className="flex flex-wrap gap-2 text-xs text-muted-foreground uppercase tracking-wider">
									{tags.slice(0, 3).map((tag, i) => (
										<span key={i}>
											{tag}{i < Math.min(tags.length, 3) - 1 ? ' • ' : ''}
										</span>
									))}
								</div>
							</div>
							<span className="text-xs font-mono text-muted-foreground pt-1">{year}</span>
						</div>

						{/* Links - Minimal */}
						<div className="flex items-center gap-3 pt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
							{links.live && (
								<div className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors">
									<Globe size={12} />
									<span>Live</span>
								</div>
							)}
							{links.github && (
								<div className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
									<Github size={12} />
									<span>Code</span>
								</div>
							)}
							{links.figma && (
								<div className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
									<Figma size={12} />
									<span>Design</span>
								</div>
							)}
							{links.other && !links.live && (
								<div className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors">
									<ExternalLink size={12} />
									<span>View</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		);
	}

	return (
		<div className="flex flex-col h-full group bg-card/40 border border-border/50 rounded-xl overflow-hidden hover:border-border transition-colors duration-300">
			{/* Image Section */}
			<div className="aspect-[16/9] overflow-hidden relative bg-muted">
				{image ? (
					<>
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-all duration-700 ease-out
                         group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
						/>
						<div className="absolute inset-0 bg-background/10 transition-opacity duration-300" />
					</>
				) : (
					<PlaceholderSVG />
				)}
			</div>

			{/* Content Section */}
			<div className="flex flex-col flex-grow p-6 space-y-4">
				<div className="flex items-center justify-between text-muted-foreground/60 text-xs tracking-wider uppercase font-medium">
					<span>{year}</span>
					{/* Add more meta info if needed */}
				</div>

				<div className="space-y-2">
					<h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
					<p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
						{description}
					</p>
				</div>

				{/* Tags */}
				<div className="flex flex-wrap gap-2 pt-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
							{tag}
						</span>
					))}
				</div>

				{/* Spacer to push actions to bottom */}
				<div className="flex-grow" />

				{/* Actions */}
				<div className="pt-4 flex items-center gap-3 border-t border-border/50 mt-4">
					{links.live && (
						<Button asChild size="sm" className="gap-2">
							<Link href={links.live} target="_blank" rel="noopener noreferrer">
								<Globe size={14} />
								Live Demo
							</Link>
						</Button>
					)}
					{links.other && !links.live && (
						<Button asChild size="sm" variant="secondary" className="gap-2">
							<Link href={links.other} target="_blank" rel="noopener noreferrer">
								<ExternalLink size={14} />
								View
							</Link>
						</Button>
					)}

					<div className="flex items-center gap-2 ml-auto">
						{links.github && (
							<Button asChild size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
								<Link href={links.github} target="_blank" rel="noopener noreferrer">
									<Github size={16} />
									<span className="sr-only">GitHub</span>
								</Link>
							</Button>
						)}
						{links.figma && (
							<Button asChild size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
								<Link href={links.figma} target="_blank" rel="noopener noreferrer">
									<Figma size={16} />
									<span className="sr-only">Figma</span>
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;

import Image from 'next/image';
import Link from 'next/link';
import { Github, Figma, ExternalLink, Globe, MousePointer2 } from 'lucide-react';
import { ProjectCardProps } from '@/lib/types/types';


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

const ProjectCard = ({ title, description, tags, image, year, links }: ProjectCardProps) => {
	const getLinkIcon = (linkType: string) => {
		const iconProps = {
			size: 12,
			className: 'transition-colors duration-500 group-hover:text-foreground',
		};
		switch (linkType) {
			case 'github':
				return <Github {...iconProps} />;
			case 'figma':
				return <Figma {...iconProps} />;
			case 'live':
				return <Globe {...iconProps} />;
			case 'other':
				return <ExternalLink {...iconProps} />;
			default:
				return <ExternalLink {...iconProps} />;
		}
	};

	const getLinkLabel = (linkType: string) => {
		switch (linkType) {
			case 'github':
				return 'Repository';
			case 'figma':
				return 'Design';
			case 'live':
				return 'Live Demo';
			case 'other':
				return 'View';
			default:
				return 'Link';
		}
	};

	const availableLinks = Object.entries(links).filter(([, url]) => url && url !== '#');
	const hasLinks = availableLinks.length > 0;

	return (
		<div className="relative w-full group">
			<div className="aspect-[16/9] overflow-hidden mb-6 relative bg-muted cursor-pointer">
				{image ? (
					<>
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-all duration-700 ease-in-out
                         filter grayscale brightness-[0.9] contrast-[1.1]
                         group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
						/>
						<div
							className="absolute inset-0 bg-background/20 transition-opacity duration-700 ease-in-out
                          group-hover:opacity-0"
						/>
						<div
							className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
						/>
					</>
				) : (
					<PlaceholderSVG />
				)}

				{hasLinks && (
					<div className="absolute top-3 right-3 opacity-30 group-hover:opacity-0 transition-opacity duration-500">
						<MousePointer2 size={14} className="text-foreground drop-shadow-md" />
					</div>
				)}

				{hasLinks && (
					<div
						className="absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out
                        transform translate-y-2 group-hover:translate-y-0">
						<div
							className="flex flex-col gap-3 p-6 rounded-lg bg-card/95 backdrop-blur-sm 
                          shadow-lg border border-border min-w-[200px]">
							<div className="text-center mb-2">
								<h4 className="text-xs font-medium text-foreground/80 tracking-wide uppercase">
									Quick Access
								</h4>
								<div className="w-8 h-px bg-border mx-auto mt-1"></div>
							</div>

							{availableLinks.map(([linkType, url]) => (
								<Link
									key={linkType}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 p-3 rounded-md
                           bg-muted hover:bg-muted/80 transition-all duration-300
                           group/overlay-link transform hover:scale-105 hover:shadow-md
                           border border-transparent hover:border-border"
									onClick={(e) => e.stopPropagation()}>
									<span className="text-muted-foreground group-hover/overlay-link:text-foreground transition-colors duration-300">
										{getLinkIcon(linkType)}
									</span>
									<span
										className="text-xs font-medium text-muted-foreground group-hover/overlay-link:text-foreground
                                 tracking-wide transition-colors duration-300">
										{getLinkLabel(linkType)}
									</span>
									<ExternalLink
										size={10}
										className="text-muted-foreground/50 group-hover/overlay-link:text-muted-foreground 
                                                   transition-colors duration-300 ml-auto"
									/>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="mb-4 flex items-center gap-4">
				<span
					className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50
                      transition-colors duration-500 group-hover:text-muted-foreground">
					SC.
					{Math.floor(Math.random() * 100)
						.toString()
						.padStart(2, '0')}
				</span>
				{year && (
					<span
						className="text-[10px] font-light tracking-[0.2em] text-muted-foreground/60
                        transition-colors duration-500 group-hover:text-muted-foreground">
						{year}
					</span>
				)}
			</div>

			<div className="space-y-4 max-w-[90%]">
				<h3
					className="text-xs font-light tracking-[0.15em] uppercase text-foreground/80 break-words
                     transition-colors duration-500 group-hover:text-foreground">
					{title}
				</h3>

				<p
					className="text-[11px] font-extralight leading-relaxed text-muted-foreground tracking-wide break-words
                    transition-colors duration-500 group-hover:text-foreground/80">
					{description}
				</p>
			</div>

			{hasLinks && (
				<div className="mt-6 border-t border-border/30 pt-4 transition-colors duration-500 group-hover:border-border">
					<div className="flex items-center gap-2 mb-3">
						<span className="text-[9px] tracking-[0.15em] uppercase font-extralight text-muted-foreground">
							Links
						</span>
						<div className="flex-1 h-px bg-border/30"></div>
						<div className="flex items-center gap-1 text-muted-foreground/50">
							<MousePointer2 size={10} />
							<span className="text-[8px] tracking-wider uppercase">Clickable</span>
						</div>
					</div>

					<div className="flex flex-wrap gap-x-4 gap-y-2">
						{availableLinks.map(([linkType, url]) => (
							<Link
								key={linkType}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-[9px] tracking-[0.15em] uppercase font-extralight
                         text-muted-foreground hover:text-foreground transition-all duration-300
                         border border-transparent hover:border-border rounded-sm
                         px-2 py-1 hover:bg-muted group/link
                         transform hover:scale-105 hover:shadow-sm">
								<span className="text-muted-foreground/60 group-hover/link:text-muted-foreground transition-colors duration-300">
									{getLinkIcon(linkType)}
								</span>
								<span className="break-words">{getLinkLabel(linkType)}</span>
								<ExternalLink
									size={8}
									className="text-muted-foreground/40 group-hover/link:text-muted-foreground/60 
                                                transition-colors duration-300 ml-1"
								/>
							</Link>
						))}
					</div>
				</div>
			)}

			<div
				className={`${hasLinks ? 'mt-6' : 'mt-6'
					} border-t border-border/30 pt-4 transition-colors duration-500 group-hover:border-border`}>
				<div className="flex items-center gap-2 mb-3">
					<span className="text-[9px] tracking-[0.15em] uppercase font-extralight text-muted-foreground">
						Technologies
					</span>
					<div className="flex-1 h-px bg-border/30"></div>
				</div>

				<div className="flex flex-wrap gap-x-6 gap-y-3">
					{tags.map((tag) => (
						<span
							key={tag}
							className="text-[9px] tracking-[0.15em] uppercase font-extralight
                       text-muted-foreground break-words transition-colors duration-500
                       group-hover:text-foreground px-2 py-1 rounded-sm
                       bg-muted opacity-80 group-hover:opacity-100">
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;

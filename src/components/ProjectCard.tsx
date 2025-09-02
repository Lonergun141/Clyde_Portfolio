import Image from 'next/image';
import Link from 'next/link';
import { Github, Figma, ExternalLink, Globe, MousePointer2 } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  year?: string;
  links: {
    github?: string;
    figma?: string;
    live?: string;
    other?: string;
  };
}

const PlaceholderSVG = () => (
  <svg 
    className="w-full h-full bg-black/5"
    viewBox="0 0 16 9"
    preserveAspectRatio="none"
  >
    <rect width="100%" height="100%" fill="currentColor" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      className="fill-black/20 text-[0.8px] uppercase tracking-wider"
    >
      No Image Available
    </text>
  </svg>
);

const ProjectCard = ({ title, description, tags, image, year, links }: ProjectCardProps) => {
  const getLinkIcon = (linkType: string) => {
    const iconProps = { size: 12, className: "transition-colors duration-500 group-hover:text-black/60" };
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
      {/* Image Container with Overlay Links */}
      <div className="aspect-[16/9] overflow-hidden mb-6 relative bg-black/5 cursor-pointer">
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
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 ease-in-out
                          group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
          </>
        ) : (
          <PlaceholderSVG />
        )}

        {/* Hover Indicator - Always visible subtle hint */}
        {hasLinks && (
          <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-0 transition-opacity duration-500">
            <MousePointer2 size={14} className="text-white drop-shadow-md" />
          </div>
        )}

        {/* Overlay Links on Image Hover */}
        {hasLinks && (
          <div className="absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out
                        transform translate-y-2 group-hover:translate-y-0">
            <div className="flex flex-col gap-3 p-6 rounded-lg bg-white/95 backdrop-blur-sm 
                          shadow-lg border border-white/20 min-w-[200px]">
              <div className="text-center mb-2">
                <h4 className="text-xs font-medium text-black/80 tracking-wide uppercase">
                  Quick Access
                </h4>
                <div className="w-8 h-px bg-black/20 mx-auto mt-1"></div>
              </div>
              
              {availableLinks.map(([linkType, url]) => (
                <Link
                  key={linkType}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-md
                           bg-black/5 hover:bg-black/10 transition-all duration-300
                           group/overlay-link transform hover:scale-105 hover:shadow-md
                           border border-transparent hover:border-black/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-black/60 group-hover/overlay-link:text-black/80 transition-colors duration-300">
                    {getLinkIcon(linkType)}
                  </span>
                  <span className="text-xs font-medium text-black/70 group-hover/overlay-link:text-black/90
                                 tracking-wide transition-colors duration-300">
                    {getLinkLabel(linkType)}
                  </span>
                  <ExternalLink size={10} className="text-black/40 group-hover/overlay-link:text-black/60 
                                                   transition-colors duration-300 ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scene Number & Year */}
      <div className="mb-4 flex items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-black/30
                      transition-colors duration-500 group-hover:text-black/50">
          SC.{Math.floor(Math.random() * 100).toString().padStart(2, '0')}
        </span>
        {year && (
          <span className="text-[10px] font-light tracking-[0.2em] text-black/40
                        transition-colors duration-500 group-hover:text-black/60">
            {year}
          </span>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-4 max-w-[90%]">
        <h3 className="text-xs font-light tracking-[0.15em] uppercase text-black/80 break-words
                     transition-colors duration-500 group-hover:text-black">
          {title}
        </h3>
        
        <p className="text-[11px] font-extralight leading-relaxed text-black/50 tracking-wide break-words
                    transition-colors duration-500 group-hover:text-black/70">
          {description}
        </p>
      </div>

      {/* Enhanced Links Section with Visual Indicators */}
      {hasLinks && (
        <div className="mt-6 border-t border-black/5 pt-4 transition-colors duration-500 group-hover:border-black/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] tracking-[0.15em] uppercase font-extralight text-black/40">
              Links
            </span>
            <div className="flex-1 h-px bg-black/5"></div>
            <div className="flex items-center gap-1 text-black/30">
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
                         text-black/40 hover:text-black/70 transition-all duration-300
                         border border-transparent hover:border-black/20 rounded-sm
                         px-2 py-1 hover:bg-black/5 group/link
                         transform hover:scale-105 hover:shadow-sm"
              >
                <span className="text-black/30 group-hover/link:text-black/50 transition-colors duration-300">
                  {getLinkIcon(linkType)}
                </span>
                <span className="break-words">
                  {getLinkLabel(linkType)}
                </span>
                <ExternalLink size={8} className="text-black/20 group-hover/link:text-black/40 
                                                transition-colors duration-300 ml-1" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Technical Details (Tags) */}
      <div className={`${hasLinks ? 'mt-6' : 'mt-6'} border-t border-black/5 pt-4 transition-colors duration-500 group-hover:border-black/10`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] tracking-[0.15em] uppercase font-extralight text-black/40">
            Technologies
          </span>
          <div className="flex-1 h-px bg-black/5"></div>
        </div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] tracking-[0.15em] uppercase font-extralight
                       text-black/40 break-words transition-colors duration-500
                       group-hover:text-black/60 px-2 py-1 rounded-sm
                       bg-black/5 opacity-80 group-hover:opacity-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
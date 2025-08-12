import Image from 'next/image';
import Link from 'next/link';
import { ProjectCardProps } from '@/lib/types/types';

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

const ProjectCard = ({ title, description, tags, image, year, link }: ProjectCardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!link) return <div className="relative w-full">{children}</div>;
    
    return (
      <Link 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full block group"
      >
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      {/* Image Container */}
      <div className="aspect-[16/9] overflow-hidden mb-6 relative bg-black/5">
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

      {/* Technical Details (Tags) */}
      <div className="mt-6 border-t border-black/5 pt-4 transition-colors duration-500 group-hover:border-black/10">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] tracking-[0.15em] uppercase font-extralight
                       text-black/40 break-words transition-colors duration-500
                       group-hover:text-black/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProjectCard; 
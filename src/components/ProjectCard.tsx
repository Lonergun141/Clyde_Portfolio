import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

const ProjectCard = ({ title, description, tags, image }: ProjectCardProps) => {
  return (
    <div className="w-full bg-background-light rounded-xl transition-all duration-300 
                    hover:translate-y-[-4px] border border-border-dark hover:border-accent-purple-light">
      {/* Image Section */}
      {image && (
        <div className="relative h-48 rounded-t-xl overflow-hidden">
          <Image 
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-medium text-brand-primary">
          {title}
        </h3>

        <p className="text-brand-secondary text-sm">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 bg-background-accent text-brand-secondary
                       rounded-md text-xs font-medium"
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
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  size?: 'small' | 'large';
}

const ProjectCard = ({ title, description, tags, image, size = 'small' }: ProjectCardProps) => {
  return (
    <div className={`
      relative w-full h-full group overflow-hidden
      bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm
      border border-white/20 rounded-3xl
      transition-all duration-500 hover:shadow-2xl
      ${size === 'large' ? 'p-8' : 'p-6'}
    `}>
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-4">
          <h3 className={`
            font-medium text-brand-primary
            group-hover:translate-x-1 transition-transform duration-300
            ${size === 'large' ? 'text-2xl' : 'text-xl'}
          `}>
            {title}
          </h3>
          <p className={`
            text-brand-secondary/80
            ${size === 'large' ? 'text-lg' : 'text-base'}
          `}>
            {description}
          </p>
        </div>

        {/* Image */}
        {image && (
          <div className={`
            relative mt-4 overflow-hidden rounded-2xl
            ${size === 'large' ? 'h-full' : 'h-full'}
          `}>
            <div 
              className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1.5 bg-white/30 backdrop-blur-sm 
                        text-brand-primary rounded-full text-sm
                        border border-white/20"
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
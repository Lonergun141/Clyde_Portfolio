export interface FeaturedProject {
  title: string;
  category: string;
  url: string;
  year: string;
  description?: string;
  link?: string;
}

export interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}


export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  year?: string;
  link?: string;
}

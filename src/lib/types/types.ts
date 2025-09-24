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

export interface Project {
	title: string;
	description: string;
	technologies: string[];
	links: {
		github?: string;
		figma?: string;
		live?: string;
		other?: string;
	};
	categories: string[];
	image?: string;
	year?: string;
}

export interface ProjectCardProps {
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

export interface SampleList{
	id:number;
	firstName:string;
	lastName:string
}
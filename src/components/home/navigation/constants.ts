import { FolderKanban, User, Award, Github, Mail, Sparkles } from 'lucide-react';

export const navItems = [
    { icon: FolderKanban, label: 'Projects', description: 'Explore my portfolio of web applications, fullstack systems, and creative works.', panelId: 'projects' as const },
    { icon: User, label: 'Profile', description: 'Learn about my background, skills, and technical expertise.', panelId: 'profile' as const },
    { icon: Award, label: 'Credentials', description: 'View my certifications and professional achievements.', panelId: 'certificates' as const },
    { icon: Github, label: 'GitHub', description: 'See my contributions, commits, and open source work.', panelId: 'github' as const },
    { icon: Mail, label: 'Contact', description: 'Get in touch for collaborations, projects, or opportunities.', panelId: 'contact' as const },
    { icon: Sparkles, label: 'AI Chat', description: 'Ask my AI assistant about my skills and experience.', panelId: 'chat' as const },
];

import {
        mainTechnologies,
        creativeTools,
        socialLinks,
        contactDetails,
        education,
        works,
        featuredProjects,
        certificates
} from '@/lib/constants/constants';

export function generateResumeContext(): string {
        const sections = [
                `Name: Clyde Gevero`,

                `Contact:
${contactDetails.map(c => `- ${c.label}: ${c.value}`).join('\n')}`,

                `Social Links:
${socialLinks.map(s => `- ${s.name}: ${s.url}`).join('\n')}`,

                `Bio/Introduction:
Fullstack Developer & UI/UX Designer crafting modern web/mobile applications. Focus on performance, accessibility, and premium aesthetics. Graduated Cum Laude.`,

                `Education:
${education.map(e => `- ${e.degree} from ${e.school} (${e.year}) - Cum Laude`).join('\n')}`,

                `Main Technologies:
${mainTechnologies.map(t => `- ${t.name}: ${t.description}`).join('\n')}`,

                `Creative Tools:
${creativeTools.join(', ')}`,

                `Experience (Works):
${works.map(w => `- ${w.title}: ${w.description} (Tags: ${w.tags.join(', ')})`).join('\n')}`,

                `Featured Projects:
${featuredProjects.map(p => `- ${p.title} (${p.category}, ${p.year}): ${p.description}. URL: ${p.url}`).join('\n')}`,

                `Certificates:
${certificates.map(c => `- ${c.title} by ${c.issuer} (${c.date})`).join('\n')}`
        ];

        return sections.join('\n\n');
}

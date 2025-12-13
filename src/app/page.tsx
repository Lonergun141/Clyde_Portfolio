'use client';

import FeaturedProjects from '@/components/ui/FeaturedProjects';
import PhilosophySection from '@/components/ui/PhilosophySection';
import { featuredProjects } from '@/lib/constants/constants';
import CertificatesSection from '@/components/ui/CertificatesSection';
import HeroSection from '@/components/ui/HeroSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import ProcessSection from '@/components/ui/ProcessSection';

export default function Home() {
	return (
		<main className="min-h-screen bg-background">
			<HeroSection />
			<CertificatesSection />
			<PhilosophySection />
			<FeaturedProjects projects={featuredProjects} />
			<ExperienceSection />
			<ProcessSection />
		</main>
	);
}

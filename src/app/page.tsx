'use client';

import FeaturedProjects from '@/components/ui/FeaturedProjects';
import PhilosophySection from '@/components/ui/PhilosophySection';
import { featuredProjects } from '@/lib/constants/constants';
import CertificatesSection from '@/components/ui/CertificatesSection';
import HeroSection from '@/components/ui/HeroSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import ProcessSection from '@/components/ui/ProcessSection';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { Reveal } from '@/components/ui/Reveal';
import TechMarquee from '@/components/ui/TechMarquee';

export default function Home() {
	return (
		<SmoothScroll>
			<main className="min-h-screen bg-background">
				<HeroSection /> {/* Hero usually handles its own initial animation, but can be wrapped if desired */}

				<Reveal delay={0.2}>
					<TechMarquee />
				</Reveal>

				<Reveal delay={0.1}>
					<CertificatesSection />
				</Reveal>

				{/* <PhilosophySection /> */}

				<Reveal delay={0.2}>
					<FeaturedProjects projects={featuredProjects} />
				</Reveal>

				<Reveal delay={0.2}>
					<ExperienceSection />
				</Reveal>

				<Reveal delay={0.2}>
					<ProcessSection />
				</Reveal>
			</main>
		</SmoothScroll>
	);
}

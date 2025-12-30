'use client';

import FeaturedProjects from '@/components/ui/FeaturedProjects';
import { featuredProjects } from '@/lib/constants/constants';
import CertificatesSection from '@/components/ui/CertificatesSection';
import HeroSection from '@/components/ui/HeroSection';
import ProcessSection from '@/components/ui/ProcessSection';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { Reveal } from '@/components/ui/Reveal';
import TechMarquee from '@/components/ui/TechMarquee';
import ParallaxSection from '@/components/ui/ParallaxSection';
import PageLoader from '@/components/ui/PageLoader';

export default function Home() {
	return (
		<>
			<PageLoader />
			<SmoothScroll>
				<main className="min-h-screen bg-background">
					<HeroSection />

					<ParallaxSection offset={30} direction="up" opacity={false}>
						<Reveal delay={0.2}>
							<TechMarquee />
						</Reveal>
					</ParallaxSection>

					<ParallaxSection offset={60} direction="down" scale={true}>
						<Reveal delay={0.1}>
							<CertificatesSection />
						</Reveal>
					</ParallaxSection>

					{/* <PhilosophySection /> */}

					<ParallaxSection offset={80} direction="up" scale={true}>
						<Reveal delay={0.2}>
							<FeaturedProjects projects={featuredProjects} />
						</Reveal>
					</ParallaxSection>

					{/* <ParallaxSection offset={50} direction="down">
						<Reveal delay={0.2}>
							<ExperienceSection />
						</Reveal>
					</ParallaxSection> */}

					<ParallaxSection offset={70} direction="up" scale={true}>
						<Reveal delay={0.2}>
							<ProcessSection />
						</Reveal>
					</ParallaxSection>
				</main>
			</SmoothScroll>
		</>
	);
}

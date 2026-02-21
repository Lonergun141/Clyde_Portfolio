'use client';

import { useState } from 'react';
import {
	HomeHeader,
	HomeFooter,
	HexagonNav,
	IdentitySection,
	ResumeContent
} from '@/components/home';
import { AnimatePresence, motion } from 'framer-motion';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { useThemeKeyboard } from '@/hooks/useThemeKeyboard';

export default function Home() {
	// Handle Ctrl+Shift+L theme toggle
	useThemeKeyboard();

	const [isResumeView, setIsResumeView] = useState(false);

	return (
		<main className="min-h-screen w-full bg-background overflow-hidden relative">
			<BlueprintBackground>
				{/* Main Content Layer */}
				<div className="relative z-10 w-full min-h-screen flex flex-col pointer-events-auto">
					<HomeHeader isResumeView={isResumeView} setIsResumeView={setIsResumeView} />

					{/* Split Layout: Identity LEFT, Hexagons/Resume RIGHT */}
					<div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-16">

						{/* Left: Identity/Welcome */}
						<IdentitySection />

						{/* Right: Hexagon Navigation or Resume Content */}
						<div className="w-full lg:w-1/2 flex items-center justify-end py-8 lg:py-0 pr-8 lg:pr-16">
							<AnimatePresence mode="wait">
								{isResumeView ? (
									<motion.div
										key="resume"
										initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
										animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
										exit={{ opacity: 0, filter: "blur(10px)", y: 20 }}
										transition={{ duration: 0.4, ease: "easeOut" }}
										className="w-full"
									>
										<ResumeContent />
									</motion.div>
								) : (
									<motion.div
										key="hexagon"
										initial={{ opacity: 0, filter: "blur(10px)", y: -20 }}
										animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
										exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
										transition={{ duration: 0.4, ease: "easeOut" }}
										className="w-full flex justify-end"
									>
										<HexagonNav />
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					<HomeFooter />
				</div>
			</BlueprintBackground>
		</main>
	);
}

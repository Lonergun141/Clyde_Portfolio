'use client';

import {
	HomeHeader,
	HomeFooter,
	HexagonNav,
	IdentitySection
} from '@/components/home';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { useThemeKeyboard } from '@/hooks/useThemeKeyboard';

export default function Home() {
	// Handle Ctrl+Shift+L theme toggle
	useThemeKeyboard();

	return (
		<main className="min-h-screen w-full bg-background overflow-hidden relative">
			<BlueprintBackground>
				{/* Main Content Layer */}
				<div className="relative z-10 w-full min-h-screen flex flex-col pointer-events-auto">
					<HomeHeader />

					{/* Split Layout: Identity LEFT, Hexagons RIGHT */}
					<div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-16">

						{/* Left: Identity/Welcome */}
						<IdentitySection />

						{/* Right: Hexagon Navigation */}
						<div className="w-full lg:w-1/2 flex items-center justify-end py-8 lg:py-0 pr-8 lg:pr-16">
							<HexagonNav />
						</div>
					</div>

					<HomeFooter />
				</div>
			</BlueprintBackground>
		</main>
	);
}

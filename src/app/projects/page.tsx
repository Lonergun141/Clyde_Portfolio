'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@/context/NavigationContext';

export default function ProjectsPage() {
	const router = useRouter();
	const { openPanel } = useNavigation();

	useEffect(() => {
		// Redirect to home and open the projects panel
		openPanel('projects');
		router.replace('/');
	}, [openPanel, router]);

	// Show nothing while redirecting
	return (
		<div className="h-screen w-screen bg-background flex items-center justify-center">
			<span className="text-xs font-mono text-muted-foreground uppercase tracking-widest animate-pulse">
				Loading Projects...
			</span>
		</div>
	);
}

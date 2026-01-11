'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@/context/NavigationContext';

export default function ProfilePage() {
	const router = useRouter();
	const { openPanel } = useNavigation();

	useEffect(() => {
		// Redirect to home and open the profile panel
		openPanel('profile');
		router.replace('/');
	}, [openPanel, router]);

	// Show nothing while redirecting
	return (
		<div className="h-screen w-screen bg-background flex items-center justify-center">
			<span className="text-xs font-mono text-muted-foreground uppercase tracking-widest animate-pulse">
				Loading Profile...
			</span>
		</div>
	);
}

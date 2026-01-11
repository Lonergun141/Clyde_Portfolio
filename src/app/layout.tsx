import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationProvider } from '@/context/NavigationContext';
import { ThemeTransitionProvider } from '@/context/ThemeTransitionContext';
import CommandPalette from '@/components/spatial/CommandPalette';
import ProjectsPanel from '@/components/panels/ProjectsPanel';
import ProfilePanel from '@/components/panels/ProfilePanel';
import CertificatesPanel from '@/components/panels/CertificatesPanel';
import GitHubPanel from '@/components/panels/GitHubPanel';
import ContactPanel from '@/components/panels/ContactPanel';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Clyde Gevero | Fullstack Developer & UI/UX Designer',
	description: 'Fullstack developer and UI/UX designer specializing in React, TypeScript, and thoughtful interfaces. Available for projects.',
	keywords: ['Fullstack Developer', 'UI/UX Designer', 'React', 'TypeScript', 'Portfolio', 'Clyde Gevero'],
	authors: [{ name: 'Clyde Gevero' }],
	creator: 'Clyde Gevero',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://clydegevero.dev',
		title: 'Clyde Gevero | Fullstack Developer & UI/UX Designer',
		description: 'Fullstack developer and UI/UX designer specializing in React, TypeScript, and thoughtful interfaces.',
		siteName: 'Clyde Gevero Portfolio',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Clyde Gevero | Fullstack Developer & UI/UX Designer',
		description: 'Fullstack developer and UI/UX designer specializing in React, TypeScript, and thoughtful interfaces.',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<ThemeTransitionProvider>
						<NavigationProvider>
							<div className="bg-noise" />
							{children}

							{/* Global Spatial Components */}
							<CommandPalette />
							<ProjectsPanel />
							<ProfilePanel />
							<CertificatesPanel />
							<GitHubPanel />
							<ContactPanel />

							<Analytics />
						</NavigationProvider>
					</ThemeTransitionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

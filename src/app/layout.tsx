import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationProvider } from '@/context/NavigationContext';
import { ThemeTransitionProvider } from '@/context/ThemeTransitionContext';
import { AccentProvider } from '@/context/AccentContext';
import CommandPalette from '@/components/spatial/CommandPalette';
import ProjectsPanel from '@/components/panels/ProjectsPanel';
import ProfilePanel from '@/components/panels/ProfilePanel';
import CertificatesPanel from '@/components/panels/CertificatesPanel';
import GitHubPanel from '@/components/panels/GitHubPanel';
import ContactPanel from '@/components/panels/ContactPanel';
import KeyboardHelpWrapper from '@/components/ui/KeyboardHelpWrapper';
import ChatPanel from '@/components/panels/ChatPanel';

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
	keywords: [
		'Clyde Gevero',
		'Clyde',
		'Gevero',
		'Clyde Gevero Portfolio',
		'Fullstack Developer',
		'UI/UX Designer',
		'React Developer',
		'TypeScript Developer',
		'Software Engineer Philippines'
	],
	authors: [{ name: 'Clyde Gevero', url: 'https://clydegevero.is-a.dev' }],
	creator: 'Clyde Gevero',
	metadataBase: new URL('https://clydegevero.is-a.dev'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://clydegevero.is-a.dev/',
		title: 'Clyde Gevero | Fullstack Developer & UI/UX Designer',
		description: 'Portfolio of Clyde Gevero, a Fullstack developer and UI/UX designer specializing in React, TypeScript, and thoughtful interfaces.',
		siteName: 'Clyde Gevero',
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
						<AccentProvider>
							<NavigationProvider>
								<div className="bg-noise" />
								{children}

								{/* Global Spatial Components */}
								<CommandPalette />
								<KeyboardHelpWrapper />
								<ProjectsPanel />
								<ProfilePanel />
								<CertificatesPanel />
								<GitHubPanel />
								<ContactPanel />
								<ChatPanel />

								<Analytics />
							</NavigationProvider>
						</AccentProvider>
					</ThemeTransitionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

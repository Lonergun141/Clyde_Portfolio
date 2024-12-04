'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({
	href,
	onClick,
	children,
}: {
	href: string;
	onClick?: () => void;
	children: React.ReactNode;
}) => (
	<Link
		href={href}
		onClick={onClick}
		className="relative text-lg font-medium text-brand-secondary hover:text-brand-primary group">
		{children}
		<span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
	</Link>
);

const GitHubButton = () => (
	<a
		href="https://github.com/Lonergun141"
		target="_blank"
		rel="noopener noreferrer"
		className="flex items-center space-x-2 px-5 py-2 rounded-lg
             bg-background-dark border border-border-dark
             hover:bg-background-accent hover:border-brand-primary
             transition-all duration-300">
		<svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
			<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
		</svg>
		<span className="text-brand-primary font-medium">GitHub</span>
	</a>
);

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
	<button
		className="sm:hidden fixed right-4 z-50 w-10 h-10 flex flex-col justify-center items-center
               bg-background-light rounded-lg border border-border-dark shadow-sm"
		onClick={onClick}
		aria-label={isOpen ? 'Close menu' : 'Open menu'}>
		<span
			className={`block w-5 h-0.5 bg-brand-primary transform transition-all duration-300 ${
				isOpen ? 'rotate-45 translate-y-1' : ''
			}`}
		/>
		<span
			className={`block w-5 h-0.5 bg-brand-primary my-1 transition-opacity duration-300 ${
				isOpen ? 'opacity-0' : ''
			}`}
		/>
		<span
			className={`block w-5 h-0.5 bg-brand-primary transform transition-all duration-300 ${
				isOpen ? '-rotate-45 -translate-y-1' : ''
			}`}
		/>
	</button>
);

const DesktopMenu = () => (
	<div className="hidden sm:flex items-center space-x-8">
		<NavLink href="/projects">Projects</NavLink>
		<NavLink href="/profile">About</NavLink>
		<GitHubButton />
	</div>
);

const BackButton = () => (
	<Link
		href="/"
		className="fixed top-4 left-4 z-50"
		aria-label="Go back"
	>
		<svg 
			className="w-6 h-6 text-white" 
			fill="none" 
			stroke="currentColor" 
			viewBox="0 0 24 24"
		>
			<path 
				strokeLinecap="round" 
				strokeLinejoin="round" 
				strokeWidth={2} 
				d="M15 19l-7-7 7-7" 
			/>
		</svg>
	</Link>
);

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isOpen]);

	if (pathname === '/profile') {
		return <BackButton />;
	}

	return (
		<>
			<nav className="fixed top-0 w-full z-40 bg-background-light/30 backdrop-blur-md border-b border-border-light">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
					<Link
						href="/"
						className="font-mono text-xl font-bold text-brand-primary hover:text-brand-secondary 
                     transition-all duration-300">
						cg/
					</Link>

					<MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
					<DesktopMenu />
				</div>
			</nav>

			<div
				className={`fixed inset-0 z-30 bg-background-light/95 backdrop-blur-md transition-all duration-300 ${
					isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
				}`}>
				<div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4">
					<NavLink href="/projects" onClick={() => setIsOpen(false)}>
						Projects
					</NavLink>
					<NavLink href="/profile" onClick={() => setIsOpen(false)}>
						About
					</NavLink>
					<GitHubButton />
				</div>
			</div>
		</>
	);
}

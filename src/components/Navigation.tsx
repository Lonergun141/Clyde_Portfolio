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
		className="relative text-xs uppercase tracking-[0.2em] font-light text-black/60 hover:text-black/90 transition-colors duration-500">
		{children}
	</Link>
);

const GitHubButton = () => (
	<a
		href="https://github.com/Lonergun141"
		target="_blank"
		rel="noopener noreferrer"
		className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-light text-black/60 hover:text-black/90 transition-colors duration-500">
		<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
			<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
		</svg>
		<span>Github</span>
	</a>
);

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
	<button
		
		className="sm:hidden fixed right-4 z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
		onClick={onClick}
		aria-label={isOpen ? 'Close menu' : 'Open menu'}>
		<span
			className={`block w-5 h-[1px] bg-black/60 transform transition-all duration-500 ${
				isOpen ? 'rotate-45 translate-y-[3px]' : ''
			}`}
		/>
		<span
			className={`block w-5 h-[1px] bg-black/60 transition-opacity duration-500 ${
				isOpen ? 'opacity-0' : ''
			}`}
		/>
		<span
			className={`block w-5 h-[1px] bg-black/60 transform transition-all duration-500 ${
				isOpen ? '-rotate-45 -translate-y-[3px]' : ''
			}`}
		/>
	</button>
);

const DesktopMenu = () => (
	<div className="hidden sm:flex items-center gap-12">
		<NavLink href="/projects">Projects</NavLink>
		<NavLink href="/profile">Developer</NavLink>
		<GitHubButton />
	</div>
);

const BackButton = () => (
	<Link
		href="/"
		className="fixed top-4 left-4 z-50 text-xs uppercase tracking-[0.2em] font-light text-white hover:text-black/90 transition-colors duration-500"
		aria-label="Go back"
	>
		← Back
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
			<nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-sm">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
					<Link
						href="/"
						className="font-mono text-xs tracking-[0.3em] uppercase text-black/60 hover:text-black/90 transition-colors duration-500">
						CG/25
					</Link>

					<MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
					<DesktopMenu />
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				className={`fixed inset-0 z-30 bg-white transition-all duration-700 ${
					isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
				}`}>
				<div className="flex flex-col items-center justify-center min-h-screen space-y-8">
					<NavLink href="/projects" onClick={() => setIsOpen(false)}>
						Projects
					</NavLink>
					<NavLink href="/profile" onClick={() => setIsOpen(false)}>
						Developer
					</NavLink>
					<GitHubButton />
				</div>
			</div>
		</>
	);
}

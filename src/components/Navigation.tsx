'use client';
import { useState, useEffect } from 'react';
import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({
	href,
	onClick,
	children,
	number,
}: {
	href: string;
	onClick?: () => void;
	children: React.ReactNode;
	number: string;
}) => (
	<Link href={href} onClick={onClick} className="group relative w-full">
		<div className="flex items-center justify-between py-6 border-b border-black/10 hover:border-black/20 transition-colors duration-300">
			<div className="flex items-center gap-8">
				<span className="text-sm font-light text-black/40">({number})</span>
				<span className="text-2xl font-light text-black group-hover:translate-x-2 transition-transform duration-300">
					{children}
				</span>
			</div>
			<span className="text-xl font-light text-black/40 group-hover:text-black transition-colors duration-300">
				+
			</span>
		</div>
	</Link>
);

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
	<button
		className="relative w-8 h-6 flex flex-col justify-center items-end gap-1"
		onClick={onClick}
		aria-label={isOpen ? 'Close menu' : 'Open menu'}>
		<span
			className={`block w-6 h-px bg-black transition-all duration-300 ${
				isOpen ? 'rotate-45 translate-y-0.5 w-6' : ''
			}`}
		/>
		<span
			className={`block w-6 h-px bg-black transition-all duration-300 ${
				isOpen ? '-rotate-45 -translate-y-0.5 w-6' : ''
			}`}
		/>
	</button>
);

const BackButton = () => (
	<Link
		href="/"
		className="fixed top-6 left-6 z-50 text-sm font-light text-white "
		aria-label="Go back">
		← Back
	</Link>
);

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > lastScrollY) {
				// scrolling down → hide nav
				setIsVisible(false);
			} else {
				// scrolling up → show nav
				setIsVisible(true);
			}
			setLastScrollY(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	if (pathname === '/profile') {
		return <BackButton />;
	}

	return (
		<>
			<nav
				className={`fixed top-0 w-full z-40 bg-white/80 backdrop-blur-sm transition-transform duration-300 ${
					isVisible ? 'translate-y-0' : '-translate-y-full'
				}`}>
				<div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
					<Link href="/" className="text-lg font-light text-black">
						CHG.
					</Link>
					<MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
				</div>
			</nav>

			<div
				className={`fixed inset-0 z-50 transition-all duration-500 ${
					isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
				}`}>
				<div className="absolute inset-0 bg-white" />

				<div className="relative h-full flex flex-col">
					<div className="flex items-center justify-between p-8 border-b border-black/10">
						<h1 className="text-4xl font-light text-black">Menu</h1>
						<div className="flex items-center gap-8">
							<span className="text-sm font-light text-black/40">
								[PST]{' '}
								{new Date().toLocaleTimeString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								})}
							</span>
							<MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
						</div>
					</div>

					<div className="flex-1 flex items-center justify-center">
						<div className="w-full max-w-2xl px-8">
							<div className="mb-8">
								<span className="text-sm font-light text-black/40">[Links]</span>
								<sup className="text-xs font-light text-black/30 ml-1">04</sup>
							</div>

							<div className="space-y-0">
								<NavLink href="/projects" onClick={() => setIsOpen(false)} number="01">
									Projects
								</NavLink>
								<NavLink href="/profile" onClick={() => setIsOpen(false)} number="02">
									About
								</NavLink>
								<Link
									href="/Gevero_CV_2025.pdf"
									download
									target="_blank"
									onClick={() => setIsOpen(false)}
									className="group relative w-full block">
									<div className="flex items-center justify-between py-6 border-b border-black/10 hover:border-black/20 transition-colors duration-300">
										<div className="flex items-center gap-8">
											<span className="text-sm font-light text-black/40">(03)</span>
											<span className="text-2xl font-light text-black group-hover:translate-x-2 transition-transform duration-300">
												Resume
											</span>
										</div>
										<span className="text-xl font-light text-black/40 group-hover:text-black transition-colors duration-300">
											+
										</span>
									</div>
								</Link>
								<a
									href="https://github.com/Lonergun141"
									target="_blank"
									rel="noopener noreferrer"
									onClick={() => setIsOpen(false)}
									className="group relative w-full block">
									<div className="flex items-center justify-between py-6 border-b border-black/10 hover:border-black/20 transition-colors duration-300">
										<div className="flex items-center gap-8">
											<span className="text-sm font-light text-black/40">(04)</span>
											<span className="text-2xl font-light text-black group-hover:translate-x-2 transition-transform duration-300">
												GitHub
											</span>
										</div>
										<span className="text-xl font-light text-black/40 group-hover:text-black transition-colors duration-300">
											+
										</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

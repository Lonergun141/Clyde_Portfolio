'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <Navigation />
        <AnimatePresence mode="wait">
          <main key={pathname}>
            {children}
          </main>
        </AnimatePresence>
      </body>
    </html>
  );
}

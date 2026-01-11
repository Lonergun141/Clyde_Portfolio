'use client';

import DesktopHexagonGrid from './DesktopHexagonGrid';
import MobileNav from './MobileNav';

export default function HexagonNav() {
    return (
        <>
            <div className="active-on-large-screens hidden lg:block h-full">
                <DesktopHexagonGrid />
            </div>
            <div className="active-on-small-screens lg:hidden">
                <MobileNav />
            </div>
        </>
    );
}

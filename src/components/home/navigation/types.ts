import { LucideIcon } from 'lucide-react';

import { PanelType } from '@/context/NavigationContext';

export interface HexagonProps {
    icon?: LucideIcon;
    panelId?: Exclude<PanelType, null>;
    isActive?: boolean;
    onHover?: () => void;
    delay?: number;
    size?: number;
}

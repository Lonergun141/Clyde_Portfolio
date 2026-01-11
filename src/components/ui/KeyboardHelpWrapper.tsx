'use client';

import { useNavigation } from '@/context/NavigationContext';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';

export default function KeyboardHelpWrapper() {
    const { isKeyboardHelpOpen, closeKeyboardHelp } = useNavigation();

    return (
        <KeyboardShortcutsModal
            isOpen={isKeyboardHelpOpen}
            onClose={closeKeyboardHelp}
        />
    );
}

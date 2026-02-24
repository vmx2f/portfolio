'use client';

import { ThemeProvider } from 'next-themes';
import CursorFollower from "@/_components/layout/cursor-follower";
import { useState } from 'react';
import { House, Layers } from "lucide-react";
import PopStyles from "@/_components/pop-out/pop-styles";
import PopLanguage from "@/_components/pop-out/pop-language";
import SquigglyLine from '@/_components/layout/squiggly-line';
import Dock from '@/_components/layout/dock-bar';
import { useExtracted } from 'next-intl';

export function DockWrapper() {
    const t = useExtracted('dock')
    const [activeSection, setActiveSection] = useState('home');
    const [isStylesOpen, setIsStylesOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    return (
        <Dock
            items={[{
                icon: <House size={20} />,
                label: t("Profile"),
                onClick: () => {
                    window.location.href = `/home#profile`;
                    setActiveSection('profile');
                },
                className: `hover:bg-theme-color/10 ${activeSection === 'profile' || activeSection === 'home' ? 'bg-theme-color/20' : ''}`
            },
            {
                icon: <Layers size={20} />,
                label: t("Projects"),
                onClick: () => {
                    window.location.href = `/home#projects`;
                    setActiveSection('projects');
                },
                className: `hover:bg-theme-color/10 ${activeSection === 'projects' ? 'bg-theme-color/20' : ''}`
            },
            {
                label: 'separator',
                className: 'pointer-events-none'
            },
            {
                icon: (
                    <PopStyles />
                ),
                label: isStylesOpen ? null : t("Styles"),
                className: '!p-0'
            },
            {
                icon: (
                    <PopLanguage />
                ),
                label: isLanguageOpen ? null : t("Language"),
                className: '!p-0'
            },]}
            panelHeight={64}
            baseItemSize={44}
            magnification={60}
            className="backdrop-blur-lg"
        />
    )
}

type Props = {
    children: React.ReactNode;
};

export function Providers({ children }: Props) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="fixed inset-0 overflow-hidden -z-10">
                <SquigglyLine
                    count={5}
                    speed={15}
                    minSegments={3}
                    maxSegments={6}
                    className="opacity-10 dark:opacity-30"
                />
            </div>
            <CursorFollower />
            <DockWrapper/>
            {children}
        </ThemeProvider>
    );
}

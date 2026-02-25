'use client';

import { ThemeProvider } from 'next-themes';
import CursorFollower from "@/_components/layout/cursor-follower";
import { Book, House, Layers } from "lucide-react";
import PopStyles from "@/_components/pop-out/pop-styles";
import PopLanguage from "@/_components/pop-out/pop-language";
import SquigglyLine from '@/_components/layout/squiggly-line';
import Dock from '@/_components/layout/dock-bar';
import { useExtracted } from 'next-intl';
import { ThemeContext } from '@/_components/contexts/theme-context';
import { usePathname, useRouter } from '@/i18n/navigation';

export function DockWrapper() {
    const t = useExtracted('commons')
    const pathname = usePathname();
    const router = useRouter();

    const activeSection = pathname.startsWith('/projects')
        ? 'projects'
        : pathname.startsWith('/blog')
            ? 'blog'
            : 'profile';

    return (
        <Dock
            items={[{
                icon: <House size={20} />,
                label: t("Profile"),
                onClick: () => {
                    router.push('/');
                },
                className: `hover:bg-theme-color/10 ${activeSection === 'profile' ? 'bg-theme-color/20' : ''}`
            },
            {
                icon: <Layers size={20} />,
                label: t("Projects"),
                onClick: () => {
                    router.push('/projects');
                },
                className: `hover:bg-theme-color/10 ${activeSection === 'projects' ? 'bg-theme-color/20' : ''}`
            },
            {
                icon: <Book size={20} />,
                label: t("Blog"),
                onClick: () => {
                    router.push('/blog');
                },
                className: `hover:bg-theme-color/10 ${activeSection === 'blog' ? 'bg-theme-color/20' : ''}`
            },
            {
                label: 'separator',
                className: 'pointer-events-none'
            },
            {
                icon: (
                    <PopStyles />
                ),
                label: t("Styles"),
                className: '!p-0'
            },
            {
                icon: (
                    <PopLanguage />
                ),
                label: t("Language"),
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
            <ThemeContext>
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
            </ThemeContext>
        </ThemeProvider>
    );
}

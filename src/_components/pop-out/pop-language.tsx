'use client';

import { useExtracted, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { BsCheckLg } from "react-icons/bs";
import Popover from '../layout/pop-over';
import { Languages } from 'lucide-react';

export default function PopLanguage() {
    const t = useExtracted('commons');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const languages = [
        { code: 'en', name: t('English') },
        { code: 'es', name: t('Spanish') },
        { code: 'ru', name: t('Russian') },
        { code: 'jp', name: t('Japanese') },
    ];

    function setLanguage(nextLocale: string) {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params` 
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <Popover
            mode="click"
            position="right-top"
            onOpenChange={setIsLanguageOpen}
            trigger={({ onClick }) => (
                <div
                    className="flex items-center justify-center w-full h-full rounded-full hover:bg-theme-color/10"
                    onClick={onClick}
                >
                    <Languages size={20} />
                </div>
            )}
        >
            <div className="p-4 bg-main/90 backdrop-blur-lg rounded-lg shadow-lg border border-subtle/50 mb-4">
                <div className="p-2 rounded-md min-w-[150px]">
                    <span className="text-secondary-text text-xs mb-2 px-2 block">{t('Select language')}</span>
                    <div className="flex flex-col gap-1">
                        {languages.map(({ code, name }) => (
                            <button
                                key={code}
                                onClick={() => setLanguage(code)}
                                disabled={isPending}
                                className={`w-full px-3 py-2 rounded-sm text-sm text-left transition-colors duration-200 flex items-center justify-between ${locale === code ? 'bg-theme-color/10 text-theme-color' : 'text-primary-text hover:bg-hover'}
                                `}
                            >
                                <span>{name}</span>
                                {locale === code && (
                                    <BsCheckLg className="text-theme-color text-xs" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Popover>
    );
};

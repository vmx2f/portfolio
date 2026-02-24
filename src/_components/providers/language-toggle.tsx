'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

const LanguageToggle = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' }
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

    const selectedLanguage = languages.find(l => l.code === locale);

    return (
        <button
            onClick={() => setLanguage(locale === 'en' ? 'es' : 'en')}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-accent transition-all flex items-center justify-center group"
            aria-label={locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
            disabled={isPending}
        >
            <span className="sr-only">
                {locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
            </span>
            <div className="relative w-5 h-5 text-sm font-medium">
                <span 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                        locale === 'en' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    EN
                </span>
                <span 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                        locale === 'es' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    ES
                </span>
            </div>
        </button>
    );
};

export default LanguageToggle;

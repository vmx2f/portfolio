import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getExtracted } from "next-intl/server";
import { Providers } from "./providers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getExtracted('metadata');
  const t2 = await getExtracted('metadata.keywords');

  const keywords = [
    t2('Full-stack developer'),
    t2('React, Next.js, TypeScript'),
  ];

  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://0xslyv.space' 
    : 'http://localhost:3000';

  return {
    icons: {
      icon: "../icon.svg",
    },
    title: t("vmx's portfolio"),
    description: t('Full-stack developer crafting interactive experiences with React, Next.js, and TypeScript'),
    keywords,
    openGraph: {
      title: t('vmx - Full-stack Developer Portfolio'),
      description: t('Portfolio showcasing interactive web experiences built with modern technologies'),
      url: baseUrl,
      siteName: "vmx's portfolio",
      type: 'website',
      images: [
        {
          url: `/images/banner-1.png`,
          width: 1200,
          height: 630,
          alt: t('vmx portfolio preview image'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('vmx - Full-stack Developer Portfolio'),
      description: t('Portfolio showcasing interactive web experiences built with modern technologies'),
      images: [`/images/banner-1.png`],
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  // Ensure incomming locale is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
          <NextIntlClientProvider>
            <Providers>
              {children}
            </Providers>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { BlogPosts } from "@/_components/layout/posts"
import { Metadata } from "next";
import { getExtracted } from "next-intl/server";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import { useExtracted } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const t = await getExtracted('metadata');
  const k = await getExtracted('metadata.keywords');

  const keywords = [
    k('keyword-1'),
    k('keyword-2'),
  ];

  return {
    title: t(`vmx's Blog!`),
    description: t('This is my small space on the internet, enjoy your stay! ^^'),
    keywords,
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `url`,
      siteName: 'mysite',
      type: 'website',
      images: [
        {
          url: 'imageurl',
          width: 1200,
          height: 630,
          alt: t('alt text'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['imageurl'],
    },
  };
}

export default function Page() {
  const t = useExtracted('commons')
  return (
    <section className="relative h-screen w-full overflow-hidden p-8 md:p-10 flex items-center justify-center">
      <div className="w-full max-w-4xl animate-swipe-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-3xl md:text-4xl text-primary-text tracking-tighter">{t('All my Blog entries!')}</h1>
          <div className="flex items-center gap-2 text-theme-color">
            <Link href={`/blog/personal`} className="flex bg-hover/80 p-3 rounded-lg transition-all duration-200 border  border-theme-color/30 cursor-pointer hover:bg-theme-color/10 items-center gap-2">
              <MdArrowOutward className="inline" />
              {t("Personal Blog")}
            </Link>
            <Link href={`/blog/personal`} className="flex bg-hover/80 p-3 rounded-lg transition-all duration-200 border  border-theme-color/30 cursor-pointer hover:bg-theme-color/10 items-center gap-2">
              <MdArrowOutward className="inline" />
              {t("Tech Blog")}
            </Link>
          </div>
        </div>

        <div className="animate-swipe-in border border-subtle bg-background rounded-lg py-5 mb-50 bg-main/90 w-full max-h-[calc(100vh-200px)] overflow-y-auto pb-8 scrollbar-thin scrollbar-thumb-theme-color/20 scrollbar-track-transparent hover:scrollbar-thumb-theme-color/30 transition-colors duration-300">
          <div className="overflow-hidden">
            <BlogPosts route="all" />
          </div>
        </div>
      </div>
    </section>
  )
}
import { notFound } from 'next/navigation'
import { CustomMDX } from '@/_components/layout/mdx'
import { formatDate, getPersonalPosts } from '../../utils'
import { baseUrl } from '@/app/sitemap'
import Link from "next/link"
import { MdArrowOutward } from "react-icons/md"

export async function generateStaticParams() {
  let posts = getPersonalPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params
  let post = getPersonalPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/personal/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params
  let post = getPersonalPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden p-8 md:p-10 flex items-start justify-center pt-20">
      <div className="w-full max-w-4xl animate-swipe-in">
        <div className="border border-subtle bg-background rounded-lg py-5 mb-50 bg-main/90 w-full max-h-[calc(100vh-200px)] overflow-y-auto pb-8 scrollbar-thin scrollbar-thumb-theme-color/20 scrollbar-track-transparent hover:scrollbar-thumb-theme-color/30 transition-colors duration-300">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `${baseUrl}${post.metadata.image}`
                  : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                url: `${baseUrl}/blog/personal/${post.slug}`,
                author: {
                  '@type': 'Person',
                  name: 'My Portfolio',
                },
              }),
            }}
          />
          <div className="px-6">
            <div className='flex items-center justify-between mb-4'>
              <h1 className="font-bold text-3xl md:text-4xl text-primary-text tracking-tighter">
                {post.metadata.title}
              </h1>
              <Link href={`/blog/personal`} className="flex bg-hover/80 p-3 rounded-lg transition-all duration-200 border border-theme-color/30 cursor-pointer hover:bg-theme-color/10 items-center gap-2">
                <MdArrowOutward className="inline" />
                Back to Personal Blog
              </Link>
            </div>

            <div className="flex justify-between items-center mt-2 mb-8 text-sm">
              <p className="text-sm text-secondary-text">
                {formatDate(post.metadata.publishedAt)}
              </p>
              {post.metadata.summary && (
                <p className="text-sm text-theme-color opacity-80 max-w-md text-right">
                  {post.metadata.summary}
                </p>
              )}
            </div>
            <article className="prose prose-theme max-w-none">
              <CustomMDX source={post.content} />
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
import Link from 'next/link'
import { getPersonalPosts, getTechPosts, formatDate } from '@/app/[locale]/blog/utils'

export function BlogPosts({ route }: { route: string }) {
  let allBlogs = route === 'personal' ? getPersonalPosts() : getTechPosts()

  return (
    /* Changed container to a grid with gap */
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-2 sm:px-5">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post, index) => (
          <div key={post.slug} className="w-full flex">
            <Link
              href={`/blog/${route}/${post.slug}`}
              className="block w-full"
            >
              {/* Removed large horizontal margins to fit the grid cells better */}
              <div className="h-full flex flex-col py-4 px-4 transition-all duration-300 ease-in-out hover:bg-theme-color/10 hover:border-theme-color/50 border border-transparent rounded-lg text-theme-color group">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">↗</span>
                    <span className="font-medium text-primary-text">{post.metadata.title}</span>
                  </div>
                  
                  <div className="text-sm opacity-70 mt-1">
                    {formatDate(post.metadata.publishedAt, false)}
                  </div>

                  {post.metadata.summary && (
                    <p className="text-sm text-secondary-text mt-2 line-clamp-3">
                      {post.metadata.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
        {allBlogs.length > 0 && (
          <div className="col-span-full border border-dashed border-subtle mx-5 md:mx-4"></div>
        )}
    </div>
  )
}
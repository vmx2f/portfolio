import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { highlight } from 'sugar-high'
import React from 'react'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    let slug = slugify(children as string)
    const gradientClasses = {
      1: "from-theme-color/20 via-transparent to-transparent opacity-30",
      2: "from-theme-color/10 via-transparent to-transparent opacity-20", 
      3: "from-theme-color/5 via-transparent to-transparent opacity-15",
      4: "from-theme-color/5 via-transparent to-transparent opacity-10",
      5: "from-theme-color/5 via-transparent to-transparent opacity-8",
      6: "from-theme-color/5 via-transparent to-transparent opacity-6"
    }
    const textClasses = {
      1: "text-4xl font-bold text-primary-text mb-6 tracking-tight",
      2: "text-3xl font-bold text-primary-text mb-4 mt-8 tracking-tight",
      3: "text-2xl font-bold text-primary-text mb-3 mt-6 tracking-tight", 
      4: "text-xl font-semibold text-primary-text mb-2 mt-4 tracking-tight",
      5: "text-lg font-semibold text-primary-text mb-2 mt-4 tracking-tight",
      6: "text-base font-semibold text-primary-text mb-2 mt-4 tracking-tight"
    }
    
    return (
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[level as keyof typeof gradientClasses]} pointer-events-none`}></div>
        {React.createElement(
          `h${level}`,
          { 
            id: slug,
            className: `relative ${textClasses[level as keyof typeof textClasses]} z-10`
          },
          [
            React.createElement('a', {
              href: `#${slug}`,
              key: `link-${slug}`,
              className: 'anchor text-theme-color hover:text-theme-color/80 transition-colors duration-200 underline decoration-2 underline-offset-2',
            }),
          ],
          children
        )}
      </div>
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  let href = props.href

  if (!href) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-theme-color/8 via-transparent to-transparent opacity-4 pointer-events-none"></div>
        <a {...props} className="relative text-theme-color hover:text-theme-color/80 transition-all duration-300 underline decoration-2 underline-offset-2 hover:underline hover:decoration-4 z-10" />
      </div>
    )
  }

  if (href.startsWith('/')) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-theme-color/8 via-transparent to-transparent opacity-4 pointer-events-none"></div>
        <Link href={href} {...props} className="relative text-theme-color hover:text-theme-color/80 transition-all duration-300 underline decoration-2 underline-offset-2 hover:underline hover:decoration-4 z-10" />
      </div>
    )
  }

  if (href.startsWith('#')) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-theme-color/8 via-transparent to-transparent opacity-4 pointer-events-none"></div>
        <a {...props} className="relative text-theme-color hover:text-theme-color/80 transition-all duration-300 underline decoration-2 underline-offset-2 hover:underline hover:decoration-4 z-10" />
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-br from-theme-color/8 via-transparent to-transparent opacity-4 pointer-events-none"></div>
      <a target="_blank" rel="noopener noreferrer" {...props} className="relative text-theme-color hover:text-theme-color/80 transition-all duration-300 underline decoration-2 underline-offset-2 hover:underline hover:decoration-4 z-10" />
    </div>
  )
}

function Code({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  let codeHTML = highlight(children as string)
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-br from-theme-color/20 via-transparent to-transparent opacity-10 pointer-events-none"></div>
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} className="relative bg-hover/50 text-primary-text px-2 py-1 rounded-md text-sm font-mono border border-subtle z-10" />
    </div>
  )
}

const components = {
  // Enhanced headings with slugify and anchor links
  h1: createHeading(1),
  h2: createHeading(2), 
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ children }) => (
    <p className="relative text-primary-text mb-4 leading-relaxed before:absolute before:inset-0 before:bg-gradient-to-br before:from-theme-color/3 before:via-transparent before:to-transparent before:opacity-8 before:pointer-events-none z-10">
      {children}
    </p>
  ),
  // Enhanced link with Next.js routing and external link handling
  a: CustomLink,
  ul: ({ children }) => (
    <ul className="relative list-disc list-inside mb-4 text-primary-text space-y-2 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-theme-color/8 before:via-transparent before:to-transparent before:opacity-5 before:pointer-events-none z-10">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="relative list-decimal list-inside mb-4 text-primary-text space-y-2 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-theme-color/8 before:via-transparent before:to-transparent before:opacity-5 before:pointer-events-none z-10">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="relative text-primary-text leading-relaxed before:absolute before:inset-0 before:bg-gradient-to-bl before:from-theme-color/3 before:via-transparent before:to-transparent before:opacity-3 before:pointer-events-none z-10">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="relative border-l-4 border-theme-color/30 pl-4 py-2 my-4 bg-hover/30 rounded-r-lg text-secondary-text italic before:absolute before:inset-0 before:bg-gradient-to-r before:from-theme-color/15 before:via-transparent before:to-transparent before:opacity-12 before:pointer-events-none z-10">
      {children}
    </blockquote>
  ),
  // Enhanced inline code with syntax highlighting
  code: Code,
  pre: ({ children }) => (
    <pre className="relative bg-main border border-subtle rounded-lg p-4 overflow-x-auto mb-4 before:absolute before:inset-0 before:bg-linear-to-br before:from-theme-color/10 before:via-transparent before:to-transparent before:opacity-8 before:pointer-events-none z-10">
      {children}
    </pre>
  ),
  hr: () => (
    <hr className="relative border border-subtle my-8 before:absolute before:inset-0 before:bg-gradient-to-r before:from-theme-color/5 before:via-transparent before:to-transparent before:opacity-6 before:pointer-events-none z-10" />
  ),
  table: ({ children }) => (
    <table className="relative w-full border-collapse border border-subtle rounded-lg overflow-hidden mb-4 before:absolute before:inset-0 before:bg-linear-to-br before:from-theme-color/8 before:via-transparent before:to-transparent before:opacity-4 before:pointer-events-none z-10">
      {children}
    </table>
  ),
  th: ({ children }) => (
    <th className="relative bg-hover/50 text-primary-text font-semibold px-4 py-3 text-left border-b border-subtle before:absolute before:inset-0 before:bg-gradient-to-r before:from-theme-color/15 before:via-transparent before:to-transparent before:opacity-8 before:pointer-events-none z-10">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="relative px-4 py-3 text-primary-text border-b border-subtle before:absolute before:inset-0 before:bg-gradient-to-r before:from-theme-color/5 before:via-transparent before:to-transparent before:opacity-3 before:pointer-events-none z-10">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="relative last:border-b-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-theme-color/3 before:via-transparent before:to-transparent before:opacity-2 before:pointer-events-none z-10">
      {children}
    </tr>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      className="rounded-lg shadow-md my-6 max-w-full h-auto relative z-10 before:absolute before:inset-0 before:bg-linear-to-br before:from-theme-color/10 before:via-transparent before:to-transparent before:opacity-15 before:pointer-events-none"
      {...(props as ImageProps)}
    />
  ),
  // Alias for Next.js Image component
  Image: (props) => (
    <Image
      sizes="100vw"
      className="rounded-lg shadow-md my-6 max-w-full h-auto relative z-10 before:absolute before:inset-0 before:bg-linear-to-br before:from-theme-color/10 before:via-transparent before:to-transparent before:opacity-15 before:pointer-events-none"
      {...(props as ImageProps)}
    />
  ),
  strong: ({ children }) => (
    <strong className="relative font-bold text-primary-text before:absolute before:inset-0 before:bg-gradient-to-r before:from-theme-color/8 before:via-transparent before:to-transparent before:opacity-4 before:pointer-events-none z-10">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="relative italic text-secondary-text before:absolute before:inset-0 before:bg-linear-to-br before:from-theme-color/5 before:via-transparent before:to-transparent before:opacity-3 before:pointer-events-none z-10">
      {children}
    </em>
  ),
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
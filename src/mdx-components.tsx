import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components = {
  // Allows customizing built-in components with theme-aware styling
  h1: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/20 via-transparent to-transparent opacity-30 pointer-events-none"></div>
      <h1 className="relative text-4xl font-bold text-primary-text mb-6 tracking-tight z-10">
        {children}
      </h1>
    </div>
  ),
  h2: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/10 via-transparent to-transparent opacity-20 pointer-events-none"></div>
      <h2 className="relative text-3xl font-bold text-primary-text mb-4 mt-8 tracking-tight z-10">
        {children}
      </h2>
    </div>
  ),
  h3: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/5 via-transparent to-transparent opacity-15 pointer-events-none"></div>
      <h3 className="relative text-2xl font-bold text-primary-text mb-3 mt-6 tracking-tight z-10">
        {children}
      </h3>
    </div>
  ),
  h4: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/5 via-transparent to-transparent opacity-10 pointer-events-none"></div>
      <h4 className="relative text-xl font-semibold text-primary-text mb-2 mt-4 tracking-tight z-10">
        {children}
      </h4>
    </div>
  ),
  p: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-theme-color/3 via-transparent to-transparent opacity-8 pointer-events-none"></div>
      <p className="relative text-primary-text mb-4 leading-relaxed z-10">
        {children}
      </p>
    </div>
  ),
  a: ({ children, href }) => (
    <a 
      href={href}
      className="text-theme-color hover:text-theme-color/80 transition-all duration-300 underline decoration-2 underline-offset-2 hover:underline hover:decoration-4 relative z-10"
    >
      <span className="relative z-10">{children}</span>
    </a>
  ),
  ul: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-theme-color/8 via-transparent to-transparent opacity-5 pointer-events-none"></div>
      <ul className="relative list-disc list-inside mb-4 text-primary-text space-y-2 z-10">
        {children}
      </ul>
    </div>
  ),
  ol: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-theme-color/8 via-transparent to-transparent opacity-5 pointer-events-none"></div>
      <ol className="relative list-decimal list-inside mb-4 text-primary-text space-y-2 z-10">
        {children}
      </ol>
    </div>
  ),
  li: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-theme-color/3 via-transparent to-transparent opacity-3 pointer-events-none"></div>
      <li className="relative text-primary-text leading-relaxed z-10">
        {children}
      </li>
    </div>
  ),
  blockquote: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/15 via-transparent to-transparent opacity-12 pointer-events-none"></div>
      <blockquote className="relative border-l-4 border-theme-color/30 pl-4 py-2 my-4 bg-hover/30 rounded-r-lg text-secondary-text italic z-10">
        {children}
      </blockquote>
    </div>
  ),
  code: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-theme-color/20 via-transparent to-transparent opacity-10 pointer-events-none"></div>
      <code className="relative bg-hover/50 text-primary-text px-2 py-1 rounded-md text-sm font-mono border border-subtle z-10">
        {children}
      </code>
    </div>
  ),
  pre: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-theme-color/10 via-transparent to-transparent opacity-8 pointer-events-none"></div>
      <pre className="relative bg-main border border-subtle rounded-lg p-4 overflow-x-auto mb-4 z-10">
        {children}
      </pre>
    </div>
  ),
  hr: () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/5 via-transparent to-transparent opacity-6 pointer-events-none"></div>
      <hr className="relative border border-subtle my-8 z-10" />
    </div>
  ),
  table: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-theme-color/8 via-transparent to-transparent opacity-4 pointer-events-none"></div>
      <table className="relative w-full border-collapse border border-subtle rounded-lg overflow-hidden mb-4 z-10">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/15 via-transparent to-transparent opacity-8 pointer-events-none"></div>
      <th className="relative bg-hover/50 text-primary-text font-semibold px-4 py-3 text-left border-b border-subtle z-10">
        {children}
      </th>
    </div>
  ),
  td: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/5 via-transparent to-transparent opacity-3 pointer-events-none"></div>
      <td className="relative px-4 py-3 text-primary-text border-b border-subtle z-10">
        {children}
      </td>
    </div>
  ),
  tr: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/3 via-transparent to-transparent opacity-2 pointer-events-none"></div>
      <tr className="relative last:border-b-0 z-10">
        {children}
      </tr>
    </div>
  ),
  img: (props) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-theme-color/10 via-transparent to-transparent opacity-15 pointer-events-none"></div>
      <Image
        sizes="100vw"
        className="rounded-lg shadow-md my-6 max-w-full h-auto relative z-10"
        {...(props as ImageProps)}
      />
    </div>
  ),
  strong: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-theme-color/8 via-transparent to-transparent opacity-4 pointer-events-none"></div>
      <strong className="relative font-bold text-primary-text z-10">
        {children}
      </strong>
    </div>
  ),
  em: ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-theme-color/5 via-transparent to-transparent opacity-3 pointer-events-none"></div>
      <em className="relative italic text-secondary-text z-10">
        {children}
      </em>
    </div>
  ),
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
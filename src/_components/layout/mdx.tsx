import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

interface TableData {
  headers: string[]
  rows: string[][]
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index} className="bg-hover/50 text-primary-text font-semibold px-4 py-3 text-left border-b border-subtle">{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index} className="last:border-b-0">
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="px-4 py-3 text-primary-text border-b border-subtle">{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table className="w-full border-collapse border border-subtle rounded-lg overflow-hidden mb-4">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  let href = props.href

  if (!href) {
    return <a {...props} className="text-theme-color hover:text-theme-color/80 transition-colors duration-200 underline decoration-2 underline-offset-2" />
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props} className="text-theme-color hover:text-theme-color/80 transition-colors duration-200 underline decoration-2 underline-offset-2" />
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} className="text-theme-color hover:text-theme-color/80 transition-colors duration-200 underline decoration-2 underline-offset-2" />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} className="text-theme-color hover:text-theme-color/80 transition-colors duration-200 underline decoration-2 underline-offset-2" />
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  const { alt, ...restProps } = props
  return <Image alt={alt} className="rounded-lg shadow-md my-6 max-w-full h-auto" {...restProps} />
}

function Code({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  let codeHTML = highlight(children as string)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} className="bg-hover/50 text-primary-text px-2 py-1 rounded-md text-sm font-mono border border-subtle" />
}

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
    return React.createElement(
      `h${level}`,
      { 
        id: slug,
        className: level === 1 ? "text-4xl font-bold text-primary-text mb-6 tracking-tight" :
                 level === 2 ? "text-3xl font-bold text-primary-text mb-4 mt-8 tracking-tight" :
                 level === 3 ? "text-2xl font-bold text-primary-text mb-3 mt-6 tracking-tight" :
                                 "text-xl font-semibold text-primary-text mb-2 mt-4 tracking-tight"
      },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor text-theme-color hover:text-theme-color/80 transition-colors duration-200 underline decoration-2 underline-offset-2',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

export function CustomMDX(props: React.ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
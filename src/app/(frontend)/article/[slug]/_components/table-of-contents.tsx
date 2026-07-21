'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ArticleHeading } from '../_lib/extract-headings'

function useActiveHeading(headings: ArticleHeading[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )

    for (const heading of headings) {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [headings])

  return activeId
}

function HeadingList({
  headings,
  activeId,
  onNavigate,
}: {
  headings: ArticleHeading[]
  activeId: string | null
  onNavigate?: () => void
}) {
  return (
    <ul className="flex flex-col gap-1.5 border-l border-border">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={onNavigate}
            className={cn(
              'block -ml-px border-l py-0.5 text-sm leading-snug transition-colors',
              heading.level === 3 ? 'pl-7' : 'pl-4',
              activeId === heading.id
                ? 'border-primary font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function TableOfContents({ headings }: { headings: ArticleHeading[] }) {
  const activeId = useActiveHeading(headings)

  return (
    <nav aria-label="Table of contents" className="hidden xl:block">
      <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">On This Page</h4>
      <HeadingList headings={headings} activeId={activeId} />
    </nav>
  )
}

export function MobileTableOfContents({ headings }: { headings: ArticleHeading[] }) {
  const activeId = useActiveHeading(headings)
  const [open, setOpen] = useState(false)

  return (
    <nav aria-label="Table of contents" className="mb-8 rounded-lg border border-border xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold uppercase text-muted-foreground cursor-pointer"
      >
        On This Page
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="border-t border-border px-4 py-3">
          <HeadingList headings={headings} activeId={activeId} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </nav>
  )
}

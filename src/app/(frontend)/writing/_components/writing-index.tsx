'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { categoryLabel } from '@/lib/taxonomy'

export type WritingArticle = {
  slug: string
  title: string
  excerpt: string | null
  publishedAt: string | null
  readingTime: number | null
  categories: string[]
  tags: string[]
  image: { url: string; alt: string } | null
}

function buildUrl(query: string, tag: string | null, category: string | null) {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (tag) params.set('tag', tag)
  if (category) params.set('category', category)
  const qs = params.toString()
  return qs ? `/writing?${qs}` : '/writing'
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer',
        active
          ? 'border-transparent bg-primary text-primary-foreground'
          : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground',
      )}
    >
      {label}
    </button>
  )
}

export default function WritingIndex({ articles }: { articles: WritingArticle[] }) {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [activeTag, setActiveTag] = useState<string | null>(searchParams.get('tag'))
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get('category'),
  )

  const syncUrl = (q: string, tag: string | null, category: string | null) => {
    window.history.replaceState(null, '', buildUrl(q, tag, category))
  }

  const handleQuery = (value: string) => {
    setQuery(value)
    syncUrl(value, activeTag, activeCategory)
  }

  const toggleTag = (tag: string) => {
    const next = activeTag === tag ? null : tag
    setActiveTag(next)
    syncUrl(query, next, activeCategory)
  }

  const toggleCategory = (category: string) => {
    const next = activeCategory === category ? null : category
    setActiveCategory(next)
    syncUrl(query, activeTag, next)
  }

  const clearAll = () => {
    setQuery('')
    setActiveTag(null)
    setActiveCategory(null)
    syncUrl('', null, null)
  }

  const { allTags, allCategories } = useMemo(() => {
    const tagCounts = new Map<string, number>()
    const categorySet = new Set<string>()

    for (const article of articles) {
      for (const tag of article.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
      }
      for (const category of article.categories) {
        categorySet.add(category)
      }
    }

    return {
      allTags: Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([tag]) => tag),
      allCategories: Array.from(categorySet).sort(),
    }
  }, [articles])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return articles.filter((article) => {
      if (activeTag && !article.tags.includes(activeTag)) return false
      if (activeCategory && !article.categories.includes(activeCategory)) return false
      if (!needle) return true

      const haystack = [article.title, article.excerpt ?? '', ...article.tags]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [articles, query, activeTag, activeCategory])

  const hasActiveFilters = Boolean(query.trim() || activeTag || activeCategory)

  return (
    <div className="mt-8">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="Search titles, excerpts, tags..."
          className="pl-9"
          aria-label="Search articles"
        />
      </div>

      {(allCategories.length > 0 || allTags.length > 0) && (
        <div className="mt-5 flex flex-col gap-3">
          {allCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Topics
              </span>
              {allCategories.map((category) => (
                <FilterPill
                  key={category}
                  label={categoryLabel(category)}
                  active={activeCategory === category}
                  onClick={() => toggleCategory(category)}
                />
              ))}
            </div>
          )}

          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </span>
              {allTags.map((tag) => (
                <FilterPill
                  key={tag}
                  label={tag}
                  active={activeTag === tag}
                  onClick={() => toggleTag(tag)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex items-baseline justify-between border-b border-border pb-3">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
          {hasActiveFilters ? ' matching' : ''}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium">Nothing matches that.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search, or clear the filters to see everything.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filtered.map((article) => (
            <article key={article.slug} className="group py-8">
              <Link
                href={`/article/${article.slug}`}
                className="grid gap-5 sm:grid-cols-[1fr_200px] sm:items-start"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {article.publishedAt && (
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    )}
                    {article.readingTime && (
                      <>
                        <span className="text-muted-foreground/40">/</span>
                        <span>{article.readingTime} min read</span>
                      </>
                    )}
                    {article.categories.length > 0 && (
                      <>
                        <span className="text-muted-foreground/40">/</span>
                        <span>{article.categories.map(categoryLabel).join(', ')}</span>
                      </>
                    )}
                  </div>

                  <h2 className="mt-2 text-xl font-semibold leading-snug transition-colors group-hover:text-muted-foreground sm:text-2xl">
                    {article.title}
                  </h2>

                  {article.excerpt && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}

                  {article.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {article.image && (
                  <div className="relative hidden h-32 overflow-hidden rounded-lg sm:block">
                    <Image
                      src={article.image.url}
                      alt={article.image.alt}
                      fill
                      sizes="200px"
                      className="object-cover grayscale contrast-90 brightness-80 opacity-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100"
                    />
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

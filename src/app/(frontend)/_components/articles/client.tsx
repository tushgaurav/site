'use client'
import Image from 'next/image'
import Link from 'next/link'
import { use, useState, useTransition, type CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getArticlesPage, type ArticlesPage } from './actions'

export default function ArticlesSectionClient({
  initialPagePromise,
}: {
  initialPagePromise: Promise<ArticlesPage>
}) {
  const initialPage = use(initialPagePromise)

  const [articles, setArticles] = useState(initialPage.articles)
  const [page, setPage] = useState(initialPage.page)
  const [hasNextPage, setHasNextPage] = useState(initialPage.hasNextPage)
  const [newFrom, setNewFrom] = useState(initialPage.articles.length)
  const [loadFailed, setLoadFailed] = useState(false)
  const [isPending, startTransition] = useTransition()

  const showMore = () => {
    setLoadFailed(false)
    startTransition(async () => {
      try {
        const next = await getArticlesPage(page + 1)
        startTransition(() => {
          setNewFrom(articles.length)
          setArticles((prev) => {
            const seen = new Set(prev.map((article) => article.id))
            return [...prev, ...next.articles.filter((article) => !seen.has(article.id))]
          })
          setPage(next.page)
          setHasNextPage(next.hasNextPage)
        })
      } catch {
        setLoadFailed(true)
      }
    })
  }

  if (articles.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-2 mt-6">Recent Articles</h1>
        <p className="text-muted-foreground">No articles published yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2 mt-6">Recent Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => {
          const isNew = index >= newFrom

          return (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className={cn(
                'bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow',
                isNew &&
                  'animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300 ease-out',
              )}
              style={
                isNew
                  ? ({ '--tw-animation-delay': `${(index - newFrom) * 50}ms` } as CSSProperties)
                  : undefined
              }
            >
              {article.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={article.image.url}
                    alt={article.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover filter grayscale contrast-90 brightness-80 opacity-90 hover:grayscale-0 hover:opacity-100 hover:brightness-100 transition-all duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  {article.readingTime && <span>{article.readingTime} min read</span>}
                  {article.publishedAt && (
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {hasNextPage && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <Button
            variant="secondary"
            onClick={showMore}
            disabled={isPending}
            aria-busy={isPending}
            className="cursor-pointer"
          >
            {isPending ? 'Loading…' : 'Show More'}
          </Button>

          {loadFailed && (
            <p role="alert" className="text-xs text-muted-foreground">
              Couldn&apos;t load more articles. Try again.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

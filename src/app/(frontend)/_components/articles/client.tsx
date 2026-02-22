'use client'
import type { Media, Article } from '@/payload-types' // make sure Article is imported if you have it
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'

// Adjust this type based on what payload.find() returns for your setup
type ArticlesResponse = {
  docs: any[] // Ideally replace `any` with your `Article` type
}

export default function ArticlesSectionClient({
  articlesPromise,
}: {
  articlesPromise: Promise<ArticlesResponse>
}) {
  // 1. Unwrap the data promise using `use`
  const { docs: articles } = use(articlesPromise)

  if (!articles || articles.length === 0) {
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
        {articles.map((article) => {
          const featuredImage = article.featuredImage as Media | null
          const imageUrl = featuredImage?.url

          return (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={imageUrl}
                    alt={featuredImage?.alt || article.title}
                    fill
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
    </div>
  )
}
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export default async function ArticlesSection() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: {
        equals: 'published',
      },
      unlisted: {
        equals: false,
      },
    },
    sort: '-publishedAt',
    limit: 6,
  })

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
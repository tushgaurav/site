import { getPayload, type Where } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import type { Article, Media } from '@/payload-types'

export default async function MoreArticles({
  currentArticleSlug,
  tags,
}: {
  currentArticleSlug: string
  tags?: string[] | null
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const baseConditions: Where[] = [
    { status: { equals: 'published' } },
    { unlisted: { equals: false } },
    { slug: { not_equals: currentArticleSlug } },
  ]

  let articles: Article[] = []

  if (tags && tags.length > 0) {
    const { docs } = await payload.find({
      collection: 'articles',
      where: { and: [...baseConditions, { tags: { in: tags } }] },
      sort: '-publishedAt',
      limit: 3,
    })
    articles = docs
  }

  const hasRelated = articles.length > 0

  if (articles.length < 3) {
    const excludeSlugs = articles.map((article) => article.slug)
    const { docs } = await payload.find({
      collection: 'articles',
      where: {
        and: [
          ...baseConditions,
          ...(excludeSlugs.length > 0 ? [{ slug: { not_in: excludeSlugs } }] : []),
        ],
      },
      sort: '-publishedAt',
      limit: 3 - articles.length,
    })
    articles = [...articles, ...docs]
  }

  if (articles.length === 0) return null

  return (
    <div className="mt-10 max-w-lg">
      <h4 className="uppercase text-sm text-muted-foreground font-semibold mb-4">
        {hasRelated ? 'Related' : 'More Articles'}
      </h4>
      <div className="flex flex-col gap-6">
        {articles.map((article) => {
          const image = article.featuredImage as Media | null

          return (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="grid grid-cols-[1.4fr_1fr] gap-4 group"
            >
              <div>
                <h5 className="text-sm font-semibold line-clamp-2 group-hover:text-muted-foreground transition-colors">
                  {article.title}
                </h5>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
              </div>
              {image?.url ? (
                <Image
                  src={image.url}
                  alt={image.alt || article.title}
                  width={200}
                  height={150}
                  className="rounded-xl h-full w-full object-cover"
                />
              ) : (
                <div className="rounded-xl h-full w-full bg-muted" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

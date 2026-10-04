'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'

export type ArticleCard = {
  id: number
  slug: string
  title: string
  excerpt: string | null
  publishedAt: string | null
  readingTime: number | null
  image: { url: string; alt: string } | null
}

export type ArticlesPage = {
  articles: ArticleCard[]
  page: number
  hasNextPage: boolean
}

export async function getArticlesPage(page: number): Promise<ArticlesPage> {
  const safePage = Number.isInteger(page) && page > 0 ? page : 1
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      unlisted: { equals: false },
    },
    sort: '-publishedAt',
    limit: 6,
    page: safePage,
    depth: 1,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      publishedAt: true,
      readingTime: true,
      featuredImage: true,
    },
  })

  return {
    articles: result.docs.map((article) => {
      const image = article.featuredImage as Media | null | undefined

      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt ?? null,
        publishedAt: article.publishedAt ?? null,
        readingTime: article.readingTime ?? null,
        image: image?.url ? { url: image.url, alt: image.alt || article.title } : null,
      }
    }),
    page: result.page ?? safePage,
    hasNextPage: result.hasNextPage,
  }
}

import { getPayload } from 'payload'
import config from '@/payload.config'
import { Suspense } from 'react'
import ArticlesSectionClient from './client'
import ArticlesSectionSkeleton from './skeleton'

export default async function ArticlesSection() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const articlesPromise = payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      unlisted: { equals: false },
    },
    sort: '-publishedAt',
    limit: 6,
  })

  return (
    <Suspense fallback={<ArticlesSectionSkeleton />}>
      <ArticlesSectionClient articlesPromise={articlesPromise} />
    </Suspense>
  )
}
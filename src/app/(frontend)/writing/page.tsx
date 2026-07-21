import { getPayload } from 'payload'
import config from '@/payload.config'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import Link from 'next/link'
import { Page, PageTitle } from '@/components/page'
import WritingIndex, { type WritingArticle } from './_components/writing-index'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays, tutorials, and field notes on software, Linux, and the web by Tushar Gaurav. Search the full library or browse by topic and tag.',
}

export default async function WritingPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      unlisted: { equals: false },
    },
    sort: '-publishedAt',
    limit: 200,
    depth: 1,
  })

  const articles: WritingArticle[] = docs.map((article) => {
    const image = article.featuredImage as Media | null

    return {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt ?? null,
      publishedAt: article.publishedAt ?? null,
      readingTime: article.readingTime ?? null,
      categories: article.categories ?? [],
      tags: article.tags ?? [],
      image: image?.url ? { url: image.url, alt: image.alt ?? article.title } : null,
    }
  })

  return (
    <Page>
      <div className="mt-10 mb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          The Library
        </p>
        <PageTitle className="mt-2 mb-3">Writing</PageTitle>
        <p className="max-w-2xl text-muted-foreground">
          {articles.length} {articles.length === 1 ? 'piece' : 'pieces'} on software, Linux, and
          the web &mdash; searchable, and filterable by topic or tag. For a chronological view,
          see the <Link href="/archive" className="underline underline-offset-4 hover:text-foreground">archive</Link>.
        </p>
      </div>

      <Suspense>
        <WritingIndex articles={articles} />
      </Suspense>
    </Page>
  )
}

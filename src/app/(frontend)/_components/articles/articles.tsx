import { Suspense } from 'react'
import ArticlesSectionClient from './client'
import ArticlesSectionSkeleton from './skeleton'
import { getArticlesPage } from './actions'

export default async function ArticlesSection() {
  const initialPagePromise = getArticlesPage(1)

  return (
    <Suspense fallback={<ArticlesSectionSkeleton />}>
      <ArticlesSectionClient initialPagePromise={initialPagePromise} />
    </Suspense>
  )
}

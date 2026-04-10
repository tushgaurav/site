import { Page, PageTitle, Paragraph } from '@/components/page'
import type { Metadata } from 'next'
import CompaniesTimeline from './_components/companies-timeline'

export const metadata: Metadata = {
  title: 'Companies',
  description:
    'Professional journey through the companies and teams I have been part of.',
}

export default function CompaniesPage() {
  return (
    <Page>
      <PageTitle className="mt-10 mb-4">Companies</PageTitle>
      <Paragraph className="mb-10 text-muted-foreground">
        A timeline of the companies and teams I&apos;ve been part of — building products, shipping
        code, and learning along the way.
      </Paragraph>

      <div className="max-w-2xl">
        <CompaniesTimeline />
      </div>
    </Page>
  )
}

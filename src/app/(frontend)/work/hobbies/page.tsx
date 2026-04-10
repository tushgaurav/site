import { Page, PageTitle, Paragraph } from '@/components/page'
import type { Metadata } from 'next'
import HobbiesGrid from './_components/hobbies-grid'

export const metadata: Metadata = {
  title: 'Hobbies',
  description: 'Side interests and personal pursuits beyond the keyboard.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default function HobbiesPage() {
  return (
    <Page>
      <PageTitle className="mt-10 mb-4">Hobbies</PageTitle>
      <Paragraph className="mb-8 text-muted-foreground">
        Side interests and personal pursuits beyond the keyboard — things I do for fun.
      </Paragraph>

      <HobbiesGrid />
    </Page>
  )
}

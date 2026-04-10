import { Page, PageTitle, Paragraph } from '@/components/page'
import type { Metadata } from 'next'
import ProjectsAtGlance from './_component/projects-at-glance'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of my projects',
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default function ProjectsPage() {
  return (
    <Page>
      <PageTitle className="mt-10 mb-4">Projects</PageTitle>
      <Paragraph className="mb-8 text-muted-foreground">
        A collection of side projects, half-finished ideas, and things that actually work (mostly).
      </Paragraph>

      <ProjectsAtGlance />
    </Page>
  )
}

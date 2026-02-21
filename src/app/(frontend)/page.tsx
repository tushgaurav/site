import { getPayload } from 'payload'
import config from '@/payload.config'
import ArticlesSection from './_components/articles'
import { Page, PageTitle, Paragraph } from '@/components/page'
import SocialLinks from './_components/social-links'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 1,
  })

  return (
    <Page>
      <PageTitle className="mt-10 mb-4">{homepage.heroTitle}</PageTitle>
      <Paragraph className="mt-4 mb-12 max-w-[60ch] text-gray-400">{homepage.bio}</Paragraph>
      <SocialLinks />
      <ArticlesSection />
    </Page>
  )
}

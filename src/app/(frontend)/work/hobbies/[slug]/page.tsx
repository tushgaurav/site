import type { Metadata } from 'next'
import { Page, PageTitle, Paragraph } from '@/components/page'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { RichText } from '@/components/richtext'
import type { Media } from '@/payload-types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'hobbies',
    depth: 1,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const hobby = docs[0]

  if (!hobby) return { title: 'Not Found' }

  return {
    title: hobby.title,
    description: hobby.description,
    openGraph: {
      title: hobby.title,
      description: hobby.description,
      type: 'website',
      url: absoluteUrl(`/work/hobbies/${slug}`),
      images: [
        {
          url: `/og?title=${encodeURIComponent(hobby.title)}&description=${encodeURIComponent(hobby.description)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: hobby.title,
      description: hobby.description,
      images: [
        `/og?title=${encodeURIComponent(hobby.title)}&description=${encodeURIComponent(hobby.description)}`,
      ],
      creator: '@tushgaurav',
    },
  }
}

export default async function HobbyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'hobbies',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const hobby = docs[0]

  if (!hobby) notFound()

  const featuredImage = hobby.featuredImage as Media | null

  return (
    <Page>
      <PageTitle>{hobby.title}</PageTitle>
      <Paragraph className="mb-4 text-muted-foreground">{hobby.description}</Paragraph>

      {featuredImage?.url && (
        <Image
          src={featuredImage.url}
          alt={featuredImage.alt || hobby.title}
          width={800}
          height={600}
          className="object-cover mb-8 max-w-xl xl:max-w-2xl rounded-lg"
        />
      )}

      <RichText data={hobby.content} />
    </Page>
  )
}

import type { Metadata, ResolvingMetadata } from 'next'
import { RichText } from '@/components/richtext'
import { Page, PageTitle, Paragraph } from '@/components/page'
import config from '@/payload.config'
import { getPayload } from 'payload'
import MoreArticles from './_components/more-articles'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import ShareThis from './_components/share-this'
import { Separator } from '@/components/ui/separator'
import { Media } from '@/payload-types'
import CopyMarkdown from './_components/copy-markdown'
import { convertLexicalToMarkdown, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { DocsCopyPage } from '@/components/article-copy-page'
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
    collection: 'articles',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const article = docs[0]

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt!,
      type: "article",
      url: absoluteUrl(`/article/${slug}`),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            article.title
          )}&description=${encodeURIComponent(article.excerpt!)}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt!,
      images: [
        `/og?title=${encodeURIComponent(
          article.title
        )}&description=${encodeURIComponent(article.excerpt!)}`
      ],
      creator: "@tushgaurav"
    }
  }
}

async function getArticleMarkdown(content: any, payloadConfig: any) {
  try {
    // Create a copy of the content without custom blocks for markdown conversion
    const contentCopy = JSON.parse(JSON.stringify(content))

    // Recursively remove block nodes that aren't supported by markdown
    const removeUnsupportedBlocks = (node: any): any => {
      if (!node) return node

      if (node.type === 'block') {
        // Replace block nodes with a placeholder
        return {
          type: 'paragraph',
          children: [{
            type: 'text',
            text: `[${node.fields?.blockType || 'block'}: content not included in markdown]`,
            format: 0,
            version: 1
          }],
          format: '',
          indent: 0,
          version: 1
        }
      }

      if (node.children) {
        node.children = node.children.map(removeUnsupportedBlocks).filter(Boolean)
      }

      return node
    }

    if (contentCopy.root?.children) {
      contentCopy.root.children = contentCopy.root.children.map(removeUnsupportedBlocks).filter(Boolean)
    }

    return convertLexicalToMarkdown({
      data: contentCopy,
      editorConfig: await editorConfigFactory.default({ config: payloadConfig }),
    })
  } catch (error) {
    console.error('Error converting to markdown:', error)
    return '<!-- Unable to convert article to markdown -->'
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'articles',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const article = docs[0]

  return (
    <Page>
      <div className="flex flex-col gap-2 lg:gap-4 mt-6 md:mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {article.tags?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="hidden md:block">
            <DocsCopyPage url={`https://www.tushgaurav.com/article/${slug}`} />
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2 lg:gap-4">
          <div className="text-muted-foreground text-sm font-semibold uppercase">
            {new Date(article.publishedAt!).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <span className="text-muted-foreground/40">|</span>
          <div className="text-muted-foreground text-sm font-semibold uppercase">
            {article.readingTime} min read
          </div>
          <div className="md:hidden">
            <DocsCopyPage url={`https://www.tushgaurav.com/article/${slug}`} />
          </div>
        </div>
      </div>
      <PageTitle>{article.title}</PageTitle>

      <div className="xl:flex flex-row-reverse items-start gap-8">
        <Paragraph className="mt-2 mb-4 text-muted-foreground text-lg max-w-lg xl:max-w-none lg:mt-0 relative before:content-['/'] before:hidden before:lg:inline-block before:mr-2 before:text-2xl before:xl:text-3xl">
          {article.excerpt}
        </Paragraph>

        <Image
          src={(article.featuredImage as Media)?.url!}
          alt={(article.featuredImage as Media)?.alt!}
          width={800}
          height={800}
          className="rounded-lg w-full xl:max-w-2xl h-auto mb-4"
        />
      </div>

      <div className="mx-auto grid gap-x-10 xl:grid-cols-[1fr_300px]">
        <RichText data={article.content} />
        <aside className="sticky top-20 self-start h-fit">
          <MoreArticles currentArticleSlug={slug} />
          <ShareThis />
        </aside>
      </div>
      {errror}

      <Separator className="mt-4 mb-8" />
      <div className="flex items-center gap-2">
        <CopyMarkdown markdown={await getArticleMarkdown(article.content, payloadConfig)} />
      </div>
    </Page>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/richtext'
import { Page, PageTitle, Paragraph } from '@/components/page'
import config from '@/payload.config'
import { getPayload } from 'payload'
import MoreArticles from './_components/more-articles'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import ShareThis from './_components/share-this'
import { Separator } from '@/components/ui/separator'
import { Media, User } from '@/payload-types'
import CopyMarkdown from './_components/copy-markdown'
import { convertLexicalToMarkdown, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { DocsCopyPage } from '@/components/article-copy-page'
import { absoluteUrl } from '@/lib/utils'
import { categoryLabel } from '@/lib/taxonomy'
import { extractHeadings } from './_lib/extract-headings'
import { TableOfContents, MobileTableOfContents } from './_components/table-of-contents'

async function getArticle(slug: string) {
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

  return docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article not found',
    }
  }

  const description = article.excerpt ?? ''
  const ogImage = `/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(description)}`

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      url: absoluteUrl(`/article/${slug}`),
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [ogImage],
      creator: '@tushgaurav',
    },
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

const DAY_IN_MS = 24 * 60 * 60 * 1000

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const author = typeof article.author === 'object' ? (article.author as User) : null
  const featuredImage =
    typeof article.featuredImage === 'object' ? (article.featuredImage as Media | null) : null
  const headings = extractHeadings(article.content)
  const showToc = headings.length >= 3

  const wasUpdated =
    article.publishedAt &&
    new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() > DAY_IN_MS

  const articleUrl = absoluteUrl(`/article/${slug}`)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt ?? undefined,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: author?.name ?? 'Tushar Gaurav',
      url: absoluteUrl('/about'),
    },
    image:
      featuredImage?.url ??
      absoluteUrl(`/og?title=${encodeURIComponent(article.title)}`),
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    ...(article.tags && article.tags.length > 0 ? { keywords: article.tags.join(', ') } : {}),
  }

  return (
    <Page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-2 lg:gap-4 mt-6 md:mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <Badge key={tag} asChild>
                <Link href={`/writing?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
              </Badge>
            ))}
          </div>
          <div className="hidden md:block">
            <DocsCopyPage url={`https://www.tushgaurav.com/article/${slug}`} />
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2 lg:gap-4">
          {article.categories && article.categories.length > 0 && (
            <>
              <div className="flex items-center gap-2">
                {article.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/writing?category=${encodeURIComponent(category)}`}
                    className="text-muted-foreground text-sm font-semibold uppercase hover:text-foreground transition-colors"
                  >
                    {categoryLabel(category)}
                  </Link>
                ))}
              </div>
              <span className="text-muted-foreground/40">|</span>
            </>
          )}
          {article.publishedAt && (
            <>
              <div className="text-muted-foreground text-sm font-semibold uppercase">
                {formatDate(article.publishedAt)}
              </div>
              <span className="text-muted-foreground/40">|</span>
            </>
          )}
          {wasUpdated && (
            <>
              <div className="text-muted-foreground text-sm font-semibold uppercase">
                Updated {formatDate(article.updatedAt)}
              </div>
              <span className="text-muted-foreground/40">|</span>
            </>
          )}
          <div className="text-muted-foreground text-sm font-semibold uppercase">
            {article.readingTime} min read
          </div>
          <div className="md:hidden">
            <DocsCopyPage url={`https://www.tushgaurav.com/article/${slug}`} />
          </div>
        </div>
      </div>
      <PageTitle>{article.title}</PageTitle>
      {author && (
        <p className="text-sm text-muted-foreground -mt-2 mb-4">
          By <span className="font-medium text-foreground">{author.name}</span>
        </p>
      )}

      <div className="xl:flex flex-row-reverse items-start gap-8">
        <Paragraph className="mt-2 mb-4 text-muted-foreground text-lg max-w-lg xl:max-w-none lg:mt-0 relative before:content-['/'] before:hidden before:lg:inline-block before:mr-2 before:text-2xl before:xl:text-3xl">
          {article.excerpt}
        </Paragraph>

        {featuredImage?.url && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || article.title}
            width={800}
            height={800}
            className="rounded-lg w-full xl:max-w-2xl h-auto mb-4"
          />
        )}
      </div>

      <div className="mx-auto grid gap-x-10 xl:grid-cols-[1fr_300px]">
        <div>
          {showToc && <MobileTableOfContents headings={headings} />}
          <RichText data={article.content} />
        </div>
        <aside className="sticky top-20 self-start h-fit">
          {showToc && <TableOfContents headings={headings} />}
          <MoreArticles currentArticleSlug={slug} tags={article.tags} />
          <ShareThis />
        </aside>
      </div>
      <Separator className="mt-4 mb-8" />
      <div className="flex items-center gap-2">
        <CopyMarkdown markdown={await getArticleMarkdown(article.content, payloadConfig)} />
      </div>
    </Page>
  )
}

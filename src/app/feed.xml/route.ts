import RSS from "rss"
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function GET() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const articles = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 15
  })

  const feed = new RSS({
        title: 'Tushar Gaurav\'s Blog',
        description: "Articles about computers and technology",
        generator: 'Payload CMS',
        feed_url: 'https://www.tushgaurav.com/feed.xml',
        site_url: 'https://www.tushgaurav.com/',
        managingEditor: 'iamtushgaurav@gmail.com (Tushar Gaurav)',
        webMaster: 'iamtushgaurav@gmail.com (Tushar Gaurav)',
        copyright: `Copyright ${new Date().getFullYear().toString()}, Tushar Gaurav`,
        language: 'en-US',
        pubDate: new Date().toUTCString(),
        ttl: 60,
    });

    for (const article of articles.docs) {
        feed.item({
            title: article.title,
            description: article.excerpt,
            url: `https://www.tushgaurav.com/article/${article.slug}`,
            categories: article.categories,
            author: 'Tushar Gaurav',
            date: article.publishedAt,
        })
    }

    return new Response(feed.xml(), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export default async function HobbiesGrid() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: hobbies } = await payload.find({
    collection: 'hobbies',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 20,
  })

  if (!hobbies || hobbies.length === 0) {
    return (
      <div>
        <p className="text-muted-foreground">No hobbies published yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hobbies.map((hobby) => {
        const featuredImage = hobby.featuredImage as Media | null
        const imageUrl = featuredImage?.url

        return (
          <Link
            href={`/work/hobbies/${hobby.slug}`}
            key={hobby.id}
            className="group flex flex-col h-full"
          >
            <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              {imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={imageUrl}
                    alt={featuredImage?.alt || hobby.title}
                    fill
                    className="object-cover filter grayscale-50 contrast-90 brightness-80 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{hobby.title}</h3>
                {hobby.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {hobby.description}
                  </p>
                )}
                {hobby.publishedAt && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <span>
                      {new Date(hobby.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

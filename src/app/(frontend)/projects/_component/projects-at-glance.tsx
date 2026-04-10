import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectsAtGlance() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const projects = await payload.find({
    collection: 'projects',
    limit: 20,
    sort: '-updatedAt',
  })

  if (!projects.docs || projects.docs.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-2 mt-6">Projects at a Glance</h2>
        <p className="text-muted-foreground">No projects available yet.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.docs.map((project) => {
          const projectImage = project.image as Media | null
          const imageUrl = projectImage?.url

          return (
            <Link href={`/projects/${project.slug}`} key={project.id} className="group flex flex-col h-full">
              <div
                key={project.id}
                className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
              >
                {imageUrl && (
                  <div className="relative w-full h-48">
                    <Image
                      src={imageUrl}
                      alt={projectImage?.alt || project.title}
                      fill
                      className="object-cover filter grayscale-50 contrast-90 brightness-80 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedUploadNode, SerializedHorizontalRuleNode } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import { Media } from '@/payload-types'

export const uploadConverter: JSXConverters<SerializedUploadNode> = {
  upload: ({ node }) => {
    const { value } = node

    if (!value || typeof value === 'string') {
      return null
    }

    const { url, alt, width, height, filename, mimeType } = value as Media

    if (!url) {
      return null
    }

    if (mimeType?.startsWith('video/')) {
      return (
        <figure className="my-8">
          <video
            src={url}
            controls
            playsInline
            preload="metadata"
            className="rounded-lg shadow-md w-full h-auto"
          >
            Your browser does not support the video tag.
          </video>
          {alt ? (
            <figcaption className="mt-2 text-sm text-muted-foreground">{alt}</figcaption>
          ) : null}
        </figure>
      )
    }

    return (
      <figure className="my-8">
        <Image
          src={url}
          alt={alt || filename || 'Article image'}
          width={width || 1200}
          height={height || 800}
          className="rounded-lg shadow-md w-full h-auto"
          priority={false}
        />
      </figure>
    )
  },
}

export const horizontalRuleConverter: JSXConverters<SerializedHorizontalRuleNode> = {
  horizontalrule: () => {
    return <hr className="my-12 border-t-2 border-border/50" />
  },
}

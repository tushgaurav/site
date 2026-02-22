import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        disableListColumn: true,
      }
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        disableListColumn: true,
      }
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      (args)  => {
        revalidatePath('/projects')
      }
    ],
  },
}

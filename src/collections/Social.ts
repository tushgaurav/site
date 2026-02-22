import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const SocialLinks: CollectionConfig = {
  slug: 'social-links',
  admin: {
    useAsTitle: 'platform',
  },
  fields: [
    {
      name: 'platform',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
    },
    {
        name: 'si-icon-name',
        label: 'Simple Icons - Slug',
        type: 'text',
        required: false,
        admin: {
            position: 'sidebar',
        },
    },
    {
        name: 'icon-upload',
        type: 'upload',
        relationTo: 'media',
        required: false,
        admin: {
            position: 'sidebar',
            disableListColumn: true,
        },
    }
  ],
  hooks: {
    afterChange: [
      (args)  => {
        revalidatePath('/')
      }
    ],
    afterDelete: [
      (args)  => {
        revalidatePath('/')
      }
    ],
  },
}
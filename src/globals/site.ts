import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      name: 'heroTitle',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bio',
      type: 'text',
    },
    {
      name: 'featuredArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
  ],
}

export const about: GlobalConfig = {
  slug: 'about',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: "Hi, I'm Tushar Gaurav.",
        },
        {
          name: 'tagline',
          type: 'textarea',
          required: true,
          maxLength: 300,
        },
      ],
    },

    {
      name: 'history',
      type: 'group',
      label: 'History',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'From Dhanbad to Dev',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              LinkFeature(),
              FixedToolbarFeature(),
            ],
          }),
          required: true,
        },
      ],
    },

    {
      name: 'mission',
      type: 'group',
      label: 'Mission & Vision',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'What I\'m Building Toward',
        },
        {
          name: 'missions',
          type: 'array',
          label: 'Missions',
          minRows: 1,
          maxRows: 5,
          fields: [
            {
              name: 'mission',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'currentFocus',
          type: 'richText',
          label: 'Current Focus',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              LinkFeature(),
              FixedToolbarFeature(),
            ],
          }),
          required: false,
        },
      ],
    },

    {
      name: 'realTalk',
      type: 'group',
      label: 'The Real Talk',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Things I\'m Working On (The Human Stuff)',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              LinkFeature(),
              FixedToolbarFeature(),
            ],
          }),
          required: true,
        },
      ],
    },

    {
      name: 'beliefs',
      type: 'group',
      label: 'What I Believe',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Ideas Worth Sharing',
        },
        {
          name: 'beliefsList',
          type: 'array',
          label: 'Beliefs',
          minRows: 1,
          fields: [
            {
              name: 'belief',
              type: 'textarea',
              required: true,
              maxLength: 500,
            },
          ],
        },
      ],
    },

    {
      name: 'interests',
      type: 'group',
      label: 'When I\'m Not Coding',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'The Other Stuff',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              LinkFeature(),
              FixedToolbarFeature(),
            ],
          }),
          required: true,
        },
      ],
    },

    {
      name: 'wisdom',
      type: 'array',
      label: 'Wisdom & Quotes',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          maxLength: 500,
        },
      ],
    },
  ],
}
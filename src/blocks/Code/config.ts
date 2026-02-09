import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      label: 'Language',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'TypeScript React', value: 'tsx' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'JavaScript React', value: 'jsx' },
        { label: 'Python', value: 'python' },
        { label: 'C', value: 'c' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'JSON', value: 'json' },
        { label: 'YAML', value: 'yaml' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Shell', value: 'shell' },
        { label: 'SQL', value: 'sql' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'typescript',
      required: true,
    },
    {
      name: 'code',
      type: 'textarea',
      label: 'Code',
      required: true,
      admin: {
        rows: 10,
        placeholder: 'Paste your code here...',
      },
    },
    {
      name: 'filename',
      type: 'text',
      label: 'Filename (optional)',
    },
  ],
}

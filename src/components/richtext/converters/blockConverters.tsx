import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { CodeBlock } from '@/blocks/Code/Component'

export const blockConverter: JSXConverters<SerializedBlockNode> = {
  blocks: {
    code: ({ node }) => <CodeBlock {...node.fields} />,
  },
}

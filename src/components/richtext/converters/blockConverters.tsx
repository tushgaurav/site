import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

export const blockConverter: JSXConverters<SerializedBlockNode<CodeBlockProps>> = {
  blocks: {
    code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
      <CodeBlock {...node.fields} />
    ),
  },
}

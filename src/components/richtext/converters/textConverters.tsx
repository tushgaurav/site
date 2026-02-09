import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import {
  SerializedParagraphNode,
  SerializedListNode,
  SerializedListItemNode,
  SerializedBlockNode,
  SerializedQuoteNode,
  SerializedLineBreakNode,
} from '@payloadcms/richtext-lexical'

export const paragraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ nodesToJSX, node }) => {
    return <p className="mb-6">{nodesToJSX({ nodes: node.children })}</p>
  },
}

export const listConverter: JSXConverters<SerializedListNode | SerializedListItemNode> = {
  list: ({ node, nodesToJSX }) => {
    const Tag = node.listType === 'bullet' ? 'ul' : 'ol'
    return (
      <Tag className={`${node.listType === 'bullet' ? 'list-disc' : 'list-decimal'} pl-6`}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },
  listitem: ({ node, nodesToJSX }) => {
    return <li className="pl-2">{nodesToJSX({ nodes: node.children })}</li>
  },
}

export const quoteConverter: JSXConverters<SerializedQuoteNode> = {
  quote: ({ node, nodesToJSX }) => {
    return (
      <blockquote className="mb-6 border-l-4 border-primary pl-6 pr-4 py-2 italic text-foreground/80 bg-muted/30">
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    )
  },
}

export const linebreakConverter: JSXConverters<SerializedLineBreakNode> = {
  linebreak: () => {
    return <br />
  },
}

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  children?: LexicalNode[]
  [k: string]: unknown
}

export type ArticleHeading = {
  id: string
  text: string
  level: 2 | 3
}

// Mirrors headingConverter: only unformatted text nodes render as plain strings,
// so only they contribute to the anchor id.
function anchorText(node: LexicalNode): string {
  return (node.children ?? [])
    .map((child) => (child.type === 'text' && !child.format ? (child.text ?? '') : ''))
    .join('')
}

function fullText(node: LexicalNode): string {
  if (node.type === 'text') return node.text ?? ''
  return (node.children ?? []).map(fullText).join('')
}

export function extractHeadings(content: unknown): ArticleHeading[] {
  const root = (content as { root?: LexicalNode } | null)?.root
  const headings: ArticleHeading[] = []

  for (const node of root?.children ?? []) {
    if (node.type !== 'heading' || (node.tag !== 'h2' && node.tag !== 'h3')) continue

    const id = anchorText(node)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    if (!id) continue

    headings.push({
      id,
      text: fullText(node).trim() || id,
      level: node.tag === 'h2' ? 2 : 3,
    })
  }

  return headings
}

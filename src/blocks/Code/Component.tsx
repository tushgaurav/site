import React from 'react'
import { Code } from './Component.client'
import { cn } from '@/lib/utils'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
  filename?: string
}

type Props = CodeBlockProps & { className?: string }

export const CodeBlock: React.FC<Props> = ({ className, code, language, filename }: Props) => {
  // Handle cases where code might be undefined or null
  if (!code) {
    return null
  }

  return (
    <div className={cn(className)}>
      <Code code={code} language={language} filename={filename} />
    </div>
  )
}

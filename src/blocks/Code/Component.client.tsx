'use client'

import { Highlight, themes } from 'prism-react-renderer'
import CopyButton from './CopyButton'

type Props = {
  code: string
  language?: string
  filename?: string
}

export const Code: React.FC<Props> = ({ code, language = 'typescript', filename }) => {
  if (!code) return null

  return (
    <div className="not-prose my-4">
      {/* Header with filename and copy button */}
      {(filename || language) && (
        <div className="flex items-center justify-between bg-muted/50 border border-border rounded-t-lg px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-mono text-foreground/80">{filename}</span>
            )}
            {!filename && language && (
              <span className="text-xs text-muted-foreground uppercase">{language}</span>
            )}
          </div>
          <CopyButton code={code} />
        </div>
      )}

      {/* Code block */}
      <Highlight theme={themes.oneDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 ${filename || language ? 'rounded-b-lg' : 'rounded-lg'} border border-border ${filename || language ? 'border-t-0' : ''}`}
            style={style}
          >
            {!filename && !language && (
              <div className="absolute top-2 right-2">
                <CopyButton code={code} />
              </div>
            )}
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                <span className="table-cell select-none text-right pr-4 text-muted-foreground/50">
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { RotateCcw, ArrowLeft } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1c1c1c',
          color: '#e2e2e2',
          fontFamily:
            'Geist, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '32rem',
          }}
        >
          {/* Big glitchy 500 */}
          <div style={{ position: 'relative', marginBottom: '2rem', userSelect: 'none' }}>
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                fontFamily: 'monospace',
                fontSize: 'clamp(6rem, 20vw, 10rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: 'rgba(255,255,255,0.08)',
              }}
            >
              500
            </span>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'block',
                fontFamily: 'monospace',
                fontSize: 'clamp(6rem, 20vw, 10rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: 'rgba(220,60,60,0.18)',
                clipPath: 'inset(20% 0 50% 0)',
                animation: 'glitch-1 3s ease-in-out infinite',
              }}
            >
              500
            </span>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'block',
                fontFamily: 'monospace',
                fontSize: 'clamp(6rem, 20vw, 10rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: 'rgba(255,255,255,0.12)',
                clipPath: 'inset(60% 0 5% 0)',
                animation: 'glitch-2 3s ease-in-out infinite 0.1s',
              }}
            >
              500
            </span>
          </div>

          <h1
            style={{
              margin: '0 0 0.75rem',
              fontSize: '1.5rem',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: '#e2e2e2',
            }}
          >
            Something went very wrong
          </h1>
          <p
            style={{
              margin: '0 0 2.5rem',
              maxWidth: '30ch',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'rgba(226,226,226,0.5)',
            }}
          >
            A critical error occurred. Try refreshing the page, or head back to the homepage.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.35rem',
                border: 'none',
                backgroundColor: '#e2e2e2',
                color: '#1c1c1c',
                cursor: 'pointer',
              }}
            >
              <RotateCcw style={{ width: '1rem', height: '1rem' }} />
              Try again
            </button>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.35rem',
                border: '1px solid rgba(226,226,226,0.2)',
                backgroundColor: 'transparent',
                color: '#e2e2e2',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
              Go home
            </a>
          </div>

          {error.digest && (
            <p
              style={{
                marginTop: '2.5rem',
                fontFamily: 'monospace',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(226,226,226,0.25)',
              }}
            >
              ref: {error.digest}
            </p>
          )}
        </div>

        <style>{`
          @keyframes glitch-1 {
            0%, 90%, 100% { transform: translate(0); }
            92% { transform: translate(-3px, 1px); }
            94% { transform: translate(2px, -1px); }
            96% { transform: translate(-1px, 2px); }
          }
          @keyframes glitch-2 {
            0%, 88%, 100% { transform: translate(0); }
            90% { transform: translate(2px, -1px); }
            93% { transform: translate(-3px, 1px); }
            95% { transform: translate(1px, -2px); }
          }
        `}</style>
      </body>
    </html>
  )
}

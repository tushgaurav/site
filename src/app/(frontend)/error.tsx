'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
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
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6">
      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        {/* Glitch error code */}
        <div
          className="relative mb-8 select-none"
          style={{ animation: 'fade-up 0.6s ease-out both' }}
        >
          <span
            className="block font-mono text-[8rem] font-bold leading-none tracking-tighter text-primary/10 sm:text-[10rem]"
            aria-hidden="true"
          >
            500
          </span>

          {/* Glitch layers */}
          <span
            className="absolute inset-0 block font-mono text-[8rem] font-bold leading-none tracking-tighter text-destructive/20 sm:text-[10rem]"
            aria-hidden="true"
            style={{
              animation: 'glitch-1 3s ease-in-out infinite',
              clipPath: 'inset(20% 0 50% 0)',
            }}
          >
            500
          </span>
          <span
            className="absolute inset-0 block font-mono text-[8rem] font-bold leading-none tracking-tighter text-primary/15 sm:text-[10rem]"
            aria-hidden="true"
            style={{
              animation: 'glitch-2 3s ease-in-out infinite 0.1s',
              clipPath: 'inset(60% 0 5% 0)',
            }}
          >
            500
          </span>
        </div>

        <h1
          className="mb-3 text-2xl font-medium tracking-tight text-primary sm:text-3xl"
          style={{ animation: 'fade-up 0.6s ease-out 0.2s both' }}
        >
          Something went wrong
        </h1>
        <p
          className="mb-10 max-w-sm text-sm leading-relaxed text-muted-foreground"
          style={{ animation: 'fade-up 0.6s ease-out 0.3s both' }}
        >
          An unexpected error occurred on our end. This is likely a temporary issue — try again,
          or head back home.
        </p>

        <div
          className="flex items-center gap-3"
          style={{ animation: 'fade-up 0.6s ease-out 0.4s both' }}
        >
          <Button onClick={() => reset()} variant="default" size="lg" className="gap-2">
            <RotateCcw className="size-4" />
            Try again
          </Button>
          <Button variant="ghost" size="lg" asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Go home
            </Link>
          </Button>
        </div>

        {error.digest && (
          <p
            className="mt-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40"
            style={{ animation: 'fade-up 0.6s ease-out 0.5s both' }}
          >
            ref: {error.digest}
          </p>
        )}
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch-1 {
          0%, 90%, 100% {
            transform: translate(0);
          }
          92% {
            transform: translate(-3px, 1px);
          }
          94% {
            transform: translate(2px, -1px);
          }
          96% {
            transform: translate(-1px, 2px);
          }
        }

        @keyframes glitch-2 {
          0%, 88%, 100% {
            transform: translate(0);
          }
          90% {
            transform: translate(2px, -1px);
          }
          93% {
            transform: translate(-3px, 1px);
          }
          95% {
            transform: translate(1px, -2px);
          }
        }
      `}</style>
    </div>
  )
}

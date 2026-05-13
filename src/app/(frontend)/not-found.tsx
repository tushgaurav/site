import Link from 'next/link'
import { ArrowLeft, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6">
      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        {/* Large decorative 404 */}
        <div
          className="relative mb-8 select-none"
          style={{ animation: 'fade-up 0.6s ease-out both' }}
        >
          <span
            className="block font-mono text-[8rem] font-bold leading-none tracking-tighter text-primary/10 sm:text-[10rem]"
            aria-hidden="true"
          >
            404
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
            404
          </span>
          <span
            className="absolute inset-0 block font-mono text-[8rem] font-bold leading-none tracking-tighter text-primary/15 sm:text-[10rem]"
            aria-hidden="true"
            style={{
              animation: 'glitch-2 3s ease-in-out infinite 0.1s',
              clipPath: 'inset(60% 0 5% 0)',
            }}
          >
            404
          </span>
        </div>

        <div
          className="mb-5 flex items-center justify-center gap-2 text-muted-foreground"
          style={{ animation: 'fade-up 0.6s ease-out 0.1s both' }}
        >
          <SearchX className="size-5" />
          <span className="font-mono text-sm uppercase tracking-widest">Page not found</span>
        </div>

        <h1
          className="mb-3 text-2xl font-medium tracking-tight text-primary sm:text-3xl"
          style={{ animation: 'fade-up 0.6s ease-out 0.2s both' }}
        >
          Lost in the void
        </h1>
        <p
          className="mb-10 max-w-sm text-sm leading-relaxed text-muted-foreground"
          style={{ animation: 'fade-up 0.6s ease-out 0.3s both' }}
        >
          The page you're looking for doesn't exist or has been moved. Head back home
          and pick up where you left off.
        </p>

        <div
          className="flex items-center gap-3"
          style={{ animation: 'fade-up 0.6s ease-out 0.4s both' }}
        >
          <Button variant="default" size="lg" asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back home
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild className="gap-2">
            <Link href="/archive">Browse articles</Link>
          </Button>
        </div>
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

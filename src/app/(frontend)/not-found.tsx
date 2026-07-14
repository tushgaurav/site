"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const SMEAR_COUNT = 18
const VOID_LINES = 4
const VOID_BARS = [
  { h: "42%", w: 2 },
  { h: "68%", w: 3 },
  { h: "55%", w: 2 },
  { h: "90%", w: 4 },
  { h: "38%", w: 2 },
  { h: "72%", w: 3 },
  { h: "48%", w: 2 },
  { h: "85%", w: 5 },
  { h: "33%", w: 2 },
  { h: "61%", w: 3 },
  { h: "77%", w: 2 },
  { h: "44%", w: 4 },
  { h: "92%", w: 3 },
  { h: "29%", w: 2 },
  { h: "66%", w: 2 },
  { h: "51%", w: 3 },
]

const LINE_NUMS_LEFT = [10, 20, 30, 40, 50]
const LINE_NUMS_RIGHT = [60, 70, 80, 90, 100]

export default function NotFound() {
  const router = useRouter()
  const [escMessage, setEscMessage] = useState<string | null>(null)

  const goHome = () => {
    router.push("/")
  }

  const tryAgain = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        router.push("/")
      } else if (e.key === "Escape") {
        e.preventDefault()
        setEscMessage("ESC IGNORED. COWARDICE LOGGED.")
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [router])

  useEffect(() => {
    if (!escMessage) return
    const t = window.setTimeout(() => setEscMessage(null), 2800)
    return () => window.clearTimeout(t)
  }, [escMessage])

  return (
    <div
      className="bsod fixed inset-0 z-[100] flex flex-col overflow-hidden font-mono uppercase text-white"
      role="alert"
      aria-live="polite"
    >
      {/* Top bar */}
      <header className="flex shrink-0 items-baseline justify-between gap-4 px-3 pt-3 text-[10px] leading-none tracking-wider sm:px-5 sm:pt-4 sm:text-xs">
        <span>:// TUSHGAURAV.COM</span>
        <span className="hidden text-center sm:block">
          404 ERROR : PAGE NOT FOUND
        </span>
        <span className="tabular-nums opacity-70" aria-hidden="true">
          {escMessage ? "ERR" : "OK"}
        </span>
      </header>

      {/* Main grid */}
      <div className="relative min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-6">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 gap-6 text-[9px] leading-relaxed tracking-wide sm:text-[10px] md:grid-cols-[1fr_1.4fr_1fr] md:gap-4 lg:gap-8 lg:text-[11px]">
          {/* Left — system status (order 2 on mobile) */}
          <aside className="order-2 space-y-1 opacity-90 md:order-1">
            <p>SYSTEM: TUSHGAURAV.COM_404_HANDLER</p>
            <p>RUNNING ERROR ROUTINE...</p>
            <p className="mt-3">&gt;&gt;&gt; PAGE NOT FOUND_EXCEPTION</p>
            <p className="mt-3">1401 AUTOCODER // PAGE RETRIEVAL FAILURE</p>
            <p>LOC 004: ATTEMPTED TO LOAD RESOURCE [404.PAGE]</p>
            <p className="mt-3">STATUS: NULL_POINTER_REFERENCE</p>
            <p>RETURN CODE: -404</p>
            <p className="mt-4 opacity-60">
              STACK: REQUEST → ROUTER → VOID → HERE
            </p>
            <p className="opacity-60">PID: 0x0F04 · TICKS: ∞</p>
          </aside>

          {/* Middle — recovery (first on mobile) */}
          <section className="order-1 md:order-2">
            <h1 className="mb-4 text-xs tracking-widest sm:text-sm md:hidden">
              404 ERROR : PAGE NOT FOUND
            </h1>

            <div className="flex gap-3">
              <div className="min-w-0 flex-1 space-y-0.5">
                <p>0001 LOAD /HOME</p>
                <p>0002 RUN /WORK</p>
                <p>0003 OPEN /ABOUT</p>
                <p>0004 CALL /PROJECTS</p>
                <p>0005 JUMP /ARCHIVE</p>
                <p className="opacity-50">0006 EXIT — FAILED</p>

                <pre
                  className="my-4 select-none text-[10px] leading-tight tracking-tighter opacity-80 sm:text-xs"
                  aria-hidden="true"
                >{`  4 4 4   00000   4 4 4
 4   4  0     0  4   4
 44444  0     0  44444
     4  0     0      4
     4   00000       4`}</pre>

                <p className="mt-2 max-w-md">
                  IF LOST == TRUE THEN PRINT &quot;ART IS NEVER LOST — ONLY
                  MISPLACED.&quot;
                </p>

                <nav className="mt-5 space-y-1" aria-label="Recovery options">
                  <button
                    type="button"
                    onClick={tryAgain}
                    className="block w-fit cursor-pointer text-left transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    &gt; TRY AGAIN
                  </button>

                  <div className="relative mt-1 h-[7.5rem] w-fit sm:h-[9rem]">
                    <Link
                      href="/"
                      className="relative z-10 block w-fit cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      &gt; GO HOME
                    </Link>
                    {/* Vertical smear trail */}
                    <div
                      className="bsod-smear pointer-events-none absolute left-0 top-[1.1em] select-none"
                      aria-hidden="true"
                    >
                      {Array.from({ length: SMEAR_COUNT }, (_, i) => (
                        <span
                          key={i}
                          className="absolute left-0 whitespace-nowrap"
                          style={{
                            top: `${i * 0.55}em`,
                            opacity: Math.max(0.08, 0.85 - i * 0.045),
                            filter:
                              i > 6
                                ? `blur(${Math.min(1.2, (i - 6) * 0.12)}px)`
                                : undefined,
                          }}
                        >
                          &gt; GO HOME
                        </span>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>

              {/* Line number gutters — desktop */}
              <div
                className="hidden shrink-0 flex-col justify-between py-1 text-[9px] tabular-nums opacity-40 md:flex"
                aria-hidden="true"
              >
                {LINE_NUMS_LEFT.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <div
                className="hidden shrink-0 flex-col justify-between py-1 text-[9px] tabular-nums opacity-40 lg:flex"
                aria-hidden="true"
              >
                {LINE_NUMS_RIGHT.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Right — notes + void */}
          <aside className="order-3 relative min-h-[12rem] space-y-1 sm:min-h-[16rem]">
            <p>NOTES:</p>
            <p>NOTE_01: NOT ALL MISTAKES ARE ERRORS.</p>
            <p>NOTE_02: SOMETIMES LOSS CREATES FORM.</p>
            <p>NOTE_03: THE MAP IS NOT THE TERRITORY.</p>
            <p>NOTE_04: MISSING PAGES STILL CAST SHADOWS.</p>

            <p className="mt-4 opacity-80">
              [MEMORY DUMP /DEV/TUSHGAURAV/LOGS/404]
            </p>
            <p className="opacity-70">
              01 GHOST REQUEST RECEIVED — NO HANDLER BOUND
            </p>
            <p className="opacity-70">
              02 POETIC REDUNDANCY DETECTED IN VOID BUFFER
            </p>
            <p className="mt-3 max-w-xs opacity-90">
              &quot;DEAR USER, YOU ARE STANDING ON A MISSING FLOOR. THE VIEW IS
              STILL WORTH IT.&quot;
            </p>

            <div className="relative mt-4">
              {Array.from({ length: VOID_LINES }, (_, i) => (
                <p
                  key={i}
                  className="bsod-void-line opacity-90"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  &gt;&gt;&gt; ATTEMPTING TO RENDER THE VOID AS TEXT...
                </p>
              ))}

              <div
                className="bsod-void-bars mt-1 flex items-start gap-[3px] overflow-hidden"
                aria-hidden="true"
              >
                {VOID_BARS.map((bar, i) => (
                  <div
                    key={i}
                    className="bsod-bar shrink-0 bg-white"
                    style={{
                      width: bar.w,
                      height: bar.h,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Esc toast */}
      {escMessage && (
        <div className="pointer-events-none absolute bottom-14 left-1/2 z-20 -translate-x-1/2 px-3 text-center text-[10px] tracking-widest sm:text-xs">
          {escMessage}
        </div>
      )}

      {/* Bottom bar */}
      <footer className="flex shrink-0 flex-col gap-1 border-t border-white/20 px-3 py-3 text-[9px] tracking-wider sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:text-[10px] lg:text-xs">
        <span>&gt; 404 PAGE NOT FOUND</span>
        <button
          type="button"
          onClick={goHome}
          className="cursor-pointer text-left transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-center"
        >
          &gt; PRESS ENTER TO REBOOT
        </button>
        <span className="opacity-80 sm:text-right">
          OR PRESS ESC IF YOU DARE.
        </span>
      </footer>

      <style>{`
        .bsod {
          --bsod-blue: #0000ff;
          --bsod-ink: #ffffff;
          background: var(--bsod-blue);
          color: var(--bsod-ink);
          text-transform: uppercase;
        }

        @keyframes bsod-smear-jitter {
          0%, 88%, 100% {
            transform: translateX(0);
          }
          90% {
            transform: translateX(-2px);
          }
          93% {
            transform: translateX(3px);
          }
          96% {
            transform: translateX(-1px);
          }
        }

        @keyframes bsod-void-pulse {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes bsod-bar-flicker {
          0%, 100% {
            opacity: 1;
          }
          40% {
            opacity: 0.75;
          }
          70% {
            opacity: 0.95;
          }
        }

        .bsod-smear {
          animation: bsod-smear-jitter 4s steps(2, end) infinite;
        }

        .bsod-void-line {
          animation: bsod-void-pulse 3.2s ease-in-out infinite;
        }

        .bsod-void-bars {
          height: min(28vh, 220px);
        }

        @media (min-width: 768px) {
          .bsod-void-bars {
            height: min(36vh, 280px);
          }
        }

        .bsod-bar {
          animation: bsod-bar-flicker 2.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

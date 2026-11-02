'use client'

import { useEffect, useState } from 'react'

export type Burst = { id: number; x: number; y: number }

const PIECES = ['⭐', '🌟', '✨', '💫', '⭐', '🌟']

function BurstItem({ burst, onDone }: { burst: Burst; onDone: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(burst.id), 1000)
    return () => clearTimeout(t)
  }, [burst.id, onDone])

  return (
    <div className="pointer-events-none fixed z-50" style={{ left: burst.x, top: burst.y }}>
      {/* 向上飄嘅 +1 */}
      <span
        className="animate-star-fly absolute -translate-x-1/2 text-2xl font-extrabold text-star-foreground drop-shadow"
        style={
          {
            '--dx': '0px',
            '--dy': '-90px',
            '--s': '1.2',
            '--rot': '0deg',
          } as React.CSSProperties
        }
      >
        +1 ⭐
      </span>
      {/* 四散嘅星星 */}
      {PIECES.map((p, i) => {
        const angle = (Math.PI * 2 * i) / PIECES.length + Math.random()
        const dist = 60 + Math.random() * 60
        return (
          <span
            key={i}
            className="animate-star-fly absolute -translate-x-1/2 -translate-y-1/2 text-2xl"
            style={
              {
                '--dx': `${Math.cos(angle) * dist}px`,
                '--dy': `${Math.sin(angle) * dist - 20}px`,
                '--s': `${0.6 + Math.random() * 0.8}`,
                '--rot': `${Math.random() * 360 - 180}deg`,
              } as React.CSSProperties
            }
          >
            {p}
          </span>
        )
      })}
    </div>
  )
}

export function StarBurstLayer({ bursts, onDone }: { bursts: Burst[]; onDone: (id: number) => void }) {
  return (
    <>
      {bursts.map((b) => (
        <BurstItem key={b.id} burst={b} onDone={onDone} />
      ))}
    </>
  )
}

/** 全螢幕慶祝彩星（兌換成功時） */
export function CelebrationOverlay({ show }: { show: boolean }) {
  const [pieces, setPieces] = useState<{ left: number; delay: number; emoji: string; dur: number }[]>([])

  useEffect(() => {
    if (show) {
      const list = Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        dur: 1.2 + Math.random() * 0.8,
        emoji: ['⭐', '🌟', '✨', '🎉', '🎊', '💛'][Math.floor(Math.random() * 6)],
      }))
      setPieces(list)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 text-3xl"
          style={{
            left: `${p.left}%`,
            animation: `fall ${p.dur}s ${p.delay}s linear forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

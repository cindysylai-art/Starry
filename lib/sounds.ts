'use client'

// 用 Web Audio API 產生慶祝音效，唔需要任何音檔。
let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function playNote(freq: number, start: number, duration: number, type: OscillatorType = 'triangle', gain = 0.18) {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(0.0001, c.currentTime + start)
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + duration)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(c.currentTime + start)
  osc.stop(c.currentTime + start + duration + 0.02)
}

// 加星星：可愛嘅上行叮叮聲
export function playStarSound() {
  playNote(880, 0, 0.18)
  playNote(1174.7, 0.08, 0.2)
  playNote(1567.98, 0.16, 0.28)
}

// 兌換獎勵：歡樂嘅小旋律
export function playRewardSound() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]
  notes.forEach((f, i) => playNote(f, i * 0.1, 0.28, 'triangle', 0.2))
  playNote(1567.98, 0.5, 0.5, 'sine', 0.16)
}

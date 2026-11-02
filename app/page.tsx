'use client'

import { useRef, useState } from 'react'
import { ChildProfile } from '@/components/child-profile'
import { TaskList } from '@/components/task-list'
import { RewardStore } from '@/components/reward-store'
import { StarBurstLayer, CelebrationOverlay, type Burst } from '@/components/star-burst'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useI18n } from '@/lib/i18n'
import { playRewardSound, playStarSound } from '@/lib/sounds'
import {
  DEFAULT_REWARDS,
  DEFAULT_TASKS,
  type Profile,
  type Reward,
  type Task,
} from '@/lib/reward-data'

export default function Page() {
  const { t, rewardTitle } = useI18n()
  const [profile, setProfile] = useLocalStorage<Profile>('star-app:profile', { name: '', avatar: '🐰' })
  const [stars, setStars] = useLocalStorage<number>('star-app:stars', 0)
  const [tasks, setTasks] = useLocalStorage<Task[]>('star-app:tasks', DEFAULT_TASKS)
  const [rewards, setRewards] = useLocalStorage<Reward[]>('star-app:rewards', DEFAULT_REWARDS)

  const [bursts, setBursts] = useState<Burst[]>([])
  const [celebrate, setCelebrate] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const burstId = useRef(0)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  // ===== 任務 =====
  function handleAddStar(taskId: string, e: React.MouseEvent) {
    setStars((s) => s + 1)
    setTasks((list) => list.map((t) => (t.id === taskId ? { ...t, earned: t.earned + 1 } : t)))
    playStarSound()
    const id = burstId.current++
    setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }])
  }

  function handleAddTask(title: string, emoji: string) {
    setTasks((list) => [...list, { id: `task-${Date.now()}`, title, emoji, earned: 0 }])
  }

  function handleDeleteTask(id: string) {
    setTasks((list) => list.filter((t) => t.id !== id))
  }

  // ===== 獎勵 =====
  function handleRedeem(id: string) {
    const reward = rewards.find((r) => r.id === id)
    if (!reward || stars < reward.cost) return
    setStars((s) => s - reward.cost)
    setRewards((list) => list.map((r) => (r.id === id ? { ...r, redeemed: r.redeemed + 1 } : r)))
    playRewardSound()
    setCelebrate(true)
    setTimeout(() => setCelebrate(false), 2200)
    showToast(t('redeemToast', { x: rewardTitle(reward.id, reward.title) }))
  }

  function handleAddReward(title: string, emoji: string, cost: number) {
    setRewards((list) => [...list, { id: `reward-${Date.now()}`, title, emoji, cost, redeemed: 0 }])
  }

  function handleDeleteReward(id: string) {
    setRewards((list) => list.filter((r) => r.id !== id))
  }

  function removeBurst(id: number) {
    setBursts((b) => b.filter((x) => x.id !== id))
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col gap-5 px-4 py-6 sm:py-8">
      <header className="flex flex-col items-center gap-3 text-center">
        <LanguageSwitcher />
        <h1 className="font-display text-4xl font-extrabold text-primary text-balance drop-shadow-sm sm:text-5xl">
          {t('appTitle')}
        </h1>
        <p className="text-base font-bold text-muted-foreground text-balance">{t('appSubtitle')}</p>
      </header>

      <ChildProfile profile={profile} onChange={setProfile} stars={stars} />

      <TaskList
        tasks={tasks}
        onAddStar={handleAddStar}
        onAdd={handleAddTask}
        onDelete={handleDeleteTask}
      />

      <RewardStore
        rewards={rewards}
        stars={stars}
        onRedeem={handleRedeem}
        onAdd={handleAddReward}
        onDelete={handleDeleteReward}
      />

      <footer className="pb-2 pt-2 text-center text-sm font-bold text-muted-foreground">
        {t('footer')}
      </footer>

      {/* 動畫層 */}
      <StarBurstLayer bursts={bursts} onDone={removeBurst} />
      <CelebrationOverlay show={celebrate} />

      {/* 兌換提示 */}
      {toast && (
        <div className="animate-pop-in fixed inset-x-4 bottom-6 z-50 mx-auto max-w-sm rounded-3xl bg-primary px-6 py-4 text-center font-display text-xl font-extrabold text-primary-foreground shadow-lg">
          {toast}
        </div>
      )}
    </main>
  )
}

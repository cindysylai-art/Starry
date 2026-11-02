'use client'

import { useState } from 'react'
import { Plus, Trash2, X, Gift } from 'lucide-react'
import { EmojiPicker } from '@/components/emoji-picker'
import { REWARD_EMOJIS, type Reward } from '@/lib/reward-data'
import { useI18n } from '@/lib/i18n'

export function RewardStore({
  rewards,
  stars,
  onRedeem,
  onAdd,
  onDelete,
}: {
  rewards: Reward[]
  stars: number
  onRedeem: (id: string) => void
  onAdd: (title: string, emoji: string, cost: number) => void
  onDelete: (id: string) => void
}) {
  const { t, rewardTitle } = useI18n()
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [emoji, setEmoji] = useState(REWARD_EMOJIS[0])
  const [cost, setCost] = useState(5)

  function submit() {
    if (!title.trim() || cost < 1) return
    onAdd(title.trim(), emoji, Math.round(cost))
    setTitle('')
    setEmoji(REWARD_EMOJIS[0])
    setCost(5)
    setAdding(false)
  }

  return (
    <section className="rounded-3xl bg-card p-5 shadow-[0_8px_0_0_var(--border)] sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-foreground">
          {t('rewardsTitle')}
        </h2>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="flex items-center gap-1 rounded-2xl bg-accent px-4 py-2 text-base font-bold text-accent-foreground shadow-[0_4px_0_0_var(--border)] transition-transform active:translate-y-1 active:shadow-none"
        >
          {adding ? <X className="size-5" strokeWidth={3} /> : <Plus className="size-5" strokeWidth={3} />}
          {adding ? t('cancel') : t('add')}
        </button>
      </div>

      {adding && (
        <div className="animate-pop-in mb-4 flex flex-col gap-3 rounded-2xl bg-muted/60 p-4">
          <EmojiPicker emojis={REWARD_EMOJIS} value={emoji} onChange={setEmoji} />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submit()
            }}
            placeholder={t('rewardPlaceholder')}
            maxLength={20}
            autoFocus
            className="w-full rounded-2xl border-3 border-input bg-background px-4 py-3 text-base font-bold outline-none focus:border-primary"
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-base font-bold text-muted-foreground">
              {t('need')}
              <input
                type="number"
                min={1}
                max={999}
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-20 rounded-2xl border-3 border-input bg-background px-3 py-2 text-center text-lg font-extrabold text-foreground outline-none focus:border-primary"
              />
              ⭐
            </label>
            <button
              type="button"
              onClick={submit}
              className="ml-auto rounded-2xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_0_0_var(--ring)] transition-transform active:translate-y-1 active:shadow-none"
            >
              {t('addBtn')}
            </button>
          </div>
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3">
        {rewards.length === 0 && (
          <li className="col-span-2 rounded-2xl bg-muted/60 py-8 text-center text-base font-bold text-muted-foreground">
            {t('noRewards')}
          </li>
        )}
        {rewards.map((reward) => {
          const affordable = stars >= reward.cost
          return (
            <li
              key={reward.id}
              className={`animate-pop-in relative flex flex-col items-center gap-2 rounded-3xl p-4 text-center ring-2 transition-colors ${
                affordable ? 'bg-accent/20 ring-accent' : 'bg-background ring-border'
              }`}
            >
              <button
                type="button"
                onClick={() => onDelete(reward.id)}
                aria-label={t('deleteRewardAria', { x: rewardTitle(reward.id, reward.title) })}
                className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
              <span className={`text-4xl ${affordable ? 'animate-bounce-soft' : 'opacity-70'}`}>
                {reward.emoji}
              </span>
              <p className="line-clamp-2 min-h-[2.6rem] text-base font-bold text-foreground">
                {rewardTitle(reward.id, reward.title)}
              </p>
              <p className="flex items-center gap-1 font-display text-lg font-extrabold text-star-foreground">
                {reward.cost} ⭐
              </p>
              {reward.redeemed > 0 && (
                <p className="text-xs font-bold text-muted-foreground">{t('redeemedTimes', { n: reward.redeemed })}</p>
              )}
              <button
                type="button"
                disabled={!affordable}
                onClick={() => onRedeem(reward.id)}
                className={`mt-auto flex w-full items-center justify-center gap-1 rounded-2xl px-3 py-3 text-base font-extrabold transition-transform ${
                  affordable
                    ? 'bg-primary text-primary-foreground shadow-[0_4px_0_0_var(--ring)] active:translate-y-1 active:shadow-none'
                    : 'cursor-not-allowed bg-muted text-muted-foreground'
                }`}
              >
                <Gift className="size-5" />
                {affordable ? t('redeem') : t('notEnough')}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

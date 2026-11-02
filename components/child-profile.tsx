'use client'

import { useState } from 'react'
import { Pencil, Check } from 'lucide-react'
import { AVATARS, type Profile } from '@/lib/reward-data'
import { useI18n } from '@/lib/i18n'

export function ChildProfile({
  profile,
  onChange,
  stars,
}: {
  profile: Profile
  onChange: (p: Profile) => void
  stars: number
}) {
  const { t } = useI18n()
  const [editing, setEditing] = useState(!profile.name)
  const [draftName, setDraftName] = useState(profile.name)
  const [draftAvatar, setDraftAvatar] = useState(profile.avatar)

  function save() {
    onChange({ name: draftName.trim() || t('defaultChildName'), avatar: draftAvatar })
    setEditing(false)
  }

  return (
    <section className="rounded-3xl bg-card p-5 shadow-[0_8px_0_0_var(--border)] sm:p-6">
      {editing ? (
        <div className="flex flex-col gap-4">
          <p className="font-display text-xl font-bold text-primary">{t('setupTitle')}</p>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setDraftAvatar(a)}
                aria-label={t('chooseAvatar', { x: a })}
                aria-pressed={draftAvatar === a}
                className={`aspect-square rounded-2xl text-3xl transition-transform active:scale-90 sm:text-4xl ${
                  draftAvatar === a
                    ? 'scale-105 bg-primary/15 ring-3 ring-primary'
                    : 'bg-muted hover:bg-primary/10'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) save()
              }}
              placeholder={t('namePlaceholder')}
              maxLength={12}
              className="min-w-0 flex-1 rounded-2xl border-3 border-input bg-background px-4 py-3 text-lg font-bold outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={save}
              className="flex items-center gap-1 rounded-2xl bg-primary px-5 py-3 text-lg font-bold text-primary-foreground shadow-[0_4px_0_0_var(--ring)] transition-transform active:translate-y-1 active:shadow-none"
            >
              <Check className="size-5" strokeWidth={3} />
              {t('save')}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="animate-bounce-soft grid size-16 place-items-center rounded-full bg-secondary/40 text-4xl sm:size-20 sm:text-5xl">
            {profile.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-muted-foreground">{t('greeting')}</p>
            <p className="truncate font-display text-2xl font-extrabold text-primary sm:text-3xl">
              {profile.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraftName(profile.name)
              setDraftAvatar(profile.avatar)
              setEditing(true)
            }}
            aria-label={t('editProfile')}
            className="grid size-11 place-items-center rounded-2xl bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Pencil className="size-5" />
          </button>
        </div>
      )}

      {/* 星星總數 */}
      <div className="mt-5 flex items-center justify-center gap-3 rounded-3xl bg-star/25 py-4">
        <span className="animate-bounce-soft text-4xl sm:text-5xl">⭐</span>
        <div className="text-center">
          <p className="text-sm font-bold text-star-foreground/80">{t('myStars')}</p>
          <p className="font-display text-4xl font-extrabold leading-none text-star-foreground sm:text-5xl">
            {stars}
          </p>
        </div>
      </div>
    </section>
  )
}

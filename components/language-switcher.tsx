'use client'

import { LANGS, useI18n } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()

  return (
    <div
      role="group"
      aria-label="Language / 語言 / 言語"
      className="mx-auto inline-flex items-center gap-1 rounded-full bg-card p-1 shadow-[0_4px_0_0_var(--border)]"
    >
      {LANGS.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold transition-transform active:scale-95 ${
              active
                ? 'bg-primary text-primary-foreground shadow-[0_2px_0_0_var(--ring)]'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <span className="text-base leading-none">{l.flag}</span>
            {l.label}
          </button>
        )
      })}
    </div>
  )
}

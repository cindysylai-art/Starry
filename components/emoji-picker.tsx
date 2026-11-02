'use client'

export function EmojiPicker({
  emojis,
  value,
  onChange,
}: {
  emojis: string[]
  value: string
  onChange: (e: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {emojis.map((e) => (
        <button
          key={e}
          type="button"
          onClick={() => onChange(e)}
          aria-label={`選擇圖示 ${e}`}
          aria-pressed={value === e}
          className={`grid size-10 place-items-center rounded-xl text-2xl transition-transform active:scale-90 ${
            value === e ? 'scale-110 bg-primary/15 ring-2 ring-primary' : 'bg-muted hover:bg-primary/10'
          }`}
        >
          {e}
        </button>
      ))}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Plus, Trash2, Star, X } from 'lucide-react'
import { EmojiPicker } from '@/components/emoji-picker'
import { TASK_EMOJIS, type Task } from '@/lib/reward-data'
import { useI18n } from '@/lib/i18n'

export function TaskList({
  tasks,
  onAddStar,
  onAdd,
  onDelete,
}: {
  tasks: Task[]
  onAddStar: (taskId: string, e: React.MouseEvent) => void
  onAdd: (title: string, emoji: string) => void
  onDelete: (id: string) => void
}) {
  const { t, taskTitle } = useI18n()
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [emoji, setEmoji] = useState(TASK_EMOJIS[0])

  function submit() {
    if (!title.trim()) return
    onAdd(title.trim(), emoji)
    setTitle('')
    setEmoji(TASK_EMOJIS[0])
    setAdding(false)
  }

  return (
    <section className="rounded-3xl bg-card p-5 shadow-[0_8px_0_0_var(--border)] sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-foreground">
          {t('tasksTitle')}
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
          <EmojiPicker emojis={TASK_EMOJIS} value={emoji} onChange={setEmoji} />
          <div className="flex gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submit()
              }}
              placeholder={t('taskPlaceholder')}
              maxLength={20}
              autoFocus
              className="min-w-0 flex-1 rounded-2xl border-3 border-input bg-background px-4 py-3 text-base font-bold outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={submit}
              className="rounded-2xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_0_0_var(--ring)] transition-transform active:translate-y-1 active:shadow-none"
            >
              {t('addBtn')}
            </button>
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {tasks.length === 0 && (
          <li className="rounded-2xl bg-muted/60 py-8 text-center text-base font-bold text-muted-foreground">
            {t('noTasks')}
          </li>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="animate-pop-in flex items-center gap-3 rounded-2xl bg-background p-3 ring-2 ring-border"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary/40 text-2xl">
              {task.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-bold text-foreground">{taskTitle(task.id, task.title)}</p>
              {task.earned > 0 && (
                <p className="text-sm font-bold text-star-foreground">{t('earned', { n: task.earned })}</p>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => onAddStar(task.id, e)}
              aria-label={t('addStarAria', { x: taskTitle(task.id, task.title) })}
              className="flex shrink-0 items-center gap-1 rounded-2xl bg-star px-4 py-3 text-base font-extrabold text-star-foreground shadow-[0_4px_0_0_var(--star-foreground)] transition-transform hover:brightness-105 active:translate-y-1 active:scale-95 active:shadow-none"
            >
              <Star className="size-5 fill-current" />
              {t('addOne')}
            </button>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              aria-label={t('deleteTaskAria', { x: taskTitle(task.id, task.title) })}
              className="grid size-11 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
            >
              <Trash2 className="size-5" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

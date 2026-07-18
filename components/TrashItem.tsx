'use client'

import { Task } from '@/lib/types'

type TrashItemProps = {
  task: Task
  onRestore: (id: string) => void
  onPermanentDelete: (id: string) => void
}

export function TrashItem({ task, onRestore, onPermanentDelete }: TrashItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg bg-zinc-800 px-4 py-3">
      <span className="flex-1 text-zinc-500 line-through">{task.text}</span>
      <div className="flex shrink-0 gap-3">
        <button
          type="button"
          onClick={() => onRestore(task.id)}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          復元
        </button>
        <button
          type="button"
          onClick={() => onPermanentDelete(task.id)}
          className="text-sm text-zinc-500 hover:text-red-400"
        >
          完全に削除
        </button>
      </div>
    </li>
  )
}

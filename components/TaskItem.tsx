'use client'

import { Task } from '@/lib/types'

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg bg-zinc-800 px-4 py-3">
      <label className="flex flex-1 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 accent-emerald-500"
        />
        <span
          className={
            task.completed
              ? 'flex-1 text-zinc-500 line-through'
              : 'flex-1 text-zinc-100'
          }
        >
          {task.text}
        </span>
      </label>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label="削除"
        className="text-sm text-zinc-500 hover:text-red-400"
      >
        削除
      </button>
    </li>
  )
}

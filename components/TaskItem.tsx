'use client'

import { useState, KeyboardEvent } from 'react'
import { Task } from '@/lib/types'
import { isOverdue, formatDueDate } from '@/lib/dueDate'

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onEditDueDate: (id: string, dueDate: string | null) => void
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onEditDueDate,
}: TaskItemProps) {
  const [isEditingText, setIsEditingText] = useState(false)
  const [draftText, setDraftText] = useState(task.text)
  const [isEditingDueDate, setIsEditingDueDate] = useState(false)

  function startEditingText() {
    setDraftText(task.text)
    setIsEditingText(true)
  }

  function commitEdit() {
    const trimmed = draftText.trim()
    if (trimmed) {
      onEdit(task.id, trimmed)
    }
    setIsEditingText(false)
  }

  function cancelEdit() {
    setDraftText(task.text)
    setIsEditingText(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitEdit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancelEdit()
    }
  }

  return (
    <li className="flex items-center justify-between gap-3 rounded-lg bg-zinc-800 px-4 py-3">
      <div className="flex flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label="完了"
          className="h-5 w-5 shrink-0 accent-emerald-500"
        />
        <div className="flex-1">
          {isEditingText ? (
            <input
              type="text"
              value={draftText}
              autoFocus
              onChange={(e) => setDraftText(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={handleKeyDown}
              className="w-full rounded bg-zinc-700 px-2 py-1 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ) : (
            <span
              onClick={startEditingText}
              className={
                task.completed
                  ? 'cursor-pointer text-zinc-500 line-through'
                  : 'cursor-pointer text-zinc-100'
              }
            >
              {task.text}
            </span>
          )}
          {isEditingDueDate ? (
            <input
              type="date"
              defaultValue={task.dueDate ?? ''}
              autoFocus
              onChange={(e) => onEditDueDate(task.id, e.target.value || null)}
              onBlur={() => setIsEditingDueDate(false)}
              className="mt-1 block rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ) : task.dueDate ? (
            <span
              onClick={() => setIsEditingDueDate(true)}
              className={
                isOverdue(task.dueDate, task.completed)
                  ? 'block cursor-pointer text-xs text-red-400'
                  : 'block cursor-pointer text-xs text-zinc-500'
              }
            >
              期限: {formatDueDate(task.dueDate)}
            </span>
          ) : (
            <span
              onClick={() => setIsEditingDueDate(true)}
              className="block cursor-pointer text-xs text-zinc-600 hover:text-zinc-400"
            >
              期限を設定
            </span>
          )}
        </div>
      </div>
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

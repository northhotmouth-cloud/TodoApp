'use client'

import { useState, KeyboardEvent } from 'react'
import { Task } from '@/lib/types'
import { isOverdue, formatDueDate } from '@/lib/dueDate'

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(task.text)

  function startEditing() {
    setDraftText(task.text)
    setIsEditing(true)
  }

  function commitEdit() {
    const trimmed = draftText.trim()
    if (trimmed) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  function cancelEdit() {
    setDraftText(task.text)
    setIsEditing(false)
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
        {isEditing ? (
          <input
            type="text"
            value={draftText}
            autoFocus
            onChange={(e) => setDraftText(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded bg-zinc-700 px-2 py-1 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        ) : (
          <span
            onClick={startEditing}
            className={
              task.completed
                ? 'flex-1 cursor-pointer text-zinc-500 line-through'
                : 'flex-1 cursor-pointer text-zinc-100'
            }
          >
            {task.text}
            {task.dueDate && (
              <span
                className={
                  isOverdue(task.dueDate, task.completed)
                    ? 'block text-xs text-red-400'
                    : 'block text-xs text-zinc-500'
                }
              >
                期限: {formatDueDate(task.dueDate)}
              </span>
            )}
          </span>
        )}
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

'use client'

import { useState, FormEvent } from 'react'

type TaskFormProps = {
  onAdd: (text: string) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="タスクを入力..."
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-zinc-900 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        追加
      </button>
    </form>
  )
}

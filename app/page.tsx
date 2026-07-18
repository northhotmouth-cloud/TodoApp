'use client'

import { useEffect, useState } from 'react'
import { Task } from '@/lib/types'
import { loadTasks, saveTasks } from '@/lib/storage'
import { sortByDueDate } from '@/lib/dueDate'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'
import { TrashList } from '@/components/TrashList'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [showTrash, setShowTrash] = useState(false)
  const [sortMode, setSortMode] = useState<'added' | 'due'>('added')
  const [filterMode, setFilterMode] = useState<'all' | 'active'>('all')

  useEffect(() => {
    setTasks(loadTasks())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveTasks(tasks)
  }, [tasks, hydrated])

  function handleAdd(text: string, dueDate: string | null) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false, deleted: false, dueDate },
    ])
  }

  function handleToggle(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleEdit(id: string, text: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text } : task))
    )
  }

  function handleEditDueDate(id: string, dueDate: string | null) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, dueDate } : task))
    )
  }

  function handleDelete(id: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, deleted: true } : task))
    )
  }

  function handleRestore(id: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, deleted: false } : task))
    )
  }

  function handlePermanentDelete(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const activeTasks = tasks.filter((task) => !task.deleted)
  const trashedTasks = tasks.filter((task) => task.deleted)

  const filteredTasks =
    filterMode === 'active'
      ? activeTasks.filter((task) => !task.completed)
      : activeTasks
  const displayedTasks =
    sortMode === 'due' ? sortByDueDate(filteredTasks) : filteredTasks

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-12">
      <h1 className="text-center text-2xl font-bold text-zinc-100">
        {showTrash ? 'ゴミ箱' : 'ToDo'}
      </h1>
      <div className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-5 shadow-lg shadow-black/30">
        {showTrash ? (
          <TrashList
            tasks={trashedTasks}
            onRestore={handleRestore}
            onPermanentDelete={handlePermanentDelete}
          />
        ) : (
          <>
            <TaskForm onAdd={handleAdd} />
            <TaskList
              tasks={displayedTasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onEditDueDate={handleEditDueDate}
            />
          </>
        )}
        <div className="flex flex-wrap gap-3">
          {!showTrash && (
            <>
              <button
                type="button"
                onClick={() =>
                  setSortMode((prev) => (prev === 'added' ? 'due' : 'added'))
                }
                className="text-sm text-zinc-500 hover:text-zinc-300"
              >
                {sortMode === 'due' ? '追加順に戻す' : '期限順に並び替え'}
              </button>
              <button
                type="button"
                onClick={() =>
                  setFilterMode((prev) => (prev === 'all' ? 'active' : 'all'))
                }
                className="text-sm text-zinc-500 hover:text-zinc-300"
              >
                {filterMode === 'active' ? 'すべて表示' : '未完了のみ表示'}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setShowTrash((prev) => !prev)}
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            {showTrash ? '一覧に戻る' : 'ゴミ箱を表示'}
          </button>
        </div>
      </div>
    </main>
  )
}

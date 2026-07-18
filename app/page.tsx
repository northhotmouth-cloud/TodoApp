'use client'

import { useEffect, useState } from 'react'
import { Task } from '@/lib/types'
import { loadTasks, saveTasks } from '@/lib/storage'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setTasks(loadTasks())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveTasks(tasks)
  }, [tasks, hydrated])

  function handleAdd(text: string) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ])
  }

  function handleToggle(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-12">
      <h1 className="text-center text-2xl font-bold text-zinc-100">ToDo</h1>
      <div className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-5 shadow-lg shadow-black/30">
        <TaskForm onAdd={handleAdd} />
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </main>
  )
}

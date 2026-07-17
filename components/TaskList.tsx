'use client'

import { Task } from '@/lib/types'
import { TaskItem } from './TaskItem'

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="py-8 text-center text-zinc-500">タスクはまだありません</p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

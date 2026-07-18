'use client'

import { Task } from '@/lib/types'
import { TaskItem } from './TaskItem'

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onEditDueDate: (id: string, dueDate: string | null) => void
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onEditDueDate,
}: TaskListProps) {
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
          onEdit={onEdit}
          onEditDueDate={onEditDueDate}
        />
      ))}
    </ul>
  )
}

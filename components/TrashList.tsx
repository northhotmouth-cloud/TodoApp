'use client'

import { Task } from '@/lib/types'
import { TrashItem } from './TrashItem'

type TrashListProps = {
  tasks: Task[]
  onRestore: (id: string) => void
  onPermanentDelete: (id: string) => void
}

export function TrashList({ tasks, onRestore, onPermanentDelete }: TrashListProps) {
  if (tasks.length === 0) {
    return <p className="py-8 text-center text-zinc-500">ゴミ箱は空です</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TrashItem
          key={task.id}
          task={task}
          onRestore={onRestore}
          onPermanentDelete={onPermanentDelete}
        />
      ))}
    </ul>
  )
}

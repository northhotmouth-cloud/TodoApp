import { Task } from './types'

const STORAGE_KEY = 'todo-app-tasks'

export function loadTasks(): Task[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Task[]) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // localStorage が使えない環境(プライベートモードの容量制限等)では何もしない
  }
}

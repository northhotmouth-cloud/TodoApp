export function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (!dueDate || completed) return false
  const today = new Date().toISOString().slice(0, 10)
  return dueDate < today
}

export function formatDueDate(dueDate: string): string {
  return dueDate.replaceAll('-', '/')
}

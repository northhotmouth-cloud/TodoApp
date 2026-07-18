export function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (!dueDate || completed) return false
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return dueDate < today
}

export function formatDueDate(dueDate: string): string {
  return dueDate.replaceAll('-', '/')
}

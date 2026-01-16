export interface Todo {
  id: string
  text: string
  completed: boolean
  dueDate: string | null
}

export type FilterType = 'all' | 'active' | 'completed'

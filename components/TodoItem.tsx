'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function getDueDateStatus(dueDate: string | null, completed: boolean) {
  if (!dueDate) return null
  if (completed) return { label: dueDate, className: 'completed', icon: '📅' }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate + 'T00:00:00')
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: `Overdue (${dueDate})`, className: 'overdue', icon: '⚠️' }
  } else if (diffDays === 0) {
    return { label: 'Due today', className: 'due-soon', icon: '🔥' }
  } else if (diffDays === 1) {
    return { label: 'Due tomorrow', className: 'due-soon', icon: '⏰' }
  } else if (diffDays <= 7) {
    return { label: `Due in ${diffDays} days`, className: 'upcoming', icon: '📅' }
  } else {
    return { label: dueDate, className: 'upcoming', icon: '📅' }
  }
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  }

  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.completed)

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`todo-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="drag-handle" {...attributes} {...listeners}>
        ⋮⋮
      </span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="todo-content">
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
        {dueDateStatus && (
          <span className={`due-date ${dueDateStatus.className}`}>
            {dueDateStatus.icon} {dueDateStatus.label}
          </span>
        )}
      </div>
      <button 
        className="delete-btn"
        onClick={() => onDelete(todo.id)} 
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  )
}
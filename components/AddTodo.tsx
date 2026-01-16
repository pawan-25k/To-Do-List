'use client'

import { useState } from 'react'

interface AddTodoProps {
  onAdd: (text: string, dueDate: string | null) => void
}

export default function AddTodo({ onAdd }:  AddTodoProps) {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim(), dueDate || null)
      setText('')
      setDueDate('')
    }
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="add-todo-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          aria-label="New todo"
        />
        <button type="submit">Add</button>
      </div>
      <div className="add-todo-row">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
          aria-label="Due date (optional)"
          title="Due date (optional)"
        />
      </div>
    </form>
  )
}
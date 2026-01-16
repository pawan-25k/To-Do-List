'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { Todo } from '../types/todo'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import FilterButtons from './FilterButtons'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  /* -------------------- DND SENSORS -------------------- */
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  /* -------------------- ACTIONS -------------------- */
  const addTodo = (text: string, dueDate: string | null) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    dueDate,
  }
  setTodos(prev => [...prev, newTodo])
}


  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTodos(prev => {
        const oldIndex = prev.findIndex(t => t.id === active.id)
        const newIndex = prev.findIndex(t => t.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  /* -------------------- FILTERING -------------------- */
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="max-w-md mx-auto p-4">
      <AddTodo onAdd={addTodo} />

      <FilterButtons
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTodos.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2 mt-4">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}

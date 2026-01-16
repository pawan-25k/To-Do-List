'use client'

interface FilterButtonsProps {
  currentFilter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  counts: {
    all: number
    active: number
    completed: number
  }
}

export default function FilterButtons({
  currentFilter,
  onFilterChange,
  counts,
}: FilterButtonsProps) {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All ({counts.all})
      </button>

      <button
        className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Active ({counts.active})
      </button>

      <button
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed ({counts.completed})
      </button>
    </div>
  )
}

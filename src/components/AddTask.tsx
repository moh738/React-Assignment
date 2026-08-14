import React, { useState, useCallback } from 'react'

function AddTask({ onAdd, adding }: { onAdd: (title: string) => void; adding: boolean }) {
  const [title, setTitle] = useState('')

  const submit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle('')
  }, [onAdd, title])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [])

  return (
    <form className="add-task" onSubmit={submit} aria-label="Add task form">
      <input
        placeholder="Add a new task..."
        value={title}
        onChange={onChange}
        disabled={adding}
        aria-label="Task title"
      />
      <button type="submit" disabled={adding || !title.trim()} aria-disabled={adding}>
        {adding ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default React.memo(AddTask)

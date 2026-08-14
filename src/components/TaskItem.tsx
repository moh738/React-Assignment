import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Task } from '../types'

function TaskItemInner({ task, onToggle, onDelete }: { task: Task; onToggle: (id: number, completed: boolean) => void; onDelete: (id: number) => void }) {
  const nav = useNavigate()

  const onContainerClick = useCallback(() => {
    nav(`/tasks/${task.id}`)
  }, [nav, task.id])

  const onCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(task.id, e.target.checked)
  }, [onToggle, task.id])

  const onDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(task.id)
  }, [onDelete, task.id])

  return (
    <li className="task-item" onClick={onContainerClick} role="listitem">
      <input
        type="checkbox"
        checked={task.completed}
        onClick={(e) => e.stopPropagation()}
        onChange={onCheckboxChange}
        aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <div className={`task-title ${task.completed ? 'completed' : ''}`}>{task.title}</div>
      <button
        className="delete"
        onClick={onDeleteClick}
        aria-label="Delete task"
        title="Delete"
      >
        ×
      </button>
    </li>
  )
}

function areEqual(prev: any, next: any) {
  const a: Task = prev.task
  const b: Task = next.task
  return a.id === b.id && a.title === b.title && a.completed === b.completed && prev.onToggle === next.onToggle && prev.onDelete === next.onDelete
}

export default React.memo(TaskItemInner, areEqual)

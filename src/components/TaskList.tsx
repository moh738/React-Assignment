import React, { useMemo, useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import type { Task } from '../types'
import { getTasks, subscribe } from '../store/tasksStore'

function TaskList({ onToggle, onDelete }: { onToggle: (id: number, completed: boolean) => void; onDelete: (id: number) => void }) {
  const [tasks, setTasks] = useState<Task[]>(() => getTasks())

  useEffect(() => {
    const unsub = subscribe(() => setTasks(getTasks()))
    return unsub
  }, [])

  const items = useMemo(() => tasks.map((task) => (
    <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
  )), [tasks, onToggle, onDelete])

  return (
    <ul className="task-list" role="list">
      {items}
    </ul>
  )
}

export default React.memo(TaskList)

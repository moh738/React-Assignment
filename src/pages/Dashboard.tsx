import React, { useEffect, useState, useCallback } from 'react'
import Header from '../components/Header'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'
import { fetchTodos, createTodo, patchTodo, deleteTodo } from '../api'
import type { Task } from '../types'
import { setTasks as storeSetTasks, addTask, updateTask, removeTask, getTasks } from '../store/tasksStore'

export default function Dashboard() {
  // tasks are managed in the centralized store; components subscribe directly
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const load = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTodos(force)
      storeSetTasks(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [])


  useEffect(() => {
    load()
  }, [load])

  const handleAdd = useCallback(async (title: string) => {
    setAdding(true)
    try {
      const newTask = await createTodo({ title })
      addTask(newTask)
    } catch (err: any) {
      setError(err.message || 'Failed to add task')
    } finally {
      setAdding(false)
    }
  }, [])

  const handleToggle = useCallback(async (id: number, completed: boolean) => {
    try {
      const updated = await patchTodo(id, { completed })
      updateTask(updated)
    } catch (err: any) {
      setError(err.message || 'Failed to update task')
    }
  }, [])

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteTodo(id)
      removeTask(id)
    } catch (err: any) {
      setError(err.message || 'Failed to delete task')
    }
  }, [])

  return (
    <div className="container">
      <Header />

      <main>
        <AddTask onAdd={handleAdd} adding={adding} />

        {loading && <div className="state">Loading tasks...</div>}
        {error && (
          <div className="state state-error">
            <div>{error}</div>
            <button onClick={() => load(true)}>Retry</button>
          </div>
        )}
        {!loading && getTasks().length === 0 && (
          <div className="state">No tasks yet. Add your first task.</div>
        )}

        <TaskList onToggle={handleToggle} onDelete={handleDelete} />
      </main>
    </div>
  )
}

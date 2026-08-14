import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchTodo, deleteTodo } from '../api'
import { removeTask } from '../store/tasksStore'

export default function TaskDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const [task, setTask] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setLoading(true)
      try {
        const data = await fetchTodo(Number(id))
        setTask(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load task')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleDelete = async () => {
    if (!id) return
    try {
      await deleteTodo(Number(id))
      removeTask(Number(id))
      nav('/')
    } catch (err: any) {
      setError(err.message || 'Failed to delete')
    }
  }

  if (loading) return <div className="state">Loading...</div>
  if (error)
    return (
      <div className="state state-error">
        <div>{error}</div>
        <button onClick={() => nav('/')}>Back</button>
      </div>
    )

  if (!task) return null

  return (
    <div className="details">
      <h2>Task Details</h2>
      <p><strong>Task ID:</strong> {task.id}</p>
      <p><strong>User ID:</strong> {task.userId}</p>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
      <p><strong>Description:</strong> This is a placeholder description for the task.</p>
      <div className="details-actions">
        <button onClick={() => nav(-1)}>Back</button>
        <button className="delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

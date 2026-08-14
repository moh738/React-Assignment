const BASE = 'https://jsonplaceholder.typicode.com'

export interface CreatePayload {
  title: string
}

let _todosCache: any = null
let _todosPromise: Promise<any> | null = null

export async function fetchTodos(force = false) {
  if (!force && _todosCache) return _todosCache
  if (!force && _todosPromise) return _todosPromise

  _todosPromise = fetch(`${BASE}/todos?_limit=10`).then(async (res) => {
    if (!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()
    _todosCache = data
    _todosPromise = null
    return data
  })

  return _todosPromise
}

export async function fetchTodo(id: number) {
  const res = await fetch(`${BASE}/todos/${id}`)
  if (!res.ok) throw new Error('Failed to fetch task')
  return res.json()
}

export async function createTodo(payload: CreatePayload) {
  const res = await fetch(`${BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: payload.title, completed: false, userId: 1 }),
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function patchTodo(id: number, payload: Partial<any>) {
  const res = await fetch(`${BASE}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${BASE}/todos/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete task')
  return res.json()
}

export default null

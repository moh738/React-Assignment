import type { Task } from '../types'

let _tasks: Task[] = []
const subscribers = new Set<() => void>()

export function getTasks() {
  return _tasks
}

export function setTasks(tasks: Task[]) {
  _tasks = tasks
  subscribers.forEach((s) => s())
}

export function addTask(task: Task) {
  _tasks = [task, ..._tasks]
  subscribers.forEach((s) => s())
}

export function updateTask(task: Task) {
  _tasks = _tasks.map((t) => (t.id === task.id ? task : t))
  subscribers.forEach((s) => s())
}

export function removeTask(id: number) {
  _tasks = _tasks.filter((t) => t.id !== id)
  subscribers.forEach((s) => s())
}

export function subscribe(fn: () => void) {
  subscribers.add(fn)
  return () => subscribers.delete(fn)
}

export default {
  getTasks,
  setTasks,
  addTask,
  updateTask,
  removeTask,
  subscribe,
}

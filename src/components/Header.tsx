import React, { useEffect, useState } from 'react'
import { getTasks, subscribe } from '../store/tasksStore'

function Header() {
  const [count, setCount] = useState(() => getTasks().filter(t => t.completed).length)

  useEffect(() => {
    const unsub = subscribe(() => {
      setCount(getTasks().filter(t => t.completed).length)
    })
    return unsub
  }, [])

  return (
    <header className="app-header">
      {/* <h1>■ TaskFlow Dashboard</h1> */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div className="completed">Completed: {count}</div>
      </div>
    </header>
  )
}

export default React.memo(Header)

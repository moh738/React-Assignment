import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const TaskDetails = lazy(() => import('./pages/TaskDetails'))

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{padding:20}}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

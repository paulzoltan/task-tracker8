import React from 'react'
import TaskTracker, { queryClient } from './components/TaskTracker'
import { QueryClientProvider } from 'react-query'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              index
              element={
                <QueryClientProvider client={queryClient}>
                  <TaskTracker />
                </QueryClientProvider>
              }
            />
            <Route path='about' element={<div>Version: 1.0.0</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

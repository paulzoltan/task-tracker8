import React from 'react'
import TaskTracker, { queryClient } from './components/TaskTracker'
import { QueryClientProvider } from 'react-query'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './components/About'

function App() {
  return (
    <div className='app'>
      <BrowserRouter
        basename={
          process.env.NODE_ENV !== 'development' ? process.env.PUBLIC_URL : ''
        }
      >
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
            <Route path='about' element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

import React from 'react'
import TaskTracker, { queryClient } from './components/TaskTracker'
import { QueryClientProvider } from 'react-query'

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <TaskTracker />
      </QueryClientProvider>
    </div>
  )
}

export default App

import React from 'react'
import TaskTracker from './components/TaskTracker'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

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

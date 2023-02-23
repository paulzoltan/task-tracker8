import React from 'react'
import TaskTracker, { queryClient } from './components/TaskTracker'
import { QueryClientProvider } from 'react-query'
import Layout from './components/Layout'

function App() {
  return (
    <div className='app'>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <TaskTracker />
        </QueryClientProvider>
      </Layout>
    </div>
  )
}

export default App

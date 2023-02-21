import './taskTracker.css'
import { useQuery } from 'react-query'

const TaskTracker = () => {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('http://localhost:3003/tasks').then((res) => res.json())
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>An error has occurred</p>

  return (
    <div className='task-tracker'>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
export default TaskTracker

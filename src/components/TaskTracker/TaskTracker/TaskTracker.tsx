import './taskTracker.css'
import { useReducer } from 'react'
import { QueryClient, useQuery, useMutation } from 'react-query'
import axios from 'axios'
import TaskList from '../TaskList'
import AddTask from '../AddTask'
import Indicator from './Indicator'

export const queryClient = new QueryClient()

export interface Task {
  description: string
  time: string
  isSetReminder: boolean
  id?: number | string
}

export type TaskContext = {
  tasks: Task[]
  add: (task: Task) => void
  update: (task: Task) => void
  remove: (id: Task['id']) => void
}

type ActionType =
  | {
      type: 'SYNC'
      tasks: Task[]
    }
  | {
      type: 'ADD'
      task: Task
    }
  | {
      type: 'REMOVE'
      id: Task['id']
    }
  | {
      type: 'UPDATE'
      task: Task
    }

const reducer = (tasks: Task[], action: ActionType) => {
  switch (action.type) {
    case 'SYNC':
      return action.tasks
    case 'ADD':
      return [...tasks, action.task]
    case 'UPDATE':
      return tasks.map((task) =>
        task.id !== action.task.id ? task : action.task
      )
    case 'REMOVE':
      return tasks.filter((task) => task.id !== action.id)
    default:
      return tasks
  }
}
const TaskTracker = () => {
  const [tasks, dispatch] = useReducer(reducer, [])

  const invalidateTasks = () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }

  const {
    isFetching: isQueryFetching,
    isLoading: isQueryLoading,
    error /* , data */,
  } = useQuery({
    queryKey: 'tasks',
    queryFn: () => axios('http://localhost:3003/tasks').then((res) => res.data),
    onSuccess: (data) => {
      if (!(isPostLoading || isPutLoading || isDelLoading)) {
        dispatch({ type: 'SYNC', tasks: data })
      }
    },
  })
  const { isLoading: isPostLoading, mutate: post } = useMutation({
    mutationFn: (task: Task) =>
      axios.post('http://localhost:3003/tasks', task).then((res) => res.data),
    onSuccess: invalidateTasks,
  })
  const { isLoading: isPutLoading, mutate: put } = useMutation({
    mutationFn: (task: Task) =>
      axios
        .put(`http://localhost:3003/tasks/${task.id}`, task)
        .then((res) => res.data),
    onSuccess: invalidateTasks,
  })

  const { isLoading: isDelLoading, mutate: del } = useMutation({
    mutationFn: (id: Task['id']) =>
      axios.delete(`http://localhost:3003/tasks/${id}`).then((res) => res.data),
    onSuccess: invalidateTasks,
  })

  const loadingStates = {
    isQueryFetching,
    isQueryLoading,
    isPostLoading,
    isPutLoading,
    isDelLoading,
  }

  const taskContext = {
    tasks,
    add: (task: Task) => {
      setTimeout(() => {
        post(task)
        dispatch({ type: 'ADD', task })
      })
    },
    update: (task: Task) => {
      setTimeout(() => {
        put(task)
        dispatch({ type: 'UPDATE', task })
      })
    },
    remove: (id: Task['id']) => {
      del(id)
      dispatch({ type: 'REMOVE', id })
    },
  }

  if (isQueryLoading) return <p>Loading...</p>
  if (error) return <p>An error has occurred</p>

  return (
    <div className='task-tracker'>
      <Indicator states={loadingStates} />
      <AddTask {...{ taskContext }} />
      <TaskList {...{ taskContext }} />
    </div>
  )
}
export default TaskTracker

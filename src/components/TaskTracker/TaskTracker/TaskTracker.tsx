import './taskTracker.css'
import { useReducer } from 'react'
import { QueryClient, useQuery, useMutation } from 'react-query'
import axios from 'axios'
import TaskList from '../TaskList'
import AddTask from '../AddTask'
import Indicator from './Indicator'
import _ from 'lodash'
import { createId } from '@paralleldrive/cuid2'

export const queryClient = new QueryClient()

export interface Task {
  description: string
  time: string
  isSetReminder: boolean
  id?: number | string
  key?: number | string
}

export type TaskContext = {
  tasks: Task[]
  add: (task: Task) => void
  update: (task: Task) => void
  remove: (id: Task['id']) => void
}

type ActionType =
  | {
      type: 'OVERRIDE'
      tasks: Task[]
    }
  | {
      type: 'SYNCH'
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
    case 'OVERRIDE':
      return action.tasks
    case 'SYNCH':
      if (_.isEmpty(tasks)) {
        return action.tasks
      }
      return action.tasks.map((task: Task, index) => ({
        ...task,
        key: tasks[index]?.key,
      }))
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
        if (
          _.isEmpty(tasks) ||
          // check if state and feched data are in synch (it should be)
          (tasks.length === data.length &&
            tasks.every(
              (task, index) =>
                task.description === data[index].description &&
                task.time === data[index].time &&
                task.isSetReminder === data[index].isSetReminder &&
                (task.id === undefined || task.id === data[index].id)
            ))
        ) {
          dispatch({ type: 'SYNCH', tasks: data })
        } else {
          dispatch({ type: 'OVERRIDE', tasks: data })
          console.error('Client and server was out of synch', tasks, data)
        }
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
        dispatch({ type: 'ADD', task: { ...task, key: createId() } })
      })
    },
    update: (task: Task) => {
      setTimeout(() => {
        put(_.omit(task, 'key'))
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

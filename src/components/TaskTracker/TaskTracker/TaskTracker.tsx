import './taskTracker.css'
import { useReducer } from 'react'
import { QueryClient, useQuery, useMutation } from 'react-query'
import axios from 'axios'
import Button from '../../UI/Button'
import IconButton from '../../UI/IconButton'
import Switch from '../../UI/Switch'
import { FaTrash, FaBell } from 'react-icons/fa'

export const queryClient = new QueryClient()

const aTask = {
  description: 'Prepare lunch',
  time: 'Tomorow',
  isSetReminder: false,
}

interface TaskType {
  description: string
  time: string
  isSetReminder: boolean
  id?: number | string
}

type TaskContext = {
  tasks: TaskType[]
  add: (task: TaskType) => void
  update: (task: TaskType) => void
  remove: (id: TaskType['id']) => void
}

type ActionType =
  | {
      type: 'SYNC'
      tasks: TaskType[]
    }
  | {
      type: 'ADD'
      task: TaskType
    }
  | {
      type: 'REMOVE'
      id: TaskType['id']
    }
  | {
      type: 'UPDATE'
      task: TaskType
    }

const reducer = (tasks: TaskType[], action: ActionType) => {
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

  const { isLoading, error /* , data */ } = useQuery({
    queryKey: 'tasks',
    queryFn: () => axios('http://localhost:3003/tasks').then((res) => res.data),
    onSuccess: (data) => {
      dispatch({ type: 'SYNC', tasks: data })
    },
  })
  const { mutate: post } = useMutation({
    mutationFn: (task: TaskType) =>
      axios.post('http://localhost:3003/tasks', task).then((res) => res.data),
    onSuccess: invalidateTasks,
  })
  const { mutate: put } = useMutation({
    mutationFn: (task: TaskType) =>
      axios
        .put(`http://localhost:3003/tasks/${task.id}`, task)
        .then((res) => res.data),
    onSuccess: invalidateTasks,
  })

  const { mutate: del } = useMutation({
    mutationFn: (id: TaskType['id']) =>
      axios.delete(`http://localhost:3003/tasks/${id}`).then((res) => res.data),
    onSuccess: invalidateTasks,
  })

  const taskContext = {
    tasks,
    add: (task: TaskType) => {
      setTimeout(() => {
        post(task)
        dispatch({ type: 'ADD', task })
      })
    },
    update: (task: TaskType) => {
      setTimeout(() => {
        put(task)
        dispatch({ type: 'UPDATE', task })
      })
    },
    remove: (id: TaskType['id']) => {
      del(id)
      dispatch({ type: 'REMOVE', id })
    },
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>An error has occurred</p>

  return (
    <div className='task-tracker'>
      <Button
        onClick={() => {
          post(aTask)
        }}
      >
        Add task
      </Button>
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
      <TaskList {...{ taskContext }} />
    </div>
  )
}
export default TaskTracker

const TaskList = ({
  taskContext,
  taskContext: { tasks },
}: {
  taskContext: TaskContext
}) => (
  <div className='task-list'>
    {tasks.map((task) => (
      <Task {...{ key: task.id ?? Math.random(), task, taskContext }} />
    ))}
  </div>
)

const Task = ({
  task,
  task: { description, time, isSetReminder, id },
  taskContext: { remove, update },
}: {
  task: TaskType
  taskContext: TaskContext
}) => {
  return (
    <div className='task'>
      <p>{description}</p>
      <p>{time}</p>
      <Switch
        defaultChecked={isSetReminder}
        onChange={(e) => {
          update({ ...task, isSetReminder: e.currentTarget.checked })
        }}
      >
        <FaBell />
      </Switch>
      <p>{id}</p>
      <IconButton
        onClick={() => {
          remove(id)
        }}
      >
        <FaTrash />
      </IconButton>
    </div>
  )
}

import './taskTracker.css'
import { useReducer } from 'react'
import TaskList from '../TaskList'
import AddTask from '../AddTask'
// import Indicator from './Indicator'
import _ from 'lodash'
import { createId } from '@paralleldrive/cuid2'
import SkeletonLoader from '../SkeletonLoader'
import useFirstRender from '../../../hooks/useFirstRender'
import { useTaskData } from './useTaskData'

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

  const onEveryFetchFinished = (data: Task[]) => {
    if (
      _.isEmpty(tasks) ||
      // check if state and fetched data are in synch (it should be)
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

  const {
    // isQueryFetching,
    isQueryLoading,
    // isPostLoading,
    // isPutLoading,
    // isDelLoading,
    error,
    post,
    put,
    del,
  } = useTaskData({ onEveryFetchFinished })

  // const loadingStates = {
  //   isQueryFetching,
  //   isQueryLoading,
  //   isPostLoading,
  //   isPutLoading,
  //   isDelLoading,
  // }

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
  const isFirstRender = useFirstRender()
  if (error) return <div className='error-message'>An error has occurred</div>

  return (
    <div className='task-tracker'>
      {/* <Indicator states={loadingStates} /> */}
      <AddTask {...{ taskContext }} />
      {isQueryLoading || isFirstRender ? (
        <SkeletonLoader />
      ) : (
        <TaskList {...{ taskContext }} />
      )}
    </div>
  )
}
export default TaskTracker

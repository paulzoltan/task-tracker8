import './task.css'
import IconButton from '../../UI/IconButton'
import Switch from '../../UI/Switch'
import { FaTrash, FaBell } from 'react-icons/fa'
import { TaskContext, Task as TaskType } from '../TaskTracker'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'

const visibility = {
  visible: {
    opacity: 1,
    height: 'auto',
    marginTop: '0.35em',
    marginBottom: '0.35em',
    transition: {
      opacity: {
        delay: 0.3,
        duration: 0.1,
      },
    },
  },
  hidden: {
    opacity: 0,
    height: '0em',
    marginTop: '0em',
    marginBottom: '0em',
    transition: {
      opacity: { duration: 0.1 },
      height: { delay: 0.1 },
      marginTop: { delay: 0.1 },
      marginBottom: { delay: 0.1 },
    },
  },
}

const taskMotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: visibility,
}
const Task = ({
  task,
  task: { description, time, isSetReminder, id, key },
  taskContext: { remove, update },
}: {
  task: TaskType
  taskContext: TaskContext
}) => {
  const [removeButtonDisabled, setRemoveButtonDisabled] = useState(false)
  const loading = id === undefined
  return (
    <motion.div
      {...taskMotionProps}
      className={classNames('task', { 'task--loading': loading })}
    >
      <div className='task__display'>
        <div className='task__description'>{description}</div>
        <div className='task__time'>{time}</div>
      </div>
      {/* <p>{id}</p>
      <p>{key}</p> */}
      <Switch
        className='task__switch'
        checked={isSetReminder}
        disabled={loading}
        onChange={(e) => {
          update({ ...task, isSetReminder: e.target.checked })
        }}
      >
        <FaBell />
      </Switch>
      <IconButton
        className='task__icon-button'
        disabled={loading || removeButtonDisabled}
        onClick={(e) => {
          setRemoveButtonDisabled(true)
          remove(id)
        }}
      >
        <FaTrash />
      </IconButton>
    </motion.div>
  )
}
export default Task

import './task.css'
import IconButton from '../../UI/IconButton'
import Switch from '../../UI/Switch'
import { FaTrash, FaBell } from 'react-icons/fa'
import { TaskContext, Task as TaskType } from '../TaskTracker'
import classNames from 'classnames'

const Task = ({
  task,
  task: { description, time, isSetReminder, id },
  taskContext: { remove, update },
}: {
  task: TaskType
  taskContext: TaskContext
}) => {
  const loading = id === undefined
  return (
    <div className={classNames('task', { 'task--loading': loading })}>
      <div className='task__display'>
        <div className='task__description'>{description}</div>
        <div className='task__time'>{time}</div>
      </div>
      <p>{id}</p>
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
        disabled={loading}
        onClick={() => {
          remove(id)
        }}
      >
        <FaTrash />
      </IconButton>
    </div>
  )
}
export default Task

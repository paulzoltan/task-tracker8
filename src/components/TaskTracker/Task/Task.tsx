import './task.css'
import IconButton from '../../UI/IconButton'
import Switch from '../../UI/Switch'
import { FaTrash, FaBell } from 'react-icons/fa'
import { TaskContext, Task as TaskType } from '../TaskTracker'

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
      <div className='task__display'>
        <div className='task__description'>{description}</div>
        <div className='task__time'>{time}</div>
      </div>
      <Switch
        className='task__switch'
        checked={isSetReminder}
        onChange={(e) => {
          update({ ...task, isSetReminder: e.target.checked })
        }}
      >
        <FaBell />
      </Switch>
      {/* <p>{id}</p> */}
      <IconButton
        className='task__icon-button'
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

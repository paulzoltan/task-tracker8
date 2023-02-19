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
      <p>{description}</p>
      <p>{time}</p>
      <Switch
        checked={isSetReminder}
        onChange={(e) => {
          update({ ...task, isSetReminder: e.target.checked })
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
export default Task

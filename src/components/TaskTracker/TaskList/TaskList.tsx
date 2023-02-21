import './taskList.css'
import { TaskContext } from '../TaskTracker'
import Task from '../Task'
import { AnimatePresence } from 'framer-motion'
const TaskList = ({
  taskContext,
  taskContext: { tasks },
}: {
  taskContext: TaskContext
}) => (
  <div className='task-list'>
    <AnimatePresence>
      {tasks.map((task) => (
        <Task {...{ key: task.key ?? task.id, task, taskContext }} />
      ))}
    </AnimatePresence>
  </div>
)
export default TaskList

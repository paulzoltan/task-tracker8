import './taskList.css'
import { TaskContext } from '../TaskTracker'
import Task from '../Task'
import { AnimatePresence } from 'framer-motion'
import _ from 'lodash'
const TaskList = ({
  taskContext,
  taskContext: { tasks },
}: {
  taskContext: TaskContext
}) => (
  <div className='task-list'>
    {_.isEmpty(tasks) && (
      <div className='no-task-message'>There are no tasks.</div>
    )}
    <AnimatePresence initial={false}>
      {tasks.map((task) => (
        <Task {...{ key: task.key ?? task.id, task, taskContext }} />
      ))}
    </AnimatePresence>
  </div>
)
export default TaskList

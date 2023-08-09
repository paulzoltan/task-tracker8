import './taskList.css'
import { TaskContext } from '../TaskTracker'
import Task from '../Task'
import { AnimatePresence, motion } from 'framer-motion'
import _ from 'lodash'
const TaskList = ({
  taskContext,
  taskContext: { tasks },
}: {
  taskContext: TaskContext
}) => (
  <motion.div
    className='task-list'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
  >
    {_.isEmpty(tasks) && (
      <div className='no-task-message'>There are no tasks.</div>
    )}
    <AnimatePresence initial={false}>
      {tasks.map((task) => (
        <Task {...{ key: task.key ?? task.id, task, taskContext }} />
      ))}
    </AnimatePresence>
  </motion.div>
)
export default TaskList

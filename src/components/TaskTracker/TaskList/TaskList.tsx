import './taskList.css'
import { TaskContext } from '../TaskTracker'
import Task from '../Task'
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
export default TaskList

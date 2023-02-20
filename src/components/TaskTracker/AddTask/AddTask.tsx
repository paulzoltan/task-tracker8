import Button from '../../UI/Button'
import IconButton from '../../UI/IconButton'
import TextInput from '../../UI/TextInput'
import Checkbox from '../../UI/Checkbox'
import { FaPlus } from 'react-icons/fa'
import './addTask.css'
import { TaskContext } from '../TaskTracker'
import { useState } from 'react'

const AddTask = ({ taskContext: { add } }: { taskContext: TaskContext }) => {
  const [isFormPresent, setIsFormPreset] = useState(true)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const imput = (name: string) =>
      e.currentTarget.elements.namedItem(name) as HTMLInputElement

    const description = imput('description').value
    const time = imput('time').value
    const isSetReminder = imput('isSetReminder').checked
    add({ description, time, isSetReminder })
  }

  return (
    <div className='add-task'>
      <IconButton onClick={() => setIsFormPreset((fp) => !fp)}>
        <FaPlus />
      </IconButton>
      {isFormPresent ? (
        <form onSubmit={handleSubmit} className='add-task-form'>
          <TextInput name='description' defaultValue='Prepare lunch' />
          <TextInput name='time' defaultValue='Tomorow' />
          <label>
            <Checkbox name='isSetReminder' defaultChecked={false} />
          </label>
          <Button
            type='submit'
            kind='primary'
            // onClick={() => {
            //   add(aTask)
            // }}
          >
            Add task
          </Button>
        </form>
      ) : (
        <></>
      )}
    </div>
  )
}
export default AddTask

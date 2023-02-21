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
      <IconButton
        className='add-task__button--toggle-form'
        onClick={() => setIsFormPreset((fp) => !fp)}
      >
        <FaPlus />
      </IconButton>
      {isFormPresent ? (
        <form onSubmit={handleSubmit} className='add-task__form'>
          <div className={'add-task__input-group'}>
            <label htmlFor='description'>task</label>
            <TextInput
              className='add-task__text-input'
              name='description'
              defaultValue='Prepare lunch'
            />
          </div>
          <div className='add-task__input-group'>
            <label htmlFor='time'>time</label>
            <TextInput
              className='add-task__text-input'
              name='time'
              defaultValue='Tomorrow'
            />
          </div>
          <label className='add-task__label--checkbox'>
            <Checkbox
              className='add-task__checkbox'
              name='isSetReminder'
              defaultChecked={false}
            />
            set reminder
          </label>
          <Button className={'add-task__submit'} type='submit' kind='primary'>
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
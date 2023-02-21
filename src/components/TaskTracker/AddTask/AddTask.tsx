import Button from '../../UI/Button'
import IconButton from '../../UI/IconButton'
import TextInput from '../../UI/TextInput'
import Checkbox from '../../UI/Checkbox'
import { FaPlus } from 'react-icons/fa'
import './addTask.css'
import { TaskContext } from '../TaskTracker'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AddTask = ({ taskContext: { add } }: { taskContext: TaskContext }) => {
  const [isFormPresent, setIsFormPreset] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const imput = (name: string) =>
      e.currentTarget.elements.namedItem(name) as HTMLInputElement

    const description = imput('description').value
    const time = imput('time').value
    const isSetReminder = imput('isSetReminder').checked
    add({ description, time, isSetReminder })
  }

  const rotation = {
    rotated: {
      rotate: '-45deg',
      transition: {
        delay: 0.1,
      },
    },
    unrotated: {
      rotate: '0deg',
      transition: {
        delay: 0.2,
      },
    },
  }
  const addButtonMotionProps = {
    variants: rotation,
    animate: isFormPresent ? 'rotated' : 'unrotated',
  }

  const visibility = {
    visible: {
      opacity: 1,
      height: 'auto',
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
      transition: {
        opacity: { duration: 0.1 },
        height: { delay: 0.1 },
      },
    },
  }

  const formMotionProps = {
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
    variants: visibility,
  }

  return (
    <div className='add-task'>
      <motion.div
        className='add-task__button--toggle-form-container'
        {...addButtonMotionProps}
      >
        <IconButton
          className='add-task__button--toggle-form'
          onClick={() => setIsFormPreset((fp) => !fp)}
        >
          <FaPlus />
        </IconButton>
      </motion.div>
      <AnimatePresence>
        {isFormPresent && (
          <motion.form
            {...formMotionProps}
            onSubmit={handleSubmit}
            className='add-task__form'
          >
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
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
export default AddTask

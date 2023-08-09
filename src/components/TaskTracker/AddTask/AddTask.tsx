import Button from '../../UI/Button'
import IconButton from '../../UI/IconButton'
import TextInput from '../../UI/TextInput'
import Checkbox from '../../UI/Checkbox'
import { FaPlus } from 'react-icons/fa'
import './addTask.css'
import { TaskContext } from '../TaskTracker'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useValidation from '../../../hooks/useValidation'

const PREFILLED_FIELDS = false
const RESET_FORM_ON_SUBMISSION = true

const AddTask = ({ taskContext: { add } }: { taskContext: TaskContext }) => {
  const [isFormPresent, setIsFormPreset] = useState(false)
  //  Using the following hook allows to show validation errors only after an
  //  initial invalid form submission
  const { valid, enableDynamicValidation, dynamicValidation } = useValidation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const input = (name: string) =>
      e.currentTarget.elements.namedItem(name) as HTMLInputElement

    const description = input('description').value
    const time = input('time').value
    const isSetReminder = input('isSetReminder').checked

    if (description !== '') {
      add({ description, time, isSetReminder })
      if (RESET_FORM_ON_SUBMISSION) {
        input('description').value = ''
        input('time').value = ''
        input('isSetReminder').checked = false
      }
    }
    enableDynamicValidation(description === '')
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
      <IconButton
        className='add-task__button--toggle-form'
        onClick={() => {
          setIsFormPreset((fp) => !fp)
          enableDynamicValidation(false)
        }}
      >
        <motion.div
          {...addButtonMotionProps}
          className='add-task__button__icon-container'
        >
          <FaPlus />
        </motion.div>
      </IconButton>
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
                defaultValue={PREFILLED_FIELDS ? 'Prepare lunch' : ''}
                placeholder='what you have to do'
                invalid={!valid}
                onInput={(e) => dynamicValidation(e.currentTarget.value !== '')}
              />
              <div className='validation-error-message'>
                {!valid && <>this field cannot be empty</>}
              </div>
            </div>
            <div className='add-task__input-group'>
              <label htmlFor='time'>time</label>
              <TextInput
                className='add-task__text-input'
                name='time'
                defaultValue={PREFILLED_FIELDS ? 'Tomorrow' : ''}
                placeholder='when you have to it'
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

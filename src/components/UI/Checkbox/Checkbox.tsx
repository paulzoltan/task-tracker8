import './checkbox.css'
import { FaCheck } from 'react-icons/fa'
import classNames from 'classnames'
interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <label className={classNames(className, 'checkbox')}>
      <input type='checkbox' {...props} />
      <FaCheck className='checkbox__checkmark' />
    </label>
  )
}
export default Checkbox

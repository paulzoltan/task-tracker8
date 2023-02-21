import './textInput.css'
import classNames from 'classnames'
interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
const TextInput = ({ className, ...props }: TextInputProps) => {
  return (
    <input
      type='text'
      {...props}
      className={classNames('text-input', className)}
    />
  )
}
export default TextInput

import './textInput.css'
import classnames from 'classnames'
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
      className={classnames('text-input', className)}
    />
  )
}
export default TextInput

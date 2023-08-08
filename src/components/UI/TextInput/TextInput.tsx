import './textInput.css'
import classNames from 'classnames'
interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  invalid?: boolean
}
const TextInput = ({
  className,
  invalid = false,
  ...props
}: TextInputProps) => {
  return (
    <>
      <input
        type='text'
        {...props}
        className={classNames('text-input', className, {
          'text-input-invalid': invalid,
        })}
      />
      <span>{invalid}</span>
    </>
  )
}
export default TextInput

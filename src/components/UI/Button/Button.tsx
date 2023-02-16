import classnames from 'classnames'
import './button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'primary' | 'secondary'
}

const Button = ({
  kind = 'secondary',
  children,
  className,
  ...props
}: ButtonProps) => {
  const kindClass = `button--${kind}`
  return (
    <button {...props} className={classnames('button', kindClass, className)}>
      {children}
    </button>
  )
}
export default Button

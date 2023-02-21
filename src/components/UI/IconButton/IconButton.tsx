import classnames from 'classnames'
import './iconButton.css'

interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  kind?: 'primary' | 'secondary'
  shape?: 'square' | 'circle'
}
const IconButton = ({
  className,
  children,
  kind = 'secondary',
  shape = 'circle',
  ...props
}: IconButtonProps) => {
  const kindClass = `icon-button--${kind}`
  const shapeClass = `icon-button--${shape}`
  return (
    <button
      className={classnames('icon-button', kindClass, shapeClass, className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton

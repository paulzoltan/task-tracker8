import React from 'react'
import './switch.css'
import classNames from 'classnames'

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Switch = ({ className, children, ...props }: SwitchProps) => {
  return (
    <label className={classNames('switch', className)}>
      <input type='checkbox' {...props} />
      <div className='switch__knob'>{children}</div>
    </label>
  )
}
export default Switch

import './header.css'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <NavLink to='/' className='layout__header'>
      <span>Task</span> <IoMdCheckmarkCircleOutline /> <span>Tracker</span>
    </NavLink>
  )
}
export default Header

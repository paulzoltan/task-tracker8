import './header.css'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const Header = () => {
  return (
    <div className='layout__header'>
      <span>Task</span> <IoMdCheckmarkCircleOutline /> <span>Tracker</span>
    </div>
  )
}
export default Header

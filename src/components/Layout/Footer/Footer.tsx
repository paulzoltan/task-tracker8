import './footer.css'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

const Footer = () => {
  const asdf = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link', { 'nav__link--active': isActive })
  return (
    <div className='layout__footer'>
      <nav>
        <ul>
          <li className='nav__item'>
            <NavLink to='/' className={asdf}>
              Task Tracker
            </NavLink>
          </li>
          <li className='nav__item'>
            <NavLink to='/about' className={asdf}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Footer

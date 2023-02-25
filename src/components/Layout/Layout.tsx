import './layout.css'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay: 0.3 },
}

const Layout = () => (
  <div className='layout'>
    <motion.div {...motionProps} className='layout__bg-contanier--outer'>
      <div className='layout__bg-contanier--left--inner'></div>
    </motion.div>
    <div className='layout__crumple-zone'></div>
    <div className='layout__container'>
      <Header />
      <Outlet />
      <Footer />
    </div>
    <div className='layout__crumple-zone'></div>
    <motion.div {...motionProps} className='layout__bg-contanier--outer '>
      <div className='layout__bg-contanier--right--inner'></div>
    </motion.div>
  </div>
)
export default Layout

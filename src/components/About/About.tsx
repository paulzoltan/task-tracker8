import { motion } from 'framer-motion'
import './about.css'

const About = () => {
  return (
    <motion.div
      className='about'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3>A Totally not Cliche Task Tracker</h3>
      <p>
        Created by <a href='mailto:paulzoltan02@gmail.com'>Zoltán Paul</a>
      </p>
      <p>
        Source code{' '}
        <a href='https://github.com/paulzoltan/task-tracker8/tree/master'>
          here
        </a>
      </p>
    </motion.div>
  )
}
export default About

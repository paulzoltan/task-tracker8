import { motion } from 'framer-motion'
import './skeletonLoader.css'

const SkeletonLoader = () => {
  return (
    <motion.div
      className='skeleton-loader'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className='skeleton-loader__item'></div>
      <div className='skeleton-loader__item'></div>
      <div className='skeleton-loader__item'></div>
      <div className='skeleton-loader__item'></div>
      <div className='skeleton-loader__item'></div>
    </motion.div>
  )
}
export default SkeletonLoader

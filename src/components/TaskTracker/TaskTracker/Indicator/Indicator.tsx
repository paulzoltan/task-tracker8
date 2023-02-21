import './indicator.css'
import classNames from 'classnames'
const Indicator = ({ states }: { states: { [key: string]: boolean } }) => {
  return (
    <div className='indicator'>
      {Object.entries(states).map(([key, value]) => (
        <div
          {...{ key }}
          className={classNames('indicator__item', {
            'indicator__item--highlighted': value,
          })}
        >
          {key}
        </div>
      ))}
    </div>
  )
}
export default Indicator

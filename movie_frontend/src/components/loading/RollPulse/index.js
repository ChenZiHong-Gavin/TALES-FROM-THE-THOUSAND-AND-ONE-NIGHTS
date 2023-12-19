import { memo } from 'react'
import Styles from './RollPulse.module.scss'

const RollPulse = memo(() => {
  return (
    <div className={Styles.roll}>
      <div className={Styles.rollPulse}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={Styles.blank}>
        <p data-text="Loading">Loading</p>
      </div>
      <div className={Styles.rollPulse}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
)

export default RollPulse;

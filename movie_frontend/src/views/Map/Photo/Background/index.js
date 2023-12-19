import Styles from "./Background.module.scss"
const Background = () => {
  return (
    <div className={Styles.starBack}>
      <div className={Styles.stars1}></div>
      <div className={Styles.stars2}></div>
      <div className={Styles.stars3}></div>
    </div>
  )
}

export default Background;
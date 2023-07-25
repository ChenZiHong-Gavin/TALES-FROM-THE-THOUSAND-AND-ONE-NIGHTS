import { useNavigate } from "react-router-dom";
import Styles from "./Emotion.module.scss"

function Emotion() {
  const navigate = useNavigate();

  function gotoEmotion() {
    navigate("/map/emotion");
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.emotion}  onClick={gotoEmotion}></div>
    </div>
  )
}

export default Emotion;
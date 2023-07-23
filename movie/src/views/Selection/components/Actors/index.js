import { useNavigate } from "react-router-dom";
import Styles from "./Actors.module.scss"

function Actors() {
  const navigate = useNavigate();

  function gotoEmotion() {
    navigate("/map/theatre");
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.emotion}  onClick={gotoEmotion}></div>
    </div>
  )
}

export default Actors;
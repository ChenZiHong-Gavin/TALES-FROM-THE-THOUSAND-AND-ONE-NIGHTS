import Styles from "./FloatingMap.module.scss";
import { useNavigate } from "react-router-dom";

function FloatingMap() {
  const navigate = useNavigate();

  function gotoMap() {
    navigate("/map/theatre");
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.map}  onClick={gotoMap}></div>
    </div>
  )
}

export default FloatingMap;
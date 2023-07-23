import { useNavigate } from "react-router-dom";
import Styles from "./Photo.module.scss"

function Photo() {
  const navigate = useNavigate();

  function gotoPhoto() {
    navigate("/map/theatre");
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.photo}  onClick={gotoPhoto}></div>
    </div>
  )
}

export default Photo;
import { useNavigate } from "react-router-dom";
import Styles from "./Search.module.scss"

function Search() {
  const navigate = useNavigate();

  function gotoSearch() {
    navigate("/map/tag");
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.search}  onClick={gotoSearch}></div>
    </div>
  )
}

export default Search;
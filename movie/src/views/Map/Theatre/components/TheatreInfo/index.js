import { inject, observer } from 'mobx-react';
import { useEffect } from "react";
import { getTheatreInfoSelected } from "../../../../../api/theatre";


const TheatreInfo = ({ theatreStore }) => {
  const { theatreId } = theatreStore;

  useEffect(() => {
    getTheatreInfoSelected(theatreId).then(res => {
      if(res.status === 200) {
        const info = res.data.data;
        console.log(info);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, [theatreId])

  return (
    <div>
      TheatreInfo
    </div>
  )
}

export default inject('theatreStore')(observer(TheatreInfo));
import { inject, observer } from 'mobx-react';
import { useEffect } from "react";
import { getTheatreInfoSelected } from "../../../../../api/theatre";
import { useState } from "react";
import Styles from "./TheatreInfo.module.scss";

const TheatreInfo = ({ theatreStore }) => {
  const { theatreId } = theatreStore;
  const [info, setInfo] = useState({});

  useEffect(() => {
    getTheatreInfoSelected(theatreId).then(res => {
      if(res.status === 200) {
        const info = res.data.data;
        setInfo(info);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, [theatreId])

  return (
    <div className={Styles.content}>
      {
      info.nameE ? <>
        <p>{info.nameS}</p>
        <p>{info.nameT}</p>
        <p>{info.nameE}</p>
        <p>address: {info.address}</p>
        <p>des: {info.description}</p>
        <p>house: {info.house}</p>
        <p>lat: {info.lat}</p>
        <p>lon: {info.lon}</p>
        <p>uri: {info.uri}</p>
        <p>personList</p>
        <p>imageList</p>
      </>: null 
      } 
    </div>
  )
}

export default inject('theatreStore')(observer(TheatreInfo));
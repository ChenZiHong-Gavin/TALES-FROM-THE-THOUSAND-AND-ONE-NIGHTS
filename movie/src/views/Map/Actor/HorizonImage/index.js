import Styles from "./HorizonImage.module.scss";
import { getRandomActor } from "../../../../api/actor";
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";

const HorizonImage = ({actorStore}) => {
  const { toggleModal } = actorStore;
  const getRandomStyle = () => {
    const styles = [
      Styles.slower,
      Styles.faster,
      Styles.vertical,
      Styles.slowerDown,
      Styles.slower1,
      Styles.slower2,
      Styles.fastest,
      Styles.faster1,
      Styles.last,
    ];

    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
  };
  const [pictureList, setPictureList] = useState([]);

  useEffect(() => {
    getRandomActor(40).then((res) => {
      if(res.status === 200) {
        const data = res.data.data;
        const totalPictureList = [];
        for(let actor of data) {
          for (let image of actor.photoOfPerson) {
            totalPictureList.push({
              url: image.imagePath,
              actorId: actor.actorId
            })
          }
        }
        const randomPictureList = [];
        for(let i = 0; i < 40; i++) {
          const randomIndex = Math.floor(Math.random() * totalPictureList.length);
          randomPictureList.push(totalPictureList[randomIndex]);
          totalPictureList.splice(randomIndex, 1);
        }
        setPictureList(randomPictureList)
      }
    });
    return () => {
      toggleModal(false)
    };
  }, []);

  return (
    <div className={Styles.external}>
      <div className={Styles.mouse}></div>
      <div className={Styles.horizontalScrollWrapper}>
        {pictureList.map((item, index) => {
          const randomStyle =
            getRandomStyle() + " " + getRandomStyle() + " " + Styles.imgWrapper;

          return (
            <div key={index} className={`${randomStyle}`}>
              <img src={item.url} alt="" onClick={
                ()=> {
                  toggleModal(true)
                }
              }/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default inject("actorStore")(observer(HorizonImage));

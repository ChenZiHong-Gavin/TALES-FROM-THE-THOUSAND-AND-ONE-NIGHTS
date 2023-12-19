import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import { getTheatreInfoSelected } from "../../../../../api/theatre";
import { useState } from "react";
import Styles from "./TheatreInfo.module.scss";
import defaultPersonUrl from "../../../../../assets/png/person.png";

const TheatreInfo = ({ theatreStore }) => {
  const { theatreId } = theatreStore;
  const [info, setInfo] = useState({});

  useEffect(() => {
    getTheatreInfoSelected(theatreId)
      .then((res) => {
        if (res.status === 200) {
          const info = res.data.data;
          setInfo(info);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [theatreId]);

  return (
    <div className={Styles.content}>
      {info.nameS ? (
        <>
          <div className={Styles.mainHeader}>
            <aside className={Styles.verticalText}>
              <p>{info.house}</p>
            </aside>
            <div>
              <h1 className={Styles.bigHeaderText}>{info.nameS}</h1>
              <h2 className={Styles.smallHeaderText}>
                <span>{info.nameT}</span>
                <span className={Styles.extraName}> </span>
                <span className={Styles.extraName}>{info.nameE}</span>
              </h2>
            </div>
            <aside className={Styles.totalDetails}>
              <ul>
                <li>
                  <p className={Styles.details}>{info.address}</p>
                </li>
                <li>
                  <p className={Styles.details}>经度: {info.lon}</p>
                </li>
                <li>
                  <p className={Styles.details}>纬度: {info.lat}</p>
                </li>
              </ul>
            </aside>
          </div>
          <div className={Styles.mainContent}>
            <aside className={Styles.contentImg}>
              <figure>
                <img
                  src={info.imageList[0].imgP}
                  alt={info.imageList[0].description}
                />
              </figure>
              <figcaption>{info.imageList[0].description}</figcaption>
            </aside>
            <section className={Styles.thisContent}>
              <h2>介绍</h2>
              <p className={Styles.description}>{info.description}</p>
              <h2>发展历程</h2>
              <ol className={Styles.event}>
                {info.eventList.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>
            </section>
          </div>
          <div className={Styles.relatedPeople}>
            <h2>相关人物</h2>
            <div className={Styles.avatar}>
              {info.personList.map((item, index) => {
                return (
                  <div>
                    <a
                      onClick={() => {
                        window.open(item.puri);
                      }}
                      key={index}
                    >
                      <img
                        src={
                          item.imageP === "" ? defaultPersonUrl : item.imageP
                        }
                        alt={item.pname}
                        className={Styles.user}
                      />
                    </a>
                    <span className={Styles.imageName}>{item.pname}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={Styles.gallery}>
            <h2>相关图片</h2>
            <div className={Styles.relatedImages}>
              {info.imageList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={Styles.item}
                    style={{ backgroundImage: `url(${item.imgP})` }}
                  ></div>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default inject("theatreStore")(observer(TheatreInfo));

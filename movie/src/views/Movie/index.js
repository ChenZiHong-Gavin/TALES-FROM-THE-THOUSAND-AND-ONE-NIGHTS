import Juxtapose from "./Juxtapose";
import EmotionLine from "./EmotionLine";
import SoundLine from "./SoundLine";
import Styles from "./Movie.module.scss";
import EmotionPiece from "./EmotionPiece";
import Video from "./Video";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoInfoSelected } from "../../api/video";
import Background from "./components/Background";
import { Button } from "antd";

function Movie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");
  const [videoInfo, setVideoInfo] = useState({});
  useEffect(() => {
    getVideoInfoSelected(videoId).then((res) => {
      if (res.status === 200) {
        const data = res.data.data;
        setVideoInfo(data);
        console.log(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, [videoId]);
  return (
    <>
      <div className={Styles.videoPage}>
        <h1>《{videoInfo.title}》</h1>
      <div className={Styles.chart}>
        <div className={Styles.soundLine}>
          <SoundLine audioSpectrum={videoInfo.audioSpectrum} />
        </div>
        <div className={Styles.emotionLine}>
          <span className={Styles.emotionTitle}>情感散点图</span>
          <EmotionLine emotionData={videoInfo.emotionList}/>
        </div>
      </div>
      <div className={Styles.video}>
        <div className={Styles.videoContainer}>
          <div className={Styles.buttonGroup}>
            <Button>字幕</Button>
            <Button>彩色</Button>
          </div>
          <Video videoPath={videoInfo.videoPath}/>
        </div>
        <div className={Styles.emotionPiece}>
          <EmotionPiece />
        </div>
      </div>
        字幕 情感波折地图 时长台词地图 视频 + AI上色后的视频 筛选项 数量统计
      </div>
      <Background />
    </>
  );
}

export default Movie;

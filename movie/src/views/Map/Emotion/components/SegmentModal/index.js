import { inject, observer } from "mobx-react";
import VideoJS from "../../../../../components/Video/VideoJS";
import videojs from "video.js";
import { useRef } from "react";
import Styles from "./SegmentModal.module.scss";

const SegmentModal = ({ emotionStore }) => {
  const { segmentInfo } = emotionStore;
  const {
    content,
    emotion,
    order,
    segmentId,
    time,
    videoId,
    videoUrl,
  } = segmentInfo;
  const playerRef = useRef(null);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const gotoFullVideo = () => {
    return () => {
      window.open(`/video/${videoId}`);
    };
  };

  return (
    <div className={Styles.segmentModal}>
      <div className={Styles.content}>
        <h2>“{content}”</h2>
        <h3>{emotion}</h3>
        <p>第{order}句台词</p>
        <p>{time}</p>
        <a onClick={
          gotoFullVideo()
        } className={Styles.btn}>
          观看完整视频
        </a>
      </div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
};

export default inject("emotionStore")(observer(SegmentModal));

import { inject, observer } from "mobx-react";
import VideoJS from "../../../../../components/Video/VideoJS";
import videojs from "video.js";
import { useRef } from "react";
import Styles from "./SegmentModal.module.scss";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";

const SegmentModal = ({ emotionStore }) => {
  const navigate = useNavigate();
  const { segmentInfo } = emotionStore;
  const { content, emotion, order, time, videoId, videoUrl } = segmentInfo;
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

  const emotionMap = {
    难过: "#2b2f3a",
    愉快: "#8f9f85",
    喜欢: "#993712",
    愤怒: "#8f6447",
    害怕: "#ECBC31",
    惊讶: "#ed96d9",
    厌恶: "#6d6d6e",
  };
  if (!videoUrl) {
    return <div>loading</div>;
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {});

    player.on("dispose", () => {});
  };

  const gotoFullVideo = (videoId) => {
    return () => {
      navigate(`/movie?videoId=${videoId}`);
    };
  };

  return (
    <div className={Styles.segmentModal}>
      <div className={Styles.content}>
        <h2>“{content}”</h2>
        {emotion && <Tag color={emotionMap[emotion]}>{emotion}</Tag>}
        <p>第{order}句台词</p>
        <p>{time}</p>
        <a onClick={gotoFullVideo(videoId)} className={Styles.btn}>
          观看完整视频
        </a>
      </div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
};

export default inject("emotionStore")(observer(SegmentModal));

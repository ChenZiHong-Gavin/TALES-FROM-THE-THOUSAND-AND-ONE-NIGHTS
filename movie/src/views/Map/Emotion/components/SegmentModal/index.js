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
    难过: "#ff7f0e",
    愉快: "#2ca02c",
    喜欢: "#d62728",
    愤怒: "#9467bd",
    害怕: "#8c564b",
    惊讶: "#e377c2",
    厌恶: "#7f7f7f",
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

  const gotoFullVideo = (videoId) => {
    return () => {
      navigate(`/movie?videoId=${videoId}`);
    };
  };

  return (
    <div className={Styles.segmentModal}>
      <div className={Styles.content}>
        <h2>“{content}”</h2>
        {
          emotion && <Tag color={emotionMap[emotion]}>{emotion}</Tag>
        }
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

import VideoJS from "../../../components/Video/VideoJS";
import videojs from "video.js";
import { useRef } from "react";
import Styles from "./Video.module.scss";

const Video = (props) => {
  const playerRef = useRef(null);
  const videoPath = props.videoPath;
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    // 根据高度自适应宽度
    aspectRatio: "16:9",
    sources: [
      {
        src: videoPath,
        type: "application/x-mpegURL"
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

  return (
      <VideoJS className={Styles.videoPlayer} options={videoJsOptions} onReady={handlePlayerReady} />
  );
};

export default Video;

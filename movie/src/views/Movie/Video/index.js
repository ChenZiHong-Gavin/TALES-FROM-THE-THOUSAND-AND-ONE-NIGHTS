import VideoJS from "../../../components/Video/VideoJS";
import { useRef } from "react";
import Styles from "./Video.module.scss";

const Video = (props) => {
  const playerRef = useRef(null);
  if (!props.videoUrl) {
    return <div>loading</div>;
  }
  const videoUrl = props.videoUrl;
  const captionUrl = props.captionUrl;
  console.log(captionUrl);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    crossOrigin: "anonymous",
    responsive: true,
    fluid: true,
    // 根据高度自适应宽度
    aspectRatio: "16:9",
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
    ],
    // 字幕
    // tracks: [
    //   {
    //     kind: "captions",
    //     src: captionUrl,
    //     srcLang: "zh",
    //     label: "Chinese",
    //     default: true,
    //   },
    // ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {});
    player.on("dispose", () => {});
    player.addRemoteTextTrack(
      {
        kind: "captions",
        src: captionUrl,
        srcLang: "zh",
        label: "Chinese",
        default: true,
      },
      true
    );
  };

  return (
    <VideoJS
      className={Styles.videoPlayer}
      options={videoJsOptions}
      onReady={handlePlayerReady}
    />
  );
};

export default Video;

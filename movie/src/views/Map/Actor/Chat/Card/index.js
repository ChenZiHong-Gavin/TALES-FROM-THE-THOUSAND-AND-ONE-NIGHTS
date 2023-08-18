import { Card, Tag, Divider, Button } from "antd";
import VideoJS from "../../../../../components/Video/VideoJS";
import { useRef } from "react";

const MovieCard = (props) => {
  const playerRef = useRef(null);
  // 分为电影、音频、视频三种卡片
  // 电影卡片
  if (props.isMovie) {
    const { movieName, movieUri, date, type } = props;
    const typeList = [];
    if (type) {
      const tempList = type.split("；");
      for (let i = 0; i < tempList.length; i++) {
        typeList.push(tempList[i]);
      }
    }
    return (
      <Card
        title={`《${movieName}》`}
        bordered={false}
        extra={
          <a href={movieUri} target="_blank">
            了解更多
          </a>
        }
        // 背景颜色
        style={{
          background: "#fcf4df",
          // 最大宽度
          maxWidth: "300px",
        }}
        // body中的padding小一点
        bodyStyle={{ padding: "5px" }}
      >
        <div
          style={{
            display: "flex",
            // 靠近中间
            justifyContent: "center",
          }}
        >
          {typeList.length > 0
            ? typeList.map((item, index) => {
                return (
                  <Tag
                    color={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                    key={index}
                  >
                    {item.length > 10 ? item.substring(0, 10) + "..." : item}
                  </Tag>
                );
              })
            : null}
        </div>
        {date ? <Divider orientation="left">{date}上映</Divider> : null}
      </Card>
    );
  }
  // 音频卡片
  if (props.isAudio) {
    const { title, audioUri, musicUri, type, ossAudioUrl } = props;

    const typeList = [];
    if (type) {
      const tempList = type.split("；");
      for (let i = 0; i < tempList.length; i++) {
        typeList.push(tempList[i]);
      }
    }
    return (
      <Card
        title={`《${title}》`}
        bordered={false}
        style={{ background: "#cfb79d", maxWidth: "300px" }}
        extra={
          <a href={audioUri} target="_blank">
            了解更多
          </a>
        }
      >
        <div
          style={{
            display: "flex",
            // 靠近中间
            justifyContent: "center",
          }}
        >
          {typeList.length > 0
            ? typeList.map((item, index) => {
                return (
                  <Tag
                    color={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                    key={index}
                  >
                    {item.length > 10 ? item.substring(0, 10) + "..." : item}
                  </Tag>
                );
              })
            : null}
        </div>
        {ossAudioUrl && ossAudioUrl !== "" ? (
          <audio controls style={{ width: "100%" }}>
            <source src={ossAudioUrl} type="audio/ogg" />
            你的浏览器不支持播放音频
          </audio>
        ) : null}
      </Card>
    );
  }
  // 视频卡片
  if (props.isVideo) {
    const { title, VideoUri, videoPath, type } = props;
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: videoPath,
          // m3u8
          type: "application/x-mpegURL",
        },
      ],
    };
    const handlePlayerReady = (player) => {
      playerRef.current = player;
      player.on("waiting", () => {});

      player.on("dispose", () => {});
    };
    return (
      <Card
        title={`《${title}》`}
        extra={
          <>
            <a href={VideoUri} target="_blank">
              了解更多
            </a>
          </>
        }
        bordered={false}
        // 背景颜色
        style={{ background: "#e1c7ae", maxWidth: "300px" }}
      >
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        <div>
          <Button>前往视频页</Button>
        </div>
      </Card>
    );
  }
};

export default MovieCard;

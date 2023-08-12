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
import { Button, Modal, Tag, Space } from "antd";
import SegmentModal from "../Map/Emotion/components/SegmentModal";
import StockMap from "./StockMap";
import { inject, observer } from "mobx-react";

function Movie({ emotionStore }) {
  const { isShowModal, toggleModal } = emotionStore;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");
  const [videoInfo, setVideoInfo] = useState({});
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getVideoInfoSelected(videoId)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setVideoInfo(data);
          setTags(data.type.split("；"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videoId]);
  useEffect(() => {
    return () => {
      toggleModal(false);
    };
  }, []);
  return (
    <>
      <Modal
        centered
        open={isShowModal}
        footer={null}
        onCancel={() => {
          toggleModal(false);
        }}
        width={1000}
      >
        <SegmentModal />
      </Modal>
      <div className={Styles.videoPage}>
        <h1>「{videoInfo.title}」</h1>
        <div className={Styles.tags}>
          <Space size={[0, 8]} wrap>
            {tags.map((tag, index) => {
              return (
                <Tag key={index} color="#f50">
                  {tag}
                </Tag>
              );
            })}
          </Space>
        </div>
        <div className={Styles.videoContainer}>
          <Video
            videoUrl={videoInfo.videoUrl}
            captionUrl={videoInfo.captionUrl}
          />
          <div className={Styles.buttonGroup}>
            <Button>换一部</Button>
            <Button>彩色</Button>
            <Button>问号表示信息</Button>
          </div>
        </div>
        <div className={Styles.chart}>
          <div className={Styles.soundLine}>
            <SoundLine audioSpectrum={videoInfo.audioSpectrum} />
          </div>
          <div className={Styles.emotionLine}>
            <span className={Styles.emotionTitle}>情感散点图</span>
            <EmotionLine emotionData={videoInfo.emotionList} />
          </div>
          <div className={Styles.StockMap}>
            <span className={Styles.emotionTitle}>情感走势图</span>
            <StockMap />
          </div>
          <div className={Styles.emotionPiece}>
            <span className={Styles.emotionTitle}>情感热力图</span>
            <EmotionPiece emotionData={videoInfo.emotionList} />
          </div>
        </div>
      </div>
      <Background />
    </>
  );
}

export default inject("emotionStore")(observer(Movie));

import EmotionLine from "./EmotionLine";
import SoundLine from "./SoundLine";
import Styles from "./Movie.module.scss";
import EmotionPiece from "./EmotionPiece";
import Video from "./Video";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoInfoSelected } from "../../api/video";
import Background from "./components/Background";
import { Button, Modal, Tag, Space, Tooltip } from "antd";
import SegmentModal from "../Map/Emotion/components/SegmentModal";
import StockMap from "./StockMap";
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { QuestionCircleOutlined, LeftCircleFilled } from '@ant-design/icons';

function Movie({ emotionStore }) {
  const navigate = useNavigate();
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
          data["onPlayUrl"] = data["videoUrl"];
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
  const changeVideo = () => {
    const random = Math.ceil(Math.random() * 154);
    while (random === videoId) {
      random = Math.ceil(Math.random() * 154);
    }
    navigate(`/movie?videoId=${random}`);
  };
  const changeColoredUrl = () => {
    setVideoInfo({
      ...videoInfo,
      onPlayUrl: videoInfo.coloredUrl,
    });
  };
  const changeOriginUrl = () => {
    setVideoInfo({
      ...videoInfo,
      onPlayUrl: videoInfo.videoUrl,
    });
  };

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
            videoUrl={videoInfo.onPlayUrl}
            captionUrl={videoInfo.captionUrl}
          />
          <div className={Styles.buttonGroup}>
            <Button
              onClick={() => {
                changeVideo();
              }}
            >
              换一部
            </Button>
            {videoInfo.onPlayUrl === videoInfo.videoUrl ? (
              <Button
                onClick={() => {
                  changeColoredUrl();
                }}
              >
                彩色
              </Button>
            ) : (
              <Button
                onClick={() => {
                  changeOriginUrl();
                }}
              >
                黑白
              </Button>
            )}
                  <Tooltip title="使用Dexxx模型重新上色"
                  >
        <Button type="default" shape="circle" icon={<QuestionCircleOutlined />} />
      </Tooltip>
          </div>
        </div>
        <div className={Styles.chart}>
          {videoInfo.audioSpectrum &&
            videoInfo.audioSpectrum["x"].length > 0 && (
              <div className={Styles.soundLine}>
                <SoundLine audioSpectrum={videoInfo.audioSpectrum} />
              </div>
            )}
          {videoInfo.emotionList && videoInfo.emotionList.length > 0 && (
            <>
              <div className={Styles.emotionLine}>
                <span className={Styles.emotionTitle}>情感散点图emo/No.</span>
                <EmotionLine emotionData={videoInfo.emotionList} />
              </div>
              <div className={Styles.StockMap}>
                <span className={Styles.emotionTitle}>音量走势图dBFS/No.</span>
                <StockMap emotionData={videoInfo.emotionList} />
              </div>
              <div className={Styles.emotionPiece}>
                <span className={Styles.emotionTitle}>情感热力图</span>
                <EmotionPiece emotionData={videoInfo.emotionList} />
              </div>
            </>
          )}
        </div>
      </div>
      <Background />
      <LeftCircleFilled
        onClick={() => {
          navigate("/map/emotion");
        }}
      className={Styles.returnButton}/>
    </>
  );
}

export default inject("emotionStore")(observer(Movie));

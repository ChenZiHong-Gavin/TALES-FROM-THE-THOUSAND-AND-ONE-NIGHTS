import { Button } from "antd";
import Styles from "./Introduction.module.scss";
import { inject, observer } from "mobx-react";
import { useState } from "react";

const Introduction = ({ emotionStore }) => {
  const { setMode, rerender, setRerender } = emotionStore;
  const [modeText, setModeText] = useState("emotion");
  return (
    <div className={Styles.content}>
      <h1 className={Styles.title}>情感地图</h1>
      <p>一部电影，就是一段不一样的人生。一句对白，便能代表曲折交错的情感。</p>
      <p>
        我们将老电影拆解成片段，使用
        <b
          onClick={() => {
            window.open("https://arxiv.org/abs/2212.04356");
          }}
        >
          WHISPER模型
        </b>
        将语音转化成文本，使用
        <b
          onClick={() => {
            window.open("https://github.com/PaddlePaddle/ERNIE");
          }}
        >
          ERNIE模型
        </b>
        对文本进行情感分析，最终将154部电影结构为6692句带情感色彩的对白，并归并、统计、聚类，臻成老电影情感地图，犹如春潮涌动，千姿百态。
      </p>
      <div className={Styles.buttons}>
        {modeText === "emotion" ? <Button onClick={
          () => {
            setRerender(!rerender);
          }
        }>换一批</Button> : null}
        <Button
          onClick={() => {
            setMode(modeText === "emotion" ? "filter" : "emotion");
            setModeText(modeText === "emotion" ? "filter" : "emotion");
          }}
          type="primary"
        >
          {modeText === "emotion" ? "筛选模式" : "分析模式"}
        </Button>
      </div>
    </div>
  );
};

export default inject("emotionStore")(observer(Introduction));

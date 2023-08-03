import { Button } from "antd";
import Styles from "./Introduction.module.scss";
import { inject, observer } from "mobx-react";
import { useState } from "react";

const Introduction = ({ emotionStore }) => {
  const { setMode } = emotionStore;
  const [modeText, setModeText] = useState("emotion");
  return (
    <div className={Styles.content}>
      <h1 className={Styles.title}>情感分析</h1>
      <p>
        介绍，利用情感分析技术，完成了什么事情
        放两张图或者表在这里干了什么是没事没事没事没事没什么事情
        有什么是没事没事没什么效果 重填一下填一下内容
      </p>
      {
        modeText === "emotion" ? <Button>换一批</Button>:null
      }
      <Button
        onClick={() => {
          setMode(modeText === 'emotion' ? 'filter' : 'emotion');
          setModeText(modeText === 'emotion' ? 'filter' : 'emotion');
        }}
      >
        {
          modeText === 'emotion' ? "筛选模式": "分析模式"
        }
      </Button>
    </div>
  );
};

export default inject("emotionStore")(observer(Introduction));

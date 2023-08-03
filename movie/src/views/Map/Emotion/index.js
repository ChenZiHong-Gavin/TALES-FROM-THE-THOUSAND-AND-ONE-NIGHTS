import ReturnButton from "../../../components/ReturnButton";
import Styles from "./Emotion.module.scss";
import EmotionMap from "./components/EmotionMap/index.js";
import EmotionChart from "./components/EmotionChart";
import Introduction from "./components/Introduction";
import { inject, observer } from "mobx-react";
import Selection from "./components/Selection";

function Emotion({ emotionStore }) {
  const { mode } = emotionStore;
  return (
    <div className={Styles.page}>
      <ReturnButton />
      <Introduction />
      {mode === "emotion" ? (
        <>
          <EmotionMap />
          <EmotionChart />
        </>
      ) : (
        <Selection />
      )}
    </div>
  );
}

export default inject("emotionStore")(observer(Emotion));

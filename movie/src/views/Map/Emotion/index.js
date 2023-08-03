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
    <>
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
    </>
  );
}

export default inject("emotionStore")(observer(Emotion));

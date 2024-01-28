import ReturnButton from "../../../components/ReturnButton";
import Styles from "./Emotion.module.scss";
import EmotionMap from "./components/EmotionMap/index.js";
import EmotionChart from "./components/EmotionChart";
import Introduction from "./components/Introduction";
import SegmentModal from "./components/SegmentModal";
import { inject, observer } from "mobx-react";
import { Modal } from "antd";
import { useEffect } from "react";

function Emotion({ emotionStore }) {
  const { isShowModal, toggleModal } = emotionStore;

  useEffect(() => {
    return () => {
      toggleModal(false);
    };
  }, []);

  return (
    <div className={Styles.page}>
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
      <ReturnButton />
      <Introduction />
      <>
        <EmotionMap />
        <EmotionChart />
      </>
    </div>
  );
}

export default inject("emotionStore")(observer(Emotion));

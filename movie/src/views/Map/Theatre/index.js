import { inject, observer } from "mobx-react";
import Styles from "./Theatre.module.scss";
import MapChart from "./map";
import TimeLine from "./timeline";
import { Modal } from "antd";
import { TheatreInfo } from "./components";
import { useEffect } from "react";

function Theatre({ theatreStore }) {
  const { isShowModal, toggleModal } = theatreStore;

  return (
    <>
      <div className={Styles.map}>
        <MapChart />
      </div>
      <div className={Styles.timeline}>
        <TimeLine />
      </div>
      <Modal
        title="Modal 1000px width"
        centered
        open={isShowModal}
        onOk={() => {
          toggleModal(false);
        }}
        onCancel={() => {
          toggleModal(false);
        }}
        width={1000}
      >
        <TheatreInfo />
      </Modal>
    </>
  );
}

export default inject("theatreStore")(observer(Theatre));

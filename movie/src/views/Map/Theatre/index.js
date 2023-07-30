import { inject, observer } from "mobx-react";
import Styles from "./Theatre.module.scss";
import MapChart from "./map";
import TimeLine from "./timeline";
import { Modal } from "antd";
import { TheatreInfo, NameNode, ReturnButton } from "./components";

function Theatre({ theatreStore }) {
  const { isShowModal, toggleModal, suits } = theatreStore;
  return (
    <>
      {suits.length === 0 ? null : (
        <div className={Styles.nameNode}>
          <NameNode />
        </div>
      )}
      <ReturnButton />
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

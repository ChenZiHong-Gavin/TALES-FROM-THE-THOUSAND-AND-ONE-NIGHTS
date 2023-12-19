import { inject, observer } from "mobx-react";
import Styles from "./Theatre.module.scss";
import MapChart from "./map";
import TimeLine from "./timeline";
import { Modal } from "antd";
import { TheatreInfo, NameNode } from "./components";
import ReturnButton from "../../../components/ReturnButton";

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
        centered
        open={isShowModal}
        footer={null}
        onCancel={()=> {
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

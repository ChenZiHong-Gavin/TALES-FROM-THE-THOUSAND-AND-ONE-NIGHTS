import Styles from "./Theatre.module.scss";
import MapChart from "./map";
import TimeLine from "./timeline";
import { Modal } from "antd";
import { useState } from "react";
import { TheatreInfo } from "./components";

function Theatre() {
  const [open, setOpen] = useState(true);
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
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <TheatreInfo />
      </Modal>
    </>
  );
}

export default Theatre;

import Styles from "./Actor.module.scss";
import ReturnButton from "../../../components/ReturnButton";
import { useEffect, useRef, useState } from "react";
import Chat from "./Chat/chat";
import HorizonImage from "./HorizonImage";
import Walk from "./Walk";
import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import ActorModal from "./ActorModal";

const Actor = ({actorStore}) => {
  const {isShowModal, toggleModal} = actorStore;
  const [initial, setInitial] = useState(true);
  const [active, setActive] = useState(1);
  const appRef = useRef(null);

  const pagination = (target) => {
    setActive(target);
    if (target === 1) {
      setInitial(true);
    } else {
      setInitial(false);
    }
  };

  const handlePageClick = (target) => {
    pagination(target);
  };

  useEffect(() => {}, [initial]);
  return (
    <div className={Styles.actorPage}>
      <ReturnButton />
      <div className={Styles.cont}>
        <div className={Styles.title}>
          <h1>演员的世界</h1>
          <p>介绍介绍介绍</p>
        </div>
        <div
          className={`${Styles.app} 
        ${initial ? Styles.initial : Styles.active}`}
          ref={appRef}
        >
          {active === 1 ? (
            <div className={Styles.content1}>
              <HorizonImage />
            </div>
          ) : (
            <div className={Styles.content2}>
              <Walk />
            </div>
          )}
        </div>
        <div className={Styles.pages}>
          <ul className={Styles.list}>
            <li
              data-target="1"
              className={`${Styles.item} ${active === 1 ? Styles.active : ""}`}
              onClick={() => {
                handlePageClick(1);
              }}
            ></li>
            <li
              data-target="2"
              className={`${Styles.item}
              ${active === 2 ? Styles.active : ""}`}
              onClick={() => {
                handlePageClick(2);
              }}
            ></li>
          </ul>
        </div>
      </div>
      <Chat />
      <Modal
        centered
        open={isShowModal}
        footer={null}
        onCancel={() => {
          toggleModal(false);
        }}
        width={1000}
      >
      <ActorModal />
      </Modal>
    </div>
  );
};

export default inject("actorStore")(observer(Actor));
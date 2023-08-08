import Styles from "./DragAndDrop.module.scss";
import { useEffect, useState, useRef } from "react";

const DraggableItem = ({ content, drag, update }) => {
  const [dragData, setDragData] = drag;
  const [updateData, setUpdateData] = update;

  const dragStart = (e) => {
    e.target.style.opacity = "0.4";
    setDragData({
      target: e.target,
      content: e.dataTransfer.getData("text/html"),
    });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.innerHTML);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("over");
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("over");
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  };

  const dragDrop = (e) => {
    if (dragData.target !== e.target) {
      dragData.target.innerHTML = e.target.innerHTML;
      e.target.innerHTML = e.dataTransfer.getData("text/html");
      setUpdateData(!updateData);
    }
    e.target.style.opacity = "1";
    return false;
  };

  const dragEnd = (e) => {
    e.preventDefault();
    e.target.style.opacity = "1";
    e.target.classList.remove("over");
  };

  return (
    <div
      className={Styles.draggable}
      draggable="true"
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={dragOver}
      onDrop={dragDrop}
      onDragEnd={dragEnd}
    >
      {content}
    </div>
  );
};

const DragAndDrop = () => {
  const items = ["难过", "愉快", "喜欢", "平静", "惊讶", "害怕", "厌恶"];
  const emojMap = {
    "难过": "😭",
    "愉快": "😄",
    "喜欢": "😍",
    "平静": "😐",
    "惊讶": "😮",
    "害怕": "😱",
    "厌恶": "😒",
  }
  const drag = useState(null);
  const update = useState(false);
  const orderRef = useRef(null);
  const [orderArray, setOrderArray] = useState([]); // 用于存储拖拽后的顺序
  useEffect(() => {
    // 获取orderRef的DOM节点的顺序
    const order = orderRef.current;
    const items = order.querySelectorAll("div");
    const orderArray = [];
    items.forEach((item) => {
      orderArray.push(emojMap[item.innerText]);
    });
    setOrderArray(orderArray);
  }, [update[0]]);
  return (
    <>
      <p>拖动进行排序</p>
      {
        orderArray.map((item, index) => {
          if (index === 0) {
            return <span key={index}>{item}</span>
          } else {
            return <span key={index}>＞{item}</span>
          }
        })
      }
      <ul ref={orderRef}>
        {items.map((item, index) => (
          <DraggableItem
            key={index}
            content={item}
            drag={drag}
            update={update}
          />
        ))}
      </ul>
    </>
  );
};

export default DragAndDrop;

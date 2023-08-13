import { Heatmap } from "@ant-design/plots";
import { inject, observer } from "mobx-react";

const EmotionPiece = (props) => {
  const emotionMap = {
    1: "难过",
    2: "愉快",
    3: "喜欢",
    4: "平静",
    5: "惊讶",
    6: "害怕",
    7: "厌恶",
  };
  const { emotionStore } = props;
  const { toggleModal, fetchSegmentInfoById } = emotionStore;
  const emotionData = props.emotionData;
  const data = [];
  if (emotionData && emotionData.length > 0) {
    let x = 1;
    let y = 1;
    const restNumber = emotionData.length % 20;
    // 将emotionData的最后restNumber个写进data
    for (let i = 0; i < restNumber; i++) {
      data.push({
        x: x + "",
        y: y + "",
        segmentId: emotionData[emotionData.length - i - 1].segmentId,
        emotionId: emotionData[emotionData.length - i - 1].emotionId,
      });
      x++;
    }
    y++;
    x = 1;
    for (let i = 0; i < emotionData.length - restNumber; i++) {
      data.push({
        x: x + "",
        y: y + "",
        segmentId:
          emotionData[emotionData.length - restNumber - i - 1].segmentId,
        emotionId:
          emotionData[emotionData.length - restNumber - i - 1].emotionId,
      });
      x++;
      if (x % 21 === 0) {
        x = 1;
        y++;
      }
    }
  }
  const config = {
    data,
    xField: "x",
    yField: "y",
    colorField: "emotionId",
    shape: "circle",
    sizeRatio: 0.5,
    color: [
      "#dddddd",
      "#9ec8e0",
      "#5fa4cd",
      "#2e7ab6",
      "#114d90",
      "#117d90",
      "#114d50",
    ],
    label: {
      style: {
        fill: "#fff",
        shadowBlur: 2,
        shadowColor: "rgba(0, 0, 0, .45)",
      },
      formatter: () => "",
    },
    // 设置hover时的提示框
    tooltip: {
      title: "",
      formatter: (datum) => {
        return { name: "情感", value: emotionMap[datum.emotionId] };
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    onReady: (plot) => {
      plot.on("element:click", (...args) => {
        const { target } = args[0];
        // cfg element data
        const data = target["cfg"]["origin"]["data"];
        const segmentId = data["segmentId"];
        fetchSegmentInfoById(segmentId);
        toggleModal(true);
      });
    },
  };

  return (
    <div>
      <Heatmap {...config} />
    </div>
  );
};

export default inject("emotionStore")(observer(EmotionPiece));

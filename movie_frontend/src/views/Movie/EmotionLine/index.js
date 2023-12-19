import { Scatter } from "@ant-design/plots";
import Styles from "./EmotionLine.module.scss";
import { inject, observer } from "mobx-react";

const EmotionLine = (props) => {
  const { emotionStore } = props;
  const { toggleModal, fetchSegmentInfoById } = emotionStore;
  const emotionMap = {
    1: "难过",
    2: "愉快",
    3: "喜欢",
    4: "平静",
    5: "惊讶",
    6: "害怕",
    7: "厌恶",
  };
  const propsData = props.emotionData;
  const data = [];
  if (propsData) {
    propsData.forEach((item, index) => {
      data.push({
        x: index + 1,
        y: item["emotionId"],
        label: emotionMap[item["emotionId"]],
        size: Math.random(),
        segmentId: item["segmentId"],
      });
    });
  }

  const config = {
    appendPadding: 30,
    data,
    color: [
      "r(0.4, 0.3, 0.7) 0:rgba(255,255,255,0.5) 1:#2b2f3a",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#8f9f85",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#993712",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#8f6447",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#ECBC31",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#ed96d9",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#6d6d6e",
    ],
    xField: "x",
    yField: "y",
    colorField: "label",
    height: 250,
    sizeField: "size",
    size: [5, 20],
    shape: "circle",
    tooltip: {
      title: "情感",
        formatter: (datum) => {
        return { name: "情感", value: datum['label'] };
      },
    },
    yAxis: {
      nice: true,
      line: {
        style: {
          stroke: "#fff",
        },
      },
      label: {
        formatter: (val) => emotionMap[val],
        style: {
          fill: "#fff",
        },
      },
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: "#fff",
          },
        },
      },
      line: {
        style: {
          stroke: "#fff",
        },
      },
      label: {
        style: {
          fill: "#fff",
        },
      },
    },
    legend: {
      itemName: {
        style: {
          fill: "#fff",
        },
      },
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
    // 设置hover时cursor的样式
    interactions: [{ type: "element-active" }],
    
  };

  return <Scatter {...config} className={Styles.tinyLine} />;
};

export default inject("emotionStore")(observer(EmotionLine));

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
      "r(0.4, 0.3, 0.7) 0:rgba(255,255,255,0.5) 1:#ff7f0e",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#2ca02c",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#d62728",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#9467bd",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#8c564b",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#e377c2",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#7f7f7f",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#bcbd22",
      "r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#17becf",
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
      fields: ["label"],
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
        console.log(target);
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

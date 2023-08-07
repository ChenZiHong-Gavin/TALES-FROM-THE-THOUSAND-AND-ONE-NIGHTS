import { Scatter } from "@ant-design/plots";
import Styles from "./EmotionLine.module.scss";
import { useEffect, useState } from "react";

const EmotionLine = (props) => {
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
        y: item,
        label: emotionMap[item],
        size: Math.random(),
      });
    });
  }

  const config = {
    appendPadding: 30,
    data,
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
  };

  return <Scatter {...config} className={Styles.tinyLine} />;
};

export default EmotionLine;

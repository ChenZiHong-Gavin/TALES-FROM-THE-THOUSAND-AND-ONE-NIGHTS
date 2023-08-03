import { WordCloud } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";

const WordCloudChart = ({emotionStore}) => {
    if (!emotionStore || !emotionStore.wordCloudData) {
    return null;
  }
  const { wordCloudData: data } = emotionStore;
  
  const config = {
    data,
    wordField: "text",
    weightField: "value",
    color: "#122c6a",
    wordStyle: {
      fontFamily: "Verdana",
      fontSize: [12, 24],
    },
    // 设置交互类型
    interactions: [
      {
        type: "element-active",
      },
    ],
    state: {
      active: {
        // 这里可以设置 active 时的样式
        style: {
          lineWidth: 1,
        },
      },
    },
    tooltip: {
      visible: true,
      showTitle: true,
      title: "text",
      fields: ["value"],
      formatter: (datum) => {
        return { name: datum.text, 
        value: `时长${datum.value/1000}秒` };
      },
    },
  };

  return <WordCloud {...config} style={
    {
      height: 'calc(100vh - 300px)',
    }
  }/>;
};

export default inject("emotionStore")(observer(WordCloudChart));

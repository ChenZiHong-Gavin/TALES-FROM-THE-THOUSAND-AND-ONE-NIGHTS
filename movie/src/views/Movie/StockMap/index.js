import { Stock } from "@ant-design/plots";
import { inject, observer } from "mobx-react";

const StockMap = (props) => {
  const emotionData = props.emotionData;
  const { emotionStore } = props;
  const { toggleModal, fetchSegmentInfoById } = emotionStore;

  let index = 1;
  const data = emotionData.map((item) => ({
    ...item,
    index: index++,
  }));

  const config = {
    appendPadding: [0, 10, 0, 0],
    data,
    xField: "index",
    yField: ["startVolume", "endVolume", "maxVolume", "minVolume"],
    slider: {},
    meta: {
      startVolume: {
        alias: "开始音量",
      },
      endVolume: {
        alias: "结束音量",
      },
      maxVolume: {
        alias: "最高音量",
      },
      minVolume: {
        alias: "最低音量",
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        formatter: (v) => {
          return "";
        },
        style: {
          fill: "#fff",
        },
      },
      title: {
        style: {
          fontSize: 0, // 设置标题字体大小为0，以隐藏标题
        },
      },
      tickfont: {
        color: "white",
      },
    },
    yAxis: {
      tickfont: {
        color: "white",
      },
      label: {
        style: {
          fill: "#fff",
        },
      },
    },
    tooltip: {
      crosshairs: {
        // 自定义 crosshairs line 样式
        line: {
          style: {
            lineWidth: 0.5,
            stroke: "rgba(0,0,0,0.25)",
          },
        },
        text: (type, defaultContent, items) => {
          // console.log(type, defaultContent, items);
          let textContent;
          if (type === "x") {
            const item = items[0];
            textContent = item ? item["data"]["index"] : defaultContent;
          } else {
            textContent = `${defaultContent.toFixed(2)}`;
          }

          return {
            position: type === "y" ? "start" : "end",
            content: textContent,
            // 自定义 crosshairs text 样式
            style: {
              fill: "#dfdfdf",
            },
          };
        },
        // 自定义 crosshairs textBackground 样式
        textBackground: {
          padding: [4, 8],
          style: {
            fill: "#363636",
          },
        },
      },
      fields: ["startVolume", "endVolume", "maxVolume", "minVolume"],
      title: "音量",
      formatter: (datum) => {
        const startVolume = datum["startVolume"].toFixed(2);
        const endVolume = datum["endVolume"].toFixed(2);
        const maxVolume = datum["maxVolume"].toFixed(2);
        const minVolume = datum["minVolume"].toFixed(2);

        return {
          name: "数据",
          value: `开始音量：${startVolume}，结束音量：${endVolume}，最高音量：${maxVolume}，最低音量：${minVolume}`,
        };
      },
    },
    legend: {
      position: "top", // 设置图例的位置
      itemName: {
        style: {
          fill: "#fff", // 设置图例文字颜色为白色
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

  return <Stock {...config} />;
};

export default inject("emotionStore")(observer(StockMap));

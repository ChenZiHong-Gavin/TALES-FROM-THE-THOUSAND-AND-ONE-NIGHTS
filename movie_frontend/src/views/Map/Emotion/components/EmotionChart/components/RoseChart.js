import { Rose } from "@ant-design/plots";
import { inject, observer } from "mobx-react";

const RoseChart = ({ emotionStore }) => {
  if (!emotionStore || !emotionStore.roseData) {
    return null;
  }

  const { roseData: data } = emotionStore;

  const colors = [
    "#2b2f3a",
    "#8f9f85",
    "#993712",
    "#8f6447",
    "#ECBC31",
    "#ed96d9",
    "#6d6d6e",
  ];
  const config = {
    data,
    xField: "type",
    yField: "value",
    seriesField: "type",
    color: colors,
    radius: 0.9,
    legend: {
      position: "right",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <Rose
      {...config}
      style={{
        height: "300px",
      }}
    />
  );
};

export default inject("emotionStore")(observer(RoseChart));

import { WordCloud } from "@ant-design/plots";
import { useEffect, useState } from "react";

const WordCloudChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("https://gw.alipayobjects.com/os/antfincdn/jPKbal7r9r/mock.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  
  const config = {
    data,
    wordField: "x",
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
  };

  return <WordCloud {...config} style={
    {
      height: 'calc(100vh - 300px)',
    }
  }/>;
};

export default WordCloudChart;

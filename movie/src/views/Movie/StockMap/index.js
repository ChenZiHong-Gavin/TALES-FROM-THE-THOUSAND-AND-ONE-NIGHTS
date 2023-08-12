import { useEffect, useState } from "react";
import { Stock } from "@ant-design/plots";

const StockMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("https://gw.alipayobjects.com/os/antfincdn/ZWgtj7pC%261/stock.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    appendPadding: [0, 10, 0, 0],
    data,
    xField: "trade_date",
    yField: ["open", "close", "high", "low"],
    slider: {},
  };

  return <Stock {...config} />;
};

export default StockMap;

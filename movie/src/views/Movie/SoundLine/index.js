import Script from "react-load-script";
import { useState, useEffect } from "react";
import Styles from "./SoundLine.module.scss";
import { useRef } from "react";

function SoundLine(props) {
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const graphRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    if (!graphRef.current) return;
    if (!props.audioSpectrum) return;
    const Plotly = window.Plotly;

    const selectorOptions = {
      buttons: [
        {
          step: "month",
          stepmode: "backward",
          count: 1,
          label: "1m",
        },
        {
          step: "month",
          stepmode: "backward",
          count: 6,
          label: "6m",
        },
        {
          step: "year",
          stepmode: "todate",
          count: 1,
          label: "YTD",
        },
        {
          step: "year",
          stepmode: "backward",
          count: 1,
          label: "1y",
        },
        {
          step: "all",
        },
      ],
    };

    const localData = props.audioSpectrum;

    const prepData = (data) => {
      return [
        {
          mode: "lines",
          x: data.x,
          y: data.y,
        },
      ];
    };

    var data = prepData(localData);
    var layout = {
      title: "频谱分析dB/s(ref=max)",
      xaxis: {
        rangeselector: selectorOptions,
        rangeslider: {},
        tickfont: {
          color: "white",
        },
      },
      yaxis: {
        fixedrange: true,
      },
      plot_bgcolor: "rgba(255, 240, 240, 0.4)",
      paper_bgcolor: "rgba(255, 255, 255, 0)",
      titlefont: {
        color: "white",
      },
    };
    Plotly.plot("graph", data, layout, { showSendToCloud: false });

    const handleResize = () => {
      graphRef.current.innerHTML = "";
      setStart(!start);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Plotly.purge("graph");
    };
  }, [loading, start]);

  return (
    <>
      <Script
        url={process.env.PUBLIC_URL + "/plotly.min.js"}
        onLoad={() => setLoading(false)}
      />
      <div id="graph" ref={graphRef} className={Styles.graphContainer}></div>
    </>
  );
}

export default SoundLine;

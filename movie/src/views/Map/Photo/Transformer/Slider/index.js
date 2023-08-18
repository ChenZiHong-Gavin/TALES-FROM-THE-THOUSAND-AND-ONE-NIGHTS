import { Slider } from "antd";
import Styles from "./Slider.module.scss";

const TimeSlider = () => {
  const style = {
    display: "inline-block",
    height: 300,
    marginLeft: 70,
  };
  const marks = {
    0: "0°C",
    26: "26°C",
    37: "37°C",
    100: {
      style: {
        color: "#f50",
      },
      label: <strong>100°C</strong>,
    },
  };

  
  return (
    <div className={Styles.sliderContainer}>
      <div style={style}>
        <Slider vertical range marks={marks} defaultValue={[26, 37]} />
      </div>
    </div>
  );
};

export default TimeSlider;

import { Slider } from "antd";
import Styles from "./Slider.module.scss";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";

const TimeSlider = ({ photoStore }) => {
  const { setEventRange } = photoStore;
  const style = {
    display: "inline-block",
    height: 300,
    marginLeft: 70,
  };
  const marks = {
    1924: {
      style: {
        color: "#f50",
        marginLeft: "5px",
      },
      label: <strong>1924年</strong>,
    },
    1930: {
      style: {
        color: "#f50",
        marginLeft: "5px",
      },
      label: <strong>1930年</strong>,
    },
    1949: {
      style: {
        color: "#f50",
        marginLeft: "5px",
      },
      label: <strong>1949年</strong>,
    },
    1960: {
      style: {
        color: "#f50",
        marginLeft: "5px",
      },
      label: <strong>1960年</strong>,
    },
    1990: {
      style: {
        color: "#f50",
        marginLeft: "5px",
      },
      label: <strong>1990年</strong>,
    },
    2005: {
      style: {
        color: "#f50",
        marginLeft: "5px",
      },
      label: <strong>2005年</strong>,
    },
  };

  const formatter = (value) => {
    if (value == 1924) {
      return "中国电影的早期发展";
    } else if (value == 1930) {
      return <>
        <p>中国电影的黄金时代</p>
        <p>上海成为当时的电影中心。电影如《马路天使》（Street Angel）和《大路》（The Big Road）等影片在国内外获得了认可，展示了中国电影的实力</p>
      </>
    }
    else if (value == 1949) {
      return <>
        <p>中华人民共和国成立</p>
        <p>中华人民共和国的成立对中国电影产业产生了深远的影响</p>
      </>
    }
    else if (value == 1960) {
      return "文化大革命期间，中国电影受到政治干预和审查的限制。电影制作主要集中在宣传社会主义价值观和政治口号上"
    }
    else if (value == 1990) {
      return "1990年代，中国的第五代导演，包括张艺谋、陈凯歌、李安等，崭露头角。他们的作品如《霸王别姬》、《活着》和《卧虎藏龙》在国际上取得了巨大成功，为中国电影树立了艺术标杆"
    }
    else if (value == 2005) {
      return <>
        <p>国际化和商业化</p>
        <p>2000年代，中国电影产业逐渐国际化和商业化，中国成为全球最大的电影市场之一。电影如《英雄》和《功夫》在国际上取得了商业成功，吸引了更多国际关注</p>
      </>
    }

    return value;
  };

  const handleSliderChange = (value) => {
    setEventRange(value);
  };

  useEffect(() => {
    setEventRange([1924, 2005]);
  }, []);

  return (
    <div className={Styles.sliderContainer}>
      <div style={style}>
        <Slider
          tooltip={{
            formatter,
          }}
          vertical range marks={marks} defaultValue={[1924, 2005]} min={1924} max={2005} onChange={handleSliderChange}/>
      </div>
    </div>
  );
};

export default inject("photoStore")(observer(TimeSlider));

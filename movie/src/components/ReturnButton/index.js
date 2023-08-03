import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import backSVG from "../../assets/svg/back.svg";
import functionSVG from "../../assets/svg/function.svg";
import mapSVG from "../../assets/svg/map.svg";
import emotionSVG from "../../assets/svg/emotion.svg";
import actorSVG from "../../assets/svg/actor.svg";
import photoSVG from "../../assets/svg/photo.svg";
import tagSVG from "../../assets/svg/tag.svg";

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <FloatButton.Group
      trigger="hover"
      type="default"
      style={{
        left: 24,
        top: 24,
      }}
      icon={
        <img
          src={functionSVG}
          alt="function"
          style={{ width: 20, height: 20, textAlign: "center" }}
        />
      }
    >
      <FloatButton
        tooltip={<div>戏院落成</div>}
        icon={
          <img
            src={mapSVG}
            alt="map"
            style={{ width: 20, height: 20, textAlign: "center" }}
          />
        }
        onClick={() => {
          navigate("/map/theatre");
        }}
      />
      <FloatButton
        tooltip={<div>共度喜忧</div>}
        icon={
          <img
            src={emotionSVG}
            alt="emotion"
            style={{ width: 20, height: 20, textAlign: "center" }}
          />
        }
        onClick={() => {
          navigate("/map/emotion");
        }}
      />
      <FloatButton
        tooltip={<div>卧虎藏龙</div>}
        icon={
          <img
            src={actorSVG}
            alt="actor"
            style={{ width: 20, height: 20, textAlign: "center" }}
          />
        }
        onClick={() => {
          navigate("/map/actor");
        }}
      />
      <FloatButton
        tooltip={<div>时光筛影</div>}
        icon={
          <img
            src={photoSVG}
            alt="photograph"
            style={{ width: 20, height: 20, textAlign: "center" }}
          />
        }
        onClick={() => {
          navigate("/map/photo");
        }}
      />
      <FloatButton
        tooltip={<div>大观影戏</div>}
        icon={
          <img
            src={tagSVG}
            alt="tag"
            style={{ width: 20, height: 20, textAlign: "center" }}
          />
        }
        onClick={() => {
          navigate("/map/tag");
        }}
      />
      <FloatButton
        tooltip={<div>返回</div>}
        icon={
          <img
            src={backSVG}
            alt="back"
            style={{ width: 20, height: 20, textAlign: "center" }}
          />
        }
        onClick={() => {
          navigate("/selection");
        }}
      />
    </FloatButton.Group>
  );
};

export default ReturnButton;

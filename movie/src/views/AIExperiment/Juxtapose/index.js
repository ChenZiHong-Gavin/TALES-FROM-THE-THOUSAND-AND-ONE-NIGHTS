import Script from "react-load-script";
import { useEffect, useState } from "react";
import "../../../assets/css/juxtapose.css";
import Styles from "./Juxtapose.module.scss";

function Juxtapose({ imgPath, uri }) {
  const [loading, setLoading] = useState(true);
  const colorImgPath = uri ? "https://old-movie.oss-cn-shanghai.aliyuncs.com/picture/picture_colorful/" + uri.split("/")[uri.split("/").length - 1] + ".jpg" : null;


  useEffect(() => {
    if (loading) return;
  }, [loading]);


  return (
    <div className={Styles.juxtapose}>
      <div className={Styles.description}>
        <p>电影老照片和视频记录了过去的时光，保存了美好的回忆和重要的历史片段。然而，这些旧影像通常会出现模糊、色彩暗淡、帧数丢失的问题</p>
        <p>我们使用PaddleGAN进行图像上色、提高分辨率以及填补丢失的帧数。这些技术可以帮助我们恢复影像的质量，让过去的回忆和历史更清晰和生动</p>
      </div>
      {
        imgPath && colorImgPath &&
        <>
          <Script
            url={process.env.PUBLIC_URL + "/juxtapose.min.js"}
            onLoad={() => setLoading(false)}
          />
          <div
            className={`${Styles.juxtaposeContainer} juxtapose`}>
            <img src={imgPath} alt="" />
            <img src={colorImgPath} alt="" />
          </div>
        </>
      }
    </div>
  );
}

export default Juxtapose;


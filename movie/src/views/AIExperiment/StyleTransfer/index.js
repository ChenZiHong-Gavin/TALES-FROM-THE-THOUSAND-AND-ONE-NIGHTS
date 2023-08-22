import Script from "react-load-script";
import { useEffect, useState } from "react";
import Styles from "./StyleTransfer.module.scss";
import WaveUrl from "../../../assets/jpg/wave.jpg"
import UdnieUrl from "../../../assets/jpg/udnie.jpg"
import { LoadingOutlined } from "@ant-design/icons";

const StyleTransfer = ({ imgPath }) => {
  const [loading, setLoading] = useState(true);
  const [styleAImageLoaded, setStyleAImageLoaded] = useState(false);
  const [styleBImageLoaded, setStyleBImageLoaded] = useState(false);
  const [styleALoaded, setStyleALoaded] = useState(false);
  const [styleBLoaded, setStyleBLoaded] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (styleAImageLoaded) {
      const ml5 = window.ml5;
      const inputImg = document.getElementById('inputImgA');
      const resultA = document.getElementById('resultA');
      ml5.styleTransfer(
        `${process.env.PUBLIC_URL}/ml5/models/wave`
      )
        .then(style1 => style1.transfer(inputImg))
        .then(result => {
          setStyleALoaded(true);
          const newImage1 = new Image(250, 250);
          newImage1.src = result.src;
          resultA.appendChild(newImage1);
        });
    }
  }, [styleAImageLoaded, loading]);

  useEffect(() => {
    if (loading) return;
    if (styleBImageLoaded) {
      const ml5 = window.ml5;
      const inputImg = document.getElementById('inputImgB');
      const resultB = document.getElementById('resultB');
      ml5.styleTransfer(
        `${process.env.PUBLIC_URL}/ml5/models/udnie`
      )
        .then(style2 => style2.transfer(inputImg))
        .then(result => {
          setStyleBLoaded(true);
          const newImage2 = new Image(250, 250);
          newImage2.src = result.src;
          resultB.appendChild(newImage2);
        }
        );
    }

  }, [styleBImageLoaded, loading]);




  return (
    <div>
      <div className={Styles.description}>
        <p>风格迁移是一种令人着迷的图像处理技术，它可以赋予照片或图像全新的艺术风格，让它们看起来仿佛是由大师亲手创作的作品</p>
        <p>这个过程利用了ml5js的方法和pix2pix模型，通过将电影剧照与所选艺术风格相融合，创造出独特而富有创意的视觉效果</p>
      </div>
      <Script
        url={process.env.PUBLIC_URL + "/ml5.min.js"}
        onLoad={() => setLoading(false)}
      />
      <div className={Styles.styleImages}>
        <div className={Styles.part}>
          <p>输入图片</p>
          {
            imgPath && <img
              src={imgPath}
              alt="input img"
              id="inputImgA"
              onLoad={() => {
                setStyleAImageLoaded(true);
              }}
              crossOrigin='anonymous'
            />
          }
        </div>
        <div id="styleA" className={Styles.part}>
          <p>
            <a href="https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa">
              Wave风格
            </a>
          </p>
          <img
            src={WaveUrl}
            alt="style img"
          />
        </div>
        <div className={Styles.part} id="resultA">
          <p>结果</p>
          {
            styleALoaded === false && <LoadingOutlined
              style={{
                fontSize: "50px"
              }}
            />
          }
        </div>
        <div className={Styles.part}>
          <p>输入图片</p>
          {
            imgPath && <img
              src={imgPath}
              alt="input img"
              id="inputImgB"
              onLoad={() => {
                setStyleBImageLoaded(true);
              }}
              crossOrigin='anonymous'
            />
          }
        </div>
        <div id="styleB" className={Styles.part}>
          <p>
            <a href="https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa">
              Udnie风格
            </a>
          </p>
          <img
            src={UdnieUrl}
            alt="style img"
          />
        </div>
        <div className={Styles.part} id='resultB'>
          <p>结果</p>
          {
            styleBLoaded === false && <LoadingOutlined
              style={{
                fontSize: "50px"
              }}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default StyleTransfer;

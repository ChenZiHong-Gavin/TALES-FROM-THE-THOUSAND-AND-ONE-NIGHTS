import { useEffect, useState } from "react";
import Styles from "./StyleTransfer.module.scss";
import { LoadingOutlined, DownOutlined } from "@ant-design/icons";
import * as ml5 from "ml5";
import { Dropdown, Space, Button } from 'antd';

const StyleTransfer = ({ imgPath }) => {
  const [disabled, setDisabled] = useState(true);
  const [styleChoose, setStyleChoose] = useState(null);
  const [styleImageLoaded, setStyleImageLoaded] = useState(false);
  const [result, setResult] = useState(null);

  const items = [
    {
      key: '1',
      label: 'Wave风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/wave",
      source: "https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/wave.jpg"
    },
    {
      key: '2',
      label: 'Udnie风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/udnie",
      source: "https://en.wikipedia.org/wiki/Udnie",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/udnie.jpg"
    },
    {
      key: '3',
      label: 'La Muse风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/la_muse",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/la_muse.jpg"
    },
    {
      key: '4',
      label: 'Mathura风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/mathura",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/maturana.jpg"
    },
    {
      key: '5',
      label: 'Matilde Perez风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/matilde_perez",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/matildeperez.jpg"
    },
    {
      key: '6',
      label: 'Matta风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/matta",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/matta.jpg"
    },
    {
      key: '7',
      label: 'Rain Princess风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/rain_princess",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/rain-princess.jpg"
    },
    {
      key: '8',
      label: 'Scream风格',
      href: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/scream",
      image: "https://old-movie.oss-cn-shanghai.aliyuncs.com/model/scream.jpg"
    },
  ];

  useEffect(() => {
    if (styleImageLoaded) {
      setDisabled(false);
    }
  }, [styleImageLoaded]);

  const handleMenuClick = (e) => {
    setDisabled(true);
    setResult(null);
    const id = e.key;
    setStyleChoose(id);
    const inputImg = document.getElementById('inputImg');
    ml5.styleTransfer(
      items[id - 1].href
    )
      .then(
        (style1) => {
          style1.transfer(inputImg).then((result) => {
            setResult(result.src);
            setDisabled(false);
          });
        }
      )


  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
    disabled: disabled,
    selectable: true,
  };

  return (
    <div>
      <div className={Styles.description}>
        <p>风格迁移是一种令人着迷的图像处理技术，它可以赋予照片或图像全新的艺术风格，让它们看起来仿佛是由大师亲手创作的作品</p>
        <p>这个过程利用了ml5js的方法和pix2pix模型，通过将电影剧照与所选艺术风格相融合，创造出独特而富有创意的视觉效果</p>
      </div>
      <div className={Styles.styleImages}>
        <div className={Styles.part}>
          <p>输入图片</p>
          {
            imgPath && <img
              src={imgPath}
              alt="input img"
              id="inputImg"
              onLoad={() => {
                setStyleImageLoaded(true);
              }}
              crossOrigin='anonymous'
            />
          }
        </div>
        <div id="style" className={Styles.part}>
          <p>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  风格选择
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </p>
          {
            styleChoose && <img
              src={items[styleChoose - 1].image}
              alt="style img"
            />
          }
        </div>
        <div className={Styles.part} id="result">
          <p>结果</p>
          {
            styleChoose && (
              result ? <img
                src={result}
                alt="result img"
              /> : <LoadingOutlined
                style={{
                  fontSize: "50px"
                }}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default StyleTransfer;

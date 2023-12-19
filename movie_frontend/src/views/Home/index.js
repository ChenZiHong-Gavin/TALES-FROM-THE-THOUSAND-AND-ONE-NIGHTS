import Styles from './Home.module.scss';
import logoGif from '../../assets/gif/logo.gif'
import titleGif from '../../assets/gif/title.gif'
import originSvg from '../../assets/svg/origin.svg'
import { Button } from 'antd';
import { useState } from 'react';
import { getPictureListSelected } from '../../api/home';
import { useOnMountUnsafe } from '../../hooks/useOnMountUnsafe';
import { useNavigate } from "react-router-dom";
import { RollPulse } from '../../components/loading';

// TODO: 图片需要上传阿里云OSS: 原始版本和缩略图版本
function Home() {
  const navigate = useNavigate();
  const [pictureList, setPictureList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useOnMountUnsafe(() => {
    getPictureListSelected(8).then(res => {
      if(res.data.code === 200){
        const list = res.data.data;
        setPictureList(list);
        Promise.all(list.map(item => loadImage(item.imgPath))) // 等待所有图片加载完成
        .then(() => {
            setIsLoading(false);
        })
        .catch(error => {
            // TODO: 图片加载失败时需要替换为默认图片
            console.error('图片加载失败', error);
            setIsLoading(false);
        });
      }
    })
    .catch(err => {
      // TODO: 错误处理
      console.log(err);
      setIsLoading(false);
    })
  })

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve();
      }
      img.onerror = () => {
        reject();
      }
      img.src = src;
    })
  }

  return (
    <div>
     {isLoading ? (
      <div className={Styles.loadingBackground}>
        <div className={Styles.loading}>
          <RollPulse/>
        </div>
      </div>
      ) : 
      <>
      <div className={Styles.container}>
        {pictureList.map((item, index) => (
            <div
              key={index}
              className={Styles.item}
              onClick={() => {
                // navigate('/aiExperiment?pictureId=' + item.pictureId);
                window.location.href = '/aiExperiment?pictureId=' + item.pictureId;
              }}
              style={{ backgroundImage: `url(${item.imgPath})` }}
            ></div>
        ))}
      </div>

      <div className={Styles.homeTextBox}>
        <img src={logoGif} alt="LOGO"></img>
        <span className={Styles.homeText}>
          <img src={titleGif} alt="一千零一夜" />
        </span>
        <span className={Styles.homeText}>1916-2001</span>
        <Button
        size='large'
        className={Styles.explore} type="dashed" ghost onClick={
          () => {
            navigate('/selection');
          }
        }>
          <span>开始</span>
        </Button>
      </div>

      <div className={Styles.origin}>
        <img src={originSvg} alt="origin" onClick={
          () => {
            window.open('https://www.library.sh.cn/');
          }
        }/>
      </div>

      <div className={Styles.mask}></div> 
      </> 
      }
    </div>
  );
}

export default Home;

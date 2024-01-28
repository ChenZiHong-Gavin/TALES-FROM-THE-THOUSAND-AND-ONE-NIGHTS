import Juxtapose from "./Juxtapose";
import StyleTransfer from "./StyleTransfer";
import { Button, Tabs } from "antd";
import { PictureOutlined, SendOutlined } from '@ant-design/icons';
import Styles from "./AIExperiment.module.scss"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPictureById } from "../../api/picture";
import ReturnButton from "../../components/ReturnButton";

const AIExperiment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pictureId = searchParams.get("pictureId");
  const [pictureInfo, setPictureInfo] = useState({});

  useEffect(() => {
    if (pictureId) {
      getPictureById(pictureId)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.data;
            setPictureInfo(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pictureId]);

  const modules = [
    {
      name: "老照片上色",
      icon: <PictureOutlined />,
      component: <Juxtapose
        imgPath={pictureInfo.imgPath}
        uri={pictureInfo.uri}
      />
    },
    {
      name: "风格迁移",
      icon: <SendOutlined />,
      component: <StyleTransfer
        imgPath={pictureInfo.imgPath}
      />
    },
  ]


  return (
    <div>
      <ReturnButton />
      <div className={Styles.title}>
        <h1>AI实验室</h1>
      </div>
      <Tabs centered defaultActiveKey="2"
        tabBarExtraContent={
          <div className={Styles.extraContent}>
            <Button type="default"
              style={
                { marginRight: "20px" }
              }
              onClick={() => {
                // 1-1740
                while (true) {
                  const random = Math.ceil(Math.random() * 1740);
                  if (random !== pictureId) {
                    window.location.href = `/aiexperiment?pictureId=${random}`;
                    break;
                  }
                }
              }}>换一张</Button>
          </div>
        }
        items={modules.map((module, i) => {
          return {
            label: (
              <span>
                {module.icon}
                {module.name}
              </span>
            ),
            key: i,
            children: module.component
          }
        })}
      >
      </Tabs>

    </div>
  );
}

export default AIExperiment;
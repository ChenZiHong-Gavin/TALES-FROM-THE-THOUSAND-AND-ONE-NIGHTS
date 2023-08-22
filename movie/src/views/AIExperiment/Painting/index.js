import Styles from "./Painting.module.scss";

const Painting = () => {
    return (
        <div>
            <div className={Styles.description}>
                <p>使用stable diffusion模型，baseline为realisticVisionV20_v20，利用老照片训练了lora，并进行图生图</p>
                <p>lora下载地址：</p>
            </div>
        </div>
    )
}

export default Painting;
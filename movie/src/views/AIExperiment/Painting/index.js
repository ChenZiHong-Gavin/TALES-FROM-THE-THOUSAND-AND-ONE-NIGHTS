import Styles from "./Painting.module.scss";

const Painting = ({
    imgPath, uri
}) => {
    const imgSD1 = uri ? "https://old-movie.oss-cn-shanghai.aliyuncs.com/picture/picture_sd1/" + uri.split("/")[uri.split("/").length - 1] + ".jpg" : null;
    const imgSD2 = uri ? "https://old-movie.oss-cn-shanghai.aliyuncs.com/picture/picture_sd2/" + uri.split("/")[uri.split("/").length - 1] + ".jpg" : null;
    return (
        <div>
            <div className={Styles.description}>
                <p>使用stable diffusion模型，baseline为
                    <a
                        href="https://huggingface.co/SG161222/Realistic_Vision_V2.0"
                        target="_blank"
                    >
                        realisticVisionV20_v20
                    </a>
                    ，利用老照片训练了lora，并进行图生图</p>
                <p>lora下载地址：
                    <a
                        href="https://pan.baidu.com/s/16dFDEysePTNN70XrMPIT_g?pwd=x012"
                        target="_blank"
                    >
                        老电影海报LORA模型
                    </a>
                </p>
            </div>
            {/* 原图 sd1 sd2 */}
            {
                imgSD1 && imgSD2 &&
                <div className={Styles.imgs}>
                    <div className={Styles.img}>
                        <p>原图</p>
                        <img src={imgPath} alt="" />
                    </div>
                    <div className={Styles.img}>
                        <p>img2img</p>
                        <img src={imgSD1} alt="" />
                    </div>
                    <div className={Styles.img}>
                        <p>img2img</p>
                        <img src={imgSD2} alt="" />
                    </div>
                </div>
            }
        </div>
    )
}

export default Painting;
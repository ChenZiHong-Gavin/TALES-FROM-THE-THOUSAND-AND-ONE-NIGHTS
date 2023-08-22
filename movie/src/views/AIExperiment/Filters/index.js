import LightGallery from 'lightgallery/react';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import lgZoom from 'lightgallery/plugins/zoom';
import Styles from "./Filters.module.scss";
import { useEffect, useState } from "react";
import filters from "./config";

const Filters = ({ imgPath, uri }) => {
    const imgThumbnail = uri ? "https://old-movie.oss-cn-shanghai.aliyuncs.com/picture/picture_thumbnail/" + uri.split("/")[uri.split("/").length - 1] + ".jpg" : null;
    const [filteredImagePaths, setFilteredImagePaths] = useState([]);

    useEffect(() => {
        if (imgPath) {
            const img = new Image();
            img.src = imgPath;
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                setFilteredImagePaths([])
                const imageUrls = [];
                // 对filters中的所有滤镜都执行一遍
                filters.forEach(filter => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.filter = filter.filter;
                    ctx.drawImage(img, 0, 0);
                    const filteredImageUrl = canvas.toDataURL('image/jpeg');
                    imageUrls.push(filteredImageUrl);
                });
                setFilteredImagePaths(imageUrls);
            }
        }
    }, [imgPath]);


    const onInit = () => {
    };

    return (
        <div className={Styles.filterPage}>
            <div className={Styles.description}>
                <p>虽然没有用到机器学习技术，但是使用instagram.css实现的滤镜为老照片增添了别样的风格趣味</p>
            </div>
            {
                imgThumbnail && filteredImagePaths.length > 0 &&
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgZoom]}
                >
                    {
                        filteredImagePaths.map((filteredImagePath, index) => {
                            return (
                                <a key={index} href={filteredImagePath}>
                                    <img 
                                    id = {index}
                                    style={
                                        {
                                            filter: filters[index]["filter"]
                                        }
                                    }
                                    alt={filters[index]["name"]} src={imgThumbnail} />
                                </a>
                            )
                        })
                    }
                </LightGallery>
            }

        </div>
    );
}

export default Filters;
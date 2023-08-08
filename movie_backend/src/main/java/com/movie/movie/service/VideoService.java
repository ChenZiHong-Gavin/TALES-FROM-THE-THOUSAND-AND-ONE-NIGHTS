package com.movie.movie.service;

import com.movie.movie.vo.PictureBasicVO;
import com.movie.movie.vo.VideoInfoVO;

public interface VideoService {
    /**
     * @param videoId: 视频id
     * @return 返回视频的详细信息
     */
    VideoInfoVO getVideoSelected(Integer videoId);
    VideoInfoVO getVideoSelectedByEmotionOrder(String emotionOrder);

}

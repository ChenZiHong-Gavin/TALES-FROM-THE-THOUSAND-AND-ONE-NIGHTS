package com.movie.movie.service;

import com.movie.movie.vo.PictureBasicVO;
import com.movie.movie.vo.SegmentVO;
import com.movie.movie.vo.VideoInfoVO;

import java.util.List;

public interface VideoService {
    /**
     * @param videoId: 视频id
     * @return 返回视频的详细信息
     */
    VideoInfoVO getVideoSelected(Integer videoId);
    List<SegmentVO> getVideoPictureSelectedByEmotionOrder(String emotionOrder);

}

package com.movie.movie.service;

import com.movie.movie.vo.SegmentByEmotionVO;

import java.util.List;

public interface EmotionService {
    List<SegmentByEmotionVO> getSegmentByEmotions();
}

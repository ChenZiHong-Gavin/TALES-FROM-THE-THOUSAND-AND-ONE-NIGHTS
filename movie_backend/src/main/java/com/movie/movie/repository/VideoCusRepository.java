package com.movie.movie.repository;

import com.movie.movie.modal.domain.Video;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;

import java.util.List;

public interface VideoCusRepository {
    Video findVideoByEmotionOrder(List<Integer> emotionOrder);
}

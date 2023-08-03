package com.movie.movie.repository;

import com.movie.movie.modal.domain.Emotion;
import com.movie.movie.modal.domain.Picture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmotionRepository extends MongoRepository<Emotion, Long> {
    // 返回所有数据
    @Query("{ }")
    List<Emotion> findSegmentIdByEmotionType();
}

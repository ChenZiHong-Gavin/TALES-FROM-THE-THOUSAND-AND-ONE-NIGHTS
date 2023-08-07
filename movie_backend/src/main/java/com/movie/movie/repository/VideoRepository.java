package com.movie.movie.repository;

import com.movie.movie.modal.domain.Theatre;
import com.movie.movie.modal.domain.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository  extends MongoRepository<Video, Integer> {
    @Query("{ 'videoId' : ?0 }")
    Video findByVideoId(Integer videoId);
}

package com.movie.movie.repository;
import com.movie.movie.modal.domain.Picture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PictureRepository extends MongoRepository<Picture, Long> {
    //找到所有movieId不为""的值
    @Query("{ 'movieId' : { $ne: '' } }")
    List<Picture> findByMovieIdIsNotNull();

    //找到所有movieId为指定值的记录
    @Query("{ 'movieId' : ?0 }")
    List<Picture> findByMovieId(Integer movieId);
}

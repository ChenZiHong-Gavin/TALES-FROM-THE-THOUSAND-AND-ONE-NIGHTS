package com.movie.movie.repository;

import com.movie.movie.modal.domain.Emotion;
import com.movie.movie.modal.domain.Segment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SegmentRepository extends MongoRepository<Segment, Long> {
    @Query("{ '_id' : { $in: ?0 } }")
    List<Segment> findSegmentByIds(List<Integer> ids);
}

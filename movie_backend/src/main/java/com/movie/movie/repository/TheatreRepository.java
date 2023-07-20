package com.movie.movie.repository;
import com.movie.movie.modal.domain.Theatre;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TheatreRepository extends MongoRepository<Theatre, Integer> {
    // 找到theatreId为指定值的记录
    @Query("{ 'theatreId' : ?0 }")
    Theatre findByTheatreId(Integer theatreId);
}

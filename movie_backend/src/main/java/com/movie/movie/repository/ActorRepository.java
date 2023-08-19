package com.movie.movie.repository;
import com.movie.movie.modal.domain.Actor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActorRepository extends MongoRepository<Actor, Integer> {
    // 返回全部演员
    @Query("{ }")
    List<Actor> findAll();

    // 返回全部avatarUrl不为空的演员
    @Query("{ 'avatarUrl' : { $ne : '' } }")
    List<Actor> findAllWithAvatarUrl();

    // 根据演员id返回演员信息
    @Query("{ 'actorId' : ?0 }")
    Actor findActorByActorId(Integer actorId);
}

package com.movie.movie.service.impl;
import com.movie.movie.modal.domain.Actor;
import com.movie.movie.repository.ActorRepository;
import com.movie.movie.service.ActorService;
import com.movie.movie.vo.ActorPictureVO;
import com.movie.movie.vo.ActorVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

import static com.movie.movie.util.RandomUtil.randomIndexesGenerator;

@Service
public class ActorServiceImpl implements ActorService {

    @Autowired
    private ActorRepository actorRepository;
    /**
     * @return 返回图片列表
     */
    public List<ActorPictureVO> getActorPictures(Integer limit) {
        List<Actor> actorList = actorRepository.findAll();
        // 有些演员没有照片，所以要判断一下，从这里选择limit个
        // 过滤出有照片的演员
        List<Actor> actorListWithPicture = new ArrayList<>();
        for (Actor actor : actorList) {
            if (actor.getPhotoOfPerson().size() > 0) {
                actorListWithPicture.add(actor);
            }
        }
        List<ActorPictureVO> actorPictureVO = new ArrayList<>();
        List<Integer> randomIndex = randomIndexesGenerator(actorListWithPicture.size(), limit);

        for (Integer index : randomIndex) {
            Actor actor = actorListWithPicture.get(index);
            ActorPictureVO actorPictureVO1 = ActorPictureVO.builder()
                    .actorId(actor.getActorId())
                    .photoOfPerson(actor.getPhotoOfPerson())
                    .build();
            actorPictureVO.add(actorPictureVO1);
        }
        return actorPictureVO;


    }

    /**
     * @return 返回头像列表
     */
    public List<ActorVO> getActorAvatars() {
        List<Actor> actorList = actorRepository.findAllWithAvatarUrl();
        List<ActorVO> actorVOList = new ArrayList<>();
        for (Actor actor : actorList) {
            ActorVO actorVO = ActorVO.builder()
                    .actorId(actor.getActorId())
                    .uri(actor.getUri())
                    .avatarUrl(actor.getAvatarUrl())
                    .audioOfPerson(actor.getAudioOfPerson())
                    .photoOfPerson(actor.getPhotoOfPerson())
                    .movieOfPerson(actor.getMovieOfPerson())
                    .personDetail(actor.getPersonDetail())
                    .videoOfPerson(actor.getVideoOfPerson())
                    .build();
            actorVOList.add(actorVO);
        }
        return actorVOList;
    }
}

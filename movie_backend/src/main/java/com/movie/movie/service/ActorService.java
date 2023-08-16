package com.movie.movie.service;

import com.movie.movie.vo.ActorPictureVO;
import com.movie.movie.vo.ActorVO;

import java.util.List;

public interface ActorService {
    /**
     * @return 返回图片列表
     */
    List<ActorPictureVO> getActorPictures(Integer limit);

    /**
     * @return 返回头像列表
     */
    List<ActorVO> getActorAvatars();
}

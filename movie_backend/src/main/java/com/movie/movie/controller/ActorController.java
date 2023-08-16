package com.movie.movie.controller;
import com.movie.movie.service.ActorService;
import com.movie.movie.util.Result;
import com.movie.movie.util.ResultGenerator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class ActorController {
    @Resource
    private ActorService actorService;

    // 获取limit张演员照片
    @RequestMapping("/pictures/actors")
    public Result<Object> getActorPictures(Integer limit) {
        return ResultGenerator.genSuccessResult(actorService.getActorPictures(limit));
    }

    // 获取108个有头像的演员信息
    @RequestMapping("/avatars/actors")
    public Result<Object> getActorAvatars() {
        return ResultGenerator.genSuccessResult(actorService.getActorAvatars());
    }
}

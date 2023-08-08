package com.movie.movie.controller;
import com.movie.movie.service.VideoService;
import com.movie.movie.util.Result;
import com.movie.movie.util.ResultGenerator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class VideoController {
    @Resource
    private VideoService videoService;

    @RequestMapping("/info/videos")
    public Result<Object> getVideoInfo(Integer videoId) {
        return ResultGenerator.genSuccessResult(videoService.getVideoSelected(videoId));
    }

    @RequestMapping("/videos/emotionOrder")
    public Result<Object> getVideoInfoByEmotionOrder(String emotionOrder) {
        return ResultGenerator.genSuccessResult(videoService.getVideoSelectedByEmotionOrder(emotionOrder));
    }

}

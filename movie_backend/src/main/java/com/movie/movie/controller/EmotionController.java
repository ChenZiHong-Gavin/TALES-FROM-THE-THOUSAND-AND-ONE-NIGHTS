package com.movie.movie.controller;

import com.movie.movie.service.EmotionService;
import com.movie.movie.util.Result;
import com.movie.movie.util.ResultGenerator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class EmotionController {
    @Resource
    private EmotionService emotionService;

    @RequestMapping(value = "/getSegmentByEmotion", method = RequestMethod.GET)
    public Result<Object> getSegmentByEmotion() {
        return ResultGenerator.genSuccessResult(emotionService.getSegmentByEmotions());
    };
}

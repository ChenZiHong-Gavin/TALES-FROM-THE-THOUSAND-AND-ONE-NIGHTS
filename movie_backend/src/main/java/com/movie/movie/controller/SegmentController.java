package com.movie.movie.controller;

import com.movie.movie.service.SegmentService;
import com.movie.movie.util.Result;
import com.movie.movie.util.ResultGenerator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class SegmentController {
    @Resource
    private SegmentService segmentService;

    @RequestMapping("/info/segment")
    public Result<Object> getSegmentInfo(Integer segmentId) {
        return ResultGenerator.genSuccessResult(segmentService.getSegmentSelected(segmentId));
    }
}

package com.movie.movie.controller;

import com.movie.movie.service.PictureService;
import com.movie.movie.service.TheatreService;
import com.movie.movie.util.ParamQuery;
import com.movie.movie.util.Result;
import com.movie.movie.util.ResultGenerator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
public class ImageController {
    @Resource
    private PictureService pictureService;

    @RequestMapping(value = "/image/list", method = RequestMethod.GET)
    public Result<Object> getPictureListSelected(@RequestParam Map<String, String> params) {
        ParamQuery paramQuery = new ParamQuery(params);
        return ResultGenerator.genSuccessResult(pictureService.getPictureListSelected(paramQuery));
    }

    @RequestMapping(value = "/image/info/list", method = RequestMethod.GET)
    public Result<Object> getPictureInfoListSelected(@RequestParam Map<String, String> params) {
        ParamQuery paramQuery = new ParamQuery(params);
        return ResultGenerator.genSuccessResult(pictureService.getPictureInfoListSelected(paramQuery));
    }

    // 根据pictureId获取图片信息
    @RequestMapping(value = "/image/info", method = RequestMethod.GET)
    public Result<Object> getPictureInfo(Integer pictureId) {
        return ResultGenerator.genSuccessResult(pictureService.getPictureInfo(pictureId));
    }

}

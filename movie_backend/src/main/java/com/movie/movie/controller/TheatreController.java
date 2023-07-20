package com.movie.movie.controller;

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
public class TheatreController {
    @Resource
    private TheatreService theatreService;

    @RequestMapping(value="/info/theatres", method = RequestMethod.GET)
    public Result<Object> getTheatreInfo(@RequestParam Integer theatreId) {
        return ResultGenerator.genSuccessResult(theatreService.getTheatreSelected(theatreId));
    }
}

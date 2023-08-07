package com.movie.movie.service;
import com.movie.movie.util.ParamQuery;
import com.movie.movie.vo.TheatreInfoVO;

import java.util.List;

public interface TheatreService {
    /**
     * @return 返回图片列表
     */
    TheatreInfoVO getTheatreSelected(Integer theatreId);
}

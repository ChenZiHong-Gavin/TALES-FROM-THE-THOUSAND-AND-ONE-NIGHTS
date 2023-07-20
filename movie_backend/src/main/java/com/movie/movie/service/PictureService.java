package com.movie.movie.service;
import com.movie.movie.vo.PictureBasicVO;
import com.movie.movie.util.ParamQuery;
import java.util.List;

public interface PictureService {
    /**
     * @param paramQuery-limit: 限制返回的数据条数
     * @return 返回图片列表
     */
    List<PictureBasicVO> getPictureListSelected(ParamQuery paramQuery);
}

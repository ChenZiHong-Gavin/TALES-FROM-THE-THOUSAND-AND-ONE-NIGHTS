package com.movie.movie.service;
import com.movie.movie.vo.PictureBasicVO;
import com.movie.movie.util.ParamQuery;
import com.movie.movie.vo.PictureInfoVO;

import java.util.List;

public interface PictureService {
    /**
     * @param paramQuery-limit: 限制返回的数据条数
     * @return 返回图片列表
     */
    List<PictureBasicVO> getPictureListSelected(ParamQuery paramQuery);

    /**
     * @param paramQuery-limit: 限制返回的数据条数
     * @return 返回图片信息列表
     */
    List<PictureInfoVO> getPictureInfoListSelected(ParamQuery paramQuery);

    /**
     * @param pictureId
     * @return 返回图片信息
     */
    PictureInfoVO getPictureInfo(Integer pictureId);
}

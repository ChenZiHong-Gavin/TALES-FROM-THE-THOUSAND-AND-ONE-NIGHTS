package com.movie.movie.service.impl;
import com.movie.movie.modal.domain.Picture;
import com.movie.movie.service.PictureService;
import com.movie.movie.util.ParamQuery;
import com.movie.movie.vo.PictureBasicVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.movie.movie.repository.PictureRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class PictureServiceImpl implements PictureService {
    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public List<PictureBasicVO> getPictureListSelected(ParamQuery paramQuery) {
        int limit = paramQuery.getLimit();
        // 找到pictureRepository中movieId不为""的所有值
        List<Picture> pictureList = pictureRepository.findByMovieIdIsNotNull();
        // 随机选取limit个
        List<PictureBasicVO> pictureBasicVOList = new ArrayList<>();
        for (int i = 0; i < limit; i++) {
            int random = (int) (Math.random() * pictureList.size());
            Picture picture = pictureList.get(random);
            PictureBasicVO pictureBasicVO = PictureBasicVO.builder()
                    .pictureId(picture.getPictureId())
                    .imgPath(picture.getImgPath())
                    .movieId(picture.getMovieId())
                    .build();
            pictureBasicVOList.add(pictureBasicVO);
        }
        return pictureBasicVOList;
    }
}

package com.movie.movie.service;

import com.movie.movie.modal.domain.Segment;
import com.movie.movie.vo.SegmentBasicVO;

public interface SegmentService {
    /**
     * @param segmentId: 片段id
     * @return 返回片段信息
     */
    SegmentBasicVO getSegmentSelected(Integer segmentId);
}

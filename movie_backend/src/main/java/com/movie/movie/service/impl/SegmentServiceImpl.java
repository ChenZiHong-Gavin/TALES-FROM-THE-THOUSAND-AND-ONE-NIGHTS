package com.movie.movie.service.impl;

import com.movie.movie.modal.domain.Segment;
import com.movie.movie.repository.SegmentRepository;
import com.movie.movie.service.SegmentService;
import com.movie.movie.vo.SegmentBasicVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SegmentServiceImpl implements SegmentService {
    @Autowired
    private SegmentRepository segmentRepository;

    @Override
    public SegmentBasicVO getSegmentSelected(Integer segmentId) {
        Segment segment = segmentRepository.findSegmentById(segmentId);
        return SegmentBasicVO.builder()
                .segmentId(segment.getSegmentId())
                .order(segment.getOrder())
                .time(segment.getTime())
                .content(segment.getContent())
                .emotion(segment.getEmotion())
                .videoId(segment.getVideoId())
                .thumbnail(segment.getThumbnail())
                .videoUrl(segment.getVideoUrl())
                .pictureUrl(segment.getPictureUrl())
                .build();
    }
}

package com.movie.movie.service.impl;
import com.movie.movie.modal.domain.Picture;
import com.movie.movie.modal.domain.Segment;
import com.movie.movie.modal.domain.Video;
import com.movie.movie.repository.PictureRepository;
import com.movie.movie.repository.SegmentRepository;
import com.movie.movie.repository.VideoCusRepository;
import com.movie.movie.repository.VideoRepository;
import com.movie.movie.service.VideoService;
import com.movie.movie.vo.PictureBasicVO;
import com.movie.movie.vo.SegmentVO;
import com.movie.movie.vo.VideoInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {
    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private VideoCusRepository videoCusRepository;


    @Autowired
    private SegmentRepository segmentRepository;

    @Override
    public VideoInfoVO getVideoSelected(Integer videoId) {
        Optional<Video> video = videoRepository.findById(videoId);
        VideoInfoVO videoInfoVO = VideoInfoVO.builder()
                .videoId(video.get().getVideoId())
                .videoPath(video.get().getVideoPath())
                .type(video.get().getType())
                .title(video.get().getTitle())
                .uri(video.get().getUri())
                .contributor(video.get().getContributor())
                .audioSpectrum(video.get().getAudioSpectrum())
                .emotionList(video.get().getEmotionList())
                .captionUrl(video.get().getCaptionUrl())
                .videoUrl(video.get().getVideoUrl())
                .build();

        return videoInfoVO;
    }

    @Override
    public List<SegmentVO> getVideoPictureSelectedByEmotionOrder(String emotionOrder) {
        String[] emotionOrderArray = emotionOrder.split(";");
        ArrayList<Integer> emotionOrderList = new ArrayList<>();
        for (String s : emotionOrderArray) {
            if (s.equals("")) {
                continue;
            }
            emotionOrderList.add(Integer.parseInt(s));
        }
        Video video = videoCusRepository.findVideoByEmotionOrder(emotionOrderList);
        List<Video.SegmentPair> emotionList = video.getEmotionList();
        // 根据emotionList的segmentId获取segment的图片
        List<Integer> ids = new ArrayList<>();
        for (Video.SegmentPair segmentPair : emotionList) {
            ids.add(segmentPair.getSegmentId());
        }
        List<Segment> segmentList = segmentRepository.findSegmentByIds(ids);
        List<SegmentVO> segmentVOList = new ArrayList<>();
        for (Segment segment : segmentList) {
            SegmentVO segmentVO = SegmentVO.builder()
                    .segmentId(segment.getSegmentId())
                    .order(segment.getOrder())
                    .videoId(segment.getVideoId())
                    .pictureUrl(segment.getPictureUrl())
                    .build();
            segmentVOList.add(segmentVO);
        }
        if (segmentVOList.isEmpty()) {
            SegmentVO segmentVO = SegmentVO.builder()
                    .videoId(video.getVideoId())
                    .pictureUrl(video.getPictureUrl())
                    .build();
            segmentVOList.add(segmentVO);
        }
        return segmentVOList;
    }
}

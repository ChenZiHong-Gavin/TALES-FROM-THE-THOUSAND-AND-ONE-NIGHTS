package com.movie.movie.service.impl;

import com.movie.movie.modal.domain.Emotion;
import com.movie.movie.modal.domain.Segment;
import com.movie.movie.repository.EmotionRepository;
import com.movie.movie.repository.SegmentRepository;
import com.movie.movie.service.EmotionService;
import com.movie.movie.vo.SegmentByEmotionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.movie.movie.util.RandomUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmotionServiceImpl implements EmotionService {
    @Autowired
    private EmotionRepository emotionRepository;

    @Autowired
    private SegmentRepository segmentRepository;


    @Override
    public List<SegmentByEmotionVO> getSegmentByEmotions() {
        List<Emotion> list = emotionRepository.findSegmentIdByEmotionType();
        Map<String, List<Integer>> map = new HashMap<>();
        for (Emotion emotion : list) {
            String emotionType = emotion.getEmotionType();
            Integer countForUse = emotion.getCountForUse();
            List<Integer> segmentList = emotion.getSegmentList();
            List<Integer> randomIndexList = RandomUtil.randomIndexesGenerator(segmentList.size(), countForUse);
            List<Integer> randomSegmentList = new ArrayList<>();
            for (Integer index : randomIndexList) {
                randomSegmentList.add(segmentList.get(index));
            }
            map.put(emotionType, randomSegmentList);
        }
        List<SegmentByEmotionVO> segmentByEmotionVOList = new ArrayList<>();
        for (Map.Entry<String, List<Integer>> entry : map.entrySet()) {
            String emotionType = entry.getKey();
            List<Integer> segmentList = entry.getValue();
            List<Segment> segmentSlices = segmentRepository.findSegmentByIds(segmentList);
            SegmentByEmotionVO segmentByEmotionVO = SegmentByEmotionVO.builder()
                    .emotionType(emotionType)
                    .segmentList(segmentSlices)
                    .build();
            segmentByEmotionVOList.add(segmentByEmotionVO);
        }
        return segmentByEmotionVOList;
    }

}

package com.movie.movie.repository.impl;

import com.movie.movie.modal.domain.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class VideoCusRepositoryImpl implements com.movie.movie.repository.VideoCusRepository {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public VideoCusRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Video findVideoByEmotionOrder(List<Integer> emotionOrder) {
        List<List<Integer>> sublists = generateSublists(emotionOrder);
        Collections.reverse(sublists); // Start with the longest sublist
        ArrayList<Video> videos = new ArrayList<>();
        for (List<Integer> sublist : sublists) {
            MatchOperation matchOperation = Aggregation.match(Criteria.where("emotionOrder").is(sublist));
            Aggregation aggregation = Aggregation.newAggregation(matchOperation);
            AggregationResults<Video> aggregationResults = mongoTemplate.aggregate(aggregation, "video_collection", Video.class);
            List<Video> mappedVideo = aggregationResults.getMappedResults();

            if (!mappedVideo.isEmpty()) {
                for(Video video : mappedVideo) {
                    if (!videos.contains(video)) {
                        videos.add(video);
                    }
                }
            }
        }
        // 从videos中随机选取一个video返回
        ArrayList<Video> videosFullEmotions = new ArrayList<>();
        for (Video video : videos) {
            if (video.getEmotionOrder().size() > 0) {
                videosFullEmotions.add(video);
            }
        }
        if (videosFullEmotions.size() > 0) {
            return videosFullEmotions.get((int) (Math.random() * videosFullEmotions.size()));
        }
        return videos.get((int) (Math.random() * videos.size()));
    }

    private List<List<Integer>> generateSublists(List<Integer> list) {
        List<List<Integer>> sublists = new ArrayList<>();
        generateSublistsHelper(list, 0, new ArrayList<>(), sublists);
        return sublists;
    }

    private void generateSublistsHelper(List<Integer> list, int index, List<Integer> current, List<List<Integer>> sublists) {
        if (index == list.size()) {
            sublists.add(new ArrayList<>(current));
            return;
        }

        // Include the current element
        current.add(list.get(index));
        generateSublistsHelper(list, index + 1, current, sublists);

        // Exclude the current element
        current.remove(current.size() - 1);
        generateSublistsHelper(list, index + 1, current, sublists);
    }


}

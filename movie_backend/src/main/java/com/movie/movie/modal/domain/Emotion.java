package com.movie.movie.modal.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "emotion_collection")
public class Emotion implements Serializable {
    private static final long serialVersionUID = 8339981537435860266L;

    @Id
    private Integer emotionId;
    private String emotionType;
    private List<Integer> segmentList;
    private Integer countForUse;
}

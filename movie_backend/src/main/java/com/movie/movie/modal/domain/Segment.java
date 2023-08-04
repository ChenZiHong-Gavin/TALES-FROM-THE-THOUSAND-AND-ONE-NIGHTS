package com.movie.movie.modal.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "video_segment_collection")
public class Segment implements Serializable {
    private static final long serialVersionUID = -7063473366885775903L;
    @Id
    private Integer segmentId;
    private String order;
    private String time;
    private String content;
    private String emotion;
    private Integer videoId;
    private String thumbnail;
    private String videoUrl;
}

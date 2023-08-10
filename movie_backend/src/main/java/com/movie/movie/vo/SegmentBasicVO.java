package com.movie.movie.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SegmentBasicVO implements Serializable {
    private static final long serialVersionUID = 2151170603721912640L;

    private Integer segmentId;
    private String order;
    private String time;
    private String content;
    private String emotion;
    private Integer videoId;
    private String thumbnail;
    private String videoUrl;
    private String pictureUrl;

}

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
public class SegmentVO implements Serializable {
    private static final long serialVersionUID = 3135632718820787147L;

    private Integer segmentId;
    private String order;
    private int videoId;
    private String pictureUrl;


}

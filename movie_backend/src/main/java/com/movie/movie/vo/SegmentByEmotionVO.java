package com.movie.movie.vo;

import com.movie.movie.modal.domain.Segment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SegmentByEmotionVO implements Serializable {
    private static final long serialVersionUID = 8459194364705551863L;

    private String emotionType;
    private List<Segment> segmentList;

}

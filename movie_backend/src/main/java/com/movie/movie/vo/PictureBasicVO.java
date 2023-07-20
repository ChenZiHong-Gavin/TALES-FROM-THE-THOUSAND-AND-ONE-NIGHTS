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
public class PictureBasicVO implements Serializable {
    private static final long serialVersionUID = 5172973096562683848L;

    private Long pictureId;
    private String imgPath;
    private Integer movieId;
}

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
public class PictureInfoVO  implements Serializable {

    private static final long serialVersionUID = -4847309959803363769L;
    private Long pictureId;
    private String date;

    private String creator;

    private String movie;
    private String type;

    private String donator;

    private String imgPath;
    private Integer movieId;

    private String movieName;
    private String uri;
}

package com.movie.movie.modal.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "picture_collection")
public class Picture implements Serializable {
    private static final long serialVersionUID = -51221364845851282L;

    @Id
    private Long pictureId;
    private String date;
    private String creator;
    private String movie;
    private String type;
    private String donator;
    private String uri;
    private String movieName;
    private String personUri;
    private String imgPath;
    private List<Object> personList;
    private Integer movieId;
}

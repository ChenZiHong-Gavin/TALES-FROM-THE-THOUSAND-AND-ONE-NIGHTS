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
@Document(collection = "theatre_collection")
public class Theatre implements Serializable {
    private static final long serialVersionUID = -5835609140424636626L;

    @Id
    private Integer theatreId;
    private String des;
    private String nameE;
    private String nameS;
    private String nameT;
    private String address;
    private String house;
    private String lat;
    private String lon;
    private String orgName;
    private String uri;
    private List<Object> imagesList;
    private List<Object> personList;
}

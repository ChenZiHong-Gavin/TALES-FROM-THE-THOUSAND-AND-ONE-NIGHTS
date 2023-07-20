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

    @Data
    public class Building {
        private String nameE;
        private String nameT;
        private String nameS;
        private String des;
        private String address;
        private String lon;
        private String lat;
        private String uri;
        private String house;
    }

    @Id
    private Integer theatreId;
    private Building building;
    private List<Object> personList;
    private List<Object> imageList;
}

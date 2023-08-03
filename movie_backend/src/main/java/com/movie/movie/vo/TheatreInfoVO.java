package com.movie.movie.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TheatreInfoVO implements Serializable {
    private static final long serialVersionUID = 7291380798143854572L;

    private Integer theatreId;
    private String nameE;
    private String nameT;
    private String nameS;
    private String description;
    private String uri;
    private String address;
    private String house;
    private String lat;
    private String lon;
    private List<Object> personList;
    private List<Object> imageList;
    private List<Object> eventList;
}

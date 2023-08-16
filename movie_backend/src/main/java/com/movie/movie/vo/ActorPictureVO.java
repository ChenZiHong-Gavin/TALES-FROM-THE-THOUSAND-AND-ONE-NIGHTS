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
public class ActorPictureVO implements Serializable {

    private static final long serialVersionUID = 9060238726211761857L;

    private Integer actorId;
    private List<Object> photoOfPerson;
}

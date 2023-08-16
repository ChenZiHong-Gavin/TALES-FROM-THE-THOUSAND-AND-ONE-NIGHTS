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
public class ActorVO implements Serializable {
    private static final long serialVersionUID = -957914902963549468L;

    private Integer actorId;
    private String uri;
    private String avatarUrl;
    private Object personDetail;
    private List<Object> photoOfPerson;
    private List<Object> movieOfPerson;
    private List<Object> videoOfPerson;
    private List<Object> audioOfPerson;
}

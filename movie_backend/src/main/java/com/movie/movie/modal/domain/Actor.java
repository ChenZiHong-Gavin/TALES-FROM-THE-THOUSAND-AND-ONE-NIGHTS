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
@Document(collection = "actor_collection")
public class Actor implements Serializable {
    private static final long serialVersionUID = 576342815088017403L;

    @Id
    private Integer actorId;
    private String uri;
    private Object personDetail;
    private List<Object> photoOfPerson;
    private List<Object> movieOfPerson;
    private List<Object> videoOfPerson;
    private List<Object> audioOfPerson;
    private String avatarUrl;

}

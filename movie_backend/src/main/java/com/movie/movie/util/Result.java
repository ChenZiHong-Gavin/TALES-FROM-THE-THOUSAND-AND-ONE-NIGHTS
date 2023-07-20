package com.movie.movie.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class Result<T> implements Serializable {
    private static final long serialVersionUID = 556184321342054363L;

    @JsonProperty("code")
    private int code;
    private String message;
    private T data;
    public Result() {
    }
    public Result(int code, String message) {
        this.code = code;
        this.message = message;
    }



}

package com.movie.movie.util;

import lombok.Data;

import java.util.LinkedHashMap;
import java.util.Map;

@Data
public class ParamQuery extends LinkedHashMap<String, String> {
    private static final long serialVersionUID = 1216933116524671956L;

    // 数量限制
    private int limit;

    public ParamQuery(Map<String, String> params) {
        this.putAll(params);

        if (this.containsKey("limit")) {
            this.limit = Integer.parseInt(params.get("limit"));
        }
    }
}

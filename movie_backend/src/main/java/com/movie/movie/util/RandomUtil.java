package com.movie.movie.util;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class RandomUtil {
    public static List<Integer> randomIndexesGenerator(int bound, int numNeed) {
        if (bound <= numNeed) {
            return IntStream.range(0, bound).boxed().collect(Collectors.toList());
        } else {
            List<Integer> indexes = new ArrayList<>();
            Set<Integer> indexSet = new HashSet<>();
            Random random = new Random();
            while (indexSet.size() < numNeed) {
                int randomIndex = random.nextInt(bound);
                indexSet.add(randomIndex);
            }
            indexes.addAll(indexSet);
            return indexes;
        }
    }
}

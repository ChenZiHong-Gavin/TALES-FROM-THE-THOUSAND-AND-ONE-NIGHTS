package com.movie.movie;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@SpringBootTest
class MovieApplicationTests {
	private MongoTemplate mongoTemplate;

	@Test
	void contextLoads() {
//		PictureVO picture = new PictureVO();
//		picture.setImgPath("123");
//		picture.setMovieId("123");
//		picture.setId("123");
//		PictureVO save = mongoTemplate.insert(picture);
//		System.out.println(save);
	}

	// 条件查询
	@Test
	public void findPictureList() {
		// 查找所有movieId不为""的数据
//		Query query = new Query(Criteria.where("movieId").ne(""));
//		List<PictureVO> pictureList = mongoTemplate.find(query, PictureVO.class);
//		System.out.println(pictureList);
	}

}

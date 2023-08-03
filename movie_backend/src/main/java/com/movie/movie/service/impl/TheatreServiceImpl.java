package com.movie.movie.service.impl;
import com.movie.movie.modal.domain.Theatre;
import com.movie.movie.repository.TheatreRepository;
import com.movie.movie.service.TheatreService;
import com.movie.movie.vo.TheatreInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TheatreServiceImpl implements TheatreService {
    @Autowired
    private TheatreRepository theatreRepository;

    @Override
    public TheatreInfoVO getTheatreSelected(Integer theatreId) {
        Optional<Theatre> theatre = theatreRepository.findById(theatreId);
        TheatreInfoVO theatreInfoVO = TheatreInfoVO.builder()
                .theatreId(theatre.get().getTheatreId())
                .nameE(theatre.get().getNameE())
                .nameT(theatre.get().getNameT())
                .nameS(theatre.get().getNameS())
                .description(theatre.get().getDes())
                .uri(theatre.get().getUri())
                .address(theatre.get().getAddress())
                .house(theatre.get().getHouse())
                .lat(theatre.get().getLat())
                .lon(theatre.get().getLon())
                .personList(theatre.get().getPersonList())
                .imageList(theatre.get().getImagesList())
                .build();

        return theatreInfoVO;
    }
}

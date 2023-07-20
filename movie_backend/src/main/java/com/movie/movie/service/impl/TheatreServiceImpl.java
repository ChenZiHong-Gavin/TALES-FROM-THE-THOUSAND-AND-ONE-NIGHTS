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
                .nameE(theatre.get().getBuilding().getNameE())
                .nameT(theatre.get().getBuilding().getNameT())
                .nameS(theatre.get().getBuilding().getNameS())
                .description(theatre.get().getBuilding().getDes())
                .uri(theatre.get().getBuilding().getUri())
                .address(theatre.get().getBuilding().getAddress())
                .house(theatre.get().getBuilding().getHouse())
                .lat(theatre.get().getBuilding().getLat())
                .lon(theatre.get().getBuilding().getLon())
                .personList(theatre.get().getPersonList())
                .imageList(theatre.get().getImageList())
                .build();

        return theatreInfoVO;
    }
}

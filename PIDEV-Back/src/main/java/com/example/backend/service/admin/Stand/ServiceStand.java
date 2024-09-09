package com.example.backend.service.admin.Stand;

import com.example.backend.Repository.PackRepository;
import com.example.backend.Repository.SessionRepository;
import com.example.backend.Repository.StandRepository;
import com.example.backend.dto.StandDto;
import com.example.backend.model.Session;
import com.example.backend.model.Stand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@Slf4j
public class ServiceStand implements IserviceStand{
    @Autowired
    StandRepository standRepository ;
    @Autowired
    PackRepository packRepo ;
    @Autowired
    SessionRepository sessionRepository;
    public StandDto addStand(StandDto standDto) throws IOException {
        Stand stand = new Stand();
       log.info("aa"+standDto);
        Session s = sessionRepository.findById(standDto.getSessionId()).get();
        stand.setPrice(standDto.getPriceStand());
        stand.setXPosition(standDto.getXPosition());
        stand.setYPosition(standDto.getYPosition());
        stand.setSession(s);
        stand.setReserved(false);

        return standRepository.save(stand).getDto();
    }


    @Override
    public List<StandDto> getAllStand() {
        List<Stand> stands = standRepository.findAll();
        return stands.stream().map(Stand::getDto).collect(Collectors.toList());    }

    @Override
    public boolean deleteStand(Long id) {
        Optional<Stand> optionalStand= standRepository.findById(id);
        if(optionalStand.isPresent()){
            standRepository.deleteById(id);
            return true;
        }else {
            return false;
        }    }
    public List<Stand> getStandsBySession(Long sessionId) {
        return standRepository.findStandsBySessionId(sessionId);
    }

    public void acept(Long id){
        Stand b = standRepository.findById(id).get();
        b.setReserved(true);

        standRepository.save(b);

    }
}

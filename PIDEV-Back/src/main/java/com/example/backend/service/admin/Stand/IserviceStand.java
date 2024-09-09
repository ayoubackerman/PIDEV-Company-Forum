package com.example.backend.service.admin.Stand;



import com.example.backend.dto.StandDto;
import com.example.backend.model.Stand;

import java.io.IOException;
import java.util.List;

public interface IserviceStand {
    public StandDto addStand(StandDto standDto) throws IOException;

    public List<StandDto> getAllStand();
    public boolean deleteStand(Long id);
    public List<Stand> getStandsBySession(Long sessionId);
}

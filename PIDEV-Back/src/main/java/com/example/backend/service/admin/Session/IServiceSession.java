package com.example.backend.service.admin.Session;

import com.example.backend.dto.SessionDto;

import java.io.IOException;
import java.util.List;

public interface IServiceSession {

    public SessionDto addSession(SessionDto sessionDto) throws IOException;
    public SessionDto updateDto(Long id , SessionDto sessionDto) throws IOException ;
    public List<SessionDto> getAllSession();
    public boolean deleteSession(Long id);
}

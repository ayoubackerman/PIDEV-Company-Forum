package com.example.backend.service.admin.Session;

import com.example.backend.Repository.SessionRepository;
import com.example.backend.dto.SessionDto;
import com.example.backend.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ServiceSession implements IServiceSession {

    @Autowired
    SessionRepository sessionRepository;

    @Override
    public SessionDto addSession(SessionDto sessionDto) throws IOException {
        Session session = new Session();
       // session.setId(sessionDto.getId());
        session.setDuration(sessionDto.getDuration());
        session.setDate(sessionDto.getDate());
        session.setFlyer(sessionDto.getFlyer());
        session.setLocation(sessionDto.getLocation());


        return sessionRepository.save(session).getDto();
    }

    @Override
    public List<SessionDto> getAllSession() {
        List<Session> sessions = sessionRepository.findAll();
        return sessions.stream().map(Session::getDto).collect(Collectors.toList());
    }

    @Override
    public boolean deleteSession(Long id) {
        Optional<Session> optionalSession = sessionRepository.findById(id);
        if (optionalSession.isPresent()) {
            sessionRepository.deleteById(id);
            return true;
        } else {
            throw new NoSuchElementException("Session with id " + id + " not found");
        }
    }

    public SessionDto updateDto(Long id, SessionDto sessionDto) throws IOException {
        Optional<Session> optionalSession = sessionRepository.findById(id);
        if (optionalSession.isPresent()) {

            Session session = optionalSession.get();
            session.setId(sessionDto.getId());
            session.setDuration(sessionDto.getDuration());
            session.setDate(sessionDto.getDate());
            session.setFlyer(sessionDto.getFlyer());
            session.setLocation(session.getLocation());


            return sessionRepository.save(session).getDto();
        } else {
            return null;
        }
    }
}

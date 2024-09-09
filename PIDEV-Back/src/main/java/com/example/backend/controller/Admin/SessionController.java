package com.example.backend.controller.Admin;


import com.example.backend.dto.SessionDto;
import com.example.backend.service.admin.Session.ServiceSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/pidev")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SessionController {
    @Autowired
    private final ServiceSession serviceSession;

    @PostMapping("/Addsession")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SessionDto> addSession(@RequestPart("date") String date, @RequestPart("location") String location, @RequestPart("duration") String duration, @RequestPart("flyer") MultipartFile flyer) throws IOException {

        byte[] fileBytes = flyer.getBytes();

        SessionDto sessionDto1=new SessionDto();
        sessionDto1.setLocation(location);
        sessionDto1.setFlyer(fileBytes);
        sessionDto1.setDate(date);
        sessionDto1.setDuration(duration);
        SessionDto sessionDto=serviceSession.addSession(sessionDto1);

        return ResponseEntity.status(HttpStatus.CREATED).body(sessionDto);

    }

    @GetMapping("/getallsession")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<SessionDto>> GetAll(){
        List<SessionDto> list = serviceSession.getAllSession();
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }


    @DeleteMapping("/deletesession/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id){
        boolean delete = serviceSession.deleteSession(id);
        if (delete){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/Updatesession/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SessionDto> sessionUpdate(@PathVariable Long id , @RequestBody SessionDto sessionDto) throws IOException {
        SessionDto resdto = serviceSession.updateDto(id,sessionDto);
        if (resdto != null){
            return ResponseEntity.ok(resdto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

}

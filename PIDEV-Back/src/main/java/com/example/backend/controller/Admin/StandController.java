package com.example.backend.controller.Admin;


import com.example.backend.dto.StandDto;
import com.example.backend.model.Stand;
import com.example.backend.service.admin.Stand.ServiceStand;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/pidev")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class StandController {
    @Autowired
    private final ServiceStand serviceStand ;

    @PostMapping("/Addstand")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StandDto> addStand(@ModelAttribute StandDto standDto) throws IOException {
        StandDto standDto1 = serviceStand.addStand(standDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(standDto1);

    }

    @GetMapping("/getallstand")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<StandDto>> GetAll(){
        List<StandDto> list = serviceStand.getAllStand();
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }


    @DeleteMapping("/deletestand/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStand(@PathVariable Long id){
        boolean delete = serviceStand.deleteStand(id);
        if (delete){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }

    }
    @GetMapping("/stands/session/{sessionId}")
    public List<Stand> getStandsBySession(@PathVariable Long sessionId) {
        return serviceStand.getStandsBySession(sessionId);
    }

    @PutMapping("/Editstand/{id}")
    public void EditStatus(@PathVariable Long id) {
        serviceStand.acept(id);

    }

    }

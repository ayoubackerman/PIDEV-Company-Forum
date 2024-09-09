package com.example.backend.controller.Admin;


import com.example.backend.dto.ReservationDto;
import com.example.backend.service.admin.Reservation.ServiceReservation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/pidev")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")

public class ReservationController {

    private final ServiceReservation serviceReservation;

    @PostMapping("/Addreservation")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservationDto> addReservation(@RequestBody ReservationDto reservationDto) throws IOException {
        ReservationDto reservationDto1 = serviceReservation.addReservation(reservationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationDto1);

    }

    @GetMapping("/getallreservation")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<ReservationDto>> GetAll(){
        List<ReservationDto> list = serviceReservation.getAllReservations();
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }


    @DeleteMapping("/deletereservation/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id){
        boolean delete = serviceReservation.deleteReservation(id);
        if (delete){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/findonereservation/{id}")
    public ResponseEntity<ReservationDto> getItemById(@PathVariable Long id){
        ReservationDto resdto = serviceReservation.GetReservationById(id);
        if (resdto != null){
            return ResponseEntity.ok(resdto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/Updatereservation/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservationDto> reservationUpdate(@PathVariable Long id ,@ModelAttribute ReservationDto sessionDto) throws IOException {
        ReservationDto resdto = serviceReservation.updateDto(id,sessionDto);
        if (resdto != null){
            return ResponseEntity.ok(resdto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }



}

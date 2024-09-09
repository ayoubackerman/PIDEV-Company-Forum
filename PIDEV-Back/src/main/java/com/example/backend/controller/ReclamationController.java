package com.example.backend.controller;

import com.example.backend.dto.ReclamationDto;
import com.example.backend.model.Reclamation;
import com.example.backend.service.Reclamation.ReclamationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Reclamation")
public class ReclamationController {


    @Autowired
    ReclamationService reclamationService;

    public ReclamationController(ReclamationService reclamationService) {
        this.reclamationService = reclamationService;
    }

    @PostMapping("/add/{user_id}")
    public ResponseEntity<Reclamation> addItem(@RequestBody Reclamation reclamationDto, @PathVariable("user_id") String userId) {
        Reclamation addedReclamation = reclamationService.addItem(reclamationDto, userId);
        if (addedReclamation != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(addedReclamation);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("")

    ResponseEntity<List<ReclamationDto>> GetAll(){
        List<ReclamationDto> list = reclamationService.getAllItems();
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }


    @GetMapping("/{id}")
    public ResponseEntity<Optional<Reclamation>> getItemById(@PathVariable Long id) {
        // Call the service method to fetch the reclamation item by ID
        Optional<Reclamation> reclamationDto = reclamationService.getItemById(id);
        if (reclamationDto != null) {
            return ResponseEntity.ok(reclamationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteitem(@PathVariable Long id){
        boolean delete = reclamationService.deleterec(id);
        if (delete){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/update")
    public ResponseEntity<ReclamationDto> updateItem(@RequestBody Reclamation reclamationDto) {
        ReclamationDto updatedReclamation = reclamationService.updaterec(reclamationDto);
        if (updatedReclamation != null) {
            return ResponseEntity.ok(updatedReclamation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }





}

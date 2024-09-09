package com.example.backend.controller.Admin;

import com.example.backend.dto.ItemsDto;
import com.example.backend.service.admin.items.ServiceItems;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/items")
public class ItemsController {

      @Autowired
      ServiceItems serviceItems;

    @PostMapping("/Add")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ItemsDto> addItem(@ModelAttribute ItemsDto itemsDto) throws IOException {
        ItemsDto itemDto1 = serviceItems.addItem(itemsDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemDto1);

    }

    @PutMapping("/Update/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ItemsDto> updateItem(@PathVariable Long id ,@ModelAttribute ItemsDto itemsDto) throws IOException {
        ItemsDto itemDto1 = serviceItems.updateDto(id,itemsDto);
        if (itemDto1 != null){
            return ResponseEntity.ok(itemDto1);
        }else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<ItemsDto>> GetAll(){
        List<ItemsDto> list = serviceItems.getAllItems();
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }
    @GetMapping("/{id}")
    public ResponseEntity<ItemsDto> getItemById(@PathVariable Long id){
        ItemsDto itemsDto = serviceItems.getItemById(id);
        if (itemsDto != null){
            return ResponseEntity.ok(itemsDto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteitem(@PathVariable Long id){
        boolean delete = serviceItems.deleteitem(id);
        if (delete){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }

    }



}

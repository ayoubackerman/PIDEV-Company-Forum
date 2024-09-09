package com.example.backend.controller.Admin;

import com.example.backend.Enum.TypePack;
import com.example.backend.dto.PackDto;
import com.example.backend.service.admin.Pack.IServicePack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pidev")
@CrossOrigin(origins = "http://localhost:4200")
public class PackController{

    @Autowired
    private IServicePack servicePack;

    @PostMapping("/addpack")
    public ResponseEntity<PackDto> addPack(@RequestBody PackDto packDto) {
        try {
            PackDto addedPack = servicePack.addPack(packDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedPack);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getallpacks")
    public ResponseEntity<List<PackDto>> getAllPacks() {
        List<PackDto> packs = servicePack.getAllPacks();
        return ResponseEntity.ok(packs);
    }

    @DeleteMapping("/getonepack/{id}")
    public ResponseEntity<Void> deletePack(@PathVariable Long id) {
        boolean result = servicePack.deletePack(id);
        if (result) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/types")
    public ResponseEntity<List<String>> getPackTypes() {
        List<String> types = Arrays.asList(
                TypePack.DIAMOND.name(),
                TypePack.SILVER.name(),
                TypePack.GOLD.name()
        );
        return ResponseEntity.ok(types);
    }
}

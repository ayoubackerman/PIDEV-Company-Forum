package com.example.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
public class SessionDto {
    private Long id ;
    private byte[] flyer ;
    private String date ;
    private String location ;
    private String duration ;

}

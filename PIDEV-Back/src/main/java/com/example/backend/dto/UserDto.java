package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@Data
public class UserDto {
    private String id;
    private String phoneNumber;
    private String adress ;
    private byte[] byteImg ;
    private MultipartFile img;
    private List<String> skills;
}

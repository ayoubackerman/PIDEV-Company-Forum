package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data

public class ItemsDto {
    private Long codeItem ;

    private String name ;
    private String description ;
    private Long quantity ;
    private byte[] byteImg ;
    private MultipartFile img;
}

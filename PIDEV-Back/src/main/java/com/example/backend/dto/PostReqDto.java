package com.example.backend.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PostReqDto {
    private Long codepost ;
    private byte[] imagepost;
    private String title;
    private String description;
    private String author;
    private Date datepost;
    private List<CommentDto> comments;
    private boolean comf;
}

package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Data
public class CommentDto {

    private Long codeComment ;
    private String comment;
    private byte[] byteImg ;
    private MultipartFile img;
    private Date date;
    private boolean confirmed;
    private List<UserDto> userList;


    private Optional<PostDto> postDto;

    public void setPostDto(Optional<PostDto> postDto) {
        this.postDto = postDto;
    }


}

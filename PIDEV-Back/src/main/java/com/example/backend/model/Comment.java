package com.example.backend.model;

import com.example.backend.dto.CommentDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeComment ;
    private String comment;
    private byte[] image;
    private Date date;
    @ManyToOne
    private Post post;
    private String user ;
    private boolean confirmed;





    public CommentDto toDto() {
        CommentDto commentDto = new CommentDto();
        commentDto.setComment(this.comment);
        commentDto.setDate(this.date);
        commentDto.setConfirmed(this.confirmed);
        return commentDto;
    }

    public void setPost(Post post) {
    }

    //private List<String> userList = new ArrayList<>();


}
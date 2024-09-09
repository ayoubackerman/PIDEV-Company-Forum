package com.example.backend.model;

import com.example.backend.dto.PostDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codepost ;
    private byte[] imagepost;
    private String title;
    private String description;
    private String author;
    private Date datepost;
    private boolean comf;
    private String user ;

    @OneToMany
    private List<Comment> comments;


    public PostDto toDto() {

        PostDto postDto = new PostDto();

        postDto.setImagepost(this.imagepost);
        postDto.setTitle(this.title);
        postDto.setDescription(this.description);
        postDto.setAuthor(this.author);
        postDto.setDatepost(this.datepost);
        postDto.setComf(this.isComf());
        return postDto;
    }

    public static Post fromDto(PostDto postDto) throws IOException {
        Post post = new Post();

        post.setImagepost(postDto.getImagepost());
        post.setTitle(postDto.getTitle());
        post.setDescription(postDto.getDescription());
        post.setAuthor(postDto.getAuthor());
        post.setDatepost(new Date());
     //   post.setComf(postDto.isComf());
        return post;
    }

    //private List<Comment> comments = new ArrayList<>();


}
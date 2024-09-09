package com.example.backend.controller;

import com.example.backend.dto.PostDto;
import com.example.backend.model.Post;
import com.example.backend.service.Forum.Post.IServicePost;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/Post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private IServicePost servicePost;

    @PostMapping(value = "/addpost/{id}",consumes = "multipart/form-data")
    public ResponseEntity<Post> addPost(@RequestPart("imagepost") MultipartFile imagepost, @RequestPart String title, @RequestPart String description, @RequestPart String author ,@PathVariable("id") String userId) throws IOException {
    Post postDto= new Post();
     postDto.setTitle(title);
     postDto.setDescription(description);
     postDto.setAuthor(author);

      byte[] img=imagepost.getBytes();
      postDto.setImagepost(img);
        Post addedPost2 = servicePost.addPost(postDto,userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedPost2);
    }


    @GetMapping()
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> posts = servicePost.getAllPosts();
        return ResponseEntity.ok(posts);
        //dfsdfsd
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Post>> getPostById(@PathVariable("id") Long id) {
        Optional<Post> optionalPost = servicePost.getPostById(id);

            if (optionalPost != null) {
                return ResponseEntity.ok(optionalPost);
            } else {
                return ResponseEntity.notFound().build();
            }
        }




    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
        servicePost.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}

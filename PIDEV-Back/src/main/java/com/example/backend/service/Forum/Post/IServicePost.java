
package com.example.backend.service.Forum.Post;

import com.example.backend.dto.PostDto;
import com.example.backend.dto.PostReqDto;
import com.example.backend.model.Post;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IServicePost {


    Post addPost(Post postDto , String user_id) throws IOException;


    List<PostDto> getAllPosts();

    boolean deletePost(Long id);




    Optional<Post> getPostById(Long id);
}

package com.example.backend.service.Forum.Post;

import com.example.backend.Repository.Forum.Post.PostRepository;
import com.example.backend.dto.PostDto;
import com.example.backend.model.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@Slf4j
@RequiredArgsConstructor
public class ServicePost implements IServicePost {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post addPost(Post postDto , String user_id ) throws IOException {
        postDto.setUser(user_id);
        postRepository.save(postDto);
        return postDto;
    }

    @Override
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(Post::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public boolean deletePost(Long id) {
        postRepository.deleteById(id);
        return true;
    }



    @Override
    public Optional<Post> getPostById(Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        return optionalPost;
    }

    private PostDto convertToDto(Post post) {
        PostDto postDto = new PostDto();
        // Map fields from Reclamation entity to ReclamationDto
        // Map other fields as needed

        return postDto;
    }
}

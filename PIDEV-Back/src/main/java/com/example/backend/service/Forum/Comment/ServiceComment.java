package com.example.backend.service.Forum.Comment;

import com.example.backend.Repository.Forum.Comment.CommentRepository;
import com.example.backend.Repository.Forum.Post.PostRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.dto.CommentDto;
import com.example.backend.model.Comment;
import com.example.backend.model.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ServiceComment implements IServiceComment {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;


    @Override
    public Comment addComment(Comment commentDto, Long postID, String user_id) {
        Comment comment = new Comment();
        comment.setComment(commentDto.getComment());
        comment.setDate(new Date());
        comment.setConfirmed(false);

        Optional<Post> postOptional = postRepository.findById(postID);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            comment.setPost(post);

            // Fetch user by userId
           // Optional<User> userOptional = userRepository.findById(userId);
           // if (userOptional.isPresent()) {
              //  User user = userOptional.get();
           comment.setUser(user_id);


            post.getComments().add(comment);
            commentRepository.save(comment);
            postRepository.save(post);
            commentDto.setConfirmed(comment.isConfirmed());
            return commentDto;
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    public void acceptComment(Long id){

        List<Post> l = postRepository.findAll();
        for (Post i :l ) {
            for (Comment j:i.getComments()) {
                if (j.getCodeComment().equals(id)){
                    Comment comm = commentRepository.findById(id).get();
                    Post post = postRepository.findById(i.getCodepost()).get();
                    post.setComf(true);
                    comm.setConfirmed(true);
                    commentRepository.save(comm);
                    postRepository.save(post);
                }

            }

        }


    }


    @Override
    public List<CommentDto> getAllComment() {
        List<Comment> commentList = commentRepository.findAll();
        return commentList.stream()
                .map(Comment::toDto)
                .collect(Collectors.toList());

    }

    @Override
    public boolean deleteComment(Long id) {
        return false;
    }

    @Override
    public CommentDto updateComment(CommentDto commentDto) throws IOException {
        return null;
    }

    @Override
    public Optional<CommentDto> getCommentById(Long id) {
        return Optional.empty();
    }

    public List<CommentDto> getAllCommentsByPostId(Long postId) {

        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();

            List<Comment> comments = post.getComments();

            return comments.stream().map(Comment::toDto).collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

}

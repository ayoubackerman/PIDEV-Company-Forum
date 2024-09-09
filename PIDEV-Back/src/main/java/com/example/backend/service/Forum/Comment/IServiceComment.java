package com.example.backend.service.Forum.Comment;

import com.example.backend.dto.CommentDto;
import com.example.backend.model.Comment;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IServiceComment {

    Comment addComment(Comment commentDto, Long postID, String user_id) throws IOException;
    public List<CommentDto> getAllComment();
    public boolean deleteComment(Long id);
    public CommentDto updateComment(CommentDto commentDto) throws IOException;
    public Optional<CommentDto> getCommentById(Long id);
    public void acceptComment(Long id);
    public List<CommentDto> getAllCommentsByPostId(Long postId);
}

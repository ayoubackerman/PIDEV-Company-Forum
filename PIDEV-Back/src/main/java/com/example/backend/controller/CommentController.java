package com.example.backend.controller;

import com.example.backend.dto.CommentDto;
import com.example.backend.model.Comment;
import com.example.backend.service.Forum.Comment.IServiceComment;
import com.example.backend.service.Forum.Post.IServicePost;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Comment")
public class CommentController {

    private final IServiceComment commentService;

    private final IServicePost postService;

    @PostMapping("/add/{user_id}")
    public ResponseEntity<Comment> addComment(@RequestBody Comment commentDto, @RequestParam("postId") Long postId, @PathVariable("user_id") String userId) {
        try {
            Comment addedComment = commentService.addComment(commentDto, postId,userId);
            // Successfully added the comment
            return ResponseEntity.ok(addedComment);
        } catch (RuntimeException ex) {
            // Handling specific runtime exceptions you might expect
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            // Catching a broader range of exceptions to return a generic server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("")
    public ResponseEntity<List<CommentDto>> getAllComments() {
        List<CommentDto> comments = commentService.getAllComment();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDto> getCommentById(@PathVariable("id") Long id) {
        Optional<CommentDto> commentDtoOptional = commentService.getCommentById(id);
        return commentDtoOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<CommentDto> updateComment(@RequestBody CommentDto commentDto) throws IOException {
        CommentDto updatedComment = commentService.updateComment(commentDto);
        if (updatedComment != null) {
            return ResponseEntity.ok(updatedComment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable("id") Long id) {
        boolean deleted = commentService.deleteComment(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/Edit/{id}")
    public void EditStatus(@PathVariable Long id){
        commentService.acceptComment(id);
    }
    @GetMapping("/post/{postId}")
    public List<CommentDto> getAllCommentsByPostId(@PathVariable Long postId) {
        return commentService.getAllCommentsByPostId(postId);
    }

}

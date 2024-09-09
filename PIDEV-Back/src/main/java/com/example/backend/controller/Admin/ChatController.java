package com.example.backend.controller.Admin;

import com.example.backend.dto.MessageDto;
import com.example.backend.dto.RequestDto;
import com.example.backend.dto.ResponseDto;
import com.example.backend.service.admin.chat.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
@CrossOrigin
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Autowired
    private ChatService chatService;

    @PostMapping("/chatgpt")
    public ResponseEntity<MessageDto> chat(@RequestBody String prompt) {
        RequestDto requestDto = new RequestDto(model, prompt);
        ResponseDto responseDto = restTemplate.postForObject(apiUrl, requestDto, ResponseDto.class);
        if (requestDto == null || responseDto.getChoices() == null || responseDto.getChoices().isEmpty())
            return ResponseEntity.badRequest().body(new MessageDto("user", "fallo en la consulta"));
        return ResponseEntity.ok(responseDto.getChoices().get(0).getMessage());
    }
}

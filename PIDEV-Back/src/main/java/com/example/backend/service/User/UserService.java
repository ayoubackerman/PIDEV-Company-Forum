package com.example.backend.service.User;


import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Optional;

public interface UserService {
    UserDto addUserInfo(UserDto user) throws IOException;

    Optional<User> GetUserInfo(String id);

}

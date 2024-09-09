package com.example.backend.controller.UserApi;


import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.service.User.UserServiceImpl;
import org.keycloak.admin.client.Keycloak;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Optional;

@RestController
@RequestMapping("/user/")
//@CrossOrigin(origins = "")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    private Keycloak keycloak;


    @PostMapping(value = "add-info", consumes = {MediaType.MULTIPART_FORM_DATA})
    public UserDto addUserInfo(@ModelAttribute UserDto userDto) throws IOException {
        return userService.addUserInfo(userDto);
    }


    @GetMapping("{id}")
    public ResponseEntity<?> getUserInfo(@PathVariable String id) {
        Optional<User> user = userService.GetUserInfo(id);
        if (user.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }else {
            return ResponseEntity.status(HttpStatus.OK).body("user didn't add his informations ");
        }

    }

}

package com.example.backend.service.User;

import com.example.backend.Repository.UserRepository;
import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository ;


    @Override
    public UserDto addUserInfo(UserDto userdto) throws IOException{
        User user = new User();
        user.setId(userdto.getId());
        user.setPhoneNumber(userdto.getPhoneNumber());
        user.setAdress(userdto.getAdress());
        user.setImg(userdto.getImg().getBytes());
        user.setSkills(userdto.getSkills());
        return  userRepository.save(user).getDto();
    }

    @Override
    public Optional<User> GetUserInfo(String id) {
        Optional<User> userOptional= userRepository.findById(id);
    return userOptional ;

    }


}

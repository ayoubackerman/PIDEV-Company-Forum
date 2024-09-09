package com.example.backend.service.admin.Token;

import com.example.backend.Repository.fcmTokenRepository;
import com.example.backend.model.fcmToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TokenService {
    @Autowired
    fcmTokenRepository fcmTokenrepository;

    public void addToken(String token){

        fcmToken token1 = fcmTokenrepository.findfcmToken(token);
        if (token1==null) {
            fcmToken t = new fcmToken();
            t.setToken(token);
            fcmTokenrepository.save(t);
        }
    }

}

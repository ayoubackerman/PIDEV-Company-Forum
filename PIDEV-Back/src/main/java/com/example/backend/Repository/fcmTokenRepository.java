package com.example.backend.Repository;

import com.example.backend.model.fcmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface fcmTokenRepository extends JpaRepository<fcmToken,Long> {

    @Query("select t from fcmToken t where t.Token=:token")
    fcmToken findfcmToken(String token);
}

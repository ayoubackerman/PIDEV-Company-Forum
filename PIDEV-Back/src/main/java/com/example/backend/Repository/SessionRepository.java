package com.example.backend.Repository;

import com.example.backend.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session,Long>  {
    @Query("select s from Session s where s.location =:location")
    Session hassen4(String location);
}

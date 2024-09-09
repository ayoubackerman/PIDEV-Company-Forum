package com.example.backend.Repository;

import com.example.backend.model.Stand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface StandRepository extends JpaRepository<Stand,Long> {

    @Query("select s from Stand s where s.id=:id")
    Stand hassen2(Long id);
    @Query("SELECT s FROM Stand s WHERE s.session.id = :sessionId")
    List<Stand> findStandsBySessionId(Long sessionId);
}

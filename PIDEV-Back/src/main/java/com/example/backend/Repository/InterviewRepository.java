package com.example.backend.Repository;

import com.example.backend.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface InterviewRepository extends JpaRepository<Interview,Long> {

    @Query("SELECT i from Interview i where i.application.applicationCode=:applicationId")
    boolean existsByApplicationId(Long applicationId);

}

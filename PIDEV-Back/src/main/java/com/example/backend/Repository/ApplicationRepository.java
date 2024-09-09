package com.example.backend.Repository;

import com.example.backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {
}

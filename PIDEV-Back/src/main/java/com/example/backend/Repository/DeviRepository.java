package com.example.backend.Repository;

import com.example.backend.model.Devi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviRepository extends JpaRepository<Devi,Long> {
}

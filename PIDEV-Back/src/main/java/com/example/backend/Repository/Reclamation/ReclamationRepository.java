package com.example.backend.Repository.Reclamation;

import com.example.backend.model.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Set;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation,Long> {

}

package com.example.backend.Repository;



import com.example.backend.model.Offre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OffreRepository extends JpaRepository<Offre,Long> {

    Offre findByReference(Long reference);
    List<Offre> findByTitleContainingIgnoreCase(String title);
}

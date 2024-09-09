package com.example.backend.Repository;

import com.example.backend.Enum.TypePack;
import com.example.backend.model.Pack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface PackRepository  extends JpaRepository<Pack, Long> {

    @Query("select p from Pack p where p.typePack =:typePack")
    Pack hassen(TypePack typePack);

}

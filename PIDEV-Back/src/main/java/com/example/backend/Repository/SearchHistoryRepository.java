package com.example.backend.Repository;

import com.example.backend.model.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory,Long> {

    SearchHistory findByKeyword(Long keyword);

}

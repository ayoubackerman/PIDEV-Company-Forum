package com.example.backend.Repository;

import com.example.backend.model.Auction;
import com.example.backend.model.CompanyReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyReviewRepository extends JpaRepository<CompanyReview,Long> {
}

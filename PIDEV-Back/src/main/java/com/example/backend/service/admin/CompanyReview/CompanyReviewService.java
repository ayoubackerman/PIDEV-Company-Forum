package com.example.backend.service.admin.CompanyReview;

import com.example.backend.dto.CompanyReviewDto;

import java.io.IOException;
import java.util.List;

public interface CompanyReviewService {
    CompanyReviewDto addCompanyReview(CompanyReviewDto CompanyReviewDto) throws IOException;

    public List<CompanyReviewDto> getAllCompanyReview();

    public boolean deleteCompanyReview(Long id);

    public CompanyReviewDto getCompanyReviewById(Long id);

    public CompanyReviewDto updateDto(Long id, CompanyReviewDto CompanyReviewDto) throws IOException;
}
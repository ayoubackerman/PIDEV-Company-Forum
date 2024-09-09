package com.example.backend.dto;

import lombok.Data;

@Data
public class CompanyReviewDto {
    private Long id;
    private String review;
    private Long userId;
}

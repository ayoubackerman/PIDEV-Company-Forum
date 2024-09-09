package com.example.backend.controller;

import com.example.backend.dto.CompanyReviewDto;
import com.example.backend.service.admin.CompanyReview.CompanyReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/company-reviews")
public class CompanyReviewController {

    private final CompanyReviewService companyReviewService;

    @Autowired
    public CompanyReviewController(CompanyReviewService companyReviewService) {
        this.companyReviewService = companyReviewService;
    }

    @PostMapping
    public ResponseEntity<CompanyReviewDto> addCompanyReview(@RequestBody CompanyReviewDto companyReviewDto) {
        try {
            CompanyReviewDto savedCompanyReviewDto = companyReviewService.addCompanyReview(companyReviewDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCompanyReviewDto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/getAllCompanies")
    public ResponseEntity<List<CompanyReviewDto>> getAllCompanyReviews() {
        List<CompanyReviewDto> companyReviewDtos = companyReviewService.getAllCompanyReview();
        return ResponseEntity.ok(companyReviewDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyReviewDto> getCompanyReviewById(@PathVariable Long id) {
        CompanyReviewDto companyReviewDto = companyReviewService.getCompanyReviewById(id);
        if (companyReviewDto != null) {
            return ResponseEntity.ok(companyReviewDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyReviewDto> updateCompanyReview(@PathVariable Long id, @RequestBody CompanyReviewDto companyReviewDto) {
        try {
            CompanyReviewDto updatedCompanyReviewDto = companyReviewService.updateDto(id, companyReviewDto);
            if (updatedCompanyReviewDto != null) {
                return ResponseEntity.ok(updatedCompanyReviewDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompanyReview(@PathVariable Long id) {
        boolean deleted = companyReviewService.deleteCompanyReview(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

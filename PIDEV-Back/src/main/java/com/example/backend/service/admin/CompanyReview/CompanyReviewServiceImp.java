package com.example.backend.service.admin.CompanyReview;

import com.example.backend.dto.CompanyReviewDto;
import com.example.backend.model.CompanyReview;
import com.example.backend.model.User;
import com.example.backend.Repository.CompanyReviewRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class  CompanyReviewServiceImp implements CompanyReviewService {
    @Autowired
    private CompanyReviewRepository companyReviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CompanyReviewDto addCompanyReview(CompanyReviewDto companyReviewDto) throws IOException {
        Optional<User> userOptional = userRepository.findById(String.valueOf(companyReviewDto.getUserId()));
        if (userOptional.isEmpty()) {
            throw new IOException("User with ID " + companyReviewDto.getUserId() + " not found");
        }

        CompanyReview companyReview = new CompanyReview();
        companyReview.setReview(companyReviewDto.getReview());
        companyReview.setUser(userOptional.get());

        CompanyReview savedCompanyReview = companyReviewRepository.save(companyReview);

        CompanyReviewDto savedCompanyReviewDto = new CompanyReviewDto();
        savedCompanyReviewDto.setId(savedCompanyReview.getId());
        savedCompanyReviewDto.setReview(savedCompanyReview.getReview());
        savedCompanyReviewDto.setUserId(Long.valueOf(savedCompanyReview.getUser().getId()));

        return savedCompanyReviewDto;
    }

    @Override
    public List<CompanyReviewDto> getAllCompanyReview() {
        List<CompanyReview> companyReviews = companyReviewRepository.findAll();
        return companyReviews.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteCompanyReview(Long id) {
        if (companyReviewRepository.existsById(id)) {
            companyReviewRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public CompanyReviewDto getCompanyReviewById(Long id) {
        Optional<CompanyReview> companyReviewOptional = companyReviewRepository.findById(id);
        return companyReviewOptional.map(this::mapToDto).orElse(null);
    }

    @Override
    public CompanyReviewDto updateDto(Long id, CompanyReviewDto companyReviewDto) throws IOException {
        Optional<CompanyReview> existingCompanyReviewOptional = companyReviewRepository.findById(id);
        if (existingCompanyReviewOptional.isPresent()) {
            Optional<User> userOptional = userRepository.findById(String.valueOf(companyReviewDto.getUserId()));
            if (userOptional.isEmpty()) {
                throw new IOException("User with ID " + companyReviewDto.getUserId() + " not found");
            }

            CompanyReview existingCompanyReview = existingCompanyReviewOptional.get();
            existingCompanyReview.setReview(companyReviewDto.getReview());
            existingCompanyReview.setUser(userOptional.get());

            CompanyReview updatedCompanyReview = companyReviewRepository.save(existingCompanyReview);

            return mapToDto(updatedCompanyReview);
        }
        return null;
    }

    private CompanyReviewDto mapToDto(CompanyReview companyReview) {
        CompanyReviewDto companyReviewDto = new CompanyReviewDto();
        companyReviewDto.setId(companyReview.getId());
        companyReviewDto.setReview(companyReview.getReview());
        companyReviewDto.setUserId(Long.valueOf(companyReview.getUser().getId()));
        return companyReviewDto;
    }
}

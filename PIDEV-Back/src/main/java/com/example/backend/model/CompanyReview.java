package com.example.backend.model;


import com.example.backend.dto.CompanyReviewDto;
import com.example.backend.dto.SessionDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CompanyReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id ;

    public String review ;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public CompanyReviewDto getDto(){
        CompanyReviewDto companyreviewdto =new CompanyReviewDto();
        companyreviewdto.setId(id);
        companyreviewdto.setReview(review);
        companyreviewdto.setUserId(Long.valueOf(user.getId()));


        return companyreviewdto;
    }
}

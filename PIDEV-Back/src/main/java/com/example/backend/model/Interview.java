package com.example.backend.model;

import com.example.backend.Enum.InterviewType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeInterview ;
    private String title ;
    private LocalDateTime startDate ;
    private LocalDateTime endDate ;
    private InterviewType type;
    private String Location ;
    @OneToOne(mappedBy = "interview")
    private Application application;


}

package com.example.backend.service.Interview;

import com.example.backend.model.Interview;

import java.util.List;

public interface InterviewService {
    public List<Interview> getAllInterviews();

    public Interview scheduleInterview(Long applicationId,Interview interview);

    public boolean hasInterviewForApplication(Long applicationId);

    public Interview getInterviewByCode(Long code);

}

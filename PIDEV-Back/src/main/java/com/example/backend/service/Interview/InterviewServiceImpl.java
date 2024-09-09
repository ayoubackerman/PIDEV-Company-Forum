package com.example.backend.service.Interview;

import com.example.backend.Repository.ApplicationRepository;
import com.example.backend.Repository.InterviewRepository;
import com.example.backend.model.Application;
import com.example.backend.model.Interview;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class InterviewServiceImpl implements InterviewService{

    InterviewRepository interviewRepository ;
    ApplicationRepository applicationRepository ;

    public Interview scheduleInterview(Long applicationId, Interview interview) {
        Application application = applicationRepository.findById(applicationId).get();
        interview.setApplication(application);

        // Enregistrez l'entretien dans la base de données
        return interviewRepository.save(interview);
    }

    private String createOnlineMeeting(Interview interview) {
        // Implémentez cette méthode pour créer un événement dans Google Calendar et retournez le lien Google Meet
        return "https://meet.google.com/new-meet-link";
    }

    @Override
    public List<Interview> getAllInterviews()
    {
        return interviewRepository.findAll();
    }

    @Override
    public boolean hasInterviewForApplication(Long applicationId) {

        return interviewRepository.existsByApplicationId(applicationId);
    }

    @Override
    public Interview getInterviewByCode(Long code) {
        return interviewRepository.findById(code).get();
    }

}

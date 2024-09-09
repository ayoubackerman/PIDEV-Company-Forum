package com.example.backend.controller;

import com.example.backend.model.Interview;
import com.example.backend.service.Interview.InterviewServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Interview")
public class InterviewController {
    private InterviewServiceImpl interviewService;

    @GetMapping("/getInterviewByCode/{code}")
    public Interview getInterviewByCode(@PathVariable("code") Long code) {
        return  interviewService.getInterviewByCode(code);
    }

    @PostMapping("/scheduleInterview")
    public ResponseEntity<Interview> scheduleInterview(@RequestBody Interview interview , @RequestParam("applicationId") Long applicationId) {
        try {
            Interview scheduledInterview = interviewService.scheduleInterview(applicationId,interview);
            return ResponseEntity.ok(scheduledInterview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/allInterviews")
    public ResponseEntity<List<Interview>> getAllInterviews()
    {
        return ResponseEntity.ok(interviewService.getAllInterviews());
    }

    @GetMapping("/hasInterview/{applicationId}")
    public ResponseEntity<Boolean> checkIfInterviewExists(@PathVariable Long applicationId) {
        boolean hasInterview = interviewService.hasInterviewForApplication(applicationId);

        return ResponseEntity.ok(hasInterview);
    }
}

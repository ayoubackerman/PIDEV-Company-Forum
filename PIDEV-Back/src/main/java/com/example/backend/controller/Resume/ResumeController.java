package com.example.backend.controller.Resume;

import java.io.IOException;
import java.util.logging.Logger;


import com.example.backend.model.Resume;
import com.example.backend.utils.PdfOneGenerator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/api")
public class ResumeController {

    private static final Logger log = Logger.getLogger(String.valueOf(ResumeController.class));

    @Autowired
    private PdfOneGenerator pdfGen;

    @PostMapping(path = "/resume")
    public ResponseEntity<String> postResume(@Valid @RequestBody Resume resume) throws IOException {

        System.out.println(resume.getHeader());
        System.out.println(resume.getExperience());
        System.out.println(resume.getEducation());
        System.out.println(resume.getProjects());
        System.out.println(resume.getSkills());
        return new ResponseEntity<String>(pdfGen.createDocument(resume), HttpStatus.OK);
    }

    @GetMapping(path = "/resumef")
    public ResponseEntity<byte[]> getResume(@RequestParam("filename") String filename) throws IOException {

        return new ResponseEntity<byte[]>(pdfGen.getDocument(filename), HttpStatus.OK);
    }
}